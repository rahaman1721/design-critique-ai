import type { AppState } from '../types'

interface ImagePreviewProps {
  imageUrl: string | null
  state: AppState
  onReset: () => void
  onNewFile: (file: File) => void
}

export default function ImagePreview({ imageUrl, state }: ImagePreviewProps) {
  const isAnalyzing = state.phase === 'analyzing'
  const tokens = isAnalyzing ? (state as { phase: 'analyzing'; tokens: number }).tokens : 0

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'var(--surface)',
    }}>
      {/* Panel header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Uploaded Design
        </span>
        {isAnalyzing && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)',
              animation: 'pulse 1.2s infinite',
            }} />
            <span style={{ fontSize: '0.78rem', color: 'var(--accent-hover)' }}>
              Analyzing… {tokens > 0 ? `${tokens} tokens` : ''}
            </span>
          </div>
        )}
        {(state.phase === 'streaming' || state.phase === 'done') && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--success)' }}>✓ Processed</span>
          </div>
        )}
      </div>

      {/* Image */}
      <div style={{ flex: 1, overflow: 'hidden auto', padding: 20 }}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Uploaded UI screenshot"
            style={{
              width: '100%',
              borderRadius: 12,
              border: '1px solid var(--border-subtle)',
              display: 'block',
              objectFit: 'contain',
              maxHeight: 'calc(100vh - 220px)',
            }}
          />
        )}
      </div>

      {/* Analyzing overlay */}
      {isAnalyzing && (
        <div style={{
          padding: '14px 20px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: 'var(--accent-glow)',
          flexShrink: 0,
        }}>
          <div style={{
            width: 18, height: 18,
            border: '2px solid var(--border)',
            borderTopColor: 'var(--accent)',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }} />
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Gemini Vision is analyzing your design across 15 categories…
          </span>
        </div>
      )}
    </div>
  )
}
