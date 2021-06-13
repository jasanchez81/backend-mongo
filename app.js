'use strict'

const express = require('express');
const app = express();

//Express >= 4.16.0
app.use(express.json());
app.use(express.urlencoded());

//Carga de rutas
const userRoutes = require('./routes/user');

//Configuración de cabeceras y CORS

//Rutas base
app.use('/api', userRoutes);

module.exports = app;


/*
const jwt = require('jsonwebtoken')
const tokenList = {}
const app.use(express.static('public'));
*/