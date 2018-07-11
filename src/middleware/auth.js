const jwt = require('jsonwebtoken')
const config = require('../../config/auth')
const HTTP_STATUS_CODE = require('../constants/httpStatusCodes')

exports.verifyToken = (req, res, next) => {
  const token = req.headers[config.authorization.headerKey]

  if (!token) {
    return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).send({ auth: false, message: 'No token provided' })
  }

  jwt.verify(token, config.authorization.jwt.secret, (error, decoded) => {
    if (error) {
      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send({ auth: false, message: 'Failed to authenticate token' })
    }

    req.userId = decoded.id
    next()
  })
}