var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:userId', function(req, res, next) {
  res.send({
    fullName: 'Fabio Campos',
    type: 'user',
    avatar: 'https://randomuser.me/api/portraits/men/85.jpg'
  })
});

module.exports = router;
