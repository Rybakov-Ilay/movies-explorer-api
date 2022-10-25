const router = require('express').Router();
const { login, createUser, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { NotFoundError } = require('../erorrs/NotFoundError');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { SERVER_CRASHED, PAGE_NOT_FOUND } = require('../utils/constants');
const {
  validateAuthentication,
  validateLogin,
} = require('../utils/validations');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(SERVER_CRASHED);
  }, 0);
});
router.post('/signin', validateLogin, login);
router.post('/signup', validateAuthentication, createUser);
router.use(auth);
router.get('/signout', logout);
router.use(usersRouter);
router.use(moviesRouter);
router.use((req, res, next) => next(new NotFoundError(PAGE_NOT_FOUND)));

module.exports = router;
