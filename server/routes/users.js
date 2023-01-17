var express = require('express');
var router = express.Router();
const Redis = require('ioredis');

const redis = new Redis();


/* GET users listing. */
router.get('/', function(req, res, next) {
  redis.set("hiii","hyyyy");
  res.send('respond with a resource');
});

module.exports = router;
