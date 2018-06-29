var express = require('express');
var router = express.Router();

// define db schemas
const User = require('../models/user')

/* GET users listing. */
router.get('/users/:userId', function(req, res, next) {
  res.json({
    fullName: 'Fabio Campos',
    type: 'user',
    avatar: 'https://randomuser.me/api/portraits/men/85.jpg'
  })
});

/* POST User Logs in */
router.post('/login', (req, res) => {
  let { username, password } = req.body
  // res.json(req.body)
  User.findOne({ username }, 'username email password', (err, userData) => {
      if (err) {
        res.status(401).send('invalid login credentials')
      } else {

      }
  })
})

module.exports = router;
