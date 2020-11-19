var express = require('express');
var router = express.Router();
const { authenticateToken } = require("../services/authenticationToken")
const { create } = require('../controllers/banner/create')
const { get } = require('../controllers/banner/get')
const { getAll } = require('../controllers/banner/getAll')
const { update } = require('../controllers/banner/update')
const { _delete } = require('../controllers/banner/delete')

router.post("/",authenticateToken, create);
router.get("/:id", get);
router.post("/getAll", getAll);
router.put("/:id",authenticateToken, update);
router.delete("/:id",authenticateToken, _delete);

module.exports = router;
