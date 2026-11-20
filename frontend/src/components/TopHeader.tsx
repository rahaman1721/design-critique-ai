interface TopHeaderProps {
  onNewUpload: () => void
}

export default function TopHeader({ onNewUpload }: TopHeaderProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 0 20px',
      flexShrink: 0,
    }}>
      {/* Title & Subtitle */}
      <div>
        <h1 style={{
          fontSize: '1.85rem',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          color: '#ffffff',
          marginBottom: 4,
        }}>
          Design Critique AI
        </h1>
        <p style={{
          fontSize: '0.88rem',
          color: '#94a3b8',
        }}>
          Get expert-level feedback on your design, powered by AI.
        </p>
      </div>

      {/* Right Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Category Pill Dropdown */}
        <button style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.09)',
          borderRadius: 10,
          padding: '9px 14px',
          color: '#cbd5e1',
          fontSize: '0.78rem',
          fontWeight: 700,
          letterSpacing: '0.04em',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          cursor: 'pointer',
        }}>
          <span>15-CATEGORY AUDIT</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {/* New Upload Button */}
        <button
          onClick={onNewUpload}
          style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            border: 'none',
            borderRadius: 10,
            padding: '9px 18px',
            color: '#ffffff',
            fontSize: '0.84rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(139, 92, 246, 0.35)',
            transition: 'transform 0.1s ease',
          }}
          onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.97)'; }}
          onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <span>New Upload</span>
        </button>
      </div>
    </div>
  )
}
