const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getContadores = async (req, res) => {
  try {
    const contadores = await prisma.contador.findMany({ orderBy: { orden: 'asc' } })
    res.json(contadores)
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener contadores' })
  }
}

const createContador = async (req, res) => {
  try {
    const contador = await prisma.contador.create({ data: req.body })
    res.status(201).json(contador)
  } catch (err) {
    res.status(500).json({ error: 'Error al crear contador' })
  }
}

const updateContador = async (req, res) => {
  const { id } = req.params
  try {
    const contador = await prisma.contador.update({
      where: { id: parseInt(id) },
      data: req.body
    })
    res.json(contador)
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar contador' })
  }
}

const deleteContador = async (req, res) => {
  const { id } = req.params
  try {
    await prisma.contador.delete({ where: { id: parseInt(id) } })
    res.json({ message: 'Contador eliminado' })
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar contador' })
  }
}

module.exports = { getContadores, createContador, updateContador, deleteContador }