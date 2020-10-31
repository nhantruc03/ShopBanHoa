var express = require('express');
var router = express.Router();

const { create } = require('../controllers/contacts/create')
const { get } = require('../controllers/contacts/get')
const { getAll } = require('../controllers/contacts/getAll')
const { update } = require('../controllers/contacts/update')
const { _delete } = require('../controllers/contacts/delete')



router.post("/", create);
router.get("/:id", get);
router.post("/getAll", getAll);
router.put("/:id", update);
router.delete("/:id", _delete);

module.exports = router;
