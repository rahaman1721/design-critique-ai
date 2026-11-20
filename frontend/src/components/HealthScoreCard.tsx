interface HealthScoreCardProps {
  score: number
  grade: string
  summary: string
}

export default function HealthScoreCard({ score = 84, grade = 'A-', summary }: HealthScoreCardProps) {
  const r = 38
  const c = 2 * Math.PI * r
  const offset = c - (score / 100) * c

  return (
    <div style={{
      position: 'relative',
      background: 'linear-gradient(135deg, rgba(16, 22, 41, 0.95) 0%, rgba(11, 16, 32, 0.98) 100%)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: '26px 30px',
      display: 'flex',
      alignItems: 'center',
      gap: 32,
      overflow: 'hidden',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
    }}>
      {/* Subtle Aurora Ambient Glow */}
      <div style={{
        position: 'absolute',
        top: -60,
        right: -60,
        width: 240,
        height: 240,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(120, 101, 255, 0.15) 0%, rgba(78, 139, 255, 0.08) 50%, transparent 80%)',
        filter: 'blur(30px)',
        pointerEvents: 'none',
      }} />

      {/* Restrained Gradient Mesh Ribbons in Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: 320,
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.35,
      }}>
        <svg width="320" height="100%" viewBox="0 0 320 140" fill="none" preserveAspectRatio="none">
          <path
            d="M30 140C90 40 180 150 320 20L320 140Z"
            fill="url(#auroraGradient1)"
          />
          <path
            d="M80 0C150 110 240 20 320 80L320 0Z"
            fill="url(#auroraGradient2)"
            opacity="0.6"
          />
          <defs>
            <linearGradient id="auroraGradient1" x1="30" y1="20" x2="320" y2="140" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7865FF" stopOpacity="0.4" />
              <stop offset="0.6" stopColor="#4E8BFF" stopOpacity="0.3" />
              <stop offset="1" stopColor="#16C995" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="auroraGradient2" x1="80" y1="0" x2="320" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4E8BFF" stopOpacity="0.3" />
              <stop offset="1" stopColor="#7865FF" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Circular Progress Gauge */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <svg width="100" height="100" viewBox="0 0 100 100">
          {/* Subtle Track */}
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth="6"
          />
          {/* Turquoise/Emerald Gradient Progress Stroke */}
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            transform="rotate(-90 50 50)"
            style={{
              filter: 'drop-shadow(0 0 6px rgba(22, 201, 149, 0.45))',
              transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#16C995" />
              <stop offset="100%" stopColor="#4E8BFF" />
            </linearGradient>
          </defs>
          {/* Numerical Score (46px bold typography) */}
          <text
            x="50"
            y="46"
            textAnchor="middle"
            fill="var(--text-primary)"
            fontSize="24"
            fontWeight="800"
            fontFamily="'Plus Jakarta Sans', sans-serif"
          >
            {score}
          </text>
          <text
            x="50"
            y="62"
            textAnchor="middle"
            fill="var(--text-muted)"
            fontSize="10"
            fontWeight="600"
            fontFamily="'Plus Jakarta Sans', sans-serif"
          >
            /100
          </text>
        </svg>
      </div>

      {/* Content Breakdown */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 520 }}>
        {/* Grade Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '3px 10px',
          borderRadius: 20,
          background: 'var(--success-bg)',
          border: '1px solid var(--success-border)',
          color: 'var(--success)',
          fontSize: '0.74rem',
          fontWeight: 700,
          marginBottom: 8,
        }}>
          <span>Excellent</span>
          <span>✨</span>
        </div>

        {/* Heading */}
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--text-primary)',
          marginBottom: 6,
        }}>
          Design Health Score
        </h2>

        {/* Short AI Assessment */}
        <p style={{
          fontSize: '0.84rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
        }}>
          {summary || "Your design follows modern UI principles with excellent visual hierarchy, clarity and usability. A few improvements can make it truly outstanding."}
        </p>
      </div>
    </div>
  )
}
