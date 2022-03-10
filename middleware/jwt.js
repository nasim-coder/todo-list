const jwt = require('jsonwebtoken');
const jwtconfig = require('../config/jwtconfig')
let verifyToken = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  try {
    const decoded = jwt.verify(token, jwtconfig.secret)
    req.user = decoded.user;
  } catch (err) {
    res.status(400).send("invalid token")
  }
  next();
};
module.exports = verifyToken;