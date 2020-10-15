var express = require('express');
var router = express.Router();
const categorycontentController = require("../controllers/categorycontent");

router.post("/", categorycontentController.create);
router.get("/:id", categorycontentController.get);
router.post("/getAll", categorycontentController.getAll);
router.put("/:id", categorycontentController.update);
router.delete("/:id", categorycontentController.delete);

module.exports = router;
