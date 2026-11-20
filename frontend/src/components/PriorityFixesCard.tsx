import { useState } from 'react'
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
    color: 'var(--error)',
    badgeBg: 'var(--error-bg)',
    badgeBorder: 'var(--error-border)',
  },
  {
    priority: 2,
    title: 'Expand interactive touch target hit area',
    description: 'Corner icon buttons measure 22×32px. Expand padding for at least 44×44px touch targets.',
    impact: 'Medium',
    color: 'var(--warning)',
    badgeBg: 'var(--warning-bg)',
    badgeBorder: 'var(--warning-border)',
  },
  {
    priority: 3,
    title: 'Add keyboard focus outlines for modal controls',
    description: 'Ensure all interactive elements have a visible focus state.',
    impact: 'Medium',
    color: 'var(--warning)',
    badgeBg: 'var(--warning-bg)',
    badgeBorder: 'var(--warning-border)',
  },
]

export default function PriorityFixesCard({ fixes }: PriorityFixesCardProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const items = fixes && fixes.length > 0
    ? fixes.map(f => {
        const isHigh = f.impact === 'high'
        return {
          priority: f.priority,
          title: f.title,
          description: f.description,
          impact: isHigh ? 'High' : 'Medium',
          color: isHigh ? 'var(--error)' : 'var(--warning)',
          badgeBg: isHigh ? 'var(--error-bg)' : 'var(--warning-bg)',
          badgeBorder: isHigh ? 'var(--error-border)' : 'var(--warning-border)',
        }
      })
    : DEFAULT_FIXES

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Section Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: 'var(--warning)', fontSize: '0.95rem' }}>⚡</span>
          <h3 style={{
            fontSize: '0.92rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
          }}>
            Priority Fixes ({items.length} Identified)
          </h3>
        </div>

        <button style={{
          background: 'none',
          border: 'none',
          color: 'var(--accent-primary)',
          fontSize: '0.8rem',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          padding: 0,
          transition: 'color 0.15s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent-secondary)'; }}
        onMouseLeave={e => { e.currentTarget.style.color = 'var(--accent-primary)'; }}
        >
          View All →
        </button>
      </div>

      {/* Issues List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map(fix => {
          const isExpanded = expandedId === fix.priority

          return (
            <div
              key={fix.priority}
              onClick={() => setExpandedId(isExpanded ? null : fix.priority)}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 18px',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                cursor: 'pointer',
                transition: 'background 0.15s ease, border-color 0.15s ease',
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
              {/* Row Content */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
              }}>
                {/* Left Number & Copy */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1, minWidth: 0 }}>
                  {/* Number Badge */}
                  <div style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: fix.color,
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    flexShrink: 0,
                  }}>
                    {fix.priority}
                  </div>

                  {/* Title & One-Liner */}
                  <div style={{ minWidth: 0 }}>
                    <div style={{
                      fontSize: '0.86rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      lineHeight: 1.35,
                      marginBottom: 2,
                    }}>
                      {fix.title}
                    </div>
                    <div style={{
                      fontSize: '0.76rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.4,
                      whiteSpace: isExpanded ? 'normal' : 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {fix.description}
                    </div>
                  </div>
                </div>

                {/* Right Severity Badge & Chevron */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                  <span style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    padding: '2px 9px',
                    borderRadius: 20,
                    background: fix.badgeBg,
                    color: fix.color,
                    border: `1px solid ${fix.badgeBorder}`,
                    letterSpacing: '0.02em',
                  }}>
                    {fix.impact}
                  </span>
                  <span style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.85rem',
                    transform: isExpanded ? 'rotate(90deg)' : 'none',
                    transition: 'transform 0.15s ease',
                  }}>
                    ›
                  </span>
                </div>
              </div>

              {/* Expanded Actionable Guide if Clicked */}
              {isExpanded && (
                <div style={{
                  paddingTop: 8,
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  fontSize: '0.76rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Recommended Fix:</strong> Update component token styles to adhere to WCAG 2.1 AA accessibility guidelines. Test on mobile viewports for minimum 44×44px hit bounds.
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
