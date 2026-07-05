import { useState, useEffect } from 'react'
import api from '../../services/api'
import { Field, SaveBtn } from './components'
import { styles } from './editorStyles'
import EditorLayout from './EditorLayout'
import Contador from '../../components/public/Contador'

const emptyForm = { numero: 0, suffix: '+', label: '', orden: 0 }

export default function ContadorEditor() {
  const [contadores, setContadores] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [msg, setMsg] = useState('')

  const fetchContadores = () => api.get('/contador').then(res => setContadores(res.data))
  useEffect(() => { fetchContadores() }, [])

  const handleChange = e => {
    const val = e.target.name === 'numero' || e.target.name === 'orden'
      ? parseInt(e.target.value) || 0
      : e.target.value
    setForm({ ...form, [e.target.name]: val })
  }

  const handleSave = async () => {
    try {
      if (editId) {
        await api.put(`/contador/${editId}`, form)
      } else {
        await api.post('/contador', form)
      }
      setMsg('✓ Guardado')
      setForm(emptyForm)
      setEditId(null)
      fetchContadores()
    } catch {
      setMsg('✗ Error al guardar')
    }
    setTimeout(() => setMsg(''), 3000)
  }

  const handleEdit = (c) => {
    setEditId(c.id)
    setForm({ numero: c.numero, suffix: c.suffix, label: c.label, orden: c.orden })
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este contador?')) return
    await api.delete(`/contador/${id}`)
    fetchContadores()
  }

  const cancelEdit = () => { setEditId(null); setForm(emptyForm) }

  const buildPreview = () => {
    const draft = { id: editId || 'draft', numero: form.numero, suffix: form.suffix, label: form.label || 'Nueva estadística' }
    const tieneContenido = form.numero || form.label
    if (editId) return contadores.map(c => c.id === editId ? draft : c)
    return tieneContenido ? [...contadores, draft] : contadores
  }

  return (
    <EditorLayout preview={<Contador preview={buildPreview()} />} previewLabel="Sección Contador">
      <div style={styles.formBox}>
        <h3 style={styles.formTitle}>{editId ? 'Editar estadística' : 'Nueva estadística'}</h3>
        <Field label="Número" name="numero" type="number" value={form.numero} onChange={handleChange} />
        <Field label="Símbolo (ej: +, %, o vacío)" name="suffix" value={form.suffix} onChange={handleChange} />
        <Field label="Etiqueta" name="label" value={form.label} onChange={handleChange} />
        <Field label="Orden" name="orden" type="number" value={form.orden} onChange={handleChange} />
        <SaveBtn onClick={handleSave} msg={msg} label={editId ? 'Actualizar' : 'Agregar'} />
        {editId && <button onClick={cancelEdit} style={styles.cancelBtn}>Cancelar</button>}
      </div>
      <div style={styles.list}>
        {contadores.map(c => (
          <div key={c.id} style={styles.listItem}>
            <div>
              <span style={styles.listNum}>{c.numero}{c.suffix}</span>
              <span style={styles.listTitle}>{c.label}</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => handleEdit(c)} style={styles.editBtn}>Editar</button>
              <button onClick={() => handleDelete(c.id)} style={styles.deleteBtn}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </EditorLayout>
  )
}