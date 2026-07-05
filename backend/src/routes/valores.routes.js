const express = require('express')
const router = express.Router()
const { getValores, createValor, updateValor, deleteValor } = require('../controllers/valores.controller')
const { verifyToken } = require('../middleware/auth.middleware')

router.get('/', getValores)
router.post('/', verifyToken, createValor)
router.put('/:id', verifyToken, updateValor)
router.delete('/:id', verifyToken, deleteValor)

module.exports = router