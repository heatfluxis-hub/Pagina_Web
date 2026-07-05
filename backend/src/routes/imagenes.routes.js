const express = require('express')
const router = express.Router()
const multer = require('multer')
const { uploadImagen, getImagen, deleteImagen } = require('../controllers/imagenes.controller')
const { verifyToken } = require('../middleware/auth.middleware')

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }
})

router.get('/:id', getImagen)
router.post('/', verifyToken, upload.single('imagen'), uploadImagen)
router.delete('/:id', verifyToken, deleteImagen)

module.exports = router