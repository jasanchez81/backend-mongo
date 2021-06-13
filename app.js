'use strict'

var express = require('express');
var app = express();

//Express >= 4.16.0
app.use(express.json());
app.use(express.urlencoded());

//Carga de rutas
var userRoutes = require('./routes/user');

//Configuración de cabeceras y CORS

//Rutas base
app.use('/api', userRoutes);


module.exports = app;
