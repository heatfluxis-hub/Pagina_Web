export const Field = ({ label, name, value, onChange, type = 'text', textarea }) => (
  <div style={styles.group}>
    <label style={styles.label}>{label}</label>
    {textarea
      ? <textarea name={name} value={value} onChange={onChange} style={{ ...styles.input, height: '100px', resize: 'vertical' }} />
      : <input type={type} name={name} value={value} onChange={onChange} style={styles.input} />
    }
  </div>
)

export const SaveBtn = ({ onClick, loading, msg, label = 'Guardar cambios' }) => (
  <div>
    <button onClick={onClick} disabled={loading} style={styles.saveBtn}>
      {loading ? 'Guardando...' : label}
    </button>
    {msg && <span style={{ marginLeft: '16px', color: msg.includes('✓') ? '#29B6D8' : '#ff4d4d', fontSize: '13px' }}>{msg}</span>}
  </div>
)

const styles = {
  group: { marginBottom: '20px' },
  label: { display: 'block', color: '#29B6D8', fontSize: '11px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' },
  input: { width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid rgba(41,182,216,0.2)', borderRadius: '4px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' },
  saveBtn: { padding: '12px 32px', background: '#FF6B1A', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }
}