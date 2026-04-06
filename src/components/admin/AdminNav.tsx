'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/admin',          icon: '📊', label: 'Dashboard' },
  { href: '/admin/projects', icon: '🌐', label: 'Proyectos' },
  { href: '/admin/skills',   icon: '⚡', label: 'Habilidades' },
  { href: '/admin/timeline', icon: '📋', label: 'Historial' },
]

export default function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-1">
      {links.map(item => {
        const active = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
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
}
