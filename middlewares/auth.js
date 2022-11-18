const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../erorrs/UnauthorizedError');
const { UNAUTHORIZED_MESSAGE, JWT_DEV_SECRET } = require('../utils/constants');

const { JWT_SECRET = JWT_DEV_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(UNAUTHORIZED_MESSAGE);
  }
  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError(UNAUTHORIZED_MESSAGE));
  }
  req.user = payload;
  return next();
};
