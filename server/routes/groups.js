var express = require("express");
var router = express.Router();
const Redis = require("ioredis");
const redis = new Redis();
const { v4: uuidv4 } = require("uuid");
const multer  = require('multer')
const upload = multer({ dest: './public/uploads' })


router.post("/create",upload.single('groupAvatar'), function (req, res, next) {
    const id = uuidv4();
    console.log(req.file, req.body)
    // if (req.body.cPassword === req.body.password) {
    //   redis.hset(req.body.username, "id", id);
    //   redis.hset(req.body.username, "username", req.body.username);
    //   redis.hset(req.body.username, "email", req.body.email);
    //   redis.hset(req.body.username, "password", req.body.password);
    //   res.status(200).send({ success: true, message: "signup success" });
    // } else {
    //   res
    //     .status(400)
    //     .send({ success: false, message: "Passwords do not match!" });
    // }
  });





module.exports = router;