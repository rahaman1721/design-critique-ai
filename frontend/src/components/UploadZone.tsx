import { useCallback, useState } from 'react'

interface UploadZoneProps {
  onFile: (file: File) => void
}

export default function UploadZone({ onFile }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) onFile(file)
  }, [onFile])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onFile(file)
  }, [onFile])

  return (
    <div style={{ width: '100%', maxWidth: 520, textAlign: 'center' }}>
      {/* Hero */}
      <div style={{ marginBottom: 36 }}>
        <div style={{
          width: 72, height: 72,
          borderRadius: 20,
          background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(129,140,248,0.1))',
          border: '1px solid rgba(99,102,241,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
          fontSize: 32,
        }}>🔬</div>
        <h1 style={{ fontSize: '1.9rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 10 }}>
          AI Design Critic
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: 400, margin: '0 auto' }}>
          Upload any UI screenshot and get a comprehensive <strong style={{ color: 'var(--text)' }}>15-category design audit</strong> powered by Gemini Vision — visual hierarchy, accessibility, mobile UX, brand alignment, and more.
        </p>
      </div>

      {/* Drop Zone */}
      <label
        onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        style={{
          display: 'block',
          border: `2px dashed ${isDragging ? 'var(--accent)' : 'var(--border)'}`,
          borderRadius: 16,
          padding: '40px 32px',
          cursor: 'pointer',
          background: isDragging ? 'var(--accent-glow)' : 'var(--surface)',
          transition: 'all 0.2s',
          marginBottom: 20,
        }}
      >
        <input type="file" accept="image/*" onChange={handleInputChange} style={{ display: 'none' }} />
        <div style={{ fontSize: 32, marginBottom: 12 }}>📁</div>
        <p style={{ fontWeight: 600, marginBottom: 6, fontSize: '0.95rem' }}>
          {isDragging ? 'Drop your screenshot here' : 'Drag & drop your UI screenshot'}
        </p>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.82rem' }}>
          or <span style={{ color: 'var(--accent-hover)', textDecoration: 'underline' }}>click to browse</span> — PNG, JPG, WebP up to 10MB
        </p>
      </label>

      {/* Category chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
        {['Visual Hierarchy', 'Accessibility', 'Typography', 'Color & Contrast', 'Mobile UX', 'CTA Clarity', '+ 9 more'].map(cat => (
          <span key={cat} style={{
            padding: '4px 10px',
            background: 'var(--surface-2)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 20,
            fontSize: '0.72rem',
            color: 'var(--text-dim)',
          }}>{cat}</span>
        ))}
      </div>
    </div>
  )
}
