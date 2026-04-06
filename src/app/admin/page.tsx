import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

async function getStats() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const [p, s, t] = await Promise.all([
      supabase.from('projects').select('id', { count: 'exact' }),
      supabase.from('skills').select('id', { count: 'exact' }),
      supabase.from('timeline').select('id', { count: 'exact' }),
    ])
    return { projects: p.count ?? 0, skills: s.count ?? 0, timeline: t.count ?? 0 }
  } catch {
    return { projects: 0, skills: 0, timeline: 0 }
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const cards = [
    { label: 'Proyectos',   value: stats.projects, icon: '🌐', href: '/admin/projects', color: 'var(--accent)' },
    { label: 'Habilidades', value: stats.skills,   icon: '⚡', href: '/admin/skills',   color: 'var(--accent-2)' },
    { label: 'Historial',   value: stats.timeline, icon: '📋', href: '/admin/timeline', color: '#a78bfa' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <p className="mb-8" style={{ color: 'var(--muted)' }}>Gestiona el contenido de tu portafolio.</p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {cards.map(c => (
          <Link key={c.label} href={c.href}
            className="p-6 rounded-2xl flex items-center gap-4 transition-all hover:scale-105"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <span className="text-3xl">{c.icon}</span>
            <div>
              <p className="text-3xl font-bold" style={{ color: c.color }}>{c.value}</p>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>{c.label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="p-6 rounded-2xl" style={{ background: 'rgba(41,121,255,0.06)', border: '1px solid rgba(41,121,255,0.15)' }}>
        <p className="text-sm font-medium" style={{ color: 'var(--accent-2)' }}>
          💡 Los cambios que hagas aquí se reflejan en tu portafolio público al instante.
        </p>
      </div>
    </div>
  )
}
