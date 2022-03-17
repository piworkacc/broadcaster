var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/api/signin', (req, res) => {

});

router.post('/api/signup', (req, res) => {

});

router.get('/api/signout', (req, res) => {

});

router.get('/api/auth', (req, res) => {

});

module.exports = router;
