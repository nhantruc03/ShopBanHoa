var express = require('express');
var router = express.Router();
const { authenticateToken } = require("../services/authenticationToken")
const { create } = require('../controllers/product/create')
const { get } = require('../controllers/product/get')
const { getAll } = require('../controllers/product/getAll')
const { update } = require('../controllers/product/update')
const { _delete } = require('../controllers/product/delete')


router.post("/",authenticateToken, create);
router.get("/:id", get);
router.post("/getAll", getAll);
router.put("/:id",authenticateToken, update);
router.delete("/:id",authenticateToken, _delete);

module.exports = router;
