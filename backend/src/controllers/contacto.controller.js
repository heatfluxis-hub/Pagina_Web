const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getContacto = async (req, res) => {
  try {
    const contacto = await prisma.contacto.findFirst()
    res.json(contacto)
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener contacto' })
  }
}

const upsertContacto = async (req, res) => {
  const { telefono, email, direccion } = req.body
  try {
    const existe = await prisma.contacto.findFirst()
    const contacto = existe
      ? await prisma.contacto.update({ where: { id: existe.id }, data: req.body })
      : await prisma.contacto.create({ data: { telefono, email, direccion } })
    res.json(contacto)
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar contacto' })
  }
}

module.exports = { getContacto, upsertContacto }