import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email:    { label: 'Email',    type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const adminEmail    = process.env.ADMIN_EMAIL?.trim()
        const adminPassword = process.env.ADMIN_PASSWORD?.trim()

        // Reject immediately if env vars are not configured
        if (!adminEmail || !adminPassword) return null

        const inputEmail    = credentials?.email?.toString().trim()
        const inputPassword = credentials?.password?.toString().trim()

        if (!inputEmail || !inputPassword) return null

        if (inputEmail === adminEmail && inputPassword === adminPassword) {
          return { id: '1', name: 'Admin', email: inputEmail }
        }
        return null
      },
    }),
  ],
  pages: { signIn: '/admin/login' },
  session: { strategy: 'jwt' },
})
