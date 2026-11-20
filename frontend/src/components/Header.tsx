interface HeaderProps {
  onReset?: () => void
}

export default function Header({ onReset }: HeaderProps) {
  return (
    <header style={{
      height: 60,
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      background: 'var(--surface)',
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Logo icon */}
        <div style={{
          width: 32, height: 32,
          borderRadius: 8,
          background: 'linear-gradient(135deg, #6366f1, #818cf8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16,
        }}>🎨</div>
        <div>
          <span style={{ fontWeight: 700, fontSize: '0.95rem', letterSpacing: '-0.01em' }}>Design Critique AI</span>
          <span style={{ marginLeft: 8, fontSize: '0.72rem', background: 'var(--accent-glow)', color: 'var(--accent-hover)', padding: '2px 7px', borderRadius: 20, border: '1px solid rgba(99,102,241,0.3)' }}>
            Gemini 2.0 Flash Vision
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>15-Category Audit</span>
        {onReset && (
          <button onClick={onReset} style={{
            background: 'var(--surface-3)', border: '1px solid var(--border)', color: 'var(--text-muted)',
            padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontSize: '0.82rem', fontWeight: 500,
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = 'var(--accent)'; (e.target as HTMLElement).style.color = 'var(--accent-hover)'; }}
          onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = 'var(--border)'; (e.target as HTMLElement).style.color = 'var(--text-muted)'; }}
          >
            New Upload
          </button>
        )}
      </div>
    </header>
  )
}
