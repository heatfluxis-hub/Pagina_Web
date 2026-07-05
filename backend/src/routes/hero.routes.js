const express = require('express')
const router = express.Router()
const { getHero, upsertHero } = require('../controllers/hero.controller')
const { verifyToken } = require('../middleware/auth.middleware')

router.get('/', getHero)
router.post('/', verifyToken, upsertHero)

module.exports = router