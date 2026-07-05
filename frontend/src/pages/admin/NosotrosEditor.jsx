import ImageUploader from '../../components/admin/ImageUploader'
import { useState, useEffect } from 'react'
import api from '../../services/api'
import { Field, SaveBtn } from './components'
import { styles } from './editorStyles'
import EditorLayout from './EditorLayout'
import Nosotros from '../../components/public/Nosotros'

const emptyValor = { icono: '', titulo: '', desc: '', orden: 0 }

export default function NosotrosEditor() {
  const [form, setForm] = useState({
    descripcion1: 'Somos una empresa metalmecánica especializada en la reparación, mantenimiento técnico y fabricación de equipos de intercambio térmico. Contamos con un equipo técnico altamente capacitado y tecnología para brindar soluciones eficientes y confiables a la industria.',
    descripcion2: 'Trabajamos bajo estrictos protocolos de calidad y seguridad, cumpliendo normas nacionales e internacionales en cada proyecto que emprendemos.',
    aniosExp: 15
  })
  const [valores, setValores] = useState([])
  const [valorForm, setValorForm] = useState(emptyValor)
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const fetchValores = () => api.get('/valores').then(res => setValores(res.data))

  useEffect(() => {
    api.get('/nosotros').then(res => { if (res.data) setForm(res.data) })
    fetchValores()
  }, [])
  const handleImagen = (id) => setForm({ ...form, imagenId: id })
  const handleChange = e => {
    const val = e.target.type === 'number' ? parseInt(e.target.value) || 0 : e.target.value
    setForm({ ...form, [e.target.name]: val })
  }

  const handleValorChange = e => setValorForm({ ...valorForm, [e.target.name]: e.target.value })

  const handleSaveTextos = async () => {
    setLoading(true)
    try {
      await api.post('/nosotros', form)
      setMsg('✓ Textos guardados')
    } catch {
      setMsg('✗ Error al guardar')
    } finally {
      setLoading(false)
      setTimeout(() => setMsg(''), 3000)
    }
  }

  const handleSaveValor = async () => {
    const data = { ...valorForm, orden: parseInt(valorForm.orden) || 0 }
    try {
      if (editId) {
        await api.put(`/valores/${editId}`, data)
      } else {
        await api.post('/valores', data)
      }
      setValorForm(emptyValor)
      setEditId(null)
      fetchValores()
    } catch {
      setMsg('✗ Error al guardar valor')
      setTimeout(() => setMsg(''), 3000)
    }
  }

  const handleEditValor = (v) => {
    setEditId(v.id)
    setValorForm({ icono: v.icono, titulo: v.titulo, desc: v.desc, orden: v.orden })
  }

  const handleDeleteValor = async (id) => {
    if (!confirm('¿Eliminar este valor?')) return
    await api.delete(`/valores/${id}`)
    fetchValores()
  }

  const cancelEdit = () => { setEditId(null); setValorForm(emptyValor) }

  // Preview de valores: combina guardados con el que se edita/crea
  const buildValoresPreview = () => {
    const draft = { id: editId || 'draft', icono: valorForm.icono || '⭐', titulo: valorForm.titulo || 'Nuevo valor', desc: valorForm.desc }
    const tieneContenido = valorForm.icono || valorForm.titulo || valorForm.desc
    if (editId) return valores.map(v => v.id === editId ? draft : v)
    return tieneContenido ? [...valores, draft] : valores
  }

  return (
    <EditorLayout
      preview={<Nosotros preview={form} valoresPreview={buildValoresPreview()} />}
      previewLabel="Sección Nosotros"
    >
      {/* Textos */}
      <div style={styles.formBox}>
        <h3 style={styles.formTitle}>Textos de la sección</h3>
        <ImageUploader value={form.imagenId} onChange={handleImagen} label="Imagen de la planta" />
        <Field label="Descripción 1" name="descripcion1" value={form.descripcion1} onChange={handleChange} textarea />
        <Field label="Descripción 2" name="descripcion2" value={form.descripcion2} onChange={handleChange} textarea />
        <Field label="Años de experiencia" name="aniosExp" type="number" value={form.aniosExp} onChange={handleChange} />
        <SaveBtn onClick={handleSaveTextos} loading={loading} msg={msg} label="Guardar textos" />
      </div>

      {/* CRUD de valores */}
      <div style={styles.formBox}>
        <h3 style={styles.formTitle}>{editId ? 'Editar valor' : 'Agregar valor'}</h3>
        <Field label="Ícono (emoji)" name="icono" value={valorForm.icono} onChange={handleValorChange} />
        <Field label="Título" name="titulo" value={valorForm.titulo} onChange={handleValorChange} />
        <Field label="Descripción" name="desc" value={valorForm.desc} onChange={handleValorChange} textarea />
        <Field label="Orden" name="orden" type="number" value={valorForm.orden} onChange={handleValorChange} />
        <SaveBtn onClick={handleSaveValor} label={editId ? 'Actualizar valor' : 'Agregar valor'} />
        {editId && <button onClick={cancelEdit} style={styles.cancelBtn}>Cancelar</button>}
      </div>

      <div style={styles.list}>
        {valores.map(v => (
          <div key={v.id} style={styles.listItem}>
            <div>
              <span style={{ fontSize: '18px', marginRight: '10px' }}>{v.icono}</span>
              <span style={styles.listTitle}>{v.titulo}</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => handleEditValor(v)} style={styles.editBtn}>Editar</button>
              <button onClick={() => handleDeleteValor(v.id)} style={styles.deleteBtn}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </EditorLayout>
  )
}