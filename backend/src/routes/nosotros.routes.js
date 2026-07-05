const express = require('express')
const router = express.Router()
const { getNosotros, upsertNosotros } = require('../controllers/nosotros.controller')
const { verifyToken } = require('../middleware/auth.middleware')

router.get('/', getNosotros)
router.post('/', verifyToken, upsertNosotros)

module.exports = router