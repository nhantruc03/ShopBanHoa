var express = require('express');
var router = express.Router();
var isEmpty = require('lodash.isempty');
const bannerController = require("../controllers/banner");

router.post("/", bannerController.create);
router.get("/:id", bannerController.get);
router.post("/getAll", bannerController.getAll);
router.put("/:id", bannerController.update);
router.delete("/:id", bannerController.delete);

module.exports = router;
