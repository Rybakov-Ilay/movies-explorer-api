const Movie = require('../models/movie');

const { BadRequestError } = require('../erorrs/BadRequestError');
const { NotFoundError } = require('../erorrs/NotFoundError');
const { ForbiddenError } = require('../erorrs/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
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
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм не найден');
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Вы не можете удалить чужой фильм');
      } else {
        Movie.findByIdAndRemove(req.params._id)
          .then((film) => {
            res.send(film);
          })
          .catch((err) => {
            if (err.name === 'CastError') {
              return next(new BadRequestError('Переданы некорректные данные'));
            }
            return next(err);
          });
      }
    })
    .catch(next);
};
