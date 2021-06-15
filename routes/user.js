'use strict'

const express = require('express');
const UserController = require('../controllers/user');
const api = express.Router();
const tokenValidator = require('../middlewares/tokenValidator');

api.post('/register', UserController.saveUser);
api.post('/users/authenticate', UserController.login);

api.get('/pruebas', tokenValidator, UserController.prueba);


module.exports = api;