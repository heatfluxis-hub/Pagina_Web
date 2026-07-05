export default function EditorLayout({ children, preview, previewLabel, scale = 0.55 }) {
  return (
    <div style={styles.split}>
      <div style={styles.editorPanel}>
        <div style={styles.editorTitle}>Editor de la sección</div>
        <div style={styles.editorHint}>Los cambios se reflejan en la vista previa mientras escribes.</div>
        {children}
      </div>
      <div style={styles.previewPanel}>
        <div style={styles.previewBar}>
          <div style={styles.previewDot} />
          <span style={styles.previewLabel}>Vista previa en vivo — {previewLabel}</span>
        </div>
        <div style={styles.previewScroll}>
          <div style={{ ...styles.previewCanvas, transform: `scale(${scale})`, width: `${100 / scale}%`, height: `${100 / scale}%` }}>
            {preview}
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  split: { display: 'grid', gridTemplateColumns: '420px 1fr', gap: '0', height: 'calc(100vh - 90px)', margin: '-40px', marginTop: '-40px' },
  editorPanel: { padding: '32px', borderRight: '1px solid rgba(255,255,255,0.06)', overflowY: 'auto' },
  editorTitle: { fontSize: '13px', color: '#29B6D8', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '600', marginBottom: '8px' },
  editorHint: { fontSize: '12px', color: '#8A9BB0', marginBottom: '28px', lineHeight: 1.6 },
  previewPanel: { background: '#0A1628', display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  previewBar: { padding: '12px 24px', background: 'rgba(41,182,216,0.06)', borderBottom: '1px solid rgba(41,182,216,0.15)', display: 'flex', alignItems: 'center', gap: '10px' },
  previewDot: { width: '8px', height: '8px', borderRadius: '50%', background: '#29B6D8' },
  previewLabel: { fontSize: '11px', color: '#29B6D8', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '600' },
  previewScroll: { flex: 1, overflow: 'auto', position: 'relative' },
  previewCanvas: { transformOrigin: 'top left' }
}