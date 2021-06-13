const path = require('path');

require('dotenv').config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
});

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'local',
    DATABASE_URL : 'mongodb://localhost:27017/zoo',
    EXPRESS_PORT: process.env.EXPRESS_PORT || 3003,
    JWT_SECRET : process.env.JWT_SECRET || 'miSecretLocal'
}