var express = require("express");
const bcrypt = require("bcryptjs");
var router = express.Router();

const signupController = require("../controllers/signupController");

/* GET home page. */
router.get("/", signupController.get);

router.post("/", signupController.post);

module.exports = router;
