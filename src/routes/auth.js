var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController')

router.post('/signup', )

router.post('/login', userController.login)

router.post('/forgot', userController.forgot);

router.post('/resetpass', userController.resetpass)

module.exports = router;
