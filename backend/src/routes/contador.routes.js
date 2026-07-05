const express = require('express')
const router = express.Router()
const { getContadores, createContador, updateContador, deleteContador } = require('../controllers/contador.controller')
const { verifyToken } = require('../middleware/auth.middleware')

router.get('/', getContadores)
router.post('/', verifyToken, createContador)
router.put('/:id', verifyToken, updateContador)
router.delete('/:id', verifyToken, deleteContador)

module.exports = router