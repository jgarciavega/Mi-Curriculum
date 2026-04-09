import { createClient } from '@supabase/supabase-js'
import ContactClient from '@/components/admin/ContactClient'

export default async function ContactPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { data } = await supabase.from('contact').select('*').limit(1).single()
  return <ContactClient initialContact={data ?? null} />
}
