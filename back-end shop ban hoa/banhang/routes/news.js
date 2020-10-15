var express = require('express');
var router = express.Router();
const newsController = require("../controllers/news");



router.post("/", newsController.create);
router.get("/:id", newsController.get);
router.post("/getAll", newsController.getAll);
router.put("/:id", newsController.update);
router.delete("/:id", newsController.delete);

module.exports = router;
