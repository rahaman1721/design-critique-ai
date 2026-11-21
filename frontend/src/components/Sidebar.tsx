interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  onUpgradeClick?: () => void
}

export default function Sidebar({ activeTab, onTabChange, onUpgradeClick }: SidebarProps) {
  const navItems = [
    {
      id: 'audit',
      label: 'Audit',
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
    {
      id: 'history',
      label: 'History',
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      id: 'templates',
      label: 'Templates',
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
  ]

  return (
    <aside style={{
      width: 200,
      background: '#070814',
      borderRight: '1px solid rgba(255, 255, 255, 0.06)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '24px 14px',
      flexShrink: 0,
      height: '100%',
      userSelect: 'none',
      zIndex: 20,
    }}>
      {/* Top Brand Logo & Navigation */}
      <div>
        {/* Brand Header — Pure SVG 4-Point Star */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 4px 28px' }}>
          {/* Pure SVG Iridescent 4-Point Diamond Star — no raster artifact */}
          <div style={{
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            filter: 'drop-shadow(0 0 10px rgba(120, 101, 255, 0.6))',
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <defs>
                <linearGradient id="starGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="50%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="url(#starGrad)" />
            </svg>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <span style={{
                fontWeight: 800,
                fontSize: '0.9rem',
                letterSpacing: '-0.02em',
                color: '#ffffff',
                lineHeight: 1.2,
              }}>
                Design Critique AI
              </span>
              <span style={{
                fontSize: '0.6rem',
                fontWeight: 700,
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#94a3b8',
                padding: '1px 5px',
                borderRadius: 4,
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}>
                v2.0
              </span>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {navItems.map(item => {
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '9px 12px',
                  borderRadius: 12,
                  border: isActive ? '1px solid rgba(99, 102, 241, 0.5)' : '1px solid transparent',
                  background: isActive
                    ? 'linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #4338ca 100%)'
                    : 'transparent',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  fontSize: '0.84rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                  boxShadow: isActive
                    ? '0 4px 18px rgba(59, 130, 246, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    : 'none',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'
                    e.currentTarget.style.color = '#ffffff'
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = '#94a3b8'
                  }
                }}
              >
                <span style={{ display: 'flex', color: isActive ? '#ffffff' : 'inherit' }}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Bottom Upgrade Card & User Profile */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Pure CSS Upgrade Card — zero raster artifacts */}
        <div style={{
          position: 'relative',
          background: 'linear-gradient(145deg, #101428 0%, #0a0d1c 100%)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 14,
          padding: '16px 14px',
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
        }}>
          {/* Pure CSS 3D Orb Glow — no baked image with text artifacts */}
          <div style={{
            position: 'absolute',
            right: -10,
            bottom: -10,
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, rgba(129, 140, 248, 0.6) 0%, rgba(120, 101, 255, 0.4) 40%, rgba(30, 27, 75, 0.3) 70%, transparent 100%)',
            boxShadow: '0 0 30px rgba(120, 101, 255, 0.35), 0 0 60px rgba(120, 101, 255, 0.15)',
            pointerEvents: 'none',
          }} />
          {/* Secondary ambient glow */}
          <div style={{
            position: 'absolute',
            right: 10,
            bottom: 20,
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.3) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 2 }}>
            <p style={{
              fontSize: '0.84rem',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.4,
              marginBottom: 14,
            }}>
              Create better<br />designs, faster.
            </p>

            <button
              onClick={onUpgradeClick}
              style={{
                background: '#7865FF',
                border: 'none',
                borderRadius: 8,
                padding: '6px 14px',
                color: '#ffffff',
                fontSize: '0.76rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                boxShadow: '0 4px 14px rgba(120, 101, 255, 0.45)',
                transition: 'transform 0.1s ease, background 0.15s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#6853ff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#7865FF'; }}
              onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.97)'; }}
              onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              Upgrade →
            </button>
          </div>
        </div>

        {/* Obi User Profile Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 10px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: 12,
          cursor: 'pointer',
          transition: 'background 0.15s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'; }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Pure CSS Avatar with Gradient + Online Dot */}
            <div style={{
              position: 'relative',
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.72rem',
              color: '#ffffff',
              border: '1.5px solid rgba(255, 255, 255, 0.2)',
              flexShrink: 0,
            }}>
              O
              <span style={{
                position: 'absolute',
                bottom: -1,
                right: -1,
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#16C995',
                border: '1.5px solid #070814',
              }} />
            </div>

            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }}>Obi</div>
              <div style={{
                display: 'inline-block',
                fontSize: '0.62rem',
                fontWeight: 700,
                color: '#c7d2fe',
                background: '#3b2a6b',
                padding: '1px 6px',
                borderRadius: 9999,
                marginTop: 1,
              }}>
                Pro Plan
              </div>
            </div>
          </div>
          <span style={{ color: '#64748b', fontSize: '0.85rem' }}>›</span>
        </div>
      </div>
    </aside>
  )
}
