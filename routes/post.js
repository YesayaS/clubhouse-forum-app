var express = require("express");
var router = express.Router();

const postController = require("../controllers/postController");

router.get("/", postController.get);

router.post("/", postController.post);

module.exports = router;
