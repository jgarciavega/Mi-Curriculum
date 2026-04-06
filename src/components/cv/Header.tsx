'use client'
import Image from 'next/image'

export default function Header() {
  return (
    <>
      {/* Logo fijo fuera del header */}
      <div className="fixed top-2 left-6 z-[200]">
        <Image
          src="/logo.png"
          alt="Logo"
          width={145}
          height={145}
          className="animate-logo object-contain"
          priority
        />
      </div>

      {/* Barra de progreso scroll */}
      <div
        id="scrollProgress"
        className="fixed top-0 left-0 h-[2px] w-0 z-[1000] transition-all duration-100"
        style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-2))' }}
      />

      <header
        id="siteHeader"
        className="sticky top-0 z-[100] py-3"
        style={{
          background: 'rgba(6,13,31,0.75)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid transparent',
        }}
      >
        <div className="max-w-4xl mx-auto px-8 flex items-center justify-end">
          <nav className="hidden md:flex gap-1">
            {['sobre','habilidades','historial','proyectos','contacto'].map(s => (
              <a
                key={s}
                href={`#${s}`}
                className="px-3 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200"
                style={{ color: 'var(--muted)' }}
                onMouseEnter={e => {
                  (e.target as HTMLElement).style.color = 'var(--text)'
                  ;(e.target as HTMLElement).style.background = 'rgba(255,255,255,0.06)'
                }}
                onMouseLeave={e => {
                  (e.target as HTMLElement).style.color = 'var(--muted)'
                  ;(e.target as HTMLElement).style.background = 'transparent'
                }}
              >
                {s}
              </a>
            ))}
          </nav>
        </div>
      </header>
    </>
  )
}
