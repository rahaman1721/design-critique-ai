interface UploadedDesignCardProps {
  imageUrl: string | null
  onTriggerUpload: () => void
}

export default function UploadDesignCard({ imageUrl, onTriggerUpload }: UploadedDesignCardProps) {
  return (
    <div style={{
      width: 320,
      background: '#0d0f1a',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: 18,
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 14,
        padding: '0 4px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#e2e8f0' }}>
            Uploaded Design
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{
            color: '#10b981',
            fontSize: '0.75rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Analysis Complete • 2.8s
          </span>
        </div>
      </div>

      {/* Main Preview Container */}
      <div
        onClick={onTriggerUpload}
        style={{
          background: '#ffffff',
          borderRadius: 16,
          padding: '16px 14px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: 460,
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)',
        }}
        title="Click to change uploaded screenshot"
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Uploaded UI screenshot"
            style={{
              width: '100%',
              height: '100%',
              maxHeight: 450,
              objectFit: 'contain',
              borderRadius: 10,
            }}
          />
        ) : (
          /* Exact Reference Mockup of Moon Bot */
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
            {/* Bot Top Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 12, borderBottom: '1px solid #f1f5f9' }}>
              <div style={{
                width: 26,
                height: 26,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1e1b4b, #4f46e5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffffff">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0f172a' }}>Moon Bot</div>
                <div style={{ fontSize: '0.65rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: 3 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981' }} />
                  Online now
                </div>
              </div>
            </div>

            {/* Central Bot Character & Greetings */}
            <div style={{ textAlign: 'center', padding: '36px 8px 24px' }}>
              {/* Purple Glowing Eye Orb */}
              <div style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #8b5cf6 0%, #4338ca 60%, #1e1b4b 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                boxShadow: '0 8px 24px rgba(99, 102, 241, 0.4)',
                position: 'relative',
              }}>
                <div style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: '#090a14',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8)',
                }} />
              </div>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: 6 }}>
                Hi there 👋
              </h2>
              <p style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.5, maxWidth: 220, margin: '0 auto' }}>
                Welcome to Moon Bot. Ask me anything — I'm here to help!
              </p>

              <div style={{
                marginTop: 22,
                fontSize: '0.68rem',
                fontWeight: 700,
                color: '#94a3b8',
                letterSpacing: '0.06em',
                textAlign: 'left',
                paddingLeft: 4,
              }}>
                COMMON QUESTIONS
              </div>
            </div>

            {/* Bottom Input Field */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 20,
              marginTop: 'auto',
            }}>
              <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Type your message...</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>⋮</span>
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: '#6366f1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Details */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 14,
        padding: '0 4px',
        color: '#64748b',
        fontSize: '0.75rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
          </svg>
          <span>Design Size: 375 × 667</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
          <span>Desktop View ▾</span>
        </div>
      </div>
    </div>
  )
}
