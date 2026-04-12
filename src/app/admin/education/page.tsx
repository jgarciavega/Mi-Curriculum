import { createClient } from '@supabase/supabase-js'
import EducationClient from '@/components/admin/EducationClient'

export default async function EducationPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const { data } = await supabase.from('education').select('*').order('year')
  return <EducationClient initialEducation={data ?? []} />
}
