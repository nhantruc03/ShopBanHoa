var express = require('express');
var router = express.Router();
const { authenticateToken } = require("../services/authenticationToken")
const { create } = require('../controllers/categorycontent/create')
const { get } = require('../controllers/categorycontent/get')
const { getAll } = require('../controllers/categorycontent/getAll')
const { update } = require('../controllers/categorycontent/update')
const { _delete } = require('../controllers/categorycontent/delete')

router.post("/",authenticateToken, create);
router.get("/:id", get);
router.post("/getAll", getAll);
router.put("/:id",authenticateToken, update);
router.delete("/:id",authenticateToken, _delete);

module.exports = router;
