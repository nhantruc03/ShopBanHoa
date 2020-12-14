const router = require('express').Router()
const { isAdmin } = require("../services/checkAdmin")
const { authenticateToken } = require("../services/authenticationToken")

const { create } = require('../controllers/users/create')
const { get } = require('../controllers/users/get')
const { getAll } = require('../controllers/users/getAll')
const { update } = require('../controllers/users/update')
const { _delete } = require('../controllers/users/delete')
const { login } = require('../controllers/users/login')
const { register } = require('../controllers/users/register')

router.post("/",authenticateToken, create)
router.get("/:id", get)
router.get("/", getAll)
router.put("/:id",authenticateToken, update)
router.delete("/:id",authenticateToken, _delete)
router.post("/login", login)
router.post("/register", register)

module.exports = router