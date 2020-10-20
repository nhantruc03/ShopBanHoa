var express = require('express');
var router = express.Router();

const { create } = require('../controllers/banner/create')
const { get } = require('../controllers/banner/get')
const { getAll } = require('../controllers/banner/getAll')
const { update } = require('../controllers/banner/update')
const { _delete } = require('../controllers/banner/delete')

router.post("/", create);
router.get("/:id", get);
router.post("/getAll", getAll);
router.put("/:id", update);
router.delete("/:id", _delete);

module.exports = router;
