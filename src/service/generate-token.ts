const jwt = require('jsonwebtoken');

export function generateAccessToken(name) {
  return jwt.sign(name, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'});
}

export  function generateRefreshToken(id) {
  return jwt.sign(id, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});
}