const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getNosotros = async (req, res) => {
  try {
    const nosotros = await prisma.nosotros.findFirst()
    res.json(nosotros)
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener nosotros' })
  }
}

const upsertNosotros = async (req, res) => {
  const { descripcion1, descripcion2, aniosExp, imagenId } = req.body
  try {
    const existe = await prisma.nosotros.findFirst()
    const data = { descripcion1, descripcion2, aniosExp, imagenId }
    const nosotros = existe
      ? await prisma.nosotros.update({ where: { id: existe.id }, data })
      : await prisma.nosotros.create({ data })
    res.json(nosotros)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al guardar nosotros' })
  }
}

module.exports = { getNosotros, upsertNosotros }