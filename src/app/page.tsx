export const dynamic = 'force-dynamic'

import Header from '@/components/cv/Header'
import Hero from '@/components/cv/Hero'
import Sections from '@/components/cv/Sections'
import AdminShortcut from '@/components/AdminShortcut'
import { defaultProjects, defaultSkills, defaultTimeline, defaultEducation, defaultContact } from '@/lib/defaultData'
import { createClient } from '@supabase/supabase-js'

async function getSiteData() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    const [projects, skills, timeline, education, contact] = await Promise.all([
      supabase.from('projects').select('*').order('order'),
      supabase.from('skills').select('*'),
      supabase.from('timeline').select('*').order('order'),
      supabase.from('education').select('*'),
      supabase.from('contact').select('*').limit(1).single(),
    ])
    return {
      projects:  projects.data?.length  ? projects.data  : defaultProjects,
      skills:    skills.data?.length    ? skills.data    : defaultSkills,
      timeline:  timeline.data?.length  ? timeline.data  : defaultTimeline,
      education: education.data?.length ? education.data : defaultEducation,
      contact:   contact.data           ?? defaultContact,
    }
  } catch {
    return { projects: defaultProjects, skills: defaultSkills, timeline: defaultTimeline, education: defaultEducation, contact: defaultContact }
  }
}

export default async function Home() {
  const { projects, skills, timeline, education, contact } = await getSiteData()

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Sections
          projects={projects}
          skills={skills}
          timeline={timeline}
          education={education}
          contact={contact}
        />
      </main>
      <footer className="py-6 text-sm" style={{ color: 'var(--muted)', borderTop: '1px solid var(--border)' }}>
        <div className="max-w-4xl mx-auto px-8 flex justify-between flex-wrap gap-2">
          <span>© 2026 Jorge Ignacio Garcia Vega</span>
          <span>Diseñado &amp; construido con ❤️</span>
        </div>
      </footer>
      <AdminShortcut />
    </>
  )
}
