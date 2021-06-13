'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');
const {EXPRESS_PORT, DATABASE_URL, NODE_ENV} =  config;

mongoose.connect(`${DATABASE_URL}`,{useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{
    console.log('La conexión a la bbdd Zoo se ha realizado correctamente...');
    app.listen(EXPRESS_PORT, ()=>{
        console.log(`Express se está ejecutando en el entorno "${NODE_ENV}", en el puerto ${EXPRESS_PORT}...`);
    });
})
.catch(err=>{
    console.log(err);
});