var express = require('express');
var router = express.Router();
const { authenticateToken } = require("../services/authenticationToken")
const { create } = require('../controllers/orderdetail/create')
const { get } = require('../controllers/orderdetail/get')
const { getAll } = require('../controllers/orderdetail/getAll')
const { update } = require('../controllers/orderdetail/update')
const { _delete } = require('../controllers/orderdetail/delete')

router.post("/",authenticateToken, create);
router.get("/:id", get);
router.post("/getAll", getAll);
router.put("/:id",authenticateToken, update);
router.delete("/:id",authenticateToken, _delete);

module.exports = router;
