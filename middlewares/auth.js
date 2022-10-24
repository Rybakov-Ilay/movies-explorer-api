const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../erorrs/UnauthorizedError');
const { UNAUTHORIZED_MESSAGE, JWT_DEV_SECRET } = require('../utils/constants');

const { JWT_SECRET = JWT_DEV_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new UnauthorizedError(UNAUTHORIZED_MESSAGE));
  }
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError(UNAUTHORIZED_MESSAGE));
  }
  req.user = payload;
  return next();
};
