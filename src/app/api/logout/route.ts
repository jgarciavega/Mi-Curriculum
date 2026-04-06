import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const base = new URL(request.url).origin
  const response = NextResponse.redirect(`${base}/admin/login`)

  // Delete all possible next-auth session cookie names
  const cookieNames = [
    'authjs.session-token',
    '__Secure-authjs.session-token',
    'next-auth.session-token',
    '__Secure-next-auth.session-token',
    'authjs.csrf-token',
    '__Secure-authjs.csrf-token',
  ]

  for (const name of cookieNames) {
    response.cookies.set(name, '', { maxAge: 0, path: '/' })
  }

  return response
}
