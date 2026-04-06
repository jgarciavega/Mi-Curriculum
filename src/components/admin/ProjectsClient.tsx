'use client'
import { useState } from 'react'
import { Project } from '@/types'

interface Props { initialProjects: Project[] }

const empty: Omit<Project, 'id'> = { title: '', description: '', icon: '🌐', tags: [], demo_url: '', github_url: '', order: 0 }

export default function ProjectsClient({ initialProjects }: Props) {
  const [projects, setProjects] = useState(initialProjects)
  const [editing, setEditing]   = useState<Project | null>(null)
  const [form, setForm]         = useState<Omit<Project,'id'>>(empty)
  const [loading, setLoading]   = useState(false)
  const [showForm, setShowForm] = useState(false)

  function openNew() { setEditing(null); setForm(empty); setShowForm(true) }
  function openEdit(p: Project) { setEditing(p); setForm({ title: p.title, description: p.description, icon: p.icon, tags: p.tags, demo_url: p.demo_url ?? '', github_url: p.github_url ?? '', order: p.order }); setShowForm(true) }

  async function save() {
    setLoading(true)
    const method = editing ? 'PUT' : 'POST'
    const body   = editing ? { ...form, id: editing.id } : form
    const res    = await fetch('/api/content/projects', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...body, tags: typeof body.tags === 'string' ? (body.tags as string).split(',').map(t => t.trim()) : body.tags }) })
    const data   = await res.json()
    if (editing) setProjects(ps => ps.map(p => p.id === editing.id ? data : p))
    else         setProjects(ps => [...ps, data])
    setShowForm(false)
    setLoading(false)
  }

  async function remove(id: string) {
    if (!confirm('¿Eliminar este proyecto?')) return
    await fetch('/api/content/projects', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    setProjects(ps => ps.filter(p => p.id !== id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Proyectos</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>{projects.length} proyectos</p>
        </div>
        <button onClick={openNew} className="px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', color: '#fff' }}>
          + Nuevo proyecto
        </button>
      </div>

      {/* Lista */}
      <div className="grid gap-3 mb-6">
        {projects.map(p => (
          <div key={p.id} className="flex items-center gap-4 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span className="text-2xl">{p.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold">{p.title}</p>
              <p className="text-sm truncate" style={{ color: 'var(--muted)' }}>{p.description}</p>
              <div className="flex gap-1 mt-1 flex-wrap">
                {p.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(41,121,255,0.1)', color: 'var(--accent-2)' }}>{t}</span>)}
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openEdit(p)} className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text)' }}>Editar</button>
              <button onClick={() => remove(p.id)} className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: 'rgba(248,113,113,0.1)', color: '#f87171' }}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal formulario */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="w-full max-w-lg rounded-2xl p-6" style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 className="text-lg font-bold mb-4">{editing ? 'Editar' : 'Nuevo'} Proyecto</h2>
            <div className="flex flex-col gap-3">
              {(['title','description','icon','demo_url','github_url'] as const).map(field => (
                <div key={field}>
                  <label className="text-xs font-medium block mb-1 capitalize" style={{ color: 'var(--muted)' }}>{field.replace('_',' ')}</label>
                  <input value={(form as Record<string,unknown>)[field] as string} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text)' }} />
                </div>
              ))}
              <div>
                <label className="text-xs font-medium block mb-1" style={{ color: 'var(--muted)' }}>Tags (separados por coma)</label>
                <input value={Array.isArray(form.tags) ? form.tags.join(', ') : form.tags}
                  onChange={e => setForm(f => ({ ...f, tags: e.target.value.split(',').map(t => t.trim()) }))}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text)' }} />
              </div>
            </div>
            <div className="flex gap-3 mt-5 justify-end">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-xl text-sm" style={{ color: 'var(--muted)' }}>Cancelar</button>
              <button onClick={save} disabled={loading} className="px-4 py-2 rounded-xl text-sm font-semibold disabled:opacity-50"
                style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', color: '#fff' }}>
                {loading ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
