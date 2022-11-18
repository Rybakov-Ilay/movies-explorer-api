const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const { NotFoundError } = require('../erorrs/NotFoundError');
const { BadRequestError } = require('../erorrs/BadRequestError');
const { ConflictError } = require('../erorrs/ConflictError');
const {
  JWT_DEV_SECRET,
  CONFLICT_MESSAGE,
  BAD_REQUEST_MESSAGE,
  NOT_FOUND_MESSAGE,
  EXIT,
} = require('../utils/constants');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError(NOT_FOUND_MESSAGE));
      }
      res.send({
        email: user.email,
        name: user.name,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST_MESSAGE));
      }
      return next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10).then((hashPass) => {
    User.create({
      name,
      email,
      password: hashPass,
    })
      .then((user) => {
        res.send({
          email: user.email,
          name: user.name,
        });
      }).catch((err) => {
        if (err.code === 11000) {
          next(new ConflictError(CONFLICT_MESSAGE));
        } else if (err.name === 'ValidationError') {
          next(new BadRequestError(BAD_REQUEST_MESSAGE));
        } else next(err);
      });
  }).catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV_SECRET,
        { expiresIn: '7d' },
      );

      res.cookie(
        'jwt',
        token,
        { maxAge: 3600000 * 24 * 7, sameSite: true }, // httpOnly: true
      ).send({ token });
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  res.clearCookie('jwt').send({ message: EXIT }).catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  const id = req.user._id;

  User.findOneAndUpdate(
    { _id: id },
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_MESSAGE));
      }
      if (err.code === 11000) {
        next(new ConflictError(CONFLICT_MESSAGE));
      }
      return next(err);
    });
};
