import cleanWave from '../assets/pure_silk_wave_clean.png'

interface HealthScoreCardProps {
  score?: number
  grade?: string
  summary?: string
}

export default function HealthScoreCard({ score = 94, summary }: HealthScoreCardProps) {
  const r = 34
  const c = 2 * Math.PI * r
  const offset = c - (score / 100) * c

  return (
    <div style={{
      position: 'relative',
      background: 'linear-gradient(135deg, #090e1d 0%, #060914 100%)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: 16,
      padding: '18px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: 22,
      overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.45)',
    }}>
      {/* 100% Clean Silk Wave from Reference (Zero text baked in) */}
      <img
        src={cleanWave}
        alt="Glowing Silk Wave"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          height: '100%',
          width: 'auto',
          maxHeight: 150,
          objectFit: 'contain',
          pointerEvents: 'none',
          opacity: 0.95,
          zIndex: 1,
        }}
      />

      {/* Circular Progress Gauge with Dual Neon Sparkles */}
      <div style={{ position: 'relative', flexShrink: 0, zIndex: 2 }}>
        <svg width="86" height="86" viewBox="0 0 86 86">
          {/* Background Track */}
          <circle
            cx="43"
            cy="43"
            r={r}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="6"
          />
          {/* Glowing Neon Cyan Progress Stroke */}
          <circle
            cx="43"
            cy="43"
            r={r}
            fill="none"
            stroke="#00f2fe"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            transform="rotate(-90 43 43)"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(0, 242, 254, 0.85)) drop-shadow(0 0 16px rgba(0, 242, 254, 0.4))',
              transition: 'stroke-dashoffset 1s ease',
            }}
          />
          {/* Top-Right Neon Sparkle Star on Ring */}
          <path
            d="M65 21L66.5 24.5L70 26L66.5 27.5L65 31L63.5 27.5L60 26L63.5 24.5Z"
            fill="#a5f3fc"
            style={{ filter: 'drop-shadow(0 0 5px #00f2fe)' }}
          />
          {/* Bottom-Left Neon Sparkle Star on Ring */}
          <path
            d="M21 61L22 63.5L24.5 64.5L22 65.5L21 68L20 65.5L17.5 64.5L20 63.5Z"
            fill="#a5f3fc"
            style={{ filter: 'drop-shadow(0 0 5px #00f2fe)' }}
          />

          {/* Numerical Score */}
          <text
            x="43"
            y="41"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="23"
            fontWeight="800"
            fontFamily="'Plus Jakarta Sans', sans-serif"
          >
            {score}
          </text>
          <text
            x="43"
            y="55"
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="9.5"
            fontWeight="600"
            fontFamily="'Plus Jakarta Sans', sans-serif"
          >
            /100
          </text>
        </svg>
      </div>

      {/* Middle Text Details */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 330 }}>
        {/* Status Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          padding: '2px 8px',
          borderRadius: 20,
          background: 'rgba(22, 201, 149, 0.15)',
          border: '1px solid rgba(22, 201, 149, 0.35)',
          color: '#16C995',
          fontSize: '0.7rem',
          fontWeight: 700,
          marginBottom: 6,
        }}>
          <span>Excellent</span>
          <span>✨</span>
        </div>

        {/* Heading */}
        <h2 style={{
          fontSize: '1.15rem',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: '#ffffff',
          marginBottom: 4,
          lineHeight: 1.25,
        }}>
          Design Health Score
        </h2>

        {/* Explanatory Assessment */}
        <p style={{
          fontSize: '0.77rem',
          color: '#A1AAC2',
          lineHeight: 1.45,
          margin: 0,
        }}>
          {summary || "Your design follows modern UI principles with excellent visual hierarchy, clarity and usability. A few improvements can make it truly outstanding."}
        </p>
      </div>
    </div>
  )
}
