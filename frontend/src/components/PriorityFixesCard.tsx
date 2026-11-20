import { useState } from 'react'
import type { PriorityFix } from '../types'

interface PriorityFixesCardProps {
  fixes?: PriorityFix[]
  onViewAll?: () => void
}

const DEFAULT_FIXES = [
  {
    priority: 1,
    title: 'Increase secondary text contrast on metadata timestamps',
    description: 'The timestamp text (#71717a) has WCAG 2.1 AA 4.5:1 minimum contrast requirement.',
    impact: 'High',
    color: '#F05B73',
    badgeBg: 'rgba(240, 91, 115, 0.15)',
    badgeBorder: 'rgba(240, 91, 115, 0.3)',
  },
  {
    priority: 2,
    title: 'Expand interactive touch target hit area',
    description: 'Corner icon buttons measure 22×32px. Expand padding for at least 44×44px touch targets.',
    impact: 'Medium',
    color: '#F5AE42',
    badgeBg: 'rgba(245, 174, 66, 0.15)',
    badgeBorder: 'rgba(245, 174, 66, 0.3)',
  },
  {
    priority: 3,
    title: 'Add keyboard focus outlines for modal controls',
    description: 'Ensure all interactive elements have a visible focus state.',
    impact: 'Medium',
    color: '#F5AE42',
    badgeBg: 'rgba(245, 174, 66, 0.15)',
    badgeBorder: 'rgba(245, 174, 66, 0.3)',
  },
]

export default function PriorityFixesCard({ fixes, onViewAll }: PriorityFixesCardProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const items = fixes && fixes.length > 0
    ? fixes.map(f => {
        const isHigh = f.impact === 'high'
        return {
          priority: f.priority,
          title: f.title,
          description: f.description,
          impact: isHigh ? 'High' : 'Medium',
          color: isHigh ? '#F05B73' : '#F5AE42',
          badgeBg: isHigh ? 'rgba(240, 91, 115, 0.15)' : 'rgba(245, 174, 66, 0.15)',
          badgeBorder: isHigh ? 'rgba(240, 91, 115, 0.3)' : 'rgba(245, 174, 66, 0.3)',
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
          <span style={{ color: '#F5AE42', fontSize: '0.95rem' }}>⚡</span>
          <h3 style={{
            fontSize: '0.92rem',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.01em',
          }}>
            Priority Fixes ({items.length} Identified)
          </h3>
        </div>

        <button
          onClick={onViewAll}
          style={{
            background: 'none',
            border: 'none',
            color: '#7865FF',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            padding: 0,
            transition: 'color 0.15s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#a594ff'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#7865FF'; }}
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
                background: '#0c0e1e',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: 14,
                padding: '12px 18px',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                cursor: 'pointer',
                transition: 'background 0.15s ease, border-color 0.15s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#12172f'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#0c0e1e'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)'
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
                      color: '#ffffff',
                      lineHeight: 1.35,
                      marginBottom: 2,
                    }}>
                      {fix.title}
                    </div>
                    <div style={{
                      fontSize: '0.76rem',
                      color: '#6D7690',
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
                    color: '#6D7690',
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
                  color: '#A1AAC2',
                  lineHeight: 1.5,
                }}>
                  <strong style={{ color: '#ffffff' }}>Recommended Remediation:</strong> Adjust component token styles to adhere strictly to WCAG 2.1 AA accessibility guidelines. Test on mobile viewports for minimum 44×44px hit bounds and 4.5:1 text contrast ratios.
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
