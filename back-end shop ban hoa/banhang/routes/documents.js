var express = require('express');
var router = express.Router();
const { authenticateToken } = require("../services/authenticationToken")
const { create } = require('../controllers/document/create')
const { get } = require('../controllers/document/get')
const { getAll } = require('../controllers/document/getAll')
const { update } = require('../controllers/document/update')
const { _delete } = require('../controllers/document/delete')



router.post("/",authenticateToken, create);
router.get("/:id", get);
router.post("/getAll", getAll);
router.put("/:id",authenticateToken, update);
router.delete("/:id",authenticateToken, _delete);

module.exports = router;
