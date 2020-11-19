var express = require('express');
var router = express.Router();
const { authenticateToken } = require("../services/authenticationToken")
const { create } = require('../controllers/news/create')
const { get } = require('../controllers/news/get')
const { getAll } = require('../controllers/news/getAll')
const { update } = require('../controllers/news/update')
const { _delete } = require('../controllers/news/delete')



router.post("/",authenticateToken, create);
router.get("/:id", get);
router.post("/getAll", getAll);
router.put("/:id",authenticateToken, update);
router.delete("/:id",authenticateToken, _delete);

module.exports = router;
