const router = require('express').Router();

const {
  streams,
  userFinishedStreams,
  streamsSelection,
  sendStream,
} = require('../controller');

router.get('/', streams);
router.get('/user/:userId', userFinishedStreams);
router.get('/selection/:amount', streamsSelection);
router.get('/:id', sendStream);

module.exports = router;
