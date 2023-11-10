var express = require("express");
var router = express.Router();

const postController = require("../controllers/postController");

router.get("/create", postController.create_get);
router.post("/create", postController.create_post);
router.post("/:id/delete", postController.delete_post);

module.exports = router;
