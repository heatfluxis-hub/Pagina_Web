const express = require('express')
const router = express.Router()
const {
  getConfig, upsertConfig,
  getContactos, createContacto, updateContacto, deleteContacto
} = require('../controllers/whatsapp.controller')
const { verifyToken } = require('../middleware/auth.middleware')

// Config (textos)
router.get('/config', getConfig)
router.post('/config', verifyToken, upsertConfig)

// Contactos
router.get('/contactos', getContactos)
router.post('/contactos', verifyToken, createContacto)
router.put('/contactos/:id', verifyToken, updateContacto)
router.delete('/contactos/:id', verifyToken, deleteContacto)

module.exports = router