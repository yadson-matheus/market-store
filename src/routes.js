const express = require('express');

const routes = express.Router();

const authMiddleware = require('./middlewares/auth');

const UserController = require('./controllers/UserController');

// User routes.
routes.post('/authenticate', UserController.authenticate);
routes.post('/user', UserController.add);
routes.post('/user/:id', authMiddleware, UserController.edit);

module.exports = routes;
