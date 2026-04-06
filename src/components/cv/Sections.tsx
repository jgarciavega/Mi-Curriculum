import { Project, Skill, TimelineItem, Education } from '@/types'

interface Props {
  projects: Project[]
  skills: Skill[]
  timeline: TimelineItem[]
  education: Education[]
}

const cardStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.035)',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: 16,
  padding: '2rem',
  marginBottom: '1.5rem',
  transition: 'background .3s, border-color .3s',
}

const labelStyle: React.CSSProperties = {
  fontSize: '0.7rem',
  fontWeight: 700,
  letterSpacing: '0.15em',
  color: 'var(--accent)',
  background: 'rgba(41,121,255,0.1)',
  border: '1px solid rgba(41,121,255,0.2)',
  borderRadius: 6,
  padding: '2px 10px',
  display: 'inline-block',
  marginBottom: '1rem',
}

export default function Sections({ projects, skills, timeline, education }: Props) {
  const frontendSkills = skills.filter(s => s.category === 'frontend')
  const toolSkills = skills.filter(s => s.category === 'tools')

  return (
    <div className="max-w-4xl mx-auto px-8 py-12 flex flex-col gap-6">

      {/* Sobre mí */}
      <section id="sobre" style={cardStyle}>
        <span style={labelStyle}>01</span>
        <h3 className="text-xl font-bold mb-3">Sobre mí</h3>
        <p style={{ color: 'var(--muted)' }}>
          Soy desarrollador web con experiencia en front-end y diseño de interfaces. Me apasiona construir productos digitales con excelente experiencia de usuario, código limpio y diseño moderno.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {['💡 Apasionado del diseño','⚡ Código limpio','🚀 Orientado a resultados','🌐 Siempre aprendiendo'].map(t => (
            <span key={t} className="px-3 py-1 rounded-full text-sm" style={{ background: 'rgba(41,121,255,0.1)', border: '1px solid rgba(41,121,255,0.2)', color: 'var(--text)' }}>{t}</span>
          ))}
        </div>
      </section>

      {/* Habilidades */}
      <section id="habilidades" style={cardStyle}>
        <span style={labelStyle}>02</span>
        <h3 className="text-xl font-bold mb-4">Habilidades</h3>
        <div className="grid md:grid-cols-2 gap-8 mb-6">
          {[{ title: 'Front-end', items: frontendSkills }, { title: 'Herramientas', items: toolSkills }].map(group => (
            <div key={group.title}>
              <h4 className="font-semibold mb-3" style={{ color: 'var(--accent-2)' }}>{group.title}</h4>
              {group.items.map(s => (
                <div key={s.id} className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{s.name}</span>
                    <span style={{ color: 'var(--muted)' }}>{s.percentage}%</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
                    <div className="h-full rounded-full" style={{ width: `${s.percentage}%`, background: 'linear-gradient(90deg, var(--accent), var(--accent-2))' }} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {['HTML5','CSS3','JavaScript','React','Git','Figma','Node.js','Tailwind CSS'].map(t => (
            <span key={t} className="px-3 py-1 rounded-lg text-xs font-medium" style={{ background: 'rgba(41,121,255,0.1)', border: '1px solid rgba(41,121,255,0.2)', color: 'var(--accent-2)' }}>{t}</span>
          ))}
        </div>
      </section>

      {/* Historial */}
      <section id="historial" style={cardStyle}>
        <span style={labelStyle}>03</span>
        <h3 className="text-xl font-bold mb-6">Historial</h3>
        <div className="flex flex-col gap-6">
          {timeline.map((item, i) => (
            <div key={item.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full mt-1 shrink-0" style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))' }} />
                {i < timeline.length - 1 && <div className="w-px flex-1 mt-1" style={{ background: 'var(--border)' }} />}
              </div>
              <div className="pb-6">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-bold">{item.company}</h4>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(41,121,255,0.1)', color: 'var(--accent)' }}>{item.period}</span>
                </div>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Proyectos */}
      <section id="proyectos" style={cardStyle}>
        <span style={labelStyle}>04</span>
        <h3 className="text-xl font-bold mb-6">Proyectos</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {projects.map(p => (
            <div key={p.id} className="rounded-xl p-4 flex flex-col gap-2" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="text-3xl">{p.icon}</div>
              <h4 className="font-bold">{p.title}</h4>
              <p className="text-sm flex-1" style={{ color: 'var(--muted)' }}>{p.description}</p>
              <div className="flex flex-wrap gap-1">
                {p.tags.map(t => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(41,121,255,0.1)', color: 'var(--accent-2)' }}>{t}</span>
                ))}
              </div>
              <div className="flex gap-3 mt-1">
                {p.demo_url && <a href={p.demo_url} className="text-sm font-medium" style={{ color: 'var(--accent)' }}>Demo →</a>}
                {p.github_url && <a href={p.github_url} className="text-sm font-medium" style={{ color: 'var(--accent)' }}>GitHub →</a>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Educación */}
      <section id="curriculum" style={cardStyle}>
        <span style={labelStyle}>05</span>
        <h3 className="text-xl font-bold mb-4">Educación</h3>
        <div className="flex flex-col gap-4">
          {education.map(e => (
            <div key={e.id} className="flex gap-3 items-start">
              <span className="text-2xl">{e.icon}</span>
              <div>
                <strong>{e.title}</strong>
                <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>{e.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          {['🇲🇽 Español — Nativo','🇺🇸 Inglés — Avanzado'].map(l => (
            <span key={l} className="px-3 py-1 rounded-full text-sm" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>{l}</span>
          ))}
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" style={cardStyle}>
        <span style={labelStyle}>06</span>
        <h3 className="text-xl font-bold mb-2">Contacto</h3>
        <p className="mb-6" style={{ color: 'var(--muted)' }}>¿Tienes un proyecto en mente? Hablemos.</p>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: '✉️', label: 'ejemplo@correo.com', href: 'mailto:ejemplo@correo.com' },
            { icon: '💼', label: 'LinkedIn', href: '#' },
            { icon: '🐙', label: 'GitHub', href: '#' },
          ].map(c => (
            <a key={c.label} href={c.href} className="flex items-center gap-3 p-4 rounded-xl transition-all duration-200 hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <span className="text-xl">{c.icon}</span>
              <span className="text-sm font-medium">{c.label}</span>
            </a>
          ))}
        </div>
      </section>

    </div>
  )
}
