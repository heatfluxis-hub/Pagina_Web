const express = require('express')
const router = express.Router()
const { getContacto, upsertContacto } = require('../controllers/contacto.controller')
const { verifyToken } = require('../middleware/auth.middleware')

router.get('/', getContacto)
router.post('/', verifyToken, upsertContacto)

module.exports = router