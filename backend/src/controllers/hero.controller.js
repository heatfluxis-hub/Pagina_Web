const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getHero = async (req, res) => {
  try {
    const hero = await prisma.hero.findFirst()
    res.json(hero)
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener hero' })
  }
}

const upsertHero = async (req, res) => {
  const { badge, titulo, subtitulo, stat1, stat2, stat3, stat4, imagenId } = req.body
  try {
    const existe = await prisma.hero.findFirst()
    const data = { badge, titulo, subtitulo, stat1, stat2, stat3, stat4, imagenId }
    const hero = existe
      ? await prisma.hero.update({ where: { id: existe.id }, data })
      : await prisma.hero.create({ data })
    res.json(hero)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al guardar hero' })
  }
}

module.exports = { getHero, upsertHero }