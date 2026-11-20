import type { CritiqueCategory } from '../types'

interface CategoryBreakdownGridProps {
  categories?: CritiqueCategory[]
}

const DEFAULT_CATEGORIES = [
  {
    name: 'Visual Hierarchy',
    badge: 'Excellent',
    badgeColor: '#10b981',
    badgeBg: 'rgba(16, 185, 129, 0.15)',
    score: '9.8 / 10',
    progress: 98,
    progressColor: '#10b981',
    desc: 'Clear focal points and good visual flow.',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    name: 'Color & Contrast',
    badge: 'Needs Work',
    badgeColor: '#f59e0b',
    badgeBg: 'rgba(245, 158, 11, 0.15)',
    score: '7.9 / 10',
    progress: 79,
    progressColor: '#f59e0b',
    desc: 'Good contrast, consider minor adjustments.',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2.2">
        <circle cx="13.5" cy="6.5" r=".5" />
        <circle cx="17.5" cy="10.5" r=".5" />
        <circle cx="8.5" cy="7.5" r=".5" />
        <circle cx="6.5" cy="12.5" r=".5" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C21.999 6.5 17.5 2 12 2z" />
      </svg>
    ),
  },
  {
    name: 'Typography',
    badge: 'Excellent',
    badgeColor: '#10b981',
    badgeBg: 'rgba(16, 185, 129, 0.15)',
    score: '9.7 / 10',
    progress: 97,
    progressColor: '#10b981',
    desc: 'Well-chosen type scale and spacing.',
    icon: (
      <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#818cf8' }}>Aa</span>
    ),
  },
  {
    name: 'Spacing & Layout',
    badge: 'Excellent',
    badgeColor: '#10b981',
    badgeBg: 'rgba(16, 185, 129, 0.15)',
    score: '9.6 / 10',
    progress: 96,
    progressColor: '#10b981',
    desc: 'Clean and balanced layout.',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.2">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    name: 'Accessibility (WCAG)',
    badge: 'Needs Work',
    badgeColor: '#f59e0b',
    badgeBg: 'rgba(245, 158, 11, 0.15)',
    score: '6.8 / 10',
    progress: 68,
    progressColor: '#f59e0b',
    desc: 'Add focus states and improve contrast.',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="2.2">
        <circle cx="12" cy="5" r="2" />
        <path d="m9 20 3-6 3 6" />
        <path d="m6 8 6 2 6-2" />
        <path d="M12 10v4" />
      </svg>
    ),
  },
  {
    name: 'CTA Clarity',
    badge: 'Excellent',
    badgeColor: '#10b981',
    badgeBg: 'rgba(16, 185, 129, 0.15)',
    score: '9.5 / 10',
    progress: 95,
    progressColor: '#10b981',
    desc: 'Clear and prominent call to action.',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.2">
        <polygon points="3 3 10.07 19.97 12.58 12.58 19.97 10.07 3 3" />
      </svg>
    ),
  },
]

export default function CategoryBreakdownGrid({ categories }: CategoryBreakdownGridProps) {
  // If categories are passed dynamically from the live audit, map them
  const items = categories && categories.length > 0
    ? categories.slice(0, 6).map((c, i) => {
        const isGood = c.score >= 8
        return {
          name: c.name,
          badge: isGood ? 'Excellent' : 'Needs Work',
          badgeColor: isGood ? '#10b981' : '#f59e0b',
          badgeBg: isGood ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
          score: `${(c.score).toFixed(1)} / 10`,
          progress: c.score * 10,
          progressColor: isGood ? '#10b981' : '#f59e0b',
          desc: c.issues.length ? c.issues[0] : (c.suggestions[0] || 'Clean and balanced layout.'),
          icon: DEFAULT_CATEGORIES[i % DEFAULT_CATEGORIES.length].icon,
        }
      })
    : DEFAULT_CATEGORIES

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 2px' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2.2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
        <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff' }}>
          Category Breakdown
        </span>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 10,
      }}>
        {items.map((cat, idx) => (
          <div
            key={idx}
            style={{
              background: '#0d0f1a',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: 14,
              padding: '14px 16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 8,
              minHeight: 104,
              transition: 'background 0.15s, border-color 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#111422'
              e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#0d0f1a'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)'
            }}
          >
            {/* Top row: Icon + Title + Status Badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {cat.icon}
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>
                  {cat.name}
                </span>
              </div>

              <span style={{
                fontSize: '0.66rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 20,
                background: cat.badgeBg,
                color: cat.badgeColor,
                border: `1px solid ${cat.badgeColor}40`,
              }}>
                {cat.badge}
              </span>
            </div>

            {/* Score & Progress Bar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 4 }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#ffffff' }}>
                  {cat.score}
                </span>
              </div>
              <div style={{
                width: '100%',
                height: 4,
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: 4,
                overflow: 'hidden',
              }}>
                <div style={{
                  width: `${cat.progress}%`,
                  height: '100%',
                  background: cat.progressColor,
                  borderRadius: 4,
                  boxShadow: `0 0 8px ${cat.progressColor}80`,
                }} />
              </div>
            </div>

            {/* Summary Line */}
            <div style={{ fontSize: '0.72rem', color: '#64748b', lineHeight: 1.35 }}>
              {cat.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
