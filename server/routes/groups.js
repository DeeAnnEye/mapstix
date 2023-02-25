var express = require("express");
var router = express.Router();
const Redis = require("ioredis");
const redis = new Redis();
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const upload = multer({ dest: "./public/images"});

router.get("/findgroups/:id", async (req, res, next) => {
  const id = req.params.id;
  const user_group = "user_group:" + id;
  var temp = [];
  const groups = await redis.lrange(user_group, 0, -1);
  for (var i = 0; i < groups.length; i++) {
    const group_id = "group:" + groups[i];
    const group = await redis.hgetall(group_id);
    temp.push(group);
  }
  res
    .status(200)
    .send({ success: true, message: "group created", groups: temp });
});

router.get("/getgroup/:id", async (req, res, next) => {
  const id = req.params.id;
  const groupId = "group:" + id;
  const group = await redis.hgetall(groupId);
  // console.log(group)
  res
    .status(200)
    .send({ success: true, message: "group found", group: group });
});

router.post("/create", upload.single("groupAvatar"), async (req, res, next) => {
  const id = uuidv4();
  const group_id = "group:" + id;
  const { groupName, admin_id } = req.body;
  const user_group = "user_group:" + admin_id;
  const group_members = "group_members:" + id;

  redis.hset(group_id, "group_id", id);
  redis.hset(group_id, "group_name", groupName);
  redis.hset(group_id, "admin_id", admin_id);
  redis.hset(group_id, "group_avatar", "http://192.168.1.6:3000/public/images/"+req.file.filename);

  await redis.lpush(group_members, admin_id);
  await redis.lpush(user_group, id);

  res.status(200).send({ success: true, message: "group created" });
});

module.exports = router;
