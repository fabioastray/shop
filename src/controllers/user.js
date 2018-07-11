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

// exports.forgot = (req, res) => {
//   let {email} = req.body; // same as let email = req.body.email
//   User.findOne({email: email}, (err, userData) => {
//     if (!err) {
//       userData.passResetKey = shortid.generate();
//       userData.passKeyExpires = new Date().getTime() + 20 * 60 * 1000 // pass reset key only valid for 20 minutes
//       userData.save().then(err => {
//         if (!err) {
//           // configuring smtp transport machanism for password reset email
//           let transporter = nodemailer.createTransport({
//             service: "gmail",
//             port: 465,
//             auth: {
//               user: '', // your gmail address
//               pass: '' // your gmail password
//             }
//           });
//           let mailOptions = {
//             subject: `NodeAuthTuts | Password reset`,
//             to: email,
//             from: `NodeAuthTuts <yourEmail@gmail.com>`,
//             html: `
//                 <h1>Hi,</h1>
//                 <h2>Here is your password reset key</h2>
//                 <h2><code contenteditable="false" style="font-weight:200;font-size:1.5rem;padding:5px 10px; background: #EEEEEE; border:0">${passResetKey}</code></h4>
//                 <p>Please ignore if you didn't try to reset your password on our platform</p>
//               `
//           };
//           try {
//             transporter.sendMail(mailOptions, (error, response) => {
//               if (error) {
//                 console.log("error:\n", error, "\n");
//                 res.status(500).send("could not send reset code");
//               } else {
//                 console.log("email sent:\n", response);
//                 res.status(200).send("Reset Code sent");
//               }
//             });
//           } catch (error) {
//             console.log(error);
//             res.status(500).send("could not sent reset code");
//           }
//         }
//       })
//     } else {
//       res.status(400).send('email is incorrect');
//     }
//   })
// }
//
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
//
// exports.logout = (req, res) => {
//   delete req.session.user
//   req.session.destroy()
//   res.status(200).send('logout successful')
// }