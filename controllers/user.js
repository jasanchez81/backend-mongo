'use strict'

//modulos
var bcrypt = require('bcrypt-nodejs');

//servicio jwt
var jwt = require('../services/jwt');

//modelos
var User = require('../models/user');

//acciones
function saveUser(req, res) {
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

        User.findOne({ email: user.email.toLowerCase() }, (err, issetUser) => {
            if (err) {
                res.status(500).send({ message: 'Error al comprobar el usuario.' });
            } else {
                if (!issetUser) {
                    //Ciframos la contraseña
                    bcrypt.hash(params.password, null, null, (err, hash) => {
                        user.password = hash;
                        //Guardamos el usuario en bbdd . mongoose
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

function login(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password;

    User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
            res.status(500).send({ message: 'Error al comprobar el usuario.' });
        } else {
            if (user) {
                bcrypt.compare(password, user.password, (err, check) => {
                    if (check) {
                        //Comprobamos y generamos el token
                        if (params.getToken) {
                            //devolver el token
                            res.status(200).send({ token: jwt.createToken(user) });
                        } else {
                            res.status(200).send({ user });
                        }
                    }else{
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
    login
}