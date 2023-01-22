var express = require('express');
var router = express.Router();
const Redis = require('ioredis');

const redis = new Redis();


router.get('/', function(req, res, next) {
  redis.set("hiii","hyyyy");
  res.send('respond with a resource');
});

router.post('/userlogin', function(req, res, next) {
  redis.hset(req.body.username,"email",req.body.email);
  redis.hset(req.body.username,"password",req.body.password);
  console.log("success")
  res.status(200).send('login success');
});

module.exports = router;
