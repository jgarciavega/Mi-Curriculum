'use client'
import { useState } from 'react'
import { Contact } from '@/types'

interface Props { initialContact: Contact | null }

const empty: Omit<Contact, 'id'> = { email: '', linkedin_url: '', github_url: '', intro: '¿Tienes un proyecto en mente? Hablemos.' }

export default function ContactClient({ initialContact }: Props) {
  const [saved, setSaved]     = useState(false)
  const [error, setError]     = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [currentId, setCurrentId] = useState<string | undefined>(initialContact?.id)
  const [form, setForm]     = useState<Omit<Contact, 'id'>>(
    initialContact
      ? { email: initialContact.email, linkedin_url: initialContact.linkedin_url, github_url: initialContact.github_url, intro: initialContact.intro }
      : empty
  )

  async function save() {
    setLoading(true)
    setSaved(false)
    setError(null)
    try {
      const body = currentId ? { ...form, id: currentId } : form
      const res  = await fetch('/api/content/contact', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      const data = await res.json()
      if (!res.ok || data?.error) {
        setError(data?.error ?? 'Error al guardar. Revisa la configuración del servidor.')
        return
      }
      if (data?.id) setCurrentId(data.id)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      setError('Error de conexión. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text)', borderRadius: 8, padding: '0.6rem 0.75rem', width: '100%', fontSize: '0.875rem', outline: 'none' }

  const fields: { key: keyof typeof form; label: string; placeholder: string; icon: string }[] = [
    { key: 'email',        label: 'Email',        placeholder: 'admin@correo.com',                    icon: '✉️' },
    { key: 'linkedin_url', label: 'LinkedIn URL', placeholder: 'https://linkedin.com/in/tu-perfil',   icon: '💼' },
    { key: 'github_url',   label: 'GitHub URL',   placeholder: 'https://github.com/tu-usuario',       icon: '🐙' },
    { key: 'intro',        label: 'Texto intro',  placeholder: '¿Tienes un proyecto en mente?...',    icon: '💬' },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Contacto</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Información de contacto pública del portafolio</p>
      </div>

      <div className="max-w-xl rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="flex flex-col gap-4">
          {fields.map(({ key, label, placeholder, icon }) => (
            <div key={key}>
              <label className="text-xs font-medium block mb-1.5 flex items-center gap-1.5" style={{ color: 'var(--muted)' }}>
                <span>{icon}</span> {label}
              </label>
              <input
                value={form[key]}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                placeholder={placeholder}
                style={inputStyle}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(41,121,255,0.5)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(41,121,255,0.1)' }}
                onBlur={e  => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow = 'none' }}
              />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-6">
          <button onClick={save} disabled={loading}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-50 transition-opacity"
            style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', color: '#fff' }}>
            {loading ? 'Guardando...' : 'Guardar cambios'}
          </button>
          {saved && (
            <span className="text-sm flex items-center gap-1.5" style={{ color: '#4ade80' }}>
              ✓ Guardado correctamente
            </span>
          )}
          {error && (
            <span className="text-sm flex items-center gap-1.5" style={{ color: '#f87171' }}>
              ✗ {error}
            </span>
          )}
        </div>
      </div>

      {/* Preview */}
      <div className="mt-8 max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>Vista previa</p>
        <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>{form.intro || '—'}</p>
          <div className="flex flex-col gap-2">
            {[
              { icon: '✉️', label: form.email || 'Sin email', href: `mailto:${form.email}` },
              { icon: '💼', label: 'LinkedIn', href: form.linkedin_url || '#' },
              { icon: '🐙', label: 'GitHub',   href: form.github_url || '#' },
            ].map(c => (
              <a key={c.label} href={c.href}
                className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.03)', color: 'var(--text)' }}>
                <span>{c.icon}</span> {c.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
