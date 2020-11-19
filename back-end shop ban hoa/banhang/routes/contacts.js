var express = require('express');
var router = express.Router();
const { authenticateToken } = require("../services/authenticationToken")
const { create } = require('../controllers/contacts/create')
const { get } = require('../controllers/contacts/get')
const { getAll } = require('../controllers/contacts/getAll')
const { update } = require('../controllers/contacts/update')
const { _delete } = require('../controllers/contacts/delete')



router.post("/",authenticateToken, create);
router.get("/:id", get);
router.post("/getAll", getAll);
router.put("/:id",authenticateToken, update);
router.delete("/:id",authenticateToken, _delete);

module.exports = router;
