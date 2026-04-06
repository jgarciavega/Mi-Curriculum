import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [projects, skills, timeline, education] = await Promise.all([
    supabase.from('projects').select('*').order('order'),
    supabase.from('skills').select('*'),
    supabase.from('timeline').select('*').order('order'),
    supabase.from('education').select('*'),
  ])

  return NextResponse.json({
    projects:  projects.data  ?? [],
    skills:    skills.data    ?? [],
    timeline:  timeline.data  ?? [],
    education: education.data ?? [],
  })
}
