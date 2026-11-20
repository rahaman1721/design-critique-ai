import type { PriorityFix } from '../types'

interface PriorityFixesCardProps {
  fixes?: PriorityFix[]
}

const DEFAULT_FIXES = [
  {
    priority: 1,
    title: 'Increase secondary text contrast on metadata timestamps',
    description: 'The timestamp text (#71717a) has WCAG 2.1 AA 4.5:1 minimum contrast requirement.',
    impact: 'High',
    color: '#ef4444',
  },
  {
    priority: 2,
    title: 'Expand interactive touch target hit area',
    description: 'Corner icon buttons measure 22×32px. Expand padding for at least 44×44px touch targets.',
    impact: 'Medium',
    color: '#f59e0b',
  },
  {
    priority: 3,
    title: 'Add keyboard focus outlines for modal controls',
    description: 'Ensure all interactive elements have a visible focus state.',
    impact: 'Medium',
    color: '#f59e0b',
  },
]

export default function PriorityFixesCard({ fixes }: PriorityFixesCardProps) {
  const displayFixes = fixes && fixes.length > 0
    ? fixes.map(f => ({
        priority: f.priority,
        title: f.title,
        description: f.description,
        impact: f.impact === 'high' ? 'High' : 'Medium',
        color: f.impact === 'high' ? '#ef4444' : '#f59e0b',
      }))
    : DEFAULT_FIXES

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: '#f59e0b', fontSize: '1rem' }}>⚡</span>
          <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff' }}>
            Priority Fixes ({displayFixes.length} Identified)
          </span>
        </div>

        <button style={{
          background: 'none',
          border: 'none',
          color: '#818cf8',
          fontSize: '0.8rem',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}>
          View All →
        </button>
      </div>

      {/* Fix Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {displayFixes.map(fix => (
          <div
            key={fix.priority}
            style={{
              background: '#0d0f1a',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: 14,
              padding: '12px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              cursor: 'pointer',
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
            {/* Left Content */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1 }}>
              {/* Number Circle */}
              <div style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: fix.color,
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.74rem',
                fontWeight: 800,
                flexShrink: 0,
              }}>
                {fix.priority}
              </div>

              {/* Title & Subtitle */}
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc', marginBottom: 2 }}>
                  {fix.title}
                </div>
                <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                  {fix.description}
                </div>
              </div>
            </div>

            {/* Right Badge & Chevron */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <span style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                padding: '2px 10px',
                borderRadius: 20,
                background: fix.impact === 'High' ? 'rgba(239, 68, 68, 0.18)' : 'rgba(245, 158, 11, 0.18)',
                color: fix.color,
                border: `1px solid ${fix.color}40`,
              }}>
                {fix.impact}
              </span>
              <span style={{ color: '#64748b', fontSize: '0.9rem' }}>›</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
