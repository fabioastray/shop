const HTTP_STATUS_CODE = require('../constants/httpStatusCodes')
const User = require('../models/User')

exports.me = (req, res, next) => {
  User.findById(req.userId, { password: 0 }, (error, user) => {
    if (error) return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send({ message: 'There was a problem finding the user' })
    if (!user) return res.status(HTTP_STATUS_CODE.NOT_FOUND).send({ message: 'No user found' })

    res.json({
      username: user.username,
      fullName: 'Fabio Campos',
      type: 'user',
      avatar: 'https://randomuser.me/api/portraits/men/85.jpg'
    })
  })
}
