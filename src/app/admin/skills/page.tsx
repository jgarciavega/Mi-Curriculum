import { createClient } from '@supabase/supabase-js'
import SkillsClient from '@/components/admin/SkillsClient'

export default async function SkillsPage() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
  const { data } = await supabase.from('skills').select('*')
  return <SkillsClient initialSkills={data ?? []} />
}
