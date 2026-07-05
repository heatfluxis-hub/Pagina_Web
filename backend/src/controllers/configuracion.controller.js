const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getConfiguracion = async (req, res) => {
  try {
    let config = await prisma.configuracion.findFirst()
    // Si no existe, la crea con los valores por defecto
    if (!config) {
      config = await prisma.configuracion.create({ data: {} })
    }
    res.json(config)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al obtener la configuración' })
  }
}

const upsertConfiguracion = async (req, res) => {
  const { nombreEmpresa, sublema, logoId, footerDesc, copyright, linkedin, facebook, whatsapp } = req.body
  try {
    const existe = await prisma.configuracion.findFirst()
    const data = { nombreEmpresa, sublema, logoId, footerDesc, copyright, linkedin, facebook, whatsapp }
    const config = existe
      ? await prisma.configuracion.update({ where: { id: existe.id }, data })
      : await prisma.configuracion.create({ data })
    res.json(config)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al guardar la configuración' })
  }
}

module.exports = { getConfiguracion, upsertConfiguracion }