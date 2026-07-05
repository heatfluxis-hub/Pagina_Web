import ImageUploader from '../../components/admin/ImageUploader'
import { useState, useEffect } from 'react'
import api from '../../services/api'
import { Field, SaveBtn } from './components'
import { styles } from './editorStyles'
import EditorLayout from './EditorLayout'
import Servicios from '../../components/public/Servicios'

const emptyForm = { numero: '', titulo: '', descripcion: '', features: '', orden: 0 }

export default function ServiciosEditor() {
  const [servicios, setServicios] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [msg, setMsg] = useState('')

  const fetchServicios = () => api.get('/servicios').then(res => setServicios(res.data))
  useEffect(() => { fetchServicios() }, []) 
  const handleImagen = (id) => setForm({ ...form, imagenId: id })
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  

  const handleSave = async () => {
    const data = { ...form, features: form.features.split(',').map(f => f.trim()).filter(Boolean), orden: parseInt(form.orden) || 0 }
    try {
      if (editId) {
        await api.put(`/servicios/${editId}`, data)
      } else {
        await api.post('/servicios', data)
      }
      setMsg('✓ Guardado')
      setForm(emptyForm)
      setEditId(null)
      fetchServicios()
    } catch {
      setMsg('✗ Error al guardar')
    }
    setTimeout(() => setMsg(''), 3000)
  }

  const handleEdit = (s) => {
    setEditId(s.id)
    setForm({ ...s, features: s.features.join(', ') })
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este servicio?')) return
    await api.delete(`/servicios/${id}`)
    fetchServicios()
  }

  const cancelEdit = () => { setEditId(null); setForm(emptyForm) }

  const buildPreview = () => {
    const draft = {
      id: editId || 'draft',
      numero: form.numero,
      titulo: form.titulo || 'Nuevo servicio',
      descripcion: form.descripcion,
      features: form.features.split(',').map(f => f.trim()).filter(Boolean),
      imagenId: form.imagenId,
    }
    const tieneContenido = form.numero || form.titulo || form.descripcion
    if (editId) {
      return servicios.map(s => s.id === editId ? draft : s)
    }
    return tieneContenido ? [...servicios, draft] : servicios
  }

  return (
    <EditorLayout preview={<Servicios preview={buildPreview()} />} previewLabel="Sección Servicios">
      <div style={styles.formBox}>
        <h3 style={styles.formTitle}>{editId ? 'Editar servicio' : 'Nuevo servicio'}</h3>
        <Field label="Número (ej: 01)" name="numero" value={form.numero} onChange={handleChange} />
        <Field label="Título" name="titulo" value={form.titulo} onChange={handleChange} />
        <Field label="Descripción" name="descripcion" value={form.descripcion} onChange={handleChange} textarea />
        <ImageUploader value={form.imagenId} onChange={handleImagen} label="Imagen del servicio" />
        <Field label="Features (separadas por coma)" name="features" value={form.features} onChange={handleChange} />
        <Field label="Orden" name="orden" type="number" value={form.orden} onChange={handleChange} />
        <SaveBtn onClick={handleSave} msg={msg} label={editId ? 'Actualizar' : 'Agregar'} />
        {editId && (
          <button onClick={cancelEdit} style={styles.cancelBtn}>Cancelar</button>
        )}
      </div>
      <div style={styles.list}>
        {servicios.map(s => (
          <div key={s.id} style={styles.listItem}>
            <div>
              <span style={styles.listNum}>{s.numero}</span>
              <span style={styles.listTitle}>{s.titulo}</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => handleEdit(s)} style={styles.editBtn}>Editar</button>
              <button onClick={() => handleDelete(s.id)} style={styles.deleteBtn}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </EditorLayout>
  )
}