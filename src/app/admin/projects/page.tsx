import { createClient } from '@supabase/supabase-js'
import ProjectsClient from '@/components/admin/ProjectsClient'

export default async function ProjectsPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const { data } = await supabase.from('projects').select('*').order('order')
  return <ProjectsClient initialProjects={data ?? []} />
}
