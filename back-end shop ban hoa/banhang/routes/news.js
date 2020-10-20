var express = require('express');
var router = express.Router();

const { create } = require('../controllers/news/create')
const { get } = require('../controllers/news/get')
const { getAll } = require('../controllers/news/getAll')
const { update } = require('../controllers/news/update')
const { _delete } = require('../controllers/news/delete')



router.post("/", create);
router.get("/:id", get);
router.post("/getAll", getAll);
router.put("/:id", update);
router.delete("/:id", _delete);

module.exports = router;
