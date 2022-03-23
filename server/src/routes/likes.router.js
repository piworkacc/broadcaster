const router = require('express').Router();

const { getStreamLikes, postLike } = require('../controller');

router.get('/:stream_id', getStreamLikes);

router.post('/newlike', postLike);

module.exports = router;
