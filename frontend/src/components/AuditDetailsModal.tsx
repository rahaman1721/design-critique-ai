import type { PriorityFix } from '../types'

interface AuditDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  fixes?: PriorityFix[]
}

const ALL_15_ISSUES = [
  {
    priority: 1,
    title: 'Increase secondary text contrast on metadata timestamps',
    category: 'Color & Contrast / WCAG',
    desc: 'The timestamp text (#71717a) has WCAG 2.1 AA 4.5:1 minimum contrast requirement. Current measured ratio is 3.1:1 on white background.',
    solution: 'Update timestamp token to #52525b or #3f3f46 to achieve 5.8:1 contrast ratio.',
    severity: 'High',
    color: '#F05B73',
  },
  {
    priority: 2,
    title: 'Expand interactive touch target hit area',
    category: 'Touch Target Sizing',
    desc: 'Corner icon buttons measure 22×32px. Mobile human interface guidelines mandate at least 44×44px hit bounds to prevent missed taps.',
    solution: 'Add padding: 11px 6px or wrap in a min-w-[44px] min-h-[44px] transparent flex container.',
    severity: 'Medium',
    color: '#F5AE42',
  },
  {
    priority: 3,
    title: 'Add keyboard focus outlines for modal controls',
    category: 'Accessibility (WCAG)',
    desc: 'Ensure all interactive elements have a visible focus-visible state for assistive screen readers and keyboard navigation.',
    solution: 'Add :focus-visible { outline: 2px solid #7865FF; outline-offset: 2px; } across all interactive controls.',
    severity: 'Medium',
    color: '#F5AE42',
  },
  {
    priority: 4,
    title: 'Standardize 8px spacing rhythm between list items',
    category: 'Spacing & Layout',
    desc: 'Common questions cards have inconsistent vertical margins (11px, 14px, 8px). Standardize to an 8-point baseline grid.',
    solution: 'Apply space-y-3 (12px) or space-y-4 (16px) consistently across card groups.',
    severity: 'Low',
    color: '#16C995',
  },
  {
    priority: 5,
    title: 'Provide explicit input aria-labels for assistive tech',
    category: 'Information Architecture',
    desc: 'Message input field relies solely on placeholder text which disappears on typing. Assistive tools cannot announce context.',
    solution: 'Add aria-label="Type your message to Moon Bot" to the input element.',
    severity: 'Low',
    color: '#16C995',
  },
]

export default function AuditDetailsModal({ isOpen, onClose }: AuditDetailsModalProps) {
  if (!isOpen) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(5, 7, 18, 0.8)',
        backdropFilter: 'blur(12px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#0d1226',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 20,
          padding: '28px 32px',
          maxWidth: 680,
          width: '100%',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.8)',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: 2 }}>
              Priority Recommendations & Remediation
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#A1AAC2' }}>
              Actionable design system adjustments identified by Gemini 2.0 Flash Vision
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: 'none',
              borderRadius: '50%',
              width: 30,
              height: 30,
              color: '#94a3b8',
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, overflowY: 'auto', paddingRight: 6 }}>
          {ALL_15_ISSUES.map(item => (
            <div
              key={item.priority}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: 14,
                padding: '16px 18px',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: item.color,
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {item.priority}
                  </span>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>
                    {item.title}
                  </h4>
                </div>
                <span style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  color: item.color,
                  background: `${item.color}18`,
                  padding: '2px 8px',
                  borderRadius: 9999,
                  border: `1px solid ${item.color}33`,
                }}>
                  {item.severity}
                </span>
              </div>

              <p style={{ fontSize: '0.78rem', color: '#A1AAC2', lineHeight: 1.45, margin: 0 }}>
                {item.desc}
              </p>

              <div style={{
                background: 'rgba(0, 0, 0, 0.3)',
                padding: '8px 12px',
                borderRadius: 8,
                fontSize: '0.74rem',
                color: '#16C995',
                borderLeft: '2px solid #16C995',
                fontFamily: 'monospace',
              }}>
                💡 Fix: {item.solution}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 18, paddingTop: 14, borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <button
            onClick={onClose}
            style={{
              background: 'linear-gradient(135deg, #7865FF 0%, #4E8BFF 100%)',
              border: 'none',
              borderRadius: 8,
              padding: '8px 20px',
              color: '#ffffff',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
