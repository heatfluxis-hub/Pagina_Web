import { useState, useEffect } from 'react'
import api from '../../services/api'
import { Field, SaveBtn } from './components'
import { styles } from './editorStyles'
import EditorLayout from './EditorLayout'
import WhatsappWidget from '../../components/public/WhatsappWidget'

const emptyContacto = { nombre: '', cargo: '', numero: '', color: '#FF6B1A', orden: 0 }
const colores = ['#FF6B1A', '#29B6D8', '#8b5cf6', '#10b981', '#f43f5e', '#eab308']

export default function WhatsappEditor() {
  const [config, setConfig] = useState({
    titulo: 'HeatFluix',
    estado: 'En línea · responde en minutos',
    bienvenida: '¡Hola! 👋 Elige con quién deseas conversar y te atendemos por WhatsApp.',
    activo: true
  })
  const [contactos, setContactos] = useState([])
  const [cForm, setCForm] = useState(emptyContacto)
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const fetchContactos = () => api.get('/whatsapp/contactos').then(res => setContactos(res.data))

  useEffect(() => {
    api.get('/whatsapp/config').then(res => { if (res.data) setConfig(res.data) })
    fetchContactos()
  }, [])

  const handleConfigChange = e => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setConfig({ ...config, [e.target.name]: val })
  }

  const handleContactoChange = e => setCForm({ ...cForm, [e.target.name]: e.target.value })

  const handleSaveConfig = async () => {
    setLoading(true)
    try {
      await api.post('/whatsapp/config', config)
      setMsg('✓ Textos guardados')
    } catch {
      setMsg('✗ Error al guardar')
    } finally {
      setLoading(false)
      setTimeout(() => setMsg(''), 3000)
    }
  }

  const handleSaveContacto = async () => {
    const data = { ...cForm, orden: parseInt(cForm.orden) || 0 }
    try {
      if (editId) {
        await api.put(`/whatsapp/contactos/${editId}`, data)
      } else {
        await api.post('/whatsapp/contactos', data)
      }
      setCForm(emptyContacto)
      setEditId(null)
      fetchContactos()
    } catch {
      setMsg('✗ Error al guardar contacto')
      setTimeout(() => setMsg(''), 3000)
    }
  }

  const handleEditContacto = (c) => {
    setEditId(c.id)
    setCForm({ nombre: c.nombre, cargo: c.cargo, numero: c.numero, color: c.color, orden: c.orden })
  }

  const handleDeleteContacto = async (id) => {
    if (!confirm('¿Eliminar este contacto?')) return
    await api.delete(`/whatsapp/contactos/${id}`)
    fetchContactos()
  }

  const cancelEdit = () => { setEditId(null); setCForm(emptyContacto) }

  const buildContactosPreview = () => {
    const draft = { id: editId || 'draft', nombre: cForm.nombre || 'Nuevo contacto', cargo: cForm.cargo || 'Cargo', numero: cForm.numero, color: cForm.color }
    const tieneContenido = cForm.nombre || cForm.cargo || cForm.numero
    if (editId) return contactos.map(c => c.id === editId ? draft : c)
    return tieneContenido ? [...contactos, draft] : contactos
  }

  return (
    <EditorLayout
      preview={<WhatsappWidget preview={config} contactosPreview={buildContactosPreview()} />}
      previewLabel="Widget de WhatsApp"
    >
      {/* Textos del widget */}
      <div style={styles.formBox}>
        <h3 style={styles.formTitle}>Textos del widget</h3>
        <Field label="Título" name="titulo" value={config.titulo} onChange={handleConfigChange} />
        <Field label="Estado (ej: En línea · responde...)" name="estado" value={config.estado} onChange={handleConfigChange} />
        <Field label="Mensaje de bienvenida" name="bienvenida" value={config.bienvenida} onChange={handleConfigChange} textarea />
        <div style={{ marginBottom: '16px' }}>
          <label style={styles.checkLabel}>
            <input type="checkbox" name="activo" checked={config.activo} onChange={handleConfigChange} style={{ marginRight: '8px' }} />
            <span style={{ color: '#8A9BB0', fontSize: '13px' }}>Mostrar widget en la web</span>
          </label>
        </div>
        <SaveBtn onClick={handleSaveConfig} loading={loading} msg={msg} label="Guardar textos" />
      </div>

      {/* CRUD de contactos */}
      <div style={styles.formBox}>
        <h3 style={styles.formTitle}>{editId ? 'Editar contacto' : 'Agregar contacto'}</h3>
        <Field label="Nombre" name="nombre" value={cForm.nombre} onChange={handleContactoChange} />
        <Field label="Cargo" name="cargo" value={cForm.cargo} onChange={handleContactoChange} />
        <Field label="Número (con código país, ej: 51987654321)" name="numero" value={cForm.numero} onChange={handleContactoChange} />

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', color: '#29B6D8', fontSize: '11px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>Color del avatar</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {colores.map(col => (
              <button
                key={col}
                onClick={() => setCForm({ ...cForm, color: col })}
                style={{ width: '32px', height: '32px', borderRadius: '50%', background: col, border: cForm.color === col ? '3px solid #fff' : '2px solid rgba(255,255,255,0.2)', cursor: 'pointer' }}
              />
            ))}
          </div>
        </div>

        <Field label="Orden" name="orden" type="number" value={cForm.orden} onChange={handleContactoChange} />
        <SaveBtn onClick={handleSaveContacto} label={editId ? 'Actualizar contacto' : 'Agregar contacto'} />
        {editId && <button onClick={cancelEdit} style={styles.cancelBtn}>Cancelar</button>}
      </div>

      <div style={styles.list}>
        {contactos.map(c => (
          <div key={c.id} style={styles.listItem}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '13px', fontWeight: '700' }}>
                {c.nombre.charAt(0).toUpperCase()}
              </div>
              <div>
                <span style={styles.listTitle}>{c.nombre}</span>
                <span style={{ color: '#8A9BB0', fontSize: '12px', marginLeft: '8px' }}>{c.cargo}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => handleEditContacto(c)} style={styles.editBtn}>Editar</button>
              <button onClick={() => handleDeleteContacto(c.id)} style={styles.deleteBtn}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </EditorLayout>
  )
}