import { useState } from 'react'

interface UploadedDesignCardProps {
  imageUrl: string | null
  onTriggerUpload: () => void
}

export default function UploadDesignCard({ imageUrl, onTriggerUpload }: UploadedDesignCardProps) {
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'desktop'>('mobile')

  return (
    <div style={{
      width: 340,
      background: 'var(--bg-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
          <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            Uploaded Design
          </span>
        </div>

        {/* Status Indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          color: 'var(--success)',
          fontSize: '0.74rem',
          fontWeight: 600,
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Analysis Complete • 2.8s</span>
        </div>
      </div>

      {/* Frame Container */}
      <div
        onClick={onTriggerUpload}
        style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: 460,
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)',
        }}
        title="Click to replace or upload a new design"
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Uploaded UI Design"
            style={{
              width: '100%',
              height: '100%',
              maxHeight: 460,
              objectFit: 'contain',
              borderRadius: 8,
            }}
          />
        ) : (
          /* High-Fidelity Clean Moon Bot Mockup */
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            {/* Mockup Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              paddingBottom: 12,
              borderBottom: '1px solid #f1f5f9',
            }}>
              <div style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1e1b4b, #4338ca)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffffff">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>Moon Bot</div>
                <div style={{ fontSize: '0.66rem', color: '#16a34a', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#16a34a' }} />
                  Online now
                </div>
              </div>
            </div>

            {/* Central Content */}
            <div style={{ textAlign: 'center', padding: '36px 8px 20px' }}>
              {/* Moon Bot Avatar Orb */}
              <div style={{
                width: 62,
                height: 62,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #7865FF 0%, #4338ca 60%, #1e1b4b 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                boxShadow: '0 8px 24px rgba(120, 101, 255, 0.35)',
              }}>
                <div style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: '#070916',
                }} />
              </div>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: 6 }}>
                Hi there 👋
              </h2>
              <p style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.5, maxWidth: 220, margin: '0 auto' }}>
                Welcome to Moon Bot. Ask me anything — I'm here to help!
              </p>

              <div style={{
                marginTop: 24,
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

            {/* Bottom Message Field */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '9px 12px',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 24,
              marginTop: 'auto',
            }}>
              <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Type your message...</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>⋮</span>
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: '#7865FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="white">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info & Device Selector */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 14,
        color: 'var(--text-muted)',
        fontSize: '0.75rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
          </svg>
          <span>Design Size: {deviceMode === 'mobile' ? '375 × 667' : '1440 × 900'}</span>
        </div>

        <button
          onClick={() => setDeviceMode(m => m === 'mobile' ? 'desktop' : 'mobile')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            fontSize: '0.75rem',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect width="20" height="14" x="2" y="3" rx="2" />
            <line x1="8" x2="16" y1="21" y2="21" />
            <line x1="12" x2="12" y1="17" y2="21" />
          </svg>
          <span>{deviceMode === 'mobile' ? 'Desktop View ▾' : 'Mobile View ▾'}</span>
        </button>
      </div>
    </div>
  )
}
