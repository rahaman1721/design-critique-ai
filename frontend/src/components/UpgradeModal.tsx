import flowerCrop from '../assets/flower_crop_transparent.png'

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  if (!isOpen) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(5, 7, 18, 0.75)',
        backdropFilter: 'blur(10px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          background: 'linear-gradient(145deg, #10142a 0%, #080b18 100%)',
          border: '1px solid rgba(120, 101, 255, 0.35)',
          borderRadius: 20,
          padding: '32px',
          maxWidth: 480,
          width: '100%',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(120, 101, 255, 0.2)',
          overflow: 'hidden',
        }}
      >
        {/* Ambient Flower Glow */}
        <img
          src={flowerCrop}
          alt="3D Flower"
          style={{
            position: 'absolute',
            top: -20,
            right: -20,
            width: 130,
            height: 130,
            objectFit: 'contain',
            opacity: 0.6,
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                color: '#7865FF',
                background: 'rgba(120, 101, 255, 0.15)',
                padding: '3px 10px',
                borderRadius: 9999,
                border: '1px solid rgba(120, 101, 255, 0.3)',
                display: 'inline-block',
                marginBottom: 8,
              }}>
                ACTIVE PLAN
              </span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
                Obi Pro Plan
              </h2>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: 'none',
                borderRadius: '50%',
                width: 28,
                height: 28,
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

          <p style={{ fontSize: '0.86rem', color: '#A1AAC2', lineHeight: 1.5, marginBottom: 20 }}>
            Supercharge your design workflow with unlimited multimodal audits, team sharing, and instant Figma token syncing.
          </p>

          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: 14,
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            marginBottom: 24,
          }}>
            {[
              'Unlimited 15-Category Gemini 2.0 Vision Audits',
              'WCAG 2.1 AAA Accessibility & Color Contrast Scans',
              'Figma & Sketch Direct Handoff Plugins',
              'PDF & JSON Audit Report Exports',
              'Priority 24/7 Model Throughput & Latency SLA',
            ].map((feature, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.8rem', color: '#e2e8f0' }}>
                <span style={{ color: '#16C995', fontWeight: 800 }}>✓</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                background: 'linear-gradient(135deg, #7865FF 0%, #4E8BFF 100%)',
                border: 'none',
                borderRadius: 10,
                padding: '11px',
                color: '#ffffff',
                fontSize: '0.86rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(120, 101, 255, 0.4)',
              }}
            >
              Manage Subscription ($29/mo)
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
