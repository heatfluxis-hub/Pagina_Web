const express = require('express')
const router = express.Router()
const { getProyectos, createProyecto, updateProyecto, deleteProyecto } = require('../controllers/proyectos.controller')
const { verifyToken } = require('../middleware/auth.middleware')

router.get('/', getProyectos)
router.post('/', verifyToken, createProyecto)
router.put('/:id', verifyToken, updateProyecto)
router.delete('/:id', verifyToken, deleteProyecto)

module.exports = router