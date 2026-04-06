import { auth } from '@/lib/auth'
import Link from 'next/link'
import AdminNav from '@/components/admin/AdminNav'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  // Login page: render without sidebar
  if (!session?.user?.email) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg)' }}>
      {/* Sidebar */}
      <aside className="w-56 shrink-0 flex flex-col py-6 px-4 gap-1" style={{ background: 'rgba(255,255,255,0.03)', borderRight: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="mb-6 px-2">
          <p className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--accent)' }}>Admin Panel</p>
          <p className="text-xs mt-1 truncate" style={{ color: 'var(--muted)' }}>{session?.user?.email}</p>
        </div>

        <AdminNav />

        <div className="mt-auto flex flex-col gap-1">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all" style={{ color: 'var(--muted)' }}>
            👁️ Ver sitio
          </Link>
          {/* Plain HTML link - no JS needed, full page navigation */}
          <a
            href="/api/logout"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm"
            style={{ color: '#f87171' }}
          >
            🚪 Cerrar sesión
          </a>
        </div>
      </aside>

      {/* Contenido */}
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  )
}
