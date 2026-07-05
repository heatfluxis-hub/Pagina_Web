const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const register = async (req, res) => {
  const { email, password } = req.body
  try {
    const existe = await prisma.admin.findUnique({ where: { email } })
    if (existe) {
      return res.status(400).json({ error: 'El administrador ya existe' })
    }
    const hash = await bcrypt.hash(password, 10)
    const admin = await prisma.admin.create({
      data: { email, password: hash }
    })
    res.status(201).json({ message: 'Admin creado correctamente', id: admin.id })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al crear el admin' })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const admin = await prisma.admin.findUnique({ where: { email } })
    if (!admin) {
      return res.status(404).json({ error: 'Credenciales incorrectas' })
    }
    const valido = await bcrypt.compare(password, admin.password)
    if (!valido) {
      return res.status(401).json({ error: 'Credenciales incorrectas' })
    }
    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    )
    res.json({ token, email: admin.email })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error en el login' })
  }
}

module.exports = { register, login }