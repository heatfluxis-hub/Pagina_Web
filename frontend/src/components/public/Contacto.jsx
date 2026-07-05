import { useEffect, useState } from 'react'
import api from '../../services/api'

export default function Contacto({ preview }) {
  const [fetched, setFetched] = useState(null)
  const [form, setForm] = useState({ nombre: '', empresa: '', telefono: '', correo: '', servicio: '', mensaje: '' })
  const [enviado, setEnviado] = useState(false)

  useEffect(() => {
    if (preview) return
    api.get('/contacto').then(res => setFetched(res.data)).catch(() => {})
  }, [preview])

  const data = preview || fetched

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = () => {
    setEnviado(true)
    setTimeout(() => setEnviado(false), 3000)
  }

  return (
    <section id="contacto" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.grid}>
          <div>
            <div style={styles.tag}>Hablemos</div>
            <h2 style={styles.title}>Solicita tu <span style={{ color: '#FF6B1A' }}>Cotización</span></h2>
            <p style={styles.p}>Cuéntanos sobre tu proyecto y te responderemos en menos de 24 horas con una propuesta técnica y económica a tu medida.</p>
            <div style={styles.infoList}>
              {[
                { ico: '📞', label: 'Teléfono', val: data?.telefono || '+51 923 619 993' },
                { ico: '✉️', label: 'Correo electrónico', val: data?.email || 'heatfluix@gmail.com' },
                { ico: '📍', label: 'Ubicación', val: data?.direccion || 'Lima, Perú' },
              ].map((item, i) => (
                <div key={i} style={styles.infoItem}>
                  <div style={styles.infoIco}>{item.ico}</div>
                  <div>
                    <div style={styles.infoLabel}>{item.label}</div>
                    <div style={styles.infoVal}>{item.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={styles.formBox}>
            <div style={styles.formRow}>
              <Input label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Tu nombre" />
              <Input label="Empresa" name="empresa" value={form.empresa} onChange={handleChange} placeholder="Tu empresa" />
            </div>
            <div style={styles.formRow}>
              <Input label="Teléfono" name="telefono" value={form.telefono} onChange={handleChange} placeholder="+51 000 000 000" />
              <Input label="Correo" name="correo" value={form.correo} onChange={handleChange} placeholder="correo@empresa.com" />
            </div>
            <div style={styles.group}>
              <label style={styles.label}>Servicio requerido</label>
              <select name="servicio" value={form.servicio} onChange={handleChange} style={styles.input}>
                <option value="">Selecciona un servicio</option>
                <option>Reparación de equipos</option>
                <option>Mantenimiento preventivo/correctivo</option>
                <option>Fabricación de intercambiadores</option>
                <option>Inspección técnica</option>
                <option>Otro servicio</option>
              </select>
            </div>
            <div style={styles.group}>
              <label style={styles.label}>Mensaje</label>
              <textarea name="mensaje" value={form.mensaje} onChange={handleChange} placeholder="Describe brevemente tu proyecto..." style={{ ...styles.input, height: '120px', resize: 'vertical' }} />
            </div>
            <button onClick={handleSubmit} style={{ ...styles.btnSubmit, background: enviado ? '#28a745' : '#FF6B1A' }}>
              {enviado ? '✓ Mensaje enviado' : 'Enviar solicitud →'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

const Input = ({ label, name, value, onChange, placeholder }) => (
  <div style={styles.group}>
    <label style={styles.label}>{label}</label>
    <input name={name} value={value} onChange={onChange} placeholder={placeholder} style={styles.input} />
  </div>
)

const styles = {
  section: { padding: '100px 2rem', background: '#F5F8FF' },
  container: { maxWidth: '1200px', margin: '0 auto' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' },
  tag: { fontSize: '12px', fontWeight: '600', color: '#29B6D8', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' },
  title: { fontFamily: 'sans-serif', fontSize: 'clamp(32px,4vw,52px)', fontWeight: '800', textTransform: 'uppercase', lineHeight: 1.1, color: '#0A1628', marginBottom: '1.5rem' },
  p: { color: '#555', lineHeight: 1.8, marginBottom: '2rem', fontSize: '15px' },
  infoList: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  infoItem: { display: 'flex', alignItems: 'center', gap: '16px' },
  infoIco: { width: '44px', height: '44px', background: 'linear-gradient(135deg,#0F2A3D,#0A1628)', border: '1px solid rgba(41,182,216,0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 },
  infoLabel: { fontSize: '11px', color: '#29B6D8', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '2px' },
  infoVal: { fontSize: '15px', fontWeight: '600', color: '#0A1628' },
  formBox: { background: '#fff', border: '1px solid #e8ecf2', borderTop: '3px solid #29B6D8', borderRadius: '12px', padding: '40px' },
  formRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '0' },
  group: { marginBottom: '1rem' },
  label: { display: 'block', fontSize: '12px', fontWeight: '600', color: '#0A1628', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' },
  input: { width: '100%', padding: '12px 16px', border: '1px solid #e8ecf2', borderRadius: '4px', fontSize: '14px', color: '#222', outline: 'none', fontFamily: 'Inter, sans-serif', background: '#F5F8FF', boxSizing: 'border-box' },
  btnSubmit: { width: '100%', color: '#fff', padding: '16px', border: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer', marginTop: '0.5rem', transition: 'background 0.3s' }
}