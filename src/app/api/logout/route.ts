import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const cookieStore = await cookies()

  // next-auth v5 (authjs) cookie names
  cookieStore.delete('authjs.session-token')
  cookieStore.delete('__Secure-authjs.session-token')
  // next-auth v4 cookie names (fallback)
  cookieStore.delete('next-auth.session-token')
  cookieStore.delete('__Secure-next-auth.session-token')

  const base = new URL(request.url).origin
  return NextResponse.redirect(`${base}/admin/login`)
}
