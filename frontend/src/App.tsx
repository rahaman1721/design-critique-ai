import { useState, useCallback, useRef } from 'react'
import type { AppState, CritiqueCategory, PriorityFix, CritiqueHeader } from './types'
import UploadZone from './components/UploadZone'
import ImagePreview from './components/ImagePreview'
import AnalysisPanel from './components/AnalysisPanel'
import Header from './components/Header'

export default function App() {
  const [state, setState] = useState<AppState>({ phase: 'idle' })
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const handleFile = useCallback(async (file: File) => {
    if (abortRef.current) abortRef.current.abort()
    const ctrl = new AbortController()
    abortRef.current = ctrl

    const previewUrl = URL.createObjectURL(file)
    setImageUrl(previewUrl)
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
          } catch { /* ignore JSON parse errors in SSE chunks */ }
        }
      }
    } catch (e: unknown) {
      if ((e as Error).name !== 'AbortError') {
        setState({ phase: 'error', message: (e as Error).message || 'Unknown error' })
      }
    }
  }, [])

  const handleReset = useCallback(() => {
    abortRef.current?.abort()
    setState({ phase: 'idle' })
    setImageUrl(null)
  }, [])

  const hasResult = state.phase === 'streaming' || state.phase === 'done' || state.phase === 'analyzing'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <Header onReset={hasResult ? handleReset : undefined} />

      <main style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: hasResult ? '420px 1fr' : '1fr',
        gap: 0,
        height: 'calc(100vh - 60px)',
        overflow: 'hidden',
      }}>
        {/* Left Panel */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          borderRight: hasResult ? '1px solid var(--border-subtle)' : 'none',
          overflow: 'hidden',
        }}>
          {!hasResult ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
              <UploadZone onFile={handleFile} />
            </div>
          ) : (
            <ImagePreview
              imageUrl={imageUrl}
              state={state}
              onReset={handleReset}
              onNewFile={handleFile}
            />
          )}
        </div>

        {/* Right Panel */}
        {hasResult && (
          <div style={{ overflow: 'hidden auto' }}>
            <AnalysisPanel state={state} />
          </div>
        )}
      </main>
    </div>
  )
}
