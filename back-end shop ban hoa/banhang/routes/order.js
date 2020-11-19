var express = require('express');
var router = express.Router();
const { authenticateToken } = require("../services/authenticationToken")
const { create } = require('../controllers/order/create')
const { get } = require('../controllers/order/get')
const { getAll } = require('../controllers/order/getAll')
const { update } = require('../controllers/order/update')
const { _delete } = require('../controllers/order/delete')

router.post("/", create);
router.get("/:id", get);
router.post("/getAll", getAll);
router.put("/:id",authenticateToken, update);
router.delete("/:id",authenticateToken, _delete);

module.exports = router;
