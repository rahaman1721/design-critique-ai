interface TemplatesViewProps {
  onSelectTemplate: (title: string, score: number, summary: string) => void
}

const TEMPLATES = [
  {
    id: 'moon-bot',
    name: 'Moon Bot AI Assistant',
    category: 'Conversational AI / Mobile',
    score: 94,
    grade: 'A+',
    resolution: '375 × 667',
    desc: 'Minimalist mobile chat interface featuring avatar focal points, clean input bar, and high-readability typography.',
    tags: ['Mobile', 'Light Mode', 'Chatbot', 'WCAG AAA'],
    summary: 'Your design follows modern UI principles with excellent visual hierarchy, clarity and usability. A few improvements can make it truly outstanding.',
  },
  {
    id: 'crypto-wallet',
    name: 'Apex Crypto DeFi Staking',
    category: 'FinTech / Web3',
    score: 82,
    grade: 'B+',
    resolution: '1440 × 900',
    desc: 'Dense dark-mode trading interface featuring candlestick charts, token swap cards, and yield farming stats.',
    tags: ['Desktop', 'Dark Mode', 'FinTech', 'High Density'],
    summary: 'Strong dark theme and high information density. Color contrast on secondary currency tickers (#64748b) needs improvement to pass WCAG 2.1 AA.',
  },
  {
    id: 'saas-console',
    name: 'CloudScale Metrics Console',
    category: 'Enterprise / Developer Tools',
    score: 91,
    grade: 'A',
    resolution: '1920 × 1080',
    desc: 'Kubernetes cluster monitoring dashboard with latency telemetry, pod status grids, and alert streams.',
    tags: ['Desktop', 'Enterprise', 'Analytics', 'Design System'],
    summary: 'Exceptional component consistency and spacing grid. Micro-interactions and toast alerts convey server status gracefully.',
  },
  {
    id: 'ecommerce-checkout',
    name: 'Luxe Store Mobile Checkout',
    category: 'E-Commerce / Direct-to-Consumer',
    score: 78,
    grade: 'B',
    resolution: '390 × 844',
    desc: 'One-page express checkout funnel with apple pay CTA, address autocompletion, and cart summary drawer.',
    tags: ['Mobile', 'E-Commerce', 'Conversion Rate', 'Checkout'],
    summary: 'Checkout button has prominent CTA clarity, but primary credit card form inputs lack accessible label tags and focus-visible outlines.',
  },
]

export default function TemplatesView({ onSelectTemplate }: TemplatesViewProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#ffffff', marginBottom: 4 }}>
            Design Audit Templates
          </h2>
          <p style={{ fontSize: '0.86rem', color: '#A1AAC2' }}>
            Choose a verified industry UI template to test AI critique, benchmark design systems, or calibrate scores.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 16 }}>
        {TEMPLATES.map(tpl => (
          <div
            key={tpl.id}
            style={{
              background: '#0d1226',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 16,
              padding: '22px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 16,
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(120, 101, 255, 0.45)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: 2 }}>
                    {tpl.name}
                  </h3>
                  <span style={{ fontSize: '0.74rem', color: '#7865FF', fontWeight: 600 }}>
                    {tpl.category}
                  </span>
                </div>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  padding: '4px 10px',
                  borderRadius: 8,
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#16C995',
                }}>
                  {tpl.score}/100
                </div>
              </div>

              <p style={{ fontSize: '0.8rem', color: '#A1AAC2', lineHeight: 1.5, marginBottom: 14 }}>
                {tpl.desc}
              </p>

              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {tpl.tags.map(t => (
                  <span
                    key={t}
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#94a3b8',
                      padding: '2px 8px',
                      borderRadius: 6,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 14,
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            }}>
              <span style={{ fontSize: '0.74rem', color: '#6D7690' }}>
                Viewport: {tpl.resolution}
              </span>

              <button
                onClick={() => onSelectTemplate(tpl.name, tpl.score, tpl.summary)}
                style={{
                  background: 'linear-gradient(135deg, #7865FF 0%, #4E8BFF 100%)',
                  border: 'none',
                  borderRadius: 8,
                  padding: '7px 16px',
                  color: '#ffffff',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(120, 101, 255, 0.35)',
                }}
              >
                Audit This Design →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
