const bcrypt = require("bcrypt")
// define db schemas
const User = require('../models/User')

/* POST User Signs up */
exports.signup = (req, res) => {
  let newUser = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 5)
  })

  newUser.save().then(user => {
      console.log('user', user)
      res.status(201).send(user)
  }, err => {
    console.log('err', err)
    if (err.code ===  11000) { // this error gets thrown only if similar user record already exist.
      return res.status(409).send('user already exist!')
    } else {
      console.log(JSON.stringify(err, null, 2)); // you might want to do this to examine and trace where the problem is emanating from
      return res.status(500).send('error signing up user')
    }
  })
}

/* POST User Logs in */
exports.login = (req, res) => {
  let { username, password } = req.body
  User.findOne({ username }, 'username email password', (err, userData) => {
    if (err) {
      res.status(401).send('invalid login credentials')
    } else {

    }
  })
}

/*
4. Password reset
=================
We shall be using two endpoints to implement password reset functionality
*/
exports.forgot = (req, res) => {
  let {email} = req.body; // same as let email = req.body.email
  User.findOne({email: email}, (err, userData) => {
    if (!err) {
      userData.passResetKey = shortid.generate();
      userData.passKeyExpires = new Date().getTime() + 20 * 60 * 1000 // pass reset key only valid for 20 minutes
      userData.save().then(err => {
        if (!err) {
          // configuring smtp transport machanism for password reset email
          let transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            auth: {
              user: '', // your gmail address
              pass: '' // your gmail password
            }
          });
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
    } else {
      res.status(400).send('email is incorrect');
    }
  })
}

exports.resetpass = (req, res) => {
  let {resetKey, newPassword} = req.body
  User.find({passResetKey: resetKey}, (err, userData) => {
    if (!err) {
      let now = new Date().getTime();
      let keyExpiration = userDate.passKeyExpires;
      if (keyExpiration > now) {
        userData.password = bcrypt.hashSync(newPassword, 5);
        userData.passResetKey = null; // remove passResetKey from user's records
        userData.keyExpiration = null;
        userData.save().then(err => { // save the new changes
          if (!err) {
            res.status(200).send('Password reset successful')
          } else {
            res.status(500).send('error resetting your password')
          }
        })
      } else {
        res.status(400).send('Sorry, pass key has expired. Please initiate the request for a new one');
      }
    } else {
      res.status(400).send('invalid pass key!');
    }
  })
}

exports.findOne = (req, res, next) => {
  res.json({
    fullName: 'Fabio Campos',
    type: 'user',
    avatar: 'https://randomuser.me/api/portraits/men/85.jpg'
  })
}