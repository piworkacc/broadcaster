const router = require('express').Router();

const { streams, userFinishedStreams } = require('../controller');

router.get('/', streams);
router.get('/user/:userId', userFinishedStreams);

module.exports = router;
