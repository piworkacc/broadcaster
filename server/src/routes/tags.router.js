const router = require('express').Router();

const { getTags } = require('../controller');

router.get('/', getTags);

module.exports = router;
