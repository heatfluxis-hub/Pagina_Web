const express = require('express')
const router = express.Router()
const { getPorque, createPorque, updatePorque, deletePorque } = require('../controllers/porque.controller')
const { verifyToken } = require('../middleware/auth.middleware')

router.get('/', getPorque)
router.post('/', verifyToken, createPorque)
router.put('/:id', verifyToken, updatePorque)
router.delete('/:id', verifyToken, deletePorque)

module.exports = router