var express = require('express');
var router = express.Router();

const { create } = require('../controllers/product/create')
const { get } = require('../controllers/product/get')
const { getAll } = require('../controllers/product/getAll')
const { update } = require('../controllers/product/update')
const { _delete } = require('../controllers/product/delete')


router.post("/", create);
router.get("/:id", get);
router.post("/getAll", getAll);
router.put("/:id", update);
router.delete("/:id", _delete);

module.exports = router;
