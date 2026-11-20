import cleanWave from '../assets/pure_silk_wave_clean.png'

interface HealthScoreCardProps {
  score?: number
  grade?: string
  summary?: string
}

export default function HealthScoreCard({ score = 94, summary }: HealthScoreCardProps) {
  const r = 38
  const c = 2 * Math.PI * r
  const offset = c - (score / 100) * c

  return (
    <div style={{
      position: 'relative',
      background: 'linear-gradient(135deg, #090e1d 0%, #060914 100%)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: 18,
      padding: '24px 28px',
      display: 'flex',
      alignItems: 'center',
      gap: 28,
      overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.45)',
    }}>
      {/* 100% Clean Authentic Silk Wave from Reference (Zero text baked in) */}
      <img
        src={cleanWave}
        alt="Glowing Silk Wave"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          height: '100%',
          width: 'auto',
          maxHeight: 180,
          objectFit: 'contain',
          pointerEvents: 'none',
          opacity: 0.95,
          zIndex: 1,
        }}
      />

      {/* Circular Progress Gauge with Dual Neon Sparkles */}
      <div style={{ position: 'relative', flexShrink: 0, zIndex: 2 }}>
        <svg width="98" height="98" viewBox="0 0 98 98">
          {/* Background Track */}
          <circle
            cx="49"
            cy="49"
            r={r}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="6.5"
          />
          {/* Glowing Neon Cyan Progress Stroke */}
          <circle
            cx="49"
            cy="49"
            r={r}
            fill="none"
            stroke="#00f2fe"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            transform="rotate(-90 49 49)"
            style={{
              filter: 'drop-shadow(0 0 10px rgba(0, 242, 254, 0.85)) drop-shadow(0 0 20px rgba(0, 242, 254, 0.4))',
              transition: 'stroke-dashoffset 1s ease',
            }}
          />
          {/* Top-Right Neon Sparkle Star on Ring */}
          <path
            d="M74 24L75.5 28L79.5 29.5L75.5 31L74 35L72.5 31L68.5 29.5L72.5 28Z"
            fill="#a5f3fc"
            style={{ filter: 'drop-shadow(0 0 6px #00f2fe)' }}
          />
          {/* Bottom-Left Neon Sparkle Star on Ring */}
          <path
            d="M24 70L25 72.5L27.5 73.5L25 74.5L24 77L23 74.5L20.5 73.5L23 72.5Z"
            fill="#a5f3fc"
            style={{ filter: 'drop-shadow(0 0 6px #00f2fe)' }}
          />

          {/* Numerical Score */}
          <text
            x="49"
            y="46"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="26"
            fontWeight="800"
            fontFamily="'Plus Jakarta Sans', sans-serif"
          >
            {score}
          </text>
          <text
            x="49"
            y="62"
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
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 410 }}>
        {/* Status Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '3px 10px',
          borderRadius: 20,
          background: 'rgba(22, 201, 149, 0.15)',
          border: '1px solid rgba(22, 201, 149, 0.35)',
          color: '#16C995',
          fontSize: '0.74rem',
          fontWeight: 700,
          marginBottom: 8,
        }}>
          <span>Excellent</span>
          <span>✨</span>
        </div>

        {/* Heading */}
        <h2 style={{
          fontSize: '1.24rem',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: '#ffffff',
          marginBottom: 6,
          lineHeight: 1.25,
        }}>
          Design Health Score
        </h2>

        {/* Explanatory Assessment */}
        <p style={{
          fontSize: '0.82rem',
          color: '#A1AAC2',
          lineHeight: 1.5,
          margin: 0,
        }}>
          {summary || "Your design follows modern UI principles with excellent visual hierarchy, clarity and usability. A few improvements can make it truly outstanding."}
        </p>
      </div>
    </div>
  )
}
