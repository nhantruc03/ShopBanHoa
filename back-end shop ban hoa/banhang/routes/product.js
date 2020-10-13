var express = require('express');
var router = express.Router();
var fs = require('fs');
var mime = require('mime');
var isEmpty = require('lodash.isempty');
const productController = require("../controllers/product");

router.post("/", productController.create);
router.get("/:id", productController.get);
router.post("/getAll", productController.getAll);
router.put("/:id", productController.update);
router.delete("/:id", productController.delete);

module.exports = router;
