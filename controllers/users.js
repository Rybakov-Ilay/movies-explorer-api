const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const { NotFoundError } = require('../erorrs/NotFoundError');
const { BadRequestError } = require('../erorrs/BadRequestError');
const { ConflictError } = require('../erorrs/ConflictError');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      !user // eslint-disable-line
        ? next(new NotFoundError('Пользователь по указанному _id не найден'))
        : res.send({ // eslint-disable-line
          email: user.email,
          name: user.name,
        });
    })
    .catch((err) => {
      err.name === 'CastError' // eslint-disable-line
        ? next(new BadRequestError('Переданы некорректные данные'))
        : next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10).then((hashPass) =>
    User.create({ // eslint-disable-line
      name,
      email,
      password: hashPass,
    })
      .then((user) =>
        res.send({ // eslint-disable-line
          email: user.email,
          name: user.name,
        })).catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else next(err);
    })).catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id }, // eslint-disable-line
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        },
        // 'Domain=mesto.ilya.nomoredomains.icu'
      ).send({ token: req.cookies.jwt });
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  res.clearCookie('jwt').send({ message: 'Выход' }).catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  const id = req.user._id;

  User.findOneAndUpdate(
    { _id: id }, // eslint-disable-line
    { name: name, email: email }, // eslint-disable-line
    { new: true, runValidators: true },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      err.name === 'ValidationError' // eslint-disable-line
        ? next(new BadRequestError('Переданы некорректные данные'))
        : next(err);
    });
};
