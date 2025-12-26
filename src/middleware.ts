import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. PROTEKSI HALAMAN ADMIN
  // Kalau mau masuk /admin/dashboard tapi gak punya cookie 'admin_session', tendang ke login
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const adminSession = request.cookies.get('admin_session')
    if (!adminSession) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // 2. PROTEKSI HALAMAN GUEST (INI YANG PENTING BUAT MASALAH LO)
  // Kalau mau masuk /guest/dashboard tapi gak punya cookie 'guest_session', tendang ke login
  if (pathname.startsWith('/guest') && !pathname.startsWith('/guest/login')) {
    const guestSession = request.cookies.get('guest_session') // <--- PASTIIN INI 'guest_session'
    
    if (!guestSession) {
      // Debugging: Cek di terminal/console browser kalau redirect terjadi
      console.log('⛔ Middleware blocking guest access: No session found.')
      return NextResponse.redirect(new URL('/guest/login', request.url))
    }
  }

  return NextResponse.next()
}

// Tentukan path mana aja yang kena middleware
export const config = {
  matcher: ['/admin/:path*', '/guest/:path*'],
}