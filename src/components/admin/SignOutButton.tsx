'use client'
import { signOutAction } from '@/app/actions/auth'

export default function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm"
        style={{ color: '#f87171' }}
      >
        🚪 Cerrar sesión
      </button>
    </form>
  )
}
