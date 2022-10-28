const router = require('express').Router();
const { getUser, updateProfile } = require('../controllers/users');
const { validateUpdateProfile } = require('../utils/validations');

router.get('/users/me', getUser);
router.patch('/users/me', validateUpdateProfile, updateProfile);

module.exports = router;
