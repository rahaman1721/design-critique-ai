import { useState, useEffect } from 'react'

export default function SettingsView() {
  const [apiKey, setApiKey] = useState('')
  const [hasKey, setHasKey] = useState(false)
  const [model, setModel] = useState('gemini-2.0-flash')
  const [saving, setSaving] = useState(false)
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => {
        setHasKey(data.has_key)
        setModel(data.model || 'gemini-2.0-flash')
      })
      .catch(() => {})
  }, [])

  const handleSave = async () => {
    if (!apiKey.trim()) return
    setSaving(true)
    setStatusMsg(null)
    try {
      const res = await fetch('/api/settings/key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: apiKey.trim() }),
      })
      const data = await res.json()
      if (res.ok) {
        setHasKey(true)
        setStatusMsg({ text: 'API Key successfully saved and verified!', type: 'success' })
        setApiKey('')
      } else {
        setStatusMsg({ text: data.detail || 'Failed to save API key', type: 'error' })
      }
    } catch (err: unknown) {
      setStatusMsg({ text: (err as Error).message || 'Network error', type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 740 }}>
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#ffffff', marginBottom: 4 }}>
          Settings & Vision AI Engine
        </h2>
        <p style={{ fontSize: '0.86rem', color: '#A1AAC2' }}>
          Configure your Google Gemini 2.0 Flash Vision endpoint, authentication tokens, and audit thresholds.
        </p>
      </div>

      {/* API Key Card */}
      <div style={{
        background: '#0d1226',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: 16,
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: 2 }}>
              Google Gemini API Key
            </h3>
            <span style={{ fontSize: '0.78rem', color: '#6D7690' }}>
              Used to perform multimodal vision critique and structured JSON scoring.
            </span>
          </div>

          <span style={{
            fontSize: '0.74rem',
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: 9999,
            background: hasKey ? 'rgba(22, 201, 149, 0.15)' : 'rgba(240, 91, 115, 0.15)',
            color: hasKey ? '#16C995' : '#F05B73',
            border: hasKey ? '1px solid rgba(22, 201, 149, 0.3)' : '1px solid rgba(240, 91, 115, 0.3)',
          }}>
            {hasKey ? '● API Key Active' : '○ No Key Configured'}
          </span>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <input
            type="password"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            placeholder={hasKey ? '•••••••••••••••••••••••••••••••• (Key installed)' : 'Enter your Gemini API key (AIzaSy...)'}
            style={{
              flex: 1,
              background: '#070916',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 8,
              padding: '10px 14px',
              color: '#ffffff',
              fontSize: '0.84rem',
              outline: 'none',
              fontFamily: 'monospace',
            }}
          />
          <button
            onClick={handleSave}
            disabled={saving || !apiKey.trim()}
            style={{
              background: 'linear-gradient(135deg, #7865FF 0%, #4E8BFF 100%)',
              border: 'none',
              borderRadius: 8,
              padding: '10px 20px',
              color: '#ffffff',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: saving || !apiKey.trim() ? 'not-allowed' : 'pointer',
              opacity: saving || !apiKey.trim() ? 0.6 : 1,
              boxShadow: '0 4px 14px rgba(120, 101, 255, 0.35)',
              whiteSpace: 'nowrap',
            }}
          >
            {saving ? 'Testing...' : 'Save & Test Key'}
          </button>
        </div>

        {statusMsg && (
          <div style={{
            fontSize: '0.78rem',
            fontWeight: 600,
            padding: '8px 12px',
            borderRadius: 8,
            background: statusMsg.type === 'success' ? 'rgba(22, 201, 149, 0.12)' : 'rgba(240, 91, 115, 0.12)',
            color: statusMsg.type === 'success' ? '#16C995' : '#F05B73',
            border: `1px solid ${statusMsg.type === 'success' ? 'rgba(22, 201, 149, 0.3)' : 'rgba(240, 91, 115, 0.3)'}`,
          }}>
            {statusMsg.text}
          </div>
        )}
      </div>

      {/* Model & Vision Parameters */}
      <div style={{
        background: '#0d1226',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: 16,
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: 2 }}>
          Vision Model Configuration
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
          <div style={{
            background: 'rgba(120, 101, 255, 0.08)',
            border: '1px solid rgba(120, 101, 255, 0.3)',
            borderRadius: 12,
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff' }}>
                {model}
              </span>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#16C995', background: 'rgba(22, 201, 149, 0.15)', padding: '2px 8px', borderRadius: 9999 }}>
                Active
              </span>
            </div>
            <p style={{ fontSize: '0.76rem', color: '#A1AAC2', lineHeight: 1.4, margin: 0 }}>
              Optimized for high-speed multimodal vision audits, real-time SSE streaming, and sub-3-second responses.
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: 12,
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#94a3b8' }}>
                WCAG 2.1 AAA Verification
              </span>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#7865FF', background: 'rgba(120, 101, 255, 0.15)', padding: '2px 8px', borderRadius: 9999 }}>
                Enabled
              </span>
            </div>
            <p style={{ fontSize: '0.76rem', color: '#6D7690', lineHeight: 1.4, margin: 0 }}>
              Enforces 4.5:1 text contrast ratios, 44×44px touch targets, and visual keyboard focus rings.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
