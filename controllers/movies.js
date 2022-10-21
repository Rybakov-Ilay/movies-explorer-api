const Movie = require('../models/movie');

const { BadRequestError } = require('../erorrs/BadRequestError');
const { NotFoundError } = require('../erorrs/NotFoundError');
const { ForbiddenError } = require('../erorrs/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies)
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      err.name === 'ValidationError' // eslint-disable-line
        ? next(new BadRequestError('Переданы некорректные данные'))
        : next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id).then((movie) => {
    if (!movie) {
      return next(new NotFoundError('Фильм по указанному _id не найден'));
    }
    if (req.user._id === movie.owner._id.toString()) {
      Movie.findByIdAndRemove(movie._id.toString())
        .then((movie) => res.send(movie)) // eslint-disable-line
        .catch((err) => {
          err.name === 'CastError' // eslint-disable-line
            ? next(new BadRequestError('Переданы некорректные данные'))
            : next(err);
        });
    } else {
      next(new ForbiddenError('Нельзя удалить не свою карточку'));
    }
  })
    .catch(next);
};
