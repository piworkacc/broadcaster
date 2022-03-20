const router = require('express').Router();

const { authenticated } = require('../middleware/middlewares');

const {
  streams,
  userFinishedStreams,
  streamsSelection,
  sendStream,
  preview,
  addStream,
} = require('../controller');

router.get('/', streams);
router.get('/user/:userId', userFinishedStreams);
router.get('/selection/:amount', streamsSelection);
router.get('/:id', sendStream);
router.get('/:id/preview', preview);
router.post('/', authenticated, addStream);

module.exports = router;
