import ImageUploader from '../../components/admin/ImageUploader'
import { useState, useEffect } from 'react'
import api from '../../services/api'
import { Field, SaveBtn } from './components'
import { styles } from './editorStyles'
import EditorLayout from './EditorLayout'
import Proyectos from '../../components/public/Proyectos'

const emptyForm = { titulo: '', categoria: '', ubicacion: '', emoji: '', destacado: false, orden: 0 }

export default function ProyectosEditor() {
  const [proyectos, setProyectos] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [msg, setMsg] = useState('')

  const fetchProyectos = () => api.get('/proyectos').then(res => setProyectos(res.data))
  useEffect(() => { fetchProyectos() }, [])
  
  const handleImagen = (id) => setForm({ ...form, imagenId: id })
  const handleChange = e => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm({ ...form, [e.target.name]: val })
  }

  const handleSave = async () => {
    const data = { ...form, orden: parseInt(form.orden) || 0 }
    try {
      if (editId) {
        await api.put(`/proyectos/${editId}`, data)
      } else {
        await api.post('/proyectos', data)
      }
      setMsg('✓ Guardado')
      setForm(emptyForm)
      setEditId(null)
      fetchProyectos()
    } catch {
      setMsg('✗ Error al guardar')
    }
    setTimeout(() => setMsg(''), 3000)
  }

  const handleEdit = (p) => {
    setEditId(p.id)
    setForm(p)
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este proyecto?')) return
    await api.delete(`/proyectos/${id}`)
    fetchProyectos()
  }

  const cancelEdit = () => { setEditId(null); setForm(emptyForm) }

  const buildPreview = () => {
    const draft = {
      id: editId || 'draft',
      titulo: form.titulo || 'Nuevo proyecto',
      categoria: form.categoria || 'Categoría',
      ubicacion: form.ubicacion || 'Ubicación',
      emoji: form.emoji || '🏗️',
      imagenId: form.imagenId,
    }
    const tieneContenido = form.titulo || form.categoria || form.ubicacion || form.emoji || form.imagenId
    if (editId) {
      return proyectos.map(p => p.id === editId ? draft : p)
    }
    return tieneContenido ? [...proyectos, draft] : proyectos
  }

  return (
    <EditorLayout preview={<Proyectos preview={buildPreview()} />} previewLabel="Sección Proyectos">
      <div style={styles.formBox}>
        <h3 style={styles.formTitle}>{editId ? 'Editar proyecto' : 'Nuevo proyecto'}</h3>
        <Field label="Título" name="titulo" value={form.titulo} onChange={handleChange} />
        <Field label="Categoría" name="categoria" value={form.categoria} onChange={handleChange} />
        <Field label="Ubicación" name="ubicacion" value={form.ubicacion} onChange={handleChange} />
        <Field label="Emoji" name="emoji" value={form.emoji} onChange={handleChange} />
        <ImageUploader value={form.imagenId} onChange={handleImagen} label="Imagen del proyecto (reemplaza el emoji)" />
        <Field label="Orden" name="orden" type="number" value={form.orden} onChange={handleChange} />
        <div style={{ marginBottom: '16px' }}>
          <label style={styles.checkLabel}>
            <input type="checkbox" name="destacado" checked={form.destacado} onChange={handleChange} style={{ marginRight: '8px' }} />
            <span style={{ color: '#8A9BB0', fontSize: '13px' }}>Proyecto destacado</span>
          </label>
        </div>
        <SaveBtn onClick={handleSave} msg={msg} label={editId ? 'Actualizar' : 'Agregar'} />
        {editId && (
          <button onClick={cancelEdit} style={styles.cancelBtn}>Cancelar</button>
        )}
      </div>
      <div style={styles.list}>
        {proyectos.map(p => (
          <div key={p.id} style={styles.listItem}>
            <div>
              <span style={{ fontSize: '20px', marginRight: '10px' }}>{p.emoji}</span>
              <span style={styles.listTitle}>{p.titulo}</span>
              <span style={{ color: '#8A9BB0', fontSize: '12px', marginLeft: '8px' }}>{p.categoria}</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => handleEdit(p)} style={styles.editBtn}>Editar</button>
              <button onClick={() => handleDelete(p.id)} style={styles.deleteBtn}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </EditorLayout>
  )
}