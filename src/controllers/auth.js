const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const shortid = require('shortid')
const nodemailer = require('nodemailer')
const authConfig = require('../../config/auth')
const mailConfig = require('../../config/mail')
const HTTP_STATUS_CODE = require('../constants/httpStatusCodes')

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
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).send({ auth: false, message: 'no user found with this credentials' })
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

exports.forgot = (req, res) => {
  let {email} = req.body; // same as let email = req.body.email

  User.findOne({ username: email }, (error, user) => {
    if (error) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).send({ message: 'email is incorrect' })
    }

    if (!user) {
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).send({ message: 'email not found' })
    }

    user.passResetKey = shortid.generate()
    user.passKeyExpires = new Date().getTime() + authConfig.authentication.resetAccount.expiresIn

    user.save().then(error => {
      if (!error) {
        // configuring SMTP transport mechanism for password reset email
        let transporter = nodemailer.createTransport(mailConfig);
        let mailOptions = {
          subject: `NodeAuthTuts | Password reset`,
          to: email,
          from: `NodeAuthTuts <yourEmail@gmail.com>`,
          html: `
              <h1>Hi,</h1>
              <h2>Here is your password reset key</h2>
              <h2><code contenteditable="false" style="font-weight:200;font-size:1.5rem;padding:5px 10px; background: #EEEEEE; border:0">${passResetKey}</code></h4>
              <p>Please ignore if you didn't try to reset your password on our platform</p>
            `
        };
        try {
          transporter.sendMail(mailOptions, (error, response) => {
            if (error) {
              console.log("error:\n", error, "\n");
              res.status(500).send("could not send reset code");
            } else {
              console.log("email sent:\n", response);
              res.status(200).send("Reset Code sent");
            }
          });
        } catch (error) {
          console.log(error);
          res.status(500).send("could not sent reset code");
        }
      }
    })
  })
}
