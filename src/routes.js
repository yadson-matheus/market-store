const express = require('express');

const routes = express.Router();

const authMiddleware = require('./middlewares/auth');
const userValidationMiddleware = require('./middlewares/userValidation');

const UserController = require('./controllers/UserController');

// User routes.
routes.post('/authenticate', UserController.authenticate);
routes.post('/profile/create', UserController.add);
routes.post('/profile/modify', authMiddleware, userValidationMiddleware.edit, UserController.edit);

module.exports = routes;
