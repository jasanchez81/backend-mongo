'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/zoo',{useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{
    console.log('La conexión a la bbdd Zoo se ha realizado correctamente...');
    app.listen(port, ()=>{
        console.log('El servidor node local y express se está ejecutando correctamente...');
    });
})
.catch(err=>{
    console.log(err);
});