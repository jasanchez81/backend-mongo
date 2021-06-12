'use strict'

var express = require('express');
var app = express();

//Carga de rutas

//Express >= 4.16.0
app.use(express.json());
app.use(express.urlencoded());

//Configuración de cabeceras y CORS

//Rutas base

module.exports = app;
