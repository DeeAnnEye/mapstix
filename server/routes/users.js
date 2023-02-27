var express = require("express");
var router = express.Router();
const Redis = require("ioredis");
const redis = new Redis();
const { v4: uuidv4 } = require("uuid");

router.get("/", function (req, res, next) {
  redis.set("hiii", "hyyyy");
  res.send("respond with a resource");
});

router.post("/login", async (req, res, next) => {
  const userId = "user:"+req.body.phone;
  const user = await redis.hgetall(userId);
  // console.log(user)
  if (user.password != req.body.password) {
    res.status(400).send({
      success: false,
      message: "login failed",
    });
  } else {
    res.status(200).send({
      success: true,
      message: "login success",
      userId: user.id,
      userName: user.username,
    });
  }
});

router.get("/findUsers/:phone", async (req, res, next) => {
  const phone = req.params.phone;
  const userId = "user:" + phone;
  const users = await redis.hgetall(userId);
  // console.log(group)
  res
    .status(200)
    .send({ success: true, message: "group found", users: users });
});

router.post("/signup", function (req, res, next) {
  const id = uuidv4();
  const userId = "user:"+req.body.phone;
  if (req.body.cPassword === req.body.password) {
    redis.hset(userId, "id", id);
    redis.hset(userId, "username", req.body.username);
    redis.hset(userId, "email", req.body.email);
    redis.hset(userId, "password", req.body.password);
    redis.hset(userId, "phone", "+"+req.body.callingCode + " " +req.body.phone);
    res.status(200).send({
      success: true,
      message: "signup success",
      userId: id,
      userName: req.body.username,
    });
  } else {
    res
      .status(400)
      .send({ success: false, message: "Passwords do not match!" });
  }
});

module.exports = router;
