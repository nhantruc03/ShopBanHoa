var express = require('express');
var router = express.Router();
const newscategoryController = require("../controllers/newscategory");

router.post("/", newscategoryController.create);
router.get("/:id", newscategoryController.get);
router.post("/getAll", newscategoryController.getAll);
router.put("/:id", newscategoryController.update);
router.delete("/:id", newscategoryController.delete);

module.exports = router;
