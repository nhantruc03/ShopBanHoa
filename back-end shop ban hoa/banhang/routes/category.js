var express = require('express');
var router = express.Router();
const categoryController = require("../controllers/category");

router.post("/", categoryController.create);
router.get("/:id", categoryController.get);
router.post("/getAll", categoryController.getAll);
router.put("/:id", categoryController.update);
router.delete("/:id", categoryController.delete);

module.exports = router;
