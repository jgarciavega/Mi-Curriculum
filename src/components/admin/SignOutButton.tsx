'use client'

export default function SignOutButton() {
  return (
    <button
      onClick={() => { window.location.href = '/api/logout' }}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm cursor-pointer"
      style={{ color: '#f87171', background: 'none', border: 'none' }}
    >
      🚪 Cerrar sesión
    </button>
  )
}
