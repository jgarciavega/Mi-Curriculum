'use client'

export default function SignOutButton() {
  return (
    <a
      href="/api/logout"
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm"
      style={{ color: '#f87171' }}
    >
      🚪 Cerrar sesión
    </a>
  )
}
