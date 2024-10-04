const express = require('express');
require('express-async-errors');
const router = express.Router();
const usersController = require('../controllers/userController');

router.get('/users', usersController.users);

module.exports = router;
