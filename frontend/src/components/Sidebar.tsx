interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const navItems = [
    {
      id: 'audit',
      label: 'Audit',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18" />
          <path d="m19 9-5 5-4-4-3 3" />
        </svg>
      ),
    },
    {
      id: 'history',
      label: 'History',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      id: 'templates',
      label: 'Templates',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      ),
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
  ]

  return (
    <aside style={{
      width: 240,
      background: 'var(--bg-sidebar)',
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '24px 16px',
      flexShrink: 0,
      height: '100%',
      userSelect: 'none',
    }}>
      {/* Brand Header & Navigation */}
      <div>
        {/* Brand Logo & Name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 8px 28px' }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: 'var(--accent-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(120, 101, 255, 0.35)',
            flexShrink: 0,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              fontWeight: 700,
              fontSize: '0.94rem',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
            }}>
              Design Critique AI
            </span>
            <span style={{
              fontSize: '0.62rem',
              fontWeight: 700,
              background: 'rgba(255, 255, 255, 0.06)',
              color: 'var(--text-muted)',
              padding: '1px 5px',
              borderRadius: 4,
              border: '1px solid var(--border-subtle)',
            }}>
              v2.0
            </span>
          </div>
        </div>

        {/* Navigation Items */}
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
                  gap: 12,
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: isActive ? '1px solid rgba(120, 101, 255, 0.3)' : '1px solid transparent',
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(120, 101, 255, 0.16) 0%, rgba(78, 139, 255, 0.08) 100%)'
                    : 'transparent',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'
                    e.currentTarget.style.color = 'var(--text-primary)'
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'var(--text-muted)'
                  }
                }}
              >
                <span style={{ color: isActive ? 'var(--accent-primary)' : 'inherit', display: 'flex' }}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Bottom Upgrade Box & Profile */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Subtle Luxury Upgrade Card */}
        <div style={{
          position: 'relative',
          background: 'linear-gradient(180deg, rgba(20, 27, 48, 0.6) 0%, rgba(16, 22, 41, 0.9) 100%)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          overflow: 'hidden',
        }}>
          {/* Subtle Ambient Aurora Light */}
          <div style={{
            position: 'absolute',
            bottom: -20,
            right: -20,
            width: 90,
            height: 90,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(120, 101, 255, 0.25) 0%, transparent 70%)',
            filter: 'blur(10px)',
            pointerEvents: 'none',
          }} />

          <p style={{
            fontSize: '0.82rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            lineHeight: 1.45,
            marginBottom: 12,
            position: 'relative',
            zIndex: 1,
          }}>
            Create better designs, faster.
          </p>

          <button style={{
            background: 'var(--accent-gradient)',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            padding: '7px 12px',
            color: '#ffffff',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            position: 'relative',
            zIndex: 1,
            boxShadow: '0 2px 8px rgba(120, 101, 255, 0.3)',
            transition: 'opacity 0.15s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
          >
            Upgrade →
          </button>
        </div>

        {/* User Profile Area */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 10px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          transition: 'border-color 0.15s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* User Avatar */}
            <div style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6 0%, #7865FF 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.74rem',
              fontWeight: 700,
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}>
              Obi
            </div>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>Obi</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--accent-secondary)', fontWeight: 500 }}>Pro Plan</div>
            </div>
          </div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>›</span>
        </div>
      </div>
    </aside>
  )
}
