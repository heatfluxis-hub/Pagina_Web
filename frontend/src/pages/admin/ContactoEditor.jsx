import { useState, useEffect } from 'react'
import api from '../../services/api'
import { Field, SaveBtn } from './components'
import EditorLayout from './EditorLayout'
import Contacto from '../../components/public/Contacto'

export default function ContactoEditor() {
  const [form, setForm] = useState({
    telefono: '+51 923 619 993',
    email: 'heatfluix@gmail.com',
    direccion: 'Lima, Perú'
  })
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    api.get('/contacto').then(res => { if (res.data) setForm(res.data) })
  }, [])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSave = async () => {
    setLoading(true)
    try {
      await api.post('/contacto', form)
      setMsg('✓ Guardado correctamente')
    } catch {
      setMsg('✗ Error al guardar')
    } finally {
      setLoading(false)
      setTimeout(() => setMsg(''), 3000)
    }
  }

  return (
    <EditorLayout preview={<Contacto preview={form} />} previewLabel="Sección Contacto">
      <Field label="Teléfono" name="telefono" value={form.telefono} onChange={handleChange} />
      <Field label="Correo electrónico" name="email" value={form.email} onChange={handleChange} />
      <Field label="Dirección" name="direccion" value={form.direccion} onChange={handleChange} />
      <div style={{ marginTop: '24px' }}>
        <SaveBtn onClick={handleSave} loading={loading} msg={msg} />
      </div>
    </EditorLayout>
  )
}