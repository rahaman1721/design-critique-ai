import { useState } from 'react'
import phoneMockup from '../assets/phone_mockup.png'

interface UploadedDesignCardProps {
  imageUrl: string | null
  onTriggerUpload: () => void
}

export default function UploadDesignCard({ imageUrl, onTriggerUpload }: UploadedDesignCardProps) {
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'desktop'>('mobile')

  return (
    <div style={{
      width: 320,
      background: '#0c1020',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: 18,
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.45)',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 14,
        padding: '0 4px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#e2e8f0' }}>
            Uploaded Design
          </span>
        </div>

        {/* Status Indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          color: '#10b981',
          fontSize: '0.75rem',
          fontWeight: 700,
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Analysis Complete • 2.8s</span>
        </div>
      </div>

      {/* Main Preview Container */}
      <div
        onClick={onTriggerUpload}
        style={{
          background: '#ffffff',
          borderRadius: 16,
          padding: imageUrl ? '12px' : '0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 460,
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
        }}
        title="Click to replace or upload a new design"
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Uploaded UI Design"
            style={{
              width: '100%',
              height: '100%',
              maxHeight: 460,
              objectFit: 'contain',
              borderRadius: 10,
            }}
          />
        ) : (
          /* Exact High-Resolution Authentic Phone Mockup from Reference */
          <img
            src={phoneMockup}
            alt="Moon Bot Interface"
            style={{
              width: '100%',
              height: '100%',
              maxHeight: 470,
              objectFit: 'cover',
              display: 'block',
              borderRadius: 16,
            }}
          />
        )}
      </div>

      {/* Footer Info & Device Selector */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 14,
        padding: '0 4px',
        color: '#64748b',
        fontSize: '0.75rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
          </svg>
          <span>Design Size: {deviceMode === 'mobile' ? '375 × 667' : '1440 × 900'}</span>
        </div>

        <button
          onClick={() => setDeviceMode(m => m === 'mobile' ? 'desktop' : 'mobile')}
          style={{
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            fontSize: '0.75rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect width="20" height="14" x="2" y="3" rx="2" />
            <line x1="8" x2="16" y1="21" y2="21" />
            <line x1="12" x2="12" y1="17" y2="21" />
          </svg>
          <span>{deviceMode === 'mobile' ? 'Desktop View ▾' : 'Mobile View ▾'}</span>
        </button>
      </div>
    </div>
  )
}
