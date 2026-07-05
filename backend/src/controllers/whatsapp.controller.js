const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// ---- CONFIG (textos del widget) ----
const getConfig = async (req, res) => {
  try {
    let config = await prisma.whatsappConfig.findFirst()
    if (!config) config = await prisma.whatsappConfig.create({ data: {} })
    res.json(config)
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener config de WhatsApp' })
  }
}

const upsertConfig = async (req, res) => {
  const { titulo, estado, bienvenida, activo } = req.body
  try {
    const existe = await prisma.whatsappConfig.findFirst()
    const data = { titulo, estado, bienvenida, activo }
    const config = existe
      ? await prisma.whatsappConfig.update({ where: { id: existe.id }, data })
      : await prisma.whatsappConfig.create({ data })
    res.json(config)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al guardar config de WhatsApp' })
  }
}

// ---- CONTACTOS ----
const getContactos = async (req, res) => {
  try {
    const contactos = await prisma.whatsappContacto.findMany({ orderBy: { orden: 'asc' } })
    res.json(contactos)
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener contactos' })
  }
}

const createContacto = async (req, res) => {
  try {
    const contacto = await prisma.whatsappContacto.create({ data: req.body })
    res.status(201).json(contacto)
  } catch (err) {
    res.status(500).json({ error: 'Error al crear contacto' })
  }
}

const updateContacto = async (req, res) => {
  const { id } = req.params
  try {
    const contacto = await prisma.whatsappContacto.update({
      where: { id: parseInt(id) },
      data: req.body
    })
    res.json(contacto)
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar contacto' })
  }
}

const deleteContacto = async (req, res) => {
  const { id } = req.params
  try {
    await prisma.whatsappContacto.delete({ where: { id: parseInt(id) } })
    res.json({ message: 'Contacto eliminado' })
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar contacto' })
  }
}

module.exports = { getConfig, upsertConfig, getContactos, createContacto, updateContacto, deleteContacto }