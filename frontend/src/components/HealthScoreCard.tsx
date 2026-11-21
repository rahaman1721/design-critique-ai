import luminousWave from '../assets/silk_wave_luminous_fade.png'

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
      borderTop: '1px solid rgba(255, 255, 255, 0.16)',
      borderRadius: 16,
      padding: '16px 22px',
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.45)',
    }}>
      {/* 100% Authentic Luminous Silk Wave from Reference */}
      <img
        src={luminousWave}
        alt="Luminous Silk Wave"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          height: '100%',
          width: 'auto',
          maxHeight: 140,
          objectFit: 'contain',
          pointerEvents: 'none',
          opacity: 0.95,
          zIndex: 1,
        }}
      />

      {/* Circular Progress Gauge with Dual Neon Sparkles */}
      <div style={{ position: 'relative', flexShrink: 0, zIndex: 2 }}>
        <svg width="84" height="84" viewBox="0 0 84 84">
          {/* Background Track */}
          <circle
            cx="42"
            cy="42"
            r={r}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="6"
          />
          {/* Glowing Neon Cyan Progress Stroke */}
          <circle
            cx="42"
            cy="42"
            r={r}
            fill="none"
            stroke="#00f2fe"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            transform="rotate(-90 42 42)"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(0, 242, 254, 0.9)) drop-shadow(0 0 16px rgba(0, 242, 254, 0.45))',
              transition: 'stroke-dashoffset 1s ease',
            }}
          />
          {/* Top-Right Neon Sparkle Star on Ring */}
          <path
            d="M63 20L64.5 23.5L68 25L64.5 26.5L63 30L61.5 26.5L58 25L61.5 23.5Z"
            fill="#a5f3fc"
            style={{ filter: 'drop-shadow(0 0 5px #00f2fe)' }}
          />
          {/* Bottom-Left Neon Sparkle Star on Ring */}
          <path
            d="M21 59L22 61.5L24.5 62.5L22 63.5L21 66L20 63.5L17.5 62.5L20 61.5Z"
            fill="#a5f3fc"
            style={{ filter: 'drop-shadow(0 0 5px #00f2fe)' }}
          />

          {/* Numerical Score */}
          <text
            x="42"
            y="40"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="23"
            fontWeight="800"
            fontFamily="'Plus Jakarta Sans', sans-serif"
          >
            {score}
          </text>
          <text
            x="42"
            y="54"
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="9"
            fontWeight="600"
            fontFamily="'Plus Jakarta Sans', sans-serif"
          >
            /100
          </text>
        </svg>
      </div>

      {/* Middle Text Details */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 320 }}>
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
          marginBottom: 5,
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
          marginBottom: 3,
          lineHeight: 1.25,
        }}>
          Design Health Score
        </h2>

        {/* Explanatory Assessment */}
        <p style={{
          fontSize: '0.76rem',
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
