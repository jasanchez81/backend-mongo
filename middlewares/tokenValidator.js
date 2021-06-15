const jwt = require('jsonwebtoken');
const config = require('../config');
const { JWT_SECRET } = config;


module.exports = function(req,res,next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  console.log(token)
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, JWT_SECRET, function(err, decoded) {
        if (err) {
            return res.json({"error": true, "message": 'Failed to authenticate token.' });
        }
      req.decoded = decoded;
      next();
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
        "error": true,
        "message": 'No token provided.'
    });
  }
}