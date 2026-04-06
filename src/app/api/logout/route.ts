import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const base = new URL(request.url).origin
  const cookieStore = await cookies()
  const allCookies = cookieStore.getAll()

  const response = NextResponse.redirect(`${base}/admin/login`)

  // Delete every cookie that might be the session
  for (const cookie of allCookies) {
    response.cookies.set(cookie.name, '', { maxAge: 0, path: '/' })
  }

  return response
}
