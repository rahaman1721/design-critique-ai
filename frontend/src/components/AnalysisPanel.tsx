import type { AppState, CritiqueCategory, PriorityFix, CategoryStatus } from '../types'

interface AnalysisPanelProps {
  state: AppState
}

const STATUS_CONFIG: Record<CategoryStatus, { color: string; bg: string; label: string }> = {
  excellent: { color: '#22c55e', bg: 'rgba(34,197,94,0.1)', label: 'Excellent' },
  good: { color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', label: 'Good' },
  needs_work: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', label: 'Needs Work' },
  critical: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)', label: 'Critical' },
}

const IMPACT_COLOR = { high: '#ef4444', medium: '#f59e0b', low: '#3b82f6' }

function ScoreRing({ score }: { score: number }) {
  const r = 34
  const c = 2 * Math.PI * r
  const offset = c - (score / 100) * c
  const color = score >= 80 ? '#22c55e' : score >= 60 ? '#3b82f6' : score >= 40 ? '#f59e0b' : '#ef4444'

  return (
    <svg width="88" height="88" viewBox="0 0 88 88">
      <circle cx="44" cy="44" r={r} fill="none" stroke="var(--surface-3)" strokeWidth="6" />
      <circle
        cx="44" cy="44" r={r} fill="none"
        stroke={color} strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        transform="rotate(-90 44 44)"
        style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)' }}
      />
      <text x="44" y="40" textAnchor="middle" fill="var(--text)" fontSize="17" fontWeight="700" fontFamily="Inter">{score}</text>
      <text x="44" y="54" textAnchor="middle" fill="var(--text-muted)" fontSize="10" fontFamily="Inter">/100</text>
    </svg>
  )
}

function ScoreBar({ score }: { score: number }) {
  const color = score >= 8 ? '#22c55e' : score >= 6 ? '#3b82f6' : score >= 4 ? '#f59e0b' : '#ef4444'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, height: 5, background: 'var(--surface-3)', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ width: `${score * 10}%`, height: '100%', background: color, borderRadius: 4, transition: 'width 0.8s ease' }} />
      </div>
      <span style={{ fontSize: '0.78rem', fontWeight: 600, color, minWidth: 24, textAlign: 'right' }}>{score}</span>
    </div>
  )
}

function CategoryCard({ cat, index }: { cat: CritiqueCategory; index: number }) {
  const cfg = STATUS_CONFIG[cat.status] ?? STATUS_CONFIG.needs_work

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 12,
      padding: '16px',
      animation: 'fadeUp 0.35s ease both',
      animationDelay: `${index * 0.04}s`,
    }}>
      {/* Row 1: name + badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>{cat.name}</span>
        <span style={{
          fontSize: '0.7rem', fontWeight: 600, padding: '3px 9px',
          borderRadius: 20, background: cfg.bg, color: cfg.color,
          border: `1px solid ${cfg.color}33`,
        }}>{cfg.label}</span>
      </div>

      {/* Score bar */}
      <div style={{ marginBottom: 12 }}>
        <ScoreBar score={cat.score} />
      </div>

      {/* Issues */}
      {cat.issues.length > 0 && (
        <div style={{ marginBottom: 10 }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>Issues</p>
          <ul style={{ paddingLeft: 14, margin: 0 }}>
            {cat.issues.map((issue, i) => (
              <li key={i} style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 3, lineHeight: 1.5 }}>{issue}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggestions */}
      {cat.suggestions.length > 0 && (
        <div>
          <p style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>Suggestions</p>
          <ul style={{ paddingLeft: 14, margin: 0 }}>
            {cat.suggestions.map((s, i) => (
              <li key={i} style={{ fontSize: '0.8rem', color: '#6ee7b7', marginBottom: 3, lineHeight: 1.5 }}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function FixCard({ fix, index }: { fix: PriorityFix; index: number }) {
  const impactColor = IMPACT_COLOR[fix.impact] ?? IMPACT_COLOR.medium

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border-subtle)',
      borderLeft: `3px solid ${impactColor}`,
      borderRadius: 12,
      padding: '14px 16px',
      animation: 'fadeUp 0.35s ease both',
      animationDelay: `${index * 0.06}s`,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontWeight: 700, fontSize: '0.75rem', color: impactColor, minWidth: 16 }}>#{fix.priority}</span>
          <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>{fix.title}</span>
        </div>
        <span style={{
          fontSize: '0.68rem', fontWeight: 700, padding: '2px 8px',
          borderRadius: 20, background: `${impactColor}22`, color: impactColor,
          textTransform: 'uppercase', letterSpacing: '0.05em', flexShrink: 0,
        }}>{fix.impact}</span>
      </div>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 8, lineHeight: 1.55 }}>{fix.description}</p>
    </div>
  )
}

export default function AnalysisPanel({ state }: AnalysisPanelProps) {
  if (state.phase === 'analyzing') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 16, padding: 40 }}>
        <div style={{ width: 48, height: 48, border: '3px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Gemini Vision is analyzing your design…</p>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.78rem' }}>{state.tokens} tokens processed</p>
      </div>
    )
  }

  if (state.phase !== 'streaming' && state.phase !== 'done') return null

  const { header, categories, fixes, highlights } = state

  const gradeColor = header ? (['A', 'B'].includes(header.overall_grade) ? '#22c55e' : header.overall_grade === 'C' ? '#3b82f6' : header.overall_grade === 'D' ? '#f59e0b' : '#ef4444') : '#71717a'

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Score Header */}
      {header && (
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 16,
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          animation: 'fadeUp 0.4s ease',
        }}>
          <ScoreRing score={header.overall_score} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>Design Score</span>
              <span style={{
                fontSize: '1.1rem', fontWeight: 800,
                background: `${gradeColor}22`, color: gradeColor,
                padding: '2px 12px', borderRadius: 8,
                border: `1px solid ${gradeColor}44`,
              }}>Grade {header.overall_grade}</span>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{header.summary}</p>
          </div>
        </div>
      )}

      {/* Priority Fixes */}
      {fixes.length > 0 && (
        <section>
          <h2 style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
            🔺 Priority Fixes ({fixes.length})
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {fixes.sort((a, b) => a.priority - b.priority).map((fix, i) => (
              <FixCard key={i} fix={fix} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Categories Grid */}
      {categories.length > 0 && (
        <section>
          <h2 style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
            📋 15-Category Audit ({categories.length}/15)
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
            {categories.map((cat, i) => (
              <CategoryCard key={cat.name} cat={cat} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Highlights */}
      {highlights.length > 0 && (
        <section>
          <h2 style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
            ✅ What's Working Well
          </h2>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: '16px 20px' }}>
            <ul style={{ paddingLeft: 18, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {highlights.map((h, i) => (
                <li key={i} style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>{h}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Loading shimmer for remaining categories */}
      {state.phase === 'streaming' && categories.length < 15 && (
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0' }}>
            <div style={{ width: 16, height: 16, border: '2px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>Streaming remaining categories ({categories.length}/15)…</span>
          </div>
        </section>
      )}
    </div>
  )
}
