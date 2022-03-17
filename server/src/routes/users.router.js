const router = require('express').Router();
const { authenticated } = require('../middleware/middlewares');

const {
  addUser, login, logout, auth,
} = require('../controller');

router.route('/users').post(addUser);
router.route('/users/login').post(login);
router.route('/users/logout').get(logout);
router.route('/users/auth').get(authenticated, auth);

module.exports = router;
