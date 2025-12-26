'use client'

import Link from "next/link";
import { usePathname } from "next/navigation"; // Import hook untuk cek halaman aktif
import { LogOut, User, Ticket, History } from "lucide-react";
import { logoutGuest } from "@/lib/auth-actions";

export default function GuestNavbar({ userName }: { userName: string }) {
  const pathname = usePathname(); // Cek URL aktif

  return (
    <nav className="bg-white border-b border-subtle py-4 px-6 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        
        {/* Logo & Navigasi */}
        <div className="flex items-center gap-8">
          <Link href="/" className="font-serif text-xl font-bold tracking-widest text-ink hover:text-batik">
            HERITAGE.
          </Link>

          {/* Menu Navigasi Baru */}
          <div className="hidden md:flex gap-6 text-xs uppercase tracking-widest">
            <Link 
              href="/guest/dashboard" 
              className={`flex items-center gap-2 transition-colors ${pathname === '/guest/dashboard' ? 'text-batik font-bold' : 'text-gray-400 hover:text-ink'}`}
            >
              <Ticket className="w-4 h-4" />
              My Ticket
            </Link>
            <Link 
              href="/guest/history" 
              className={`flex items-center gap-2 transition-colors ${pathname === '/guest/history' ? 'text-batik font-bold' : 'text-gray-400 hover:text-ink'}`}
            >
              <History className="w-4 h-4" />
              Journals
            </Link>
          </div>
        </div>

        {/* User Info & Logout */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500">
            <User className="w-4 h-4" />
            <span>{userName}</span>
          </div>

          <form action={logoutGuest}>
            <button className="flex items-center gap-2 text-xs uppercase tracking-widest text-red-800 hover:text-red-600 transition-colors">
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Sign Out</span>
            </button>
          </form>
        </div>

      </div>
    </nav>
  );
}