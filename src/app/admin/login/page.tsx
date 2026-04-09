'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'

const CODE_TOKENS = [
  'const dev = true',  'npm run build',     '{ }',              '</>',
  'git commit',        'async/await',        'npm install',      '=>',
  'React.FC',          'useState()',         'useEffect()',      'Next.js',
  'TypeScript',        'tailwind',           'export default',   'import',
  '[]',                'interface{}',        'fetch()',          '.then()',
  'function()',        'return null',        'node_modules',     'git push',
  'console.log()',     'const router',       'type Props',       'await',
  '.tsx',              'className=',         'zIndex: 10',       'border-radius',
  'flexDirection',     'process.env',        'middleware.ts',    'supabase',
]

export default function LoginPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await signIn('credentials', { email, password, redirect: false })
    if (res?.ok) {
      window.location.href = '/admin'
    } else {
      setError('Email o contraseña incorrectos')
      setLoading(false)
    }
  }

  return (
    <div style={styles.root}>

      {CODE_TOKENS.map((token, i) => {
        const col   = i % 6
        const row   = Math.floor(i / 6)
        const dur   = 14 + (i % 7) * 2
        const delay = -(i * 1.3)
        return (
          <span key={i} style={{
            position: 'absolute',
            left:  `${6 + col * 16}%`,
            top:   `${5 + row * 22}%`,
            fontFamily: 'monospace',
            fontSize: '0.7rem',
            color: i % 3 === 0 ? 'rgba(41,121,255,0.22)' : i % 3 === 1 ? 'rgba(0,180,255,0.16)' : 'rgba(140,180,255,0.12)',
            pointerEvents: 'none',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            animation: `tokenFloat ${dur}s ${delay}s ease-in-out infinite`,
          }}>
            {token}
          </span>
        )
      })}

      <div style={styles.orb1} />
      <div style={styles.orb2} />
      <div style={styles.orb3} />
      <div style={styles.grid} />

      <div style={styles.card}>

        <div style={styles.iconWrap}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#lg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <defs>
              <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2979ff"/>
                <stop offset="100%" stopColor="#00b4ff"/>
              </linearGradient>
            </defs>
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={styles.title}>Acceso Admin</h1>
          <p style={styles.subtitle}>Panel de administración del portafolio</p>
        </div>

        <form onSubmit={handleSubmit} autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

          <div style={styles.fieldWrap}>
            <label style={styles.label}>Email</label>
            <div style={styles.inputWrap}>
              <svg style={styles.inputIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@ejemplo.com"
                required
                autoComplete="off"
                style={styles.input}
                onFocus={e => Object.assign(e.currentTarget.style, styles.inputFocus)}
                onBlur={e  => Object.assign(e.currentTarget.style, styles.input)}
              />
            </div>
          </div>

          <div style={styles.fieldWrap}>
            <label style={styles.label}>Contraseña</label>
            <div style={styles.inputWrap}>
              <svg style={styles.inputIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="xxxxxxxx"
                required
                autoComplete="new-password"
                style={{ ...styles.input, paddingRight: '2.8rem' }}
                onFocus={e => Object.assign(e.currentTarget.style, { ...styles.inputFocus, paddingRight: '2.8rem' })}
                onBlur={e  => Object.assign(e.currentTarget.style, { ...styles.input,      paddingRight: '2.8rem' })}
              />
              <button type="button" onClick={() => setShowPw(v => !v)} style={styles.eyeBtn} tabIndex={-1}>
                {showPw
                  ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                }
              </button>
            </div>
          </div>

          {error && (
            <div style={styles.errorBox}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={loading ? { ...styles.btn, opacity: 0.65, cursor: 'not-allowed' } : styles.btn}
          >
            {loading
              ? <><span style={styles.spinner} />Verificando...</>
              : <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                  Iniciar sesión
                </>
            }
          </button>
        </form>

        <p style={styles.footer}>🔒 Acceso restringido · Solo personal autorizado</p>
      </div>

      <style>{`
        @keyframes tokenFloat {
          0%,100% { transform: translateY(0px) rotate(-1deg); opacity: 1; }
          33%      { transform: translateY(-14px) rotate(1deg); opacity: 0.7; }
          66%      { transform: translateY(8px) rotate(-0.5deg); opacity: 0.9; }
        }
        @keyframes orbFloat1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(40px,-30px) scale(1.08)} }
        @keyframes orbFloat2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-30px,40px) scale(1.05)} }
        @keyframes orbFloat3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,20px) scale(1.1)} }
        @keyframes spin      { to { transform: rotate(360deg) } }
        @keyframes cardIn    { from{opacity:0;transform:translateY(28px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes errorIn   { from{opacity:0;transform:translateY(-6px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
      `}</style>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  root: {
    minHeight: '100vh', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    background: '#060d1f', position: 'relative',
    overflow: 'hidden', padding: '1rem',
  },
  orb1: {
    position: 'absolute', borderRadius: '50%',
    width: 520, height: 520, top: '-140px', left: '-120px',
    background: 'radial-gradient(circle, rgba(41,121,255,0.18) 0%, transparent 70%)',
    animation: 'orbFloat1 9s ease-in-out infinite', pointerEvents: 'none',
  },
  orb2: {
    position: 'absolute', borderRadius: '50%',
    width: 420, height: 420, bottom: '-100px', right: '-80px',
    background: 'radial-gradient(circle, rgba(0,180,255,0.15) 0%, transparent 70%)',
    animation: 'orbFloat2 11s ease-in-out infinite', pointerEvents: 'none',
  },
  orb3: {
    position: 'absolute', borderRadius: '50%',
    width: 200, height: 200, top: '55%', left: '55%',
    background: 'radial-gradient(circle, rgba(41,121,255,0.1) 0%, transparent 70%)',
    animation: 'orbFloat3 7s ease-in-out infinite', pointerEvents: 'none',
  },
  grid: {
    position: 'absolute', inset: 0, pointerEvents: 'none',
    backgroundImage: 'linear-gradient(rgba(41,121,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(41,121,255,0.04) 1px, transparent 1px)',
    backgroundSize: '48px 48px',
  },
  card: {
    position: 'relative', zIndex: 10,
    width: '100%', maxWidth: 420, padding: '2.5rem 2rem',
    borderRadius: 24,
    background: 'rgba(6,13,31,0.82)',
    backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
    border: '1px solid rgba(41,121,255,0.2)',
    boxShadow: '0 8px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset',
    animation: 'cardIn .55s cubic-bezier(.22,1,.36,1) forwards',
  },
  iconWrap: {
    width: 60, height: 60, borderRadius: 18, margin: '0 auto 1.25rem',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'linear-gradient(135deg, rgba(41,121,255,0.2), rgba(0,180,255,0.15))',
    border: '1px solid rgba(41,121,255,0.3)',
    boxShadow: '0 0 24px rgba(41,121,255,0.2)',
  },
  title: {
    fontSize: '1.5rem', fontWeight: 700, margin: 0,
    background: 'linear-gradient(135deg, #e2eaf8, #a8c0e8)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
  },
  subtitle: { fontSize: '0.8rem', color: '#6b84a8', margin: '0.4rem 0 0' },
  fieldWrap: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  label: { fontSize: '0.78rem', fontWeight: 600, color: '#8fa4c8', letterSpacing: '0.04em', textTransform: 'uppercase' },
  inputWrap: { position: 'relative', display: 'flex', alignItems: 'center' },
  inputIcon: { position: 'absolute', left: '0.85rem', color: '#4a6a9a', pointerEvents: 'none' },
  input: {
    width: '100%', padding: '0.75rem 0.9rem 0.75rem 2.6rem',
    borderRadius: 12, fontSize: '0.9rem',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#e2eaf8', outline: 'none',
    transition: 'border-color .2s, box-shadow .2s, background .2s',
  },
  inputFocus: {
    width: '100%', padding: '0.75rem 0.9rem 0.75rem 2.6rem',
    borderRadius: 12, fontSize: '0.9rem',
    background: 'rgba(41,121,255,0.07)',
    border: '1px solid rgba(41,121,255,0.55)',
    color: '#e2eaf8', outline: 'none',
    boxShadow: '0 0 0 3px rgba(41,121,255,0.13)',
    transition: 'border-color .2s, box-shadow .2s, background .2s',
  },
  eyeBtn: {
    position: 'absolute', right: '0.85rem',
    background: 'transparent', border: 'none', cursor: 'pointer',
    color: '#4a6a9a', display: 'flex', alignItems: 'center', padding: 0,
  },
  errorBox: {
    display: 'flex', alignItems: 'center', gap: '0.55rem',
    padding: '0.8rem 1rem', borderRadius: 10,
    background: 'rgba(239,68,68,0.15)',
    border: '1.5px solid rgba(239,68,68,0.55)',
    color: '#fca5a5', fontSize: '0.85rem', fontWeight: 500,
    boxShadow: '0 0 16px rgba(239,68,68,0.18)',
    animation: 'errorIn .25s ease forwards',
  },
  btn: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: '0.5rem', marginTop: '0.5rem',
    padding: '0.85rem', borderRadius: 12, border: 'none',
    background: 'linear-gradient(135deg, #2979ff, #00b4ff)',
    color: '#fff', fontSize: '0.95rem', fontWeight: 600,
    cursor: 'pointer', letterSpacing: '0.01em',
    boxShadow: '0 4px 24px rgba(41,121,255,0.4)',
    transition: 'opacity .2s, transform .15s',
  },
  spinner: {
    display: 'inline-block', width: 15, height: 15,
    border: '2px solid rgba(255,255,255,0.3)',
    borderTopColor: '#fff', borderRadius: '50%',
    animation: 'spin .7s linear infinite',
  },
  footer: {
    marginTop: '1.75rem', textAlign: 'center',
    fontSize: '0.72rem', color: '#2a3f5a', letterSpacing: '0.02em',
  },
}
