import { useState, useCallback, useRef } from 'react'
import type { AppState, CritiqueCategory, PriorityFix, CritiqueHeader } from './types'
import Sidebar from './components/Sidebar'
import TopHeader from './components/TopHeader'
import UploadDesignCard from './components/UploadedDesignCard'
import HealthScoreCard from './components/HealthScoreCard'
import PriorityFixesCard from './components/PriorityFixesCard'
import CategoryBreakdownGrid from './components/CategoryBreakdownGrid'
import HistoryView from './components/HistoryView'
import TemplatesView from './components/TemplatesView'
import SettingsView from './components/SettingsView'
import UpgradeModal from './components/UpgradeModal'
import AuditDetailsModal from './components/AuditDetailsModal'

export default function App() {
  const [activeTab, setActiveTab] = useState('audit')
  const [showAllCategories, setShowAllCategories] = useState(false)
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)

  // Current critique states
  const [score, setScore] = useState(94)
  const [summary, setSummary] = useState(
    "Your design follows modern UI principles with excellent visual hierarchy, clarity and usability. A few improvements can make it truly outstanding."
  )
  const [state, setState] = useState<AppState>({ phase: 'idle' })
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const handleFile = useCallback(async (file: File) => {
    if (abortRef.current) abortRef.current.abort()
    const ctrl = new AbortController()
    abortRef.current = ctrl

    const previewUrl = URL.createObjectURL(file)
    setImageUrl(previewUrl)
    setActiveTab('audit')
    setState({ phase: 'uploading' })

    const formData = new FormData()
    formData.append('file', file)

    try {
      setState({ phase: 'analyzing', tokens: 0 })

      const res = await fetch('/api/critique/stream', {
        method: 'POST',
        body: formData,
        signal: ctrl.signal,
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: 'Upload failed' }))
        setState({ phase: 'error', message: err.detail || 'Server error' })
        return
      }

      // SSE parse
      let header: CritiqueHeader | null = null
      const categories: CritiqueCategory[] = []
      const fixes: PriorityFix[] = []
      let highlights: string[] = []

      const reader = res.body!.getReader()
      const dec = new TextDecoder()
      let buf = ''

      for (;;) {
        const { value, done } = await reader.read()
        if (done) break
        buf += dec.decode(value, { stream: true })
        const lines = buf.split('\n')
        buf = lines.pop() ?? ''

        for (const line of lines) {
          if (!line.startsWith('data:')) continue
          const payload = line.slice(5).trim()
          if (!payload) continue

          try {
            const ev = JSON.parse(payload)

            if (ev.event === 'progress') {
              setState({ phase: 'analyzing', tokens: ev.tokens })
            } else if (ev.event === 'header') {
              header = { overall_score: ev.overall_score, overall_grade: ev.overall_grade, summary: ev.summary }
              setScore(ev.overall_score)
              setSummary(ev.summary)
              setState({ phase: 'streaming', header, categories: [], fixes: [], highlights: [] })
            } else if (ev.event === 'category') {
              categories.push(ev.data)
              setState(prev =>
                prev.phase === 'streaming' || prev.phase === 'done'
                  ? { ...prev, categories: [...categories] }
                  : prev
              )
            } else if (ev.event === 'fix') {
              fixes.push(ev.data)
              setState(prev =>
                prev.phase === 'streaming' || prev.phase === 'done'
                  ? { ...prev, fixes: [...fixes] }
                  : prev
              )
            } else if (ev.event === 'highlights') {
              highlights = ev.data
              setState(prev =>
                prev.phase === 'streaming' || prev.phase === 'done'
                  ? { ...prev, highlights }
                  : prev
              )
            } else if (ev.event === 'done') {
              setState({ phase: 'done', header: header!, categories, fixes, highlights })
            } else if (ev.event === 'error') {
              setState({ phase: 'error', message: ev.message })
            }
          } catch { /* ignore JSON stream parse chunks */ }
        }
      }
    } catch (e: unknown) {
      if ((e as Error).name !== 'AbortError') {
        setState({ phase: 'error', message: (e as Error).message || 'Unknown error' })
      }
    }
  }, [])

  const triggerFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  // Load audit from history or templates
  const handleLoadAudit = (title: string, newScore: number, newSummary: string) => {
    setScore(newScore)
    setSummary(newSummary)
    setActiveTab('audit')
  }

  // Extract dynamic critique data
  const currentCategories = state.phase === 'streaming' || state.phase === 'done' ? state.categories : []
  const currentFixes = state.phase === 'streaming' || state.phase === 'done' ? state.fixes : []

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      width: '100vw',
      background: 'radial-gradient(circle 800px at 85% 10%, rgba(99, 102, 241, 0.18) 0%, rgba(120, 101, 255, 0.08) 50%, #060814 85%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Authentic Ambient Atmospheric Aurora Lighting Layers */}
      <div style={{
        position: 'absolute',
        top: -80,
        right: 0,
        width: 700,
        height: 500,
        background: 'radial-gradient(circle at 65% 30%, rgba(120, 101, 255, 0.22) 0%, rgba(78, 139, 255, 0.12) 45%, transparent 75%)',
        filter: 'blur(70px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 500,
        height: 450,
        background: 'radial-gradient(circle at 20% 80%, rgba(120, 101, 255, 0.12) 0%, transparent 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        style={{ display: 'none' }}
      />

      {/* Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onUpgradeClick={() => setUpgradeModalOpen(true)}
      />

      {/* Main Workspace */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '16px 24px',
        overflow: 'hidden auto',
        height: '100%',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Top Header */}
        <TopHeader
          onNewUpload={triggerFileUpload}
          showAllCategories={showAllCategories}
          onToggleCategories={() => setShowAllCategories(prev => !prev)}
        />

        {/* Processing Indicator if actively analyzing */}
        {state.phase === 'analyzing' && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(120, 101, 255, 0.15) 0%, rgba(78, 139, 255, 0.1) 100%)',
            border: '1px solid rgba(120, 101, 255, 0.3)',
            borderRadius: 8,
            padding: '10px 16px',
            marginBottom: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.82rem',
            color: '#F5F6FF',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 14,
                height: 14,
                border: '2px solid rgba(255,255,255,0.2)',
                borderTopColor: '#7865FF',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }} />
              <span>Gemini 2.0 Flash Vision is auditing uploaded design across 15 categories…</span>
            </div>
            <span style={{ color: '#6D7690', fontSize: '0.74rem' }}>
              {(state as { tokens: number }).tokens} tokens evaluated
            </span>
          </div>
        )}

        {/* Tab 1: Audit (Primary 1:1 Dashboard) */}
        {activeTab === 'audit' && (
          <div style={{
            display: 'flex',
            gap: 16,
            alignItems: 'flex-start',
          }}>
            {/* Column 1: Uploaded Design Card */}
            <UploadDesignCard
              imageUrl={imageUrl}
              onTriggerUpload={triggerFileUpload}
            />

            {/* Column 2: Health Score, Priority Fixes & Category Breakdown */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              minWidth: 0,
            }}>
              {/* Health Score Card */}
              <HealthScoreCard
                score={score}
                summary={summary}
              />

              {/* Priority Fixes Card */}
              <PriorityFixesCard
                fixes={currentFixes}
                onViewAll={() => setDetailsModalOpen(true)}
              />

              {/* Category Breakdown Grid */}
              <CategoryBreakdownGrid
                categories={currentCategories}
                showAll={showAllCategories}
              />
            </div>
          </div>
        )}

        {/* Tab 2: History */}
        {activeTab === 'history' && (
          <HistoryView onLoadAudit={handleLoadAudit} />
        )}

        {/* Tab 3: Templates */}
        {activeTab === 'templates' && (
          <TemplatesView onSelectTemplate={handleLoadAudit} />
        )}

        {/* Tab 4: Settings */}
        {activeTab === 'settings' && (
          <SettingsView />
        )}
      </main>

      {/* Upgrade Pro Modal */}
      <UpgradeModal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
      />

      {/* Audit Recommendations Details Modal */}
      <AuditDetailsModal
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        fixes={currentFixes}
      />
    </div>
  )
}
