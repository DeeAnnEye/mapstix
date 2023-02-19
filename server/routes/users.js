var express = require("express");
var router = express.Router();
const Redis = require("ioredis");
const redis = new Redis();
const { v4: uuidv4 } = require("uuid");

router.get("/", function (req, res, next) {
  redis.set("hiii", "hyyyy");
  res.send("respond with a resource");
});

router.get("/pic/, function(req,res,next) {
           // Extracting file extension
        var ext = path.extname(action);
 
        // Setting default Content-Type
        var contentType = "text/plain";
 
        // Checking if the extension of
        // image is '.png'
        if (ext === ".png") {
            contentType = "image/png";
        }
 
        // Setting the headers
        res.writeHead(200, {
            "Content-Type": contentType });
 
        // Reading the file
        fs.readFile(filePath,
            function (err, content) {
                // Serving the image
                res.end(content);
            });
           });

router.post("/login", async (req, res, next) => {
  const user = await redis.hgetall(req.body.username);
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

router.post("/signup", function (req, res, next) {
  const id = uuidv4();
  if (req.body.cPassword === req.body.password) {
    redis.hset(req.body.username, "id", id);
    redis.hset(req.body.username, "username", req.body.username);
    redis.hset(req.body.username, "email", req.body.email);
    redis.hset(req.body.username, "password", req.body.password);
    res.status(200).send({ success: true, message: "signup success" });
  } else {
    res
      .status(400)
      .send({ success: false, message: "Passwords do not match!" });
  }
});

module.exports = router;
