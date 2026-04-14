'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

const links = [
  { href: '/admin',           icon: '📊', label: 'Dashboard' },
  { href: '/admin/projects',  icon: '🌐', label: 'Proyectos' },
  { href: '/admin/skills',    icon: '⚡', label: 'Habilidades' },
  { href: '/admin/timeline',  icon: '📋', label: 'Historial' },
  { href: '/admin/education', icon: '🎓', label: 'Educación' },
  { href: '/admin/contact',   icon: '✉️', label: 'Contacto' },
]

interface Props {
  email: string
  children: React.ReactNode
}

export default function AdminShell({ email, children }: Props) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Close drawer on route change
  useEffect(() => { setOpen(false) }, [pathname])
  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const current = links.find(l => l.href === pathname)

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <nav className="flex flex-col gap-1">
      {links.map(item => {
        const active = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClick}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-[1.02]"
            style={{
              background: active ? 'rgba(41,121,255,0.15)' : 'transparent',
              color: active ? 'var(--text)' : 'var(--muted)',
            }}
          >
            <span>{item.icon}</span> {item.label}
          </Link>
        )
      })}
    </nav>
  )

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>

      {/* ── Mobile top bar ─────────────────────────────────── */}
      <header
        className="lg:hidden flex items-center justify-between px-4 h-14 shrink-0"
        style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            className="p-2 rounded-lg"
            style={{ color: 'var(--text)', background: 'rgba(255,255,255,0.06)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="3" y1="6"  x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <span className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>
            {current ? `${current.icon} ${current.label}` : 'Admin'}
          </span>
        </div>
        <Link href="/" className="text-xs px-3 py-1.5 rounded-lg" style={{ color: 'var(--muted)', background: 'rgba(255,255,255,0.05)' }}>
          👁️ Ver sitio
        </Link>
      </header>

      {/* ── Mobile drawer overlay ───────────────────────────── */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-40"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)' }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Mobile drawer ──────────────────────────────────── */}
      <aside
        className="lg:hidden fixed top-0 left-0 z-50 h-full flex flex-col py-6 px-4 gap-1 transition-transform duration-300"
        style={{
          width: 240,
          background: 'var(--bg)',
          borderRight: '1px solid rgba(255,255,255,0.08)',
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
        }}
      >
        <div className="flex items-center justify-between mb-6 px-2">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--accent)' }}>Admin Panel</p>
            <p className="text-xs mt-1 truncate max-w-[160px]" style={{ color: 'var(--muted)' }}>{email}</p>
          </div>
          <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg" style={{ color: 'var(--muted)', background: 'rgba(255,255,255,0.05)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <NavLinks onClick={() => setOpen(false)} />

        <div className="mt-auto flex flex-col gap-1">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm" style={{ color: 'var(--muted)' }}>
            👁️ Ver sitio
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left"
            style={{ color: '#f87171', background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            🚪 Cerrar sesión
          </button>
        </div>
      </aside>

      {/* ── Desktop layout ─────────────────────────────────── */}
      <div className="flex flex-1 min-h-0">
        {/* Desktop sidebar */}
        <aside
          className="hidden lg:flex w-56 shrink-0 flex-col py-6 px-4 gap-1"
          style={{ background: 'rgba(255,255,255,0.03)', borderRight: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="mb-6 px-2">
            <p className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--accent)' }}>Admin Panel</p>
            <p className="text-xs mt-1 truncate" style={{ color: 'var(--muted)' }}>{email}</p>
          </div>

          <NavLinks />

          <div className="mt-auto flex flex-col gap-1">
            <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all" style={{ color: 'var(--muted)' }}>
              👁️ Ver sitio
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left"
              style={{ color: '#f87171', background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              🚪 Cerrar sesión
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
