import type { CritiqueCategory } from '../types'

interface CategoryBreakdownGridProps {
  categories?: CritiqueCategory[]
  showAll?: boolean
}

// Master list of 15 audit categories matching reference
const MASTER_15_CATEGORIES = [
  {
    name: 'Visual Hierarchy',
    badge: 'Excellent',
    statusType: 'success',
    score: '9.8 / 10',
    progress: 98,
    desc: 'Clear focal points and good visual flow.',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4E8BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#7865FF', fontFamily: 'Inter' }}>Aa</span>
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
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4E8BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5AE42" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7865FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 3 10.07 19.97 12.58 12.58 19.97 10.07 3 3" />
      </svg>
    ),
  },
]

export default function CategoryBreakdownGrid({ categories, showAll = false }: CategoryBreakdownGridProps) {
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* Header Matching Reference Exactly */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 2px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7865FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="7" height="7" x="3" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="14" rx="1" />
            <rect width="7" height="7" x="3" y="14" rx="1" />
          </svg>
          <h3 style={{
            fontSize: '0.88rem',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.01em',
          }}>
            Category Breakdown
          </h3>
        </div>
      </div>

      {/* Grid: 3 columns, 2 rows matching reference */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: 10,
      }}>
        {displayItems.map((cat, idx) => {
          const isSuccess = cat.statusType === 'success'
          const badgeBg = isSuccess ? 'rgba(22, 201, 149, 0.15)' : 'rgba(245, 174, 66, 0.15)'
          const badgeColor = isSuccess ? '#16C995' : '#F5AE42'
          const badgeBorder = isSuccess ? 'rgba(22, 201, 149, 0.3)' : 'rgba(245, 174, 66, 0.3)'

          return (
            <div
              key={idx}
              style={{
                background: '#090b17',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: 12,
                padding: '12px 14px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 8,
                minHeight: 90,
                minWidth: 0,
                transition: 'background 0.15s ease, border-color 0.15s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#101428'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#090b17'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)'
              }}
            >
              {/* Row 1: Icon + Title + Status Pill */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{cat.icon}</div>
                  <span style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#ffffff',
                    letterSpacing: '-0.01em',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {cat.name}
                  </span>
                </div>

                <span style={{
                  fontSize: '0.64rem',
                  fontWeight: 700,
                  padding: '1px 7px',
                  borderRadius: 20,
                  background: badgeBg,
                  color: badgeColor,
                  border: `1px solid ${badgeBorder}`,
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                }}>
                  {cat.badge}
                </span>
              </div>

              {/* Row 2: Score + Progress Bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 3 }}>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    fontFamily: 'Inter',
                  }}>
                    {cat.score}
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: 3.5,
                  background: 'rgba(255, 255, 255, 0.06)',
                  borderRadius: 999,
                  overflow: 'hidden',
                }}>
                  <div style={{
                    width: `${cat.progress}%`,
                    height: '100%',
                    background: badgeColor,
                    borderRadius: 999,
                    boxShadow: `0 0 5px ${badgeColor}60`,
                    transition: 'width 0.8s ease',
                  }} />
                </div>
              </div>

              {/* Row 3: Single-line explanation */}
              <div style={{
                fontSize: '0.7rem',
                color: '#6D7690',
                lineHeight: 1.3,
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
