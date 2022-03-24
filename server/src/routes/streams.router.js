const router = require('express').Router();
const fileUpload = require('express-fileupload');

const { authenticated } = require('../middleware/middlewares');

const {
  streams,
  userFinishedStreams,
  streamsSelection,
  sendStream,
  preview,
  addStream,
} = require('../controller');

router.use(fileUpload());
router.get('/', streams);
router.get('/user/:userId', userFinishedStreams);
router.get('/selection/:amount', streamsSelection);
router.get('/:id', sendStream);
router.get('/:id/preview', preview);
router.post('/', authenticated, addStream);

module.exports = router;
