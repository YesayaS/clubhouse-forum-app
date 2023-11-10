var express = require("express");
var router = express.Router();

const loginController = require("../controllers/loginContoller");

/* GET home page. */
router.get("/", loginController.get);

router.post("/", loginController.post);

module.exports = router;
