var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController')

router.get('/:userId', userController.findOne);

module.exports = router;
