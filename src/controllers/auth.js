const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../../config/config')
const HTTP_STATUS_CODE = require('../constants/httpStatusCodes')

const User = require('../models/User')

exports.register = (req, res) => {
  let newUser = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8)
  })

  newUser.save().then(user => {
    const tobeEncoded = { id: user._id }
    const token = jwt.sign(tobeEncoded, config.authorization.jwt.secret, { expiresIn: config.authorization.jwt.expiresIn })
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
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).send({ auth: false, message: 'no user found with credentials provided' })
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).send({ auth: false, message: 'invalid login credentials', token: null })
    }

    const tobeEncoded = { id: user._id }
    const token = jwt.sign(tobeEncoded, config.authorization.jwt.secret, { expiresIn: config.authorization.jwt.expiresIn })
    const response = {
      auth: true,
      token
    }

    return res.status(HTTP_STATUS_CODE.SUCCESS).send(response)
  })
}