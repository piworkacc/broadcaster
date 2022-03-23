const router = require('express').Router();

const { authenticated } = require('../middleware/middlewares');

const { getStreamLikes, postLike } = require('../controller');

router.get('/:stream_id', getStreamLikes);

router.post('/newlike', authenticated, postLike);

module.exports = router;
