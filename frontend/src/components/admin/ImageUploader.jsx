import { useState, useRef } from 'react'
import api from '../../services/api'
import { imageUrl } from '../../services/imageUrl'

export default function ImageUploader({ value, onChange, label = 'Imagen' }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  const handleFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    setError('')

    const formData = new FormData()
    formData.append('imagen', file)

    try {
      // No forzamos Content-Type: axios agrega el boundary automáticamente
      const res = await api.post('/imagenes', formData)
      onChange(res.data.id)
    } catch {
      setError('Error al subir la imagen')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const handleRemove = () => onChange(null)

  return (
    <div style={styles.wrapper}>
      <label style={styles.label}>{label}</label>

      {value ? (
        <div style={styles.preview}>
          <img src={imageUrl(value)} alt="preview" style={styles.img} />
          <div style={styles.overlay}>
            <button type="button" onClick={() => inputRef.current?.click()} style={styles.changeBtn}>
              Cambiar
            </button>
            <button type="button" onClick={handleRemove} style={styles.removeBtn}>
              Quitar
            </button>
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => inputRef.current?.click()} style={styles.dropzone} disabled={uploading}>
          {uploading ? '⏳ Subiendo...' : '📁 Seleccionar imagen'}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        style={{ display: 'none' }}
      />

      {error && <span style={styles.error}>{error}</span>}
    </div>
  )
}

const styles = {
  wrapper: { marginBottom: '20px' },
  label: { display: 'block', color: '#29B6D8', fontSize: '11px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' },
  dropzone: { width: '100%', padding: '32px', background: '#0A1628', border: '1px dashed rgba(41,182,216,0.4)', borderRadius: '8px', color: '#8A9BB0', fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'border 0.2s' },
  preview: { position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(41,182,216,0.2)' },
  img: { width: '100%', height: '160px', objectFit: 'cover', display: 'block' },
  overlay: { position: 'absolute', top: '8px', right: '8px', display: 'flex', gap: '8px' },
  changeBtn: { padding: '6px 14px', background: 'rgba(41,182,216,0.9)', border: 'none', borderRadius: '4px', color: '#fff', fontSize: '12px', fontWeight: '600', cursor: 'pointer' },
  removeBtn: { padding: '6px 14px', background: 'rgba(255,77,77,0.9)', border: 'none', borderRadius: '4px', color: '#fff', fontSize: '12px', fontWeight: '600', cursor: 'pointer' },
  error: { display: 'block', color: '#ff4d4d', fontSize: '12px', marginTop: '8px' }
}