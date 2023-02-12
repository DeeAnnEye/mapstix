var express = require("express");
var router = express.Router();
const Redis = require("ioredis");
const redis = new Redis();
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const upload = multer({ dest: "./public/uploads" });

router.get("/findgroups", function (req, res, next) {
  // res.status(200).send({ success: true, message: "group found" });
});

router.post("/create", upload.single("groupAvatar"), function (req, res, next) {
  const id = uuidv4();
  const group_id = "group:" + id;
  const { groupName, admin_id } = req.body;
  const member = [];
  member.push(admin_id);

  redis.hset(group_id, "group_id", id);
  redis.hset(group_id, "group_name", groupName);
  redis.hset(group_id, "admin_id", admin_id);
  redis.hset(group_id, "group_avatar", req.file.filename + ".jpg");
  redis.hset(group_id, "members", member);
  res.status(200).send({ success: true, message: "group created" });
});

module.exports = router;
