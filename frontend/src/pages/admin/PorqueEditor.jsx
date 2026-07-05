import { useState, useEffect } from 'react'
import api from '../../services/api'
import { Field, SaveBtn } from './components'
import { styles } from './editorStyles'
import EditorLayout from './EditorLayout'
import Porque from '../../components/public/Porque'

const emptyForm = { icono: '', titulo: '', desc: '', orden: 0 }

export default function PorqueEditor() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [msg, setMsg] = useState('')

  const fetchItems = () => api.get('/porque').then(res => setItems(res.data))
  useEffect(() => { fetchItems() }, [])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSave = async () => {
    const data = { ...form, orden: parseInt(form.orden) || 0 }
    try {
      if (editId) {
        await api.put(`/porque/${editId}`, data)
      } else {
        await api.post('/porque', data)
      }
      setMsg('✓ Guardado')
      setForm(emptyForm)
      setEditId(null)
      fetchItems()
    } catch {
      setMsg('✗ Error al guardar')
    }
    setTimeout(() => setMsg(''), 3000)
  }

  const handleEdit = (item) => {
    setEditId(item.id)
    setForm({ icono: item.icono, titulo: item.titulo, desc: item.desc, orden: item.orden })
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este item?')) return
    await api.delete(`/porque/${id}`)
    fetchItems()
  }

  const cancelEdit = () => { setEditId(null); setForm(emptyForm) }

  const buildPreview = () => {
    const draft = { id: editId || 'draft', icono: form.icono || '⭐', titulo: form.titulo || 'Nuevo item', desc: form.desc }
    const tieneContenido = form.icono || form.titulo || form.desc
    if (editId) return items.map(i => i.id === editId ? draft : i)
    return tieneContenido ? [...items, draft] : items
  }

  return (
    <EditorLayout preview={<Porque preview={buildPreview()} />} previewLabel="Sección Por qué elegirnos">
      <div style={styles.formBox}>
        <h3 style={styles.formTitle}>{editId ? 'Editar item' : 'Nuevo item'}</h3>
        <Field label="Ícono (emoji)" name="icono" value={form.icono} onChange={handleChange} />
        <Field label="Título" name="titulo" value={form.titulo} onChange={handleChange} />
        <Field label="Descripción" name="desc" value={form.desc} onChange={handleChange} textarea />
        <Field label="Orden" name="orden" type="number" value={form.orden} onChange={handleChange} />
        <SaveBtn onClick={handleSave} msg={msg} label={editId ? 'Actualizar' : 'Agregar'} />
        {editId && <button onClick={cancelEdit} style={styles.cancelBtn}>Cancelar</button>}
      </div>
      <div style={styles.list}>
        {items.map(item => (
          <div key={item.id} style={styles.listItem}>
            <div>
              <span style={{ fontSize: '18px', marginRight: '10px' }}>{item.icono}</span>
              <span style={styles.listTitle}>{item.titulo}</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => handleEdit(item)} style={styles.editBtn}>Editar</button>
              <button onClick={() => handleDelete(item.id)} style={styles.deleteBtn}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </EditorLayout>
  )
}