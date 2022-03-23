const router = require('express').Router();

const { authenticated } = require('../middleware/middlewares');

const { getStreamLikes, postLike } = require('../controller/likes.controller');

router.get('/:stream_id', getStreamLikes);

router.post('/', authenticated, postLike);

module.exports = router;
