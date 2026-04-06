'use client'
import { useEffect, useState } from 'react'

const phrases = [
  'Desarrollador Web Front-end',
  'Diseñador UI/UX',
  'Apasionado del código limpio',
]

export default function Hero() {
  const [text, setText] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[phraseIdx]
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, charIdx + 1))
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1800)
        } else {
          setCharIdx(c => c + 1)
        }
      } else {
        setText(current.slice(0, charIdx - 1))
        if (charIdx - 1 === 0) {
          setDeleting(false)
          setPhraseIdx(i => (i + 1) % phrases.length)
          setCharIdx(0)
        } else {
          setCharIdx(c => c - 1)
        }
      }
    }, deleting ? 50 : 90)
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, phraseIdx])

  return (
    <section
      className="relative min-h-screen flex items-center"
      style={{ background: 'linear-gradient(135deg, var(--bg) 0%, #0a1428 50%, #060d1f 100%)' }}
    >
      {/* Fondo decorativo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(41,121,255,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-4xl mx-auto px-8 flex flex-col md:flex-row items-center gap-10 py-24">
        {/* Avatar */}
        <div className="shrink-0">
          <div
            className="w-28 h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center text-3xl font-bold"
            style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
              boxShadow: '0 0 40px rgba(41,121,255,0.35)',
            }}
          >
            JG
          </div>
        </div>

        {/* Texto */}
        <div className="animate-fade-up">
          <p className="text-sm font-medium mb-2" style={{ color: 'var(--accent-2)' }}>
            ¡Hola, soy
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Ing. Jorge Ignacio<br />
            <span style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Garcia Vega
            </span>
          </h1>
          <p className="text-xl mb-8" style={{ color: 'var(--muted)' }}>
            {text}<span className="animate-blink" style={{ color: 'var(--accent)' }}>|</span>
          </p>
          <div className="flex gap-4 flex-wrap">
            <a
              href="/cv.pdf"
              download
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', color: '#fff' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7,10 12,15 17,10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Descargar CV
            </a>
            <a
              href="#historial"
              className="px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
              style={{ border: '1px solid var(--accent)', color: 'var(--accent)' }}
            >
              Ver historial
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
