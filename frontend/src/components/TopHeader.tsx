import { useState } from 'react'

interface TopHeaderProps {
  onNewUpload: () => void
  showAllCategories: boolean
  onToggleCategories: () => void
}

export default function TopHeader({ onNewUpload, showAllCategories, onToggleCategories }: TopHeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 0 16px',
      flexShrink: 0,
      position: 'relative',
    }}>
      {/* Title & Subtitle */}
      <div>
        <h1 style={{
          fontSize: '1.75rem',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: '#ffffff',
          lineHeight: 1.2,
          marginBottom: 3,
        }}>
          Design Critique AI
        </h1>
        <p style={{
          fontSize: '0.82rem',
          color: '#A1AAC2',
          lineHeight: 1.4,
          margin: 0,
        }}>
          Get expert-level feedback on your design, powered by AI.
        </p>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Category Filter Dropdown Pill */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => {
              setDropdownOpen(!dropdownOpen)
              onToggleCategories()
            }}
            style={{
              background: '#141B30',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 8,
              padding: '8px 14px',
              color: '#A1AAC2',
              fontSize: '0.74rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
              transition: 'border-color 0.15s ease, color 0.15s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.16)'
              e.currentTarget.style.color = '#ffffff'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
              e.currentTarget.style.color = '#A1AAC2'
            }}
          >
            <span>{showAllCategories ? 'SHOWING ALL 15 CATEGORIES' : '15-CATEGORY AUDIT'}</span>
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{
                transform: showAllCategories ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s ease',
              }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>

        {/* New Upload Button */}
        <button
          onClick={onNewUpload}
          style={{
            background: 'linear-gradient(135deg, #7865FF 0%, #4E8BFF 100%)',
            border: 'none',
            borderRadius: 8,
            padding: '8px 16px',
            color: '#ffffff',
            fontSize: '0.8rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(120, 101, 255, 0.35)',
            transition: 'opacity 0.15s ease, transform 0.1s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.92'; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
          onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.98)'; }}
          onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
            <path d="M12 12v9" />
            <path d="m8 16 4-4 4 4" />
          </svg>
          <span>New Upload</span>
        </button>
      </div>
    </div>
  )
}
