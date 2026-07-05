const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getProyectos = async (req, res) => {
  try {
    const proyectos = await prisma.proyecto.findMany({ orderBy: { orden: 'asc' } })
    res.json(proyectos)
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener proyectos' })
  }
}

const createProyecto = async (req, res) => {
  try {
    const proyecto = await prisma.proyecto.create({ data: req.body })
    res.status(201).json(proyecto)
  } catch (err) {
    res.status(500).json({ error: 'Error al crear proyecto' })
  }
}

const updateProyecto = async (req, res) => {
  const { id } = req.params
  try {
    const proyecto = await prisma.proyecto.update({
      where: { id: parseInt(id) },
      data: req.body
    })
    res.json(proyecto)
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar proyecto' })
  }
}

const deleteProyecto = async (req, res) => {
  const { id } = req.params
  try {
    await prisma.proyecto.delete({ where: { id: parseInt(id) } })
    res.json({ message: 'Proyecto eliminado' })
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar proyecto' })
  }
}

module.exports = { getProyectos, createProyecto, updateProyecto, deleteProyecto }