const router = require('express').Router();

const { authenticated } = require('../middleware/middlewares');

const { newKey } = require('../controller');

router.get('/new', authenticated, newKey);

module.exports = router;
