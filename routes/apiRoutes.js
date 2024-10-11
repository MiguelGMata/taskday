const express = require('express');
require('express-async-errors');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');
const usersController = require('../controllers/userController');
const tasksController = require('../controllers/taskController');
const listController = require('../controllers/listController');
const cardController = require('../controllers/cardController');


// User routes
router.get('/users', usersController.users);
router.post('/signUp', usersController.signUp);
router.post('/signIn', usersController.signIn);
router.get('/profile', authenticateToken, usersController.profile);

// Task routes
router.post('/tasks', authenticateToken, tasksController.createTask);
router.get('/tasks', authenticateToken, tasksController.getTasksByUser);
router.get('/tasks/:id', authenticateToken, tasksController.getTaskById);
router.put('/tasks/:id', authenticateToken, tasksController.updateTask);
router.delete('/tasks/:id', authenticateToken, tasksController.deleteTask);

// List routes
router.post('/lists', authenticateToken, listController.createList);
router.get('/tasks/:taskId/lists', authenticateToken, listController.getListsByTask);
router.get('/lists/:id', authenticateToken, listController.getListById);
router.put('/lists/:id', authenticateToken, listController.updateList);
router.delete('/lists/:id', authenticateToken, listController.deleteList);

//Card routes
router.post('/cards', authenticateToken, cardController.createCard);
router.get('/lists/:listId/cards', authenticateToken, cardController.getCardsByList);
router.get('/cards/:id', authenticateToken, cardController.getCardById);
router.put('/cards/:id', authenticateToken, cardController.updateCard);
router.delete('/cards/:id', authenticateToken, cardController.deleteCard);

module.exports = router;
