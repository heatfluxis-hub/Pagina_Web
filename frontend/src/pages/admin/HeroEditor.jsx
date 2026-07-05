import ImageUploader from '../../components/admin/ImageUploader'
import { useState, useEffect } from 'react'
import api from '../../services/api'
import { Field, SaveBtn } from './components'
import EditorLayout from './EditorLayout'
import Hero from '../../components/public/Hero'

export default function HeroEditor() {
  const [form, setForm] = useState({
    badge: 'Especialistas en Intercambio Térmico',
    titulo: 'Soluciones Integrales en Reparación, Mantenimiento y Fabricación',
    subtitulo: 'Brindamos servicios especializados con altos estándares de calidad, seguridad y eficiencia para la industria peruana e internacional.',
    stat1: 200, stat2: 15, stat3: 98, stat4: 50
  })
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    api.get('/hero').then(res => { if (res.data) setForm(res.data) })
  }, [])

  const handleChange = e => {
    const val = e.target.type === 'number' ? parseInt(e.target.value) || 0 : e.target.value
    setForm({ ...form, [e.target.name]: val })
  }
  const handleImagen = (id) => setForm({ ...form, imagenId: id })

  const handleSave = async () => {
    setLoading(true)
    try {
      await api.post('/hero', form)
      setMsg('✓ Guardado correctamente')
    } catch {
      setMsg('✗ Error al guardar')
    } finally {
      setLoading(false)
      setTimeout(() => setMsg(''), 3000)
    }
  }

  return (
    <EditorLayout preview={<Hero preview={form} />} previewLabel="Sección Hero">
      <ImageUploader value={form.imagenId} onChange={handleImagen} label="Imagen de fondo del Hero (opcional)" />
      <Field label="Badge (texto superior)" name="badge" value={form.badge} onChange={handleChange} />
      <Field label="Título principal" name="titulo" value={form.titulo} onChange={handleChange} textarea />
      <Field label="Subtítulo" name="subtitulo" value={form.subtitulo} onChange={handleChange} textarea />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <Field label="Proyectos" name="stat1" type="number" value={form.stat1} onChange={handleChange} />
        <Field label="Años exp." name="stat2" type="number" value={form.stat2} onChange={handleChange} />
        <Field label="Satisfacción %" name="stat3" type="number" value={form.stat3} onChange={handleChange} />
        <Field label="Clientes" name="stat4" type="number" value={form.stat4} onChange={handleChange} />
      </div>
      <div style={{ marginTop: '24px' }}>
        <SaveBtn onClick={handleSave} loading={loading} msg={msg} />
      </div>
    </EditorLayout>
  )
}