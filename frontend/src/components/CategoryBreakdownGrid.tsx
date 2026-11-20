import type { CritiqueCategory } from '../types'

interface CategoryBreakdownGridProps {
  categories?: CritiqueCategory[]
  showAll?: boolean
}

// Master list of 15 audit categories with minimal line icons and descriptions
const MASTER_15_CATEGORIES = [
  {
    name: 'Visual Hierarchy',
    badge: 'Excellent',
    statusType: 'success',
    score: '9.8 / 10',
    progress: 98,
    desc: 'Clear focal points and good visual flow.',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    name: 'Color & Contrast',
    badge: 'Needs Work',
    statusType: 'warning',
    score: '7.9 / 10',
    progress: 79,
    desc: 'Good contrast, consider minor adjustments.',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a7 7 0 0 0 0 14v6" />
      </svg>
    ),
  },
  {
    name: 'Typography',
    badge: 'Excellent',
    statusType: 'success',
    score: '9.7 / 10',
    progress: 97,
    desc: 'Well-chosen type scale and spacing.',
    icon: (
      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-primary)', fontFamily: 'Inter' }}>Aa</span>
    ),
  },
  {
    name: 'Spacing & Layout',
    badge: 'Excellent',
    statusType: 'success',
    score: '9.6 / 10',
    progress: 96,
    desc: 'Clean and balanced layout.',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
  },
  {
    name: 'Accessibility (WCAG)',
    badge: 'Needs Work',
    statusType: 'warning',
    score: '6.8 / 10',
    progress: 68,
    desc: 'Add focus states and improve contrast.',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="4" r="2" />
        <path d="m9 20 3-6 3 6" />
        <path d="m6 8 6 2 6-2" />
        <path d="M12 10v4" />
      </svg>
    ),
  },
  {
    name: 'CTA Clarity',
    badge: 'Excellent',
    statusType: 'success',
    score: '9.5 / 10',
    progress: 95,
    desc: 'Clear and prominent call to action.',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 3 10.07 19.97 12.58 12.58 19.97 10.07 3 3" />
      </svg>
    ),
  },
  {
    name: 'Navigation & Wayfinding',
    badge: 'Good',
    statusType: 'info',
    score: '8.8 / 10',
    progress: 88,
    desc: 'Intuitive route hierarchy and breadcrumbs.',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 19 21 12 17 5 21 12 2" />
      </svg>
    ),
  },
  {
    name: 'Consistency & Design System',
    badge: 'Excellent',
    statusType: 'success',
    score: '9.4 / 10',
    progress: 94,
    desc: 'Strict component reusability and token fidelity.',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16.5 9.4 7.55 4.24a1.78 1.78 0 0 0-2.5 1.55v12.42a1.78 1.78 0 0 0 2.5 1.55L16.5 14.6a1.78 1.78 0 0 0 0-3.2z" />
      </svg>
    ),
  },
  {
    name: 'Mobile Responsiveness',
    badge: 'Good',
    statusType: 'info',
    score: '8.6 / 10',
    progress: 86,
    desc: 'Responsive fluid scaling down to 375px.',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
  },
  {
    name: 'Touch Target Sizing',
    badge: 'Needs Work',
    statusType: 'warning',
    score: '7.2 / 10',
    progress: 72,
    desc: 'Expand compact icon buttons to 44px hit bounds.',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    name: 'Information Architecture',
    badge: 'Excellent',
    statusType: 'success',
    score: '9.5 / 10',
    progress: 95,
    desc: 'Clear chunking and manageable cognitive load.',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" x2="12" y1="20" y2="10" />
        <line x1="18" x2="18" y1="20" y2="4" />
        <line x1="6" x2="6" y1="20" y2="16" />
      </svg>
    ),
  },
  {
    name: 'Loading & Empty States',
    badge: 'Good',
    statusType: 'info',
    score: '8.4 / 10',
    progress: 84,
    desc: 'Skeleton loaders mirror layout geometry.',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" x2="12" y1="2" y2="6" />
        <line x1="12" x2="12" y1="18" y2="22" />
        <line x1="4.93" x2="7.76" y1="4.93" y2="7.76" />
        <line x1="16.24" x2="19.07" y1="16.24" y2="19.07" />
        <line x1="2" x2="6" y1="12" y2="12" />
        <line x1="18" x2="22" y1="12" y2="12" />
      </svg>
    ),
  },
  {
    name: 'Error Handling UX',
    badge: 'Good',
    statusType: 'info',
    score: '8.7 / 10',
    progress: 87,
    desc: 'Inline recovery paths without destructive loss.',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" x2="12" y1="8" y2="12" />
        <line x1="12" x2="12.01" y1="16" y2="16" />
      </svg>
    ),
  },
  {
    name: 'Micro-interactions & Feedback',
    badge: 'Good',
    statusType: 'info',
    score: '8.9 / 10',
    progress: 89,
    desc: 'Haptic state changes and 150ms transitions.',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4" />
        <path d="m4.93 4.93 2.83 2.83" />
        <path d="M2 12h4" />
      </svg>
    ),
  },
  {
    name: 'Overall Brand Alignment',
    badge: 'Excellent',
    statusType: 'success',
    score: '9.8 / 10',
    progress: 98,
    desc: 'Contemporary, sophisticated dark aesthetic.',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
]

export default function CategoryBreakdownGrid({ categories, showAll = false }: CategoryBreakdownGridProps) {
  // If dynamic categories are passed from SSE, map them; otherwise use the master 15 list
  const allItems = categories && categories.length > 0
    ? categories.map((c, i) => {
        const isExcellent = c.score >= 9
        const isGood = c.score >= 8
        const statusType = isExcellent ? 'success' : isGood ? 'info' : 'warning'
        const badge = isExcellent ? 'Excellent' : isGood ? 'Good' : 'Needs Work'
        
        return {
          name: c.name,
          badge,
          statusType,
          score: `${c.score.toFixed(1)} / 10`,
          progress: c.score * 10,
          desc: c.issues.length ? c.issues[0] : (c.suggestions[0] || 'Clean and balanced layout.'),
          icon: MASTER_15_CATEGORIES[i % MASTER_15_CATEGORIES.length].icon,
        }
      })
    : MASTER_15_CATEGORIES

  const displayItems = showAll ? allItems : allItems.slice(0, 6)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="7" height="7" x="3" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="14" rx="1" />
            <rect width="7" height="7" x="3" y="14" rx="1" />
          </svg>
          <h3 style={{
            fontSize: '0.92rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
          }}>
            Category Breakdown {showAll ? '(All 15 Evaluated)' : '(Top 6 Focus Areas)'}
          </h3>
        </div>

        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {allItems.length}/15 Categories
        </span>
      </div>

      {/* Grid: 3 columns with consistent 12px gaps */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 12,
      }}>
        {displayItems.map((cat, idx) => {
          const badgeBg = cat.statusType === 'success'
            ? 'var(--success-bg)'
            : cat.statusType === 'warning'
            ? 'var(--warning-bg)'
            : 'rgba(78, 139, 255, 0.12)'
          const badgeColor = cat.statusType === 'success'
            ? 'var(--success)'
            : cat.statusType === 'warning'
            ? 'var(--warning)'
            : 'var(--accent-secondary)'
          const badgeBorder = cat.statusType === 'success'
            ? 'var(--success-border)'
            : cat.statusType === 'warning'
            ? 'var(--warning-border)'
            : 'rgba(78, 139, 255, 0.3)'

          return (
            <div
              key={idx}
              style={{
                background: '#090b17',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: 14,
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 10,
                minHeight: 110,
                transition: 'background 0.15s ease, border-color 0.15s ease, transform 0.1s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--bg-elevated)'
                e.currentTarget.style.borderColor = 'var(--border-hover)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--bg-card)'
                e.currentTarget.style.borderColor = 'var(--border-subtle)'
              }}
            >
              {/* Row 1: Icon + Title + Status Pill */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>{cat.icon}</div>
                  <span style={{
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.01em',
                  }}>
                    {cat.name}
                  </span>
                </div>

                <span style={{
                  fontSize: '0.66rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: 20,
                  background: badgeBg,
                  color: badgeColor,
                  border: `1px solid ${badgeBorder}`,
                  letterSpacing: '0.02em',
                }}>
                  {cat.badge}
                </span>
              </div>

              {/* Row 2: Score + Sleek Progress Bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 4 }}>
                  <span style={{
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    fontFamily: 'Inter',
                  }}>
                    {cat.score}
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: 4,
                  background: 'rgba(255, 255, 255, 0.06)',
                  borderRadius: 999,
                  overflow: 'hidden',
                }}>
                  <div style={{
                    width: `${cat.progress}%`,
                    height: '100%',
                    background: badgeColor,
                    borderRadius: 999,
                    boxShadow: `0 0 6px ${badgeColor}60`,
                    transition: 'width 0.8s ease',
                  }} />
                </div>
              </div>

              {/* Row 3: Single-line explanation */}
              <div style={{
                fontSize: '0.73rem',
                color: 'var(--text-muted)',
                lineHeight: 1.4,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {cat.desc}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
