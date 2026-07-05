const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Sube una imagen y la guarda en la base de datos
const uploadImagen = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se envió ninguna imagen' })
    }
    const imagen = await prisma.imagen.create({
      data: {
        nombre: req.file.originalname,
        mimeType: req.file.mimetype,
        data: req.file.buffer
      }
    })
    res.status(201).json({ id: imagen.id, nombre: imagen.nombre })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al subir la imagen' })
  }
}

// Sirve la imagen desde la base de datos (para usarla en <img src>)
const getImagen = async (req, res) => {
  const { id } = req.params
  try {
    const imagen = await prisma.imagen.findUnique({ where: { id: parseInt(id) } })
    if (!imagen) {
      return res.status(404).json({ error: 'Imagen no encontrada' })
    }
    res.set('Content-Type', imagen.mimeType)
    res.set('Cache-Control', 'public, max-age=86400')
    res.send(Buffer.from(imagen.data))
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al obtener la imagen' })
  }
}

// Elimina una imagen
const deleteImagen = async (req, res) => {
  const { id } = req.params
  try {
    await prisma.imagen.delete({ where: { id: parseInt(id) } })
    res.json({ message: 'Imagen eliminada' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al eliminar la imagen' })
  }
}

module.exports = { uploadImagen, getImagen, deleteImagen }