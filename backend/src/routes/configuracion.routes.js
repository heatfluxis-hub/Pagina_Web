const express = require('express')
const router = express.Router()
const { getConfiguracion, upsertConfiguracion } = require('../controllers/configuracion.controller')
const { verifyToken } = require('../middleware/auth.middleware')

router.get('/', getConfiguracion)
router.post('/', verifyToken, upsertConfiguracion)

module.exports = router