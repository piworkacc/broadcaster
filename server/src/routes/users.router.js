const router = require('express').Router();
const { authenticated } = require('../middleware/middlewares');

const {
  addUser, login, logout, auth,
} = require('../controller');

router.route('/').post(addUser);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/auth').get(authenticated, auth);

module.exports = router;
