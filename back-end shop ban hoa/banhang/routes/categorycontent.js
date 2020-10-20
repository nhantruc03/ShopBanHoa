var express = require('express');
var router = express.Router();

const { create } = require('../controllers/categorycontent/create')
const { get } = require('../controllers/categorycontent/get')
const { getAll } = require('../controllers/categorycontent/getAll')
const { update } = require('../controllers/categorycontent/update')
const { _delete } = require('../controllers/categorycontent/delete')

router.post("/", create);
router.get("/:id", get);
router.post("/getAll", getAll);
router.put("/:id", update);
router.delete("/:id", _delete);

module.exports = router;
