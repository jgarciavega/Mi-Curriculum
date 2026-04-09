'use client'
import { useState } from 'react'
import { Education } from '@/types'

interface Props { initialEducation: Education[] }

const empty: Omit<Education, 'id'> = { title: '', description: '', year: '', icon: '🎓' }

export default function EducationClient({ initialEducation }: Props) {
  const [items, setItems]     = useState(initialEducation)
  const [editing, setEditing] = useState<Education | null>(null)
  const [form, setForm]       = useState<Omit<Education, 'id'>>(empty)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)

  function openNew()         { setEditing(null); setForm(empty); setShowForm(true) }
  function openEdit(e: Education) { setEditing(e); setForm({ title: e.title, description: e.description, year: e.year, icon: e.icon }); setShowForm(true) }

  async function save() {
    setLoading(true)
    const method = editing ? 'PUT' : 'POST'
    const body   = editing ? { ...form, id: editing.id } : form
    const res    = await fetch('/api/content/education', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    const data   = await res.json()
    if (editing) setItems(prev => prev.map(i => i.id === editing.id ? data : i))
    else         setItems(prev => [...prev, data])
    setShowForm(false)
    setLoading(false)
  }

  async function remove(id: string) {
    if (!confirm('¿Eliminar este registro?')) return
    await fetch('/api/content/education', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const inputStyle = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text)', borderRadius: 8, padding: '0.5rem 0.75rem', width: '100%', fontSize: '0.875rem', outline: 'none' }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Educación</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>{items.length} registros</p>
        </div>
        <button onClick={openNew} className="px-4 py-2 rounded-xl text-sm font-semibold"
          style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', color: '#fff' }}>
          + Nuevo
        </button>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        {items.map(e => (
          <div key={e.id} className="flex items-center gap-4 p-4 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span className="text-2xl">{e.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold">{e.title}</p>
              <p className="text-sm truncate" style={{ color: 'var(--muted)' }}>{e.description}</p>
              <span className="text-xs px-2 py-0.5 rounded mt-1 inline-block"
                style={{ background: 'rgba(41,121,255,0.1)', color: 'var(--accent-2)' }}>{e.year}</span>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openEdit(e)} className="px-3 py-1.5 rounded-lg text-xs font-medium"
                style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text)' }}>Editar</button>
              <button onClick={() => remove(e.id)} className="px-3 py-1.5 rounded-lg text-xs font-medium"
                style={{ background: 'rgba(248,113,113,0.1)', color: '#f87171' }}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="w-full max-w-lg rounded-2xl p-6" style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 className="text-lg font-bold mb-4">{editing ? 'Editar' : 'Nueva'} Educación</h2>
            <div className="flex flex-col gap-3">
              {([
                { key: 'icon',        label: 'Ícono (emoji)' },
                { key: 'title',       label: 'Título' },
                { key: 'description', label: 'Descripción' },
                { key: 'year',        label: 'Año' },
              ] as { key: keyof typeof form; label: string }[]).map(({ key, label }) => (
                <div key={key}>
                  <label className="text-xs font-medium block mb-1" style={{ color: 'var(--muted)' }}>{label}</label>
                  <input value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} style={inputStyle} />
                </div>
              ))}
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
