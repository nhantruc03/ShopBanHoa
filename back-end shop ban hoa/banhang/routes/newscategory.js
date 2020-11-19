var express = require('express');
var router = express.Router();
const { authenticateToken } = require("../services/authenticationToken")
const { create } = require('../controllers/newscategory/create')
const { get } = require('../controllers/newscategory/get')
const { getAll } = require('../controllers/newscategory/getAll')
const { update } = require('../controllers/newscategory/update')
const { _delete } = require('../controllers/newscategory/delete')

router.post("/",authenticateToken, create);
router.get("/:id", get);
router.post("/getAll", getAll);
router.put("/:id",authenticateToken, update);
router.delete("/:id",authenticateToken, _delete);

module.exports = router;
