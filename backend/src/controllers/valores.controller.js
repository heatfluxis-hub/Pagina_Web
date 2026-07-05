const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getValores = async (req, res) => {
  try {
    const valores = await prisma.valorNosotros.findMany({ orderBy: { orden: 'asc' } })
    res.json(valores)
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener valores' })
  }
}

const createValor = async (req, res) => {
  try {
    const valor = await prisma.valorNosotros.create({ data: req.body })
    res.status(201).json(valor)
  } catch (err) {
    res.status(500).json({ error: 'Error al crear valor' })
  }
}

const updateValor = async (req, res) => {
  const { id } = req.params
  try {
    const valor = await prisma.valorNosotros.update({
      where: { id: parseInt(id) },
      data: req.body
    })
    res.json(valor)
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar valor' })
  }
}

const deleteValor = async (req, res) => {
  const { id } = req.params
  try {
    await prisma.valorNosotros.delete({ where: { id: parseInt(id) } })
    res.json({ message: 'Valor eliminado' })
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar valor' })
  }
}

module.exports = { getValores, createValor, updateValor, deleteValor }