const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getPorque = async (req, res) => {
  try {
    const items = await prisma.porque.findMany({ orderBy: { orden: 'asc' } })
    res.json(items)
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener items' })
  }
}

const createPorque = async (req, res) => {
  try {
    const item = await prisma.porque.create({ data: req.body })
    res.status(201).json(item)
  } catch (err) {
    res.status(500).json({ error: 'Error al crear item' })
  }
}

const updatePorque = async (req, res) => {
  const { id } = req.params
  try {
    const item = await prisma.porque.update({
      where: { id: parseInt(id) },
      data: req.body
    })
    res.json(item)
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar item' })
  }
}

const deletePorque = async (req, res) => {
  const { id } = req.params
  try {
    await prisma.porque.delete({ where: { id: parseInt(id) } })
    res.json({ message: 'Item eliminado' })
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar item' })
  }
}

module.exports = { getPorque, createPorque, updatePorque, deletePorque }