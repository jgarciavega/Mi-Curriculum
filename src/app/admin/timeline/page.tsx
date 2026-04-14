import { createClient } from '@supabase/supabase-js'
import TimelineClient from '@/components/admin/TimelineClient'

export default async function TimelinePage() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
  const { data } = await supabase.from('timeline').select('*').order('order')
  return <TimelineClient initialItems={data ?? []} />
}
