const express = require('express')
const router = express.Router()
const { getServicios, createServicio, updateServicio, deleteServicio } = require('../controllers/servicios.controller')
const { verifyToken } = require('../middleware/auth.middleware')

router.get('/', getServicios)
router.post('/', verifyToken, createServicio)
router.put('/:id', verifyToken, updateServicio)
router.delete('/:id', verifyToken, deleteServicio)

module.exports = router