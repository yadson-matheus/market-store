const express = require('express');

const routes = express.Router();

const authMiddleware = require('./middlewares/auth');

const UserValidator = require('./validators/UserValidator');

const UserController = require('./controllers/UserController');

// User routes.
routes.post('/authenticate', UserController.authenticate);
routes.post('/profile/create', UserController.add);
routes.post('/profile/modify', authMiddleware, UserValidator.edit, UserController.edit);

module.exports = routes;
