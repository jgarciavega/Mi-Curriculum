'use client'
import { signOut } from 'next-auth/react'

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/admin/login' })}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm"
      style={{ color: '#f87171' }}
    >
      🚪 Cerrar sesión
    </button>
  )
}
