const express = require('express');
require('express-async-errors');
const router = express.Router();
const usersController = require('../controllers/userController');
const authenticateToken = require('../middlewares/auth');


router.get('/users', usersController.users);
router.post('/signUp', usersController.signUp);
router.post('/signIn', usersController.signIn);
router.get('/profile', authenticateToken, usersController.profile);

module.exports = router;
