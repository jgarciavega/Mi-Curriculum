'use client'
import { useState } from 'react'
import { TimelineItem } from '@/types'

export default function TimelineClient({ initialItems }: { initialItems: TimelineItem[] }) {
  const [items, setItems]     = useState(initialItems)
  const [editing, setEditing] = useState<TimelineItem | null>(null)
  const [form, setForm]       = useState({ company: '', role: '', period: '', description: '', order: 0 })
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading]   = useState(false)

  function openNew()              { setEditing(null); setForm({ company: '', role: '', period: '', description: '', order: 0 }); setShowForm(true) }
  function openEdit(t: TimelineItem) { setEditing(t); setForm({ company: t.company, role: t.role, period: t.period, description: t.description, order: t.order }); setShowForm(true) }

  async function save() {
    setLoading(true)
    const method = editing ? 'PUT' : 'POST'
    const body   = editing ? { ...form, id: editing.id } : form
    const res    = await fetch('/api/content/timeline', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    const data   = await res.json()
    if (!res.ok) { alert(`Error al guardar: ${data.error ?? res.statusText}`); setLoading(false); return }
    if (editing) setItems(is => is.map(i => i.id === editing.id ? data : i))
    else         setItems(is => [...is, data])
    setShowForm(false)
    setLoading(false)
  }

  async function remove(id: string) {
    if (!confirm('¿Eliminar?')) return
    const res = await fetch('/api/content/timeline', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    if (!res.ok) { const d = await res.json(); alert(`Error al eliminar: ${d.error ?? res.statusText}`); return }
    setItems(is => is.filter(i => i.id !== id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Historial</h1>
        <button onClick={openNew} className="px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', color: '#fff' }}>
          + Nueva entrada
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {items.map(item => (
          <div key={item.id} className="flex items-start gap-4 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">{item.company}</span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(41,121,255,0.1)', color: 'var(--accent)' }}>{item.period}</span>
              </div>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>{item.description}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openEdit(item)} className="px-3 py-1.5 rounded-lg text-xs" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text)' }}>Editar</button>
              <button onClick={() => remove(item.id)} className="px-3 py-1.5 rounded-lg text-xs" style={{ background: 'rgba(248,113,113,0.1)', color: '#f87171' }}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="w-full max-w-md rounded-2xl p-6" style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 className="text-lg font-bold mb-4">{editing ? 'Editar' : 'Nueva'} entrada</h2>
            <div className="flex flex-col gap-3">
              {(['company','role','period','description'] as const).map(field => (
                <div key={field}>
                  <label className="text-xs font-medium block mb-1 capitalize" style={{ color: 'var(--muted)' }}>{field}</label>
                  <input value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text)' }} />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5 justify-end">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-xl text-sm" style={{ color: 'var(--muted)' }}>Cancelar</button>
              <button onClick={save} disabled={loading} className="px-4 py-2 rounded-xl text-sm font-semibold disabled:opacity-50" style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', color: '#fff' }}>
                {loading ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
