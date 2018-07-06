const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const config = require('../../config/config')

const User = require('../models/User')

exports.register = (req, res) => {
  let newUser = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8)
  })

  newUser.save().then(user => {
    const tobeEncoded = { id: user._id }
    const token = jwt.sign(tobeEncoded, config.jwt.secret, { expiresIn: config.jwt.expiresIn })
    const response = {
      auth: true,
      token
    }

    res.status(201).send(response)
  }, err => {
    let response = {
      auth: false,
      message: ''
    }

    if (err.code ===  11000) { // this error gets thrown only if similar user record already exist.
      response.message = 'user already exist!'

      return res.status(409).send(response)
    } else {
      console.log(JSON.stringify(err, null, 2)); // you might want to do this to examine and trace where the problem is emanating from
      response.message = 'error signing up user'

      return res.status(500).send(response)
    }
  })
}