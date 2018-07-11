const jwt = require('jsonwebtoken')
const config = require('../../config/config')

exports.verifyToken = (req, res, next) => {
  const token = req.headers[config.authorization.headerKey]

  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided' })
  }

  jwt.verify(token, config.authorization.jwt.secret, (error, decoded) => {
    if (error) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token' })
    }

    req.userId = decoded.id
    next()
  })
}