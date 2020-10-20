var express = require('express');
var router = express.Router();

const { create } = require('../controllers/orderdetail/create')
const { get } = require('../controllers/orderdetail/get')
const { getAll } = require('../controllers/orderdetail/getAll')
const { update } = require('../controllers/orderdetail/update')
const { _delete } = require('../controllers/orderdetail/delete')

router.post("/", create);
router.get("/:id", get);
router.post("/getAll", getAll);
router.put("/:id", update);
router.delete("/:id", _delete);

module.exports = router;
