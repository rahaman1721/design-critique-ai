interface HistoryViewProps {
  onLoadAudit: (title: string, score: number, summary: string) => void
}

const PAST_AUDITS = [
  {
    id: 1,
    title: 'Moon Bot AI Assistant (Mobile)',
    device: 'Mobile (375×667)',
    timestamp: 'Today at 09:42 AM',
    score: 94,
    grade: 'A+',
    issuesCount: 3,
    status: 'Excellent ✨',
    statusColor: '#16C995',
    summary: 'Your design follows modern UI principles with excellent visual hierarchy, clarity and usability. A few improvements can make it truly outstanding.',
  },
  {
    id: 2,
    title: 'FinTech Crypto Staking Dashboard',
    device: 'Desktop (1440×900)',
    timestamp: 'Yesterday at 04:15 PM',
    score: 82,
    grade: 'B+',
    issuesCount: 5,
    status: 'Good 👍',
    statusColor: '#4E8BFF',
    summary: 'Strong dark theme and high information density. Color contrast on secondary currency tickers (#64748b) needs improvement to pass WCAG 2.1 AA.',
  },
  {
    id: 3,
    title: 'E-Commerce Checkout Flow v3',
    device: 'Mobile (390×844)',
    timestamp: 'Nov 18, 2026 at 02:30 PM',
    score: 76,
    grade: 'B',
    issuesCount: 7,
    status: 'Needs Work ⚠️',
    statusColor: '#F5AE42',
    summary: 'Checkout button has prominent CTA clarity, but primary credit card form inputs lack accessible label tags and focus-visible outlines.',
  },
  {
    id: 4,
    title: 'SaaS Cloud Infrastructure Console',
    device: 'Desktop (1920×1080)',
    timestamp: 'Nov 16, 2026 at 11:20 AM',
    score: 91,
    grade: 'A',
    issuesCount: 4,
    status: 'Excellent ✨',
    statusColor: '#16C995',
    summary: 'Exceptional component consistency and spacing grid. Micro-interactions and toast alerts convey server status gracefully.',
  },
]

export default function HistoryView({ onLoadAudit }: HistoryViewProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#ffffff', marginBottom: 4 }}>
            Audit History
          </h2>
          <p style={{ fontSize: '0.86rem', color: '#A1AAC2' }}>
            Review past design evaluations, score trends, and tracked improvements over time.
          </p>
        </div>
        <span style={{
          fontSize: '0.78rem',
          fontWeight: 700,
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '6px 14px',
          borderRadius: 20,
          border: '1px solid rgba(255, 255, 255, 0.08)',
          color: '#A1AAC2',
        }}>
          {PAST_AUDITS.length} Audits Saved
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 16 }}>
        {PAST_AUDITS.map(audit => (
          <div
            key={audit.id}
            style={{
              background: '#0d1226',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 16,
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              transition: 'border-color 0.15s ease, transform 0.15s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(120, 101, 255, 0.4)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: 4 }}>
                  {audit.title}
                </h3>
                <span style={{ fontSize: '0.74rem', color: '#6D7690' }}>
                  {audit.device} • {audit.timestamp}
                </span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 4,
                background: 'rgba(255, 255, 255, 0.04)',
                padding: '6px 12px',
                borderRadius: 12,
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: audit.statusColor }}>
                  {audit.score}
                </span>
                <span style={{ fontSize: '0.72rem', color: '#6D7690' }}>/100</span>
              </div>
            </div>

            <p style={{
              fontSize: '0.8rem',
              color: '#A1AAC2',
              lineHeight: 1.5,
              margin: 0,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>
              {audit.summary}
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 12,
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            }}>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                color: audit.statusColor,
                background: `${audit.statusColor}18`,
                padding: '3px 10px',
                borderRadius: 9999,
                border: `1px solid ${audit.statusColor}33`,
              }}>
                {audit.status}
              </span>

              <button
                onClick={() => onLoadAudit(audit.title, audit.score, audit.summary)}
                style={{
                  background: 'linear-gradient(135deg, #7865FF 0%, #4E8BFF 100%)',
                  border: 'none',
                  borderRadius: 8,
                  padding: '6px 14px',
                  color: '#ffffff',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(120, 101, 255, 0.3)',
                }}
              >
                Load Audit →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
