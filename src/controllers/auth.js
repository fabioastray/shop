const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const shortid = require('shortid')
const nodemailer = require('nodemailer')
const authConfig = require('../../config/auth')
const mailConfig = require('../../config/mail')
const HTTP_STATUS_CODE = require('../constants/httpStatusCodes')
const forgotPassword = require('../templates/forgotPassword')

const User = require('../models/User')

exports.register = (req, res) => {
  let newUser = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8)
  })

  newUser.save().then(user => {
    const tobeEncoded = { id: user._id }
    const token = jwt.sign(tobeEncoded, authConfig.authorization.jwt.secret, { expiresIn: authConfig.authorization.jwt.expiresIn })
    const response = {
      auth: true,
      token
    }

    res.status(HTTP_STATUS_CODE.CREATED).send(response)
  }, error => {
    let response = {
      auth: false,
      message: ''
    }

    if (error.code ===  11000) { // this error gets thrown only if similar user record already exist, move code to a config file or constant var
      response.message = 'user already exist!'

      return res.status(HTTP_STATUS_CODE.CONFLICT).send(response)
    } else {
      console.log(JSON.stringify(error, null, 2)); // you might want to do this to examine and trace where the problem is emanating from
      response.message = 'error signing up user'

      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(response)
    }
  })
}

exports.login = (req, res) => {
  let { username, password } = req.body
  User.findOne({ username }, 'username email password', (error, user) => {
    if (error) {
      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send({ message: 'Error on the server' })
    }

    if(!user) {
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).send({ auth: false, message: 'no user found with these credentials' })
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).send({ auth: false, message: 'invalid login credentials', token: null })
    }

    const tobeEncoded = { id: user._id }
    const token = jwt.sign(tobeEncoded, authConfig.authorization.jwt.secret, { expiresIn: authConfig.authorization.jwt.expiresIn })
    const response = {
      auth: true,
      token
    }

    return res.status(HTTP_STATUS_CODE.SUCCESS).send(response)
  })
}

exports.forgotPassword = (req, res) => {
  const username = req.body.email

  if (!username) {
    return res.status(HTTP_STATUS_CODE.BAD_REQUEST).send({ message: 'email is mandatory' })
  }

  User.findOne({ username }, (error, user) => {

    if (error) {
      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send({message: 'could not send reset code1'});
    }
    if (!user) {
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).send({ message: 'email not found' })
    }

    user.passResetKey = shortid.generate()
    user.passKeyExpires = new Date().getTime() + authConfig.authentication.resetAccount.expiresIn

    user.save().then(user => {
      let transporter = nodemailer.createTransport(mailConfig.options);
      let mailOptions = forgotPassword.getOptions(user.username, mailConfig.options.auth.user, user.passResetKey)

      transporter.sendMail(mailOptions, (error, response) => {
        if (error) {
          console.log("error:\n", error, "\n");
          return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send({ message: 'could not send reset code2' });
        } else {
          console.log("email sent:\n", response);
          return res.status(HTTP_STATUS_CODE.SUCCESS).send({ message: 'reset code sent' });
        }
      });
    })
  })
}

exports.resetPassword = (req, res) => {
  const { resetKey, newPassword } = req.body

  if (!resetKey || !newPassword) {
    return res.status(HTTP_STATUS_CODE.BAD_REQUEST).send({ message: 'reset key and password are mandatory' })
  }

  User.findOne({ passResetKey: resetKey }, (error, user) => {

    if (error) {
      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send({ message: 'error resetting your password' })
    }
    if (!user) {
      return  res.status(HTTP_STATUS_CODE.NOT_FOUND).send({ message: 'no user has been found with this key' })
    }

    const now = new Date().getTime()
    const keyExpiration = user.passKeyExpires

    if (keyExpiration > now) {
      user.password = bcrypt.hashSync(newPassword, 5)
      user.passResetKey = null // remove passResetKey from user's records
      user.keyExpiration = null

      user.save().then(user => { // save the new changes
        res.status(HTTP_STATUS_CODE.SUCCESS).send({ message: 'password reset successful' })
      }, (error) => {
        return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send({ message: 'error resetting your password' })
      })
    } else {
      res.status(HTTP_STATUS_CODE.BAD_REQUEST).send({ message: 'sorry, pass key has expired. Please initiate the request for a new one' })
    }
  })
}
