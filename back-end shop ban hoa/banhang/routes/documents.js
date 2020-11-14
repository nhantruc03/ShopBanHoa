var express = require('express');
var router = express.Router();

const { create } = require('../controllers/document/create')
const { get } = require('../controllers/document/get')
const { getAll } = require('../controllers/document/getAll')
const { update } = require('../controllers/document/update')
const { _delete } = require('../controllers/document/delete')



router.post("/", create);
router.get("/:id", get);
router.post("/getAll", getAll);
router.put("/:id", update);
router.delete("/:id", _delete);

module.exports = router;
