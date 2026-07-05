const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getServicios = async (req, res) => {
  try {
    const servicios = await prisma.servicio.findMany({ orderBy: { orden: 'asc' } })
    res.json(servicios)
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener servicios' })
  }
}

const createServicio = async (req, res) => {
  try {
    const servicio = await prisma.servicio.create({ data: req.body })
    res.status(201).json(servicio)
  } catch (err) {
    res.status(500).json({ error: 'Error al crear servicio' })
  }
}

const updateServicio = async (req, res) => {
  const { id } = req.params
  try {
    const servicio = await prisma.servicio.update({
      where: { id: parseInt(id) },
      data: req.body
    })
    res.json(servicio)
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar servicio' })
  }
}

const deleteServicio = async (req, res) => {
  const { id } = req.params
  try {
    await prisma.servicio.delete({ where: { id: parseInt(id) } })
    res.json({ message: 'Servicio eliminado' })
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar servicio' })
  }
}

module.exports = { getServicios, createServicio, updateServicio, deleteServicio }