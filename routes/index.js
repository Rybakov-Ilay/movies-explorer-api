const router = require('express').Router();
const { login, createUser, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { NotFoundError } = require('../erorrs/NotFoundError');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const {
  validateAuthentication,
  validateLogin,
} = require('../utils/validations');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
router.post('/signin', validateLogin, login);
router.post('/signup', validateAuthentication, createUser);
router.get('/signout', logout);
router.use(auth);
router.use(usersRouter);
router.use(moviesRouter);
router.use((req, res, next) => next(new NotFoundError('По данному пути ничего нет')));

module.exports = router;
