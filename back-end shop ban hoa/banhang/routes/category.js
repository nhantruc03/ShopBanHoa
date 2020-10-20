var express = require('express');
var router = express.Router();

const { create } = require('../controllers/category/create')
const { get } = require('../controllers/category/get')
const { getAll } = require('../controllers/category/getAll')
const { update } = require('../controllers/category/update')
const { _delete } = require('../controllers/category/delete')

router.post("/", create);
router.get("/:id", get);
router.post("/getAll", getAll);
router.put("/:id", update);
router.delete("/:id", _delete);

module.exports = router;
