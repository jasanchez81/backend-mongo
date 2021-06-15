'use strict'

// const jwt = require('jwt-simple');
// const moment = require('moment');

const jwt = require('jsonwebtoken');
const config = require('../config');
const { JWT_SECRET, JWT_REFRESH_SECRET, TOKEN_LIFE, REFRESH_TOKEN_LIFE } = config;


exports.createToken = function (user) {
    // const payload = {
    //     iat : moment().unix(),
    //     exp : moment().add(30, 'days').unix()
    // }
    let payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_LIFE})
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_LIFE});

    const response = {
        "status": "Logged in",
        "token": token,
        "refreshToken": refreshToken
    }
    return response;

    // return jwt.sign(payload, JWT_SECRET, {
    //     // create token that expires in 15 minutes
    //     // expiresIn: Math.round(new Date(Date.now() + 15 * 60 * 1000).getTime() / 1000)
    //     expiresIn: TOKEN_LIFE
    // });
    // return jwt.encode(payload, JWT_SECRET);
}

exports.generateRefreshToken = function (res) {
    const token = new Date().getTime().toString();
    // add token cookie that expires in 7 days
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    // const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
    // res.cookie = `refreshToken=${token}; expires=${expires}; path=/`;

    return res.cookie('token', token, {
        expires: expires,
        secure: false, // set to true if your using https
        httpOnly: false,
    });
}
