const router = require('express').Router();

const { authenticated } = require('../middleware/middlewares');

const { comments } = require('../controller');

router.get('/:videoId', comments);
router.post('/', authenticated, comments);

module.exports = router;
