const router = require('express').Router();

const { authenticated } = require('../middleware/middlewares');

const { newKey, latestStreamKey } = require('../controller');

router.get('/new', authenticated, newKey);
router.get('/latest', authenticated, latestStreamKey);

module.exports = router;
