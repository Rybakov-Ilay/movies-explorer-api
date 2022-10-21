const router = require('express').Router();
const { getMovies, createMovie, deleteMovie, } = require('../controllers/movies');
const { validateMovieDelete, validateMovie } = require("../utils/validations");

router.get('/movies', getMovies);
router.delete('/movies/:_id', validateMovieDelete, deleteMovie);
router.post('/movies', validateMovie, createMovie);

module.exports = router;
