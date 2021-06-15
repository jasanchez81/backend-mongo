'use strict'

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

//Express >= 4.16.0
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

//Configuración de cabeceras y CORS
app.use(cors());

//Carga de rutas
const userRoutes = require('./routes/user');


//Rutas base
app.use('/api', userRoutes);

module.exports = app;


//const app.use(express.static('public'));