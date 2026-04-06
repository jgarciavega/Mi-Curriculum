'use client'
import { useState } from 'react'
import { Skill } from '@/types'

export default function SkillsClient({ initialSkills }: { initialSkills: Skill[] }) {
  const [skills, setSkills] = useState(initialSkills)
  const [editing, setEditing] = useState<Skill | null>(null)
  const [form, setForm] = useState({ name: '', percentage: 80, category: 'frontend' as 'frontend' | 'tools' })
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)

  function openNew() { setEditing(null); setForm({ name: '', percentage: 80, category: 'frontend' }); setShowForm(true) }
  function openEdit(s: Skill) { setEditing(s); setForm({ name: s.name, percentage: s.percentage, category: s.category }); setShowForm(true) }

  async function save() {
    setLoading(true)
    const method = editing ? 'PUT' : 'POST'
    const body   = editing ? { ...form, id: editing.id } : form
    const res    = await fetch('/api/content/skills', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    const data   = await res.json()
    if (editing) setSkills(ss => ss.map(s => s.id === editing.id ? data : s))
    else         setSkills(ss => [...ss, data])
    setShowForm(false)
    setLoading(false)
  }

  async function remove(id: string) {
    if (!confirm('¿Eliminar?')) return
    await fetch('/api/content/skills', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    setSkills(ss => ss.filter(s => s.id !== id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Habilidades</h1>
        <button onClick={openNew} className="px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', color: '#fff' }}>
          + Nueva habilidad
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {skills.map(s => (
          <div key={s.id} className="flex items-center gap-4 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex-1">
              <div className="flex justify-between mb-1 text-sm">
                <span className="font-medium">{s.name}</span>
                <span style={{ color: 'var(--muted)' }}>{s.percentage}%</span>
              </div>
              <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
                <div className="h-full rounded-full" style={{ width: `${s.percentage}%`, background: 'linear-gradient(90deg, var(--accent), var(--accent-2))' }} />
              </div>
              <span className="text-xs mt-1 inline-block" style={{ color: 'var(--muted)' }}>{s.category}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(s)} className="px-3 py-1.5 rounded-lg text-xs" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text)' }}>Editar</button>
              <button onClick={() => remove(s.id)} className="px-3 py-1.5 rounded-lg text-xs" style={{ background: 'rgba(248,113,113,0.1)', color: '#f87171' }}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="w-full max-w-md rounded-2xl p-6" style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 className="text-lg font-bold mb-4">{editing ? 'Editar' : 'Nueva'} Habilidad</h2>
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-medium block mb-1" style={{ color: 'var(--muted)' }}>Nombre</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text)' }} />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1" style={{ color: 'var(--muted)' }}>Porcentaje: {form.percentage}%</label>
                <input type="range" min={0} max={100} value={form.percentage} onChange={e => setForm(f => ({ ...f, percentage: +e.target.value }))} className="w-full" />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1" style={{ color: 'var(--muted)' }}>Categoría</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value as 'frontend' | 'tools' }))} className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text)' }}>
                  <option value="frontend">Front-end</option>
                  <option value="tools">Herramientas</option>
                </select>
              </div>
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
