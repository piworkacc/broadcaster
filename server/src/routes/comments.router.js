const router = require('express').Router();

const { authenticated } = require('../middleware/middlewares');

const { comments, addComment } = require('../controller');

router.get('/:videoId', comments);
router.post('/', authenticated, addComment);

module.exports = router;
