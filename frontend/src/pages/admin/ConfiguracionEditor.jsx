import { useState, useEffect } from 'react'
import api from '../../services/api'
import { Field, SaveBtn } from './components'
import { styles as editorStyles } from './editorStyles'
import ImageUploader from '../../components/admin/ImageUploader'
import { useConfig } from '../../components/admin/ConfigContext'
import { imageUrl } from '../../services/imageUrl'

export default function ConfiguracionEditor() {
  const { reloadConfig } = useConfig()
  const [form, setForm] = useState({
    nombreEmpresa: 'HEATFLUIX',
    sublema: 'INDUSTRIAL SOLUTIONS',
    logoId: null,
    footerDesc: '',
    copyright: '',
    linkedin: '',
    facebook: '',
    whatsapp: ''
  })
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    api.get('/configuracion').then(res => { if (res.data) setForm(res.data) })
  }, [])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const handleLogo = (id) => setForm({ ...form, logoId: id })

  const handleSave = async () => {
    setLoading(true)
    try {
      await api.post('/configuracion', form)
      setMsg('✓ Guardado correctamente')
      reloadConfig()
    } catch {
      setMsg('✗ Error al guardar')
    } finally {
      setLoading(false)
      setTimeout(() => setMsg(''), 3000)
    }
  }

  const logo = form.logoId ? imageUrl(form.logoId) : null

  return (
    <div style={styles.split}>
      {/* EDITOR */}
      <div style={styles.editorPanel}>
        <div style={styles.editorTitle}>Editor de configuración</div>
        <div style={styles.editorHint}>Los cambios se reflejan en la vista previa mientras editas.</div>

        <div style={editorStyles.formBox}>
          <h3 style={editorStyles.formTitle}>Marca</h3>
          <ImageUploader value={form.logoId} onChange={handleLogo} label="Logo de la empresa" />
          <Field label="Nombre de la empresa" name="nombreEmpresa" value={form.nombreEmpresa} onChange={handleChange} />
          <Field label="Sublema" name="sublema" value={form.sublema} onChange={handleChange} />
        </div>

        <div style={editorStyles.formBox}>
          <h3 style={editorStyles.formTitle}>Footer</h3>
          <Field label="Descripción del footer" name="footerDesc" value={form.footerDesc} onChange={handleChange} textarea />
          <Field label="Texto de copyright" name="copyright" value={form.copyright} onChange={handleChange} />
        </div>

        <div style={editorStyles.formBox}>
          <h3 style={editorStyles.formTitle}>Redes sociales</h3>
          <Field label="LinkedIn (URL)" name="linkedin" value={form.linkedin} onChange={handleChange} />
          <Field label="Facebook (URL)" name="facebook" value={form.facebook} onChange={handleChange} />
          <Field label="WhatsApp (URL o número)" name="whatsapp" value={form.whatsapp} onChange={handleChange} />
        </div>

        <SaveBtn onClick={handleSave} loading={loading} msg={msg} />
      </div>

      {/* PREVIEW */}
      <div style={styles.previewPanel}>
        <div style={styles.previewBar}>
          <div style={styles.previewDot} />
          <span style={styles.previewLabel}>Vista previa en vivo — Marca y Footer</span>
        </div>
        <div style={styles.previewScroll}>
          {/* Mini navbar */}
          <div style={styles.pNav}>
            <div style={styles.pLogo}>
              {logo
                ? <img src={logo} alt="logo" style={styles.pLogoImg} />
                : <div style={styles.pLogoIcon}>HF</div>
              }
              <div>
                <span style={styles.pLogoText}>{form.nombreEmpresa || 'HEATFLUIX'}</span>
                <span style={styles.pLogoSub}>{form.sublema || 'INDUSTRIAL SOLUTIONS'}</span>
              </div>
            </div>
            <div style={styles.pNavLinks}>
              <span>Inicio</span><span>Nosotros</span><span>Servicios</span>
              <span style={styles.pNavBtn}>Contacto</span>
            </div>
          </div>

          {/* Mini footer */}
          <div style={styles.pFooter}>
            <div style={styles.pLogo}>
              {logo
                ? <img src={logo} alt="logo" style={styles.pLogoImg} />
                : <div style={styles.pLogoIcon}>HF</div>
              }
              <div>
                <span style={styles.pLogoText}>{form.nombreEmpresa || 'HEATFLUIX'}</span>
                <span style={styles.pLogoSub}>{form.sublema || 'INDUSTRIAL SOLUTIONS'}</span>
              </div>
            </div>
            <p style={styles.pFooterDesc}>{form.footerDesc || 'Especialistas en reparación, mantenimiento y fabricación de equipos de intercambio térmico para la industria.'}</p>
            <div style={styles.pFooterBottom}>
              <span style={styles.pCopy}>{form.copyright || '© 2024 HeatFluix Industrial Solutions SAC. Todos los derechos reservados.'}</span>
              <div style={styles.pSocials}>
                {[
                  { label: 'in', url: form.linkedin },
                  { label: 'f', url: form.facebook },
                  { label: 'wa', url: form.whatsapp },
                ].filter(r => r.url).map(r => (
                  <span key={r.label} style={styles.pSocialBtn}>{r.label}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  split: { display: 'grid', gridTemplateColumns: '420px 1fr', gap: '0', height: 'calc(100vh - 90px)', margin: '-40px' },
  editorPanel: { padding: '32px', borderRight: '1px solid rgba(255,255,255,0.06)', overflowY: 'auto' },
  editorTitle: { fontSize: '13px', color: '#29B6D8', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '600', marginBottom: '8px' },
  editorHint: { fontSize: '12px', color: '#8A9BB0', marginBottom: '28px', lineHeight: 1.6 },
  previewPanel: { background: '#0A1628', display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  previewBar: { padding: '12px 24px', background: 'rgba(41,182,216,0.06)', borderBottom: '1px solid rgba(41,182,216,0.15)', display: 'flex', alignItems: 'center', gap: '10px' },
  previewDot: { width: '8px', height: '8px', borderRadius: '50%', background: '#29B6D8' },
  previewLabel: { fontSize: '11px', color: '#29B6D8', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '600' },
  previewScroll: { flex: 1, overflow: 'auto', padding: '40px' },
  // mini navbar
  pNav: { background: 'rgba(10,22,40,0.96)', border: '1px solid rgba(41,182,216,0.25)', borderRadius: '8px', padding: '0 24px', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' },
  pLogo: { display: 'flex', alignItems: 'center', gap: '10px' },
  pLogoIcon: { width: '40px', height: '40px', background: 'linear-gradient(135deg,#29B6D8,#FF6B1A)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '16px', color: '#fff' },
  pLogoImg: { width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' },
  pLogoText: { fontFamily: 'sans-serif', fontSize: '20px', fontWeight: '700', color: '#fff', letterSpacing: '1px', display: 'block' },
  pLogoSub: { fontSize: '9px', color: '#29B6D8', letterSpacing: '3px', display: 'block', marginTop: '-4px' },
  pNavLinks: { display: 'flex', alignItems: 'center', gap: '20px', fontSize: '12px', color: '#8A9BB0', textTransform: 'uppercase', letterSpacing: '1px' },
  pNavBtn: { background: '#FF6B1A', color: '#fff', padding: '8px 18px', borderRadius: '4px', fontWeight: '600' },
  // mini footer
  pFooter: { background: '#060E1C', borderTop: '2px solid', borderImage: 'linear-gradient(90deg,#29B6D8,#FF6B1A) 1', borderRadius: '8px', padding: '32px' },
  pFooterDesc: { fontSize: '13px', color: '#8A9BB0', lineHeight: 1.7, maxWidth: '360px', marginTop: '1rem' },
  pFooterBottom: { marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  pCopy: { fontSize: '12px', color: '#8A9BB0' },
  pSocials: { display: 'flex', gap: '10px' },
  pSocialBtn: { width: '32px', height: '32px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(41,182,216,0.2)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#8A9BB0' }
}