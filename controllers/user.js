'use strict'

//modulos
const bcrypt = require('bcrypt-nodejs');

//servicio jwt
const jwtService = require('../services/jwt');

//package jsonwebtoken
const jwtToken = require('jsonwebtoken');

const config = require('../config');
const { JWT_SECRET } = config;


//modelos
const User = require('../models/user');
const { urlencoded } = require('express');

//acciones
function prueba(req,res){
    res.status(200).send({ message: 'Pruebas del controlador.' });
}

function saveUser(req, res){
    //Creamos una instancia User
    var user = new User();

    //Recogemos el body de la petición
    var params = req.body;

    //Comprobamos si llega la password
    if (params.password && params.name && params.surname && params.email) {
        //Asignamos valores a la instancia de usuario
        user.name = params.name;
        user.surname = params.surname;
        user.email = params.email;
        user.role = 'ROLE_USER';
        user.image = null;
        user.refreshToken = [];

        User.findOne({ email: user.email.toLowerCase() }, (err, issetUser) => {
            if (err) {
                res.status(500).send({ message: 'Error al comprobar el usuario.' });
            } else {
                if (!issetUser) {
                    //Ciframos la contraseña
                    bcrypt.hash(params.password, null, null, (err, hash) => {
                        user.password = hash;

                        //Guardamos el refresh token en el usuario
                        // user.refreshToken.push(jwtService.generateRefreshToken(res));

                        //Guardamos el usuario en bbdd. mongoose
                        user.save((err, userStored) => {
                            if (err) {
                                res.status(500).send({ message: 'Error al guardar el usuario.' });
                            } else {
                                if (!userStored) {
                                    res.status(400).send({ message: 'No se ha registrado al usuario.' });
                                } else {
                                    res.status(200).send({ user: userStored });
                                }
                            }
                        })
                    })
                } else {
                    res.status(200).send({ message: 'El usuario ya existe en la bbdd.' });
                }
            }
        })
    } else {
        res.status(200).send({ message: 'Introduce los datos correctamente para poder registrar al usuario en bbdd.' });
    }
}

function login(req, res){
    const params = req.body;
    const email = params.email;
    const password = params.password;

    User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
            res.status(500).send({ message: 'Error al comprobar el usuario.' });
        } else {
            if (user) {
                bcrypt.compare(password, user.password, (err, check) => {
                    if (check) {

                        //Guardamos el refresh token en el usuario
                        user.refreshToken.push(jwtService.createToken(user));

                        //Guardamos el usuario en bbdd. mongoose
                        user.save((err, userStored) => {
                            if (err) {
                                res.status(500).send({ message: 'Error al guardar el usuario.' });
                            } else {
                                if (!userStored) {
                                    res.status(400).send({ message: 'No se ha registrado al usuario.' });
                                } else {
                                    res.status(200).send({ user: userStored });
                                }
                            }
                        })

                        //Comprobamos y generamos el token
                        // res.status(200).send(jwtService.createToken(user));

                        // if (params.getToken) {
                        //     //devolver el token
                        //     res.status(200).send({ message: 'Autenticación correcta.', token: token });
                        // } else {
                        //     res.status(200).send({ user });
                        // }
                    } else {
                        res.status(404).send({ message: 'El usuario no ha podido loguearse correctamente.' });
                    }
                });
            } else {
                res.status(404).send({ message: 'El usuario no ha podido loguearse.' });
            }
        }
    });
}


module.exports = {
    saveUser,
    login,
    prueba
}