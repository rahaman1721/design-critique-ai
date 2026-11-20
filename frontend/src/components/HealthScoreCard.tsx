interface HealthScoreCardProps {
  score: number
  grade: string
  summary: string
}

export default function HealthScoreCard({ score = 94, summary }: HealthScoreCardProps) {
  const r = 36
  const c = 2 * Math.PI * r
  const offset = c - (score / 100) * c

  return (
    <div style={{
      position: 'relative',
      background: 'linear-gradient(135deg, rgba(13, 17, 30, 0.95) 0%, rgba(9, 11, 22, 0.98) 100%)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: 18,
      padding: '24px 28px',
      display: 'flex',
      alignItems: 'center',
      gap: 28,
      overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    }}>
      {/* Background Glowing Ribbons / Wave Accent */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: 380,
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
      }}>
        <svg width="380" height="100%" viewBox="0 0 380 140" fill="none" preserveAspectRatio="none">
          <path
            d="M50 140C120 40 200 160 380 20L380 140Z"
            fill="url(#ribbonGradient1)"
            opacity="0.45"
          />
          <path
            d="M100 0C180 120 280 20 380 90L380 0Z"
            fill="url(#ribbonGradient2)"
            opacity="0.3"
          />
          <defs>
            <linearGradient id="ribbonGradient1" x1="50" y1="20" x2="380" y2="140" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6366f1" />
              <stop offset="0.5" stopColor="#8b5cf6" />
              <stop offset="1" stopColor="#00f2fe" />
            </linearGradient>
            <linearGradient id="ribbonGradient2" x1="100" y1="0" x2="380" y2="90" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00f2fe" />
              <stop offset="1" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Circular Gauge Meter */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <svg width="94" height="94" viewBox="0 0 94 94">
          {/* Background track */}
          <circle
            cx="47"
            cy="47"
            r={r}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="6"
          />
          {/* Glowing cyan progress stroke */}
          <circle
            cx="47"
            cy="47"
            r={r}
            fill="none"
            stroke="#00f2fe"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            transform="rotate(-90 47 47)"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(0, 242, 254, 0.6))',
              transition: 'stroke-dashoffset 1s ease',
            }}
          />
          {/* Score text */}
          <text
            x="47"
            y="43"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="21"
            fontWeight="800"
            fontFamily="'Plus Jakarta Sans', sans-serif"
          >
            {score}
          </text>
          <text
            x="47"
            y="58"
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="10"
            fontWeight="600"
            fontFamily="'Plus Jakarta Sans', sans-serif"
          >
            /100
          </text>
        </svg>
      </div>

      {/* Middle Text Details */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 540 }}>
        {/* Status Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '3px 10px',
          borderRadius: 20,
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          color: '#34d399',
          fontSize: '0.74rem',
          fontWeight: 700,
          marginBottom: 8,
        }}>
          <span>Excellent</span>
          <span>✨</span>
        </div>

        {/* Title */}
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          color: '#ffffff',
          marginBottom: 6,
        }}>
          Design Health Score
        </h2>

        {/* Description */}
        <p style={{
          fontSize: '0.84rem',
          color: '#94a3b8',
          lineHeight: 1.55,
        }}>
          {summary || "Your design follows modern UI principles with excellent visual hierarchy, clarity and usability. A few improvements can make it truly outstanding."}
        </p>
      </div>
    </div>
  )
}
