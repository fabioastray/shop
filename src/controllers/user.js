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

// exports.resetpass = (req, res) => {
//   let {resetKey, newPassword} = req.body
//   User.find({passResetKey: resetKey}, (err, userData) => {
//     if (!err) {
//       let now = new Date().getTime();
//       let keyExpiration = userDate.passKeyExpires;
//       if (keyExpiration > now) {
//         userData.password = bcrypt.hashSync(newPassword, 5);
//         userData.passResetKey = null; // remove passResetKey from user's records
//         userData.keyExpiration = null;
//         userData.save().then(err => { // save the new changes
//           if (!err) {
//             res.status(200).send('Password reset successful')
//           } else {
//             res.status(500).send('error resetting your password')
//           }
//         })
//       } else {
//         res.status(400).send('Sorry, pass key has expired. Please initiate the request for a new one');
//       }
//     } else {
//       res.status(400).send('invalid pass key!');
//     }
//   })
// }