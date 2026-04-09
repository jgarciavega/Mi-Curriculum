import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

const admin = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  const { data } = await admin().from('contact').select('*').limit(1).single()
  return NextResponse.json(data ?? null)
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const { id, ...rest } = body
  const { data, error } = id
    ? await admin().from('contact').update(rest).eq('id', id).select().single()
    : await admin().from('contact').insert(body).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  revalidatePath('/')
  return NextResponse.json(data)
}
