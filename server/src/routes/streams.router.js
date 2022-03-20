const router = require('express').Router();

const {
  streams,
  userFinishedStreams,
  streamsSelection,
  sendStream,
  preview,
} = require('../controller');

router.get('/', streams);
router.get('/user/:userId', userFinishedStreams);
router.get('/selection/:amount', streamsSelection);
router.get('/:id', sendStream);
router.get('/:id/preview', preview);

module.exports = router;
