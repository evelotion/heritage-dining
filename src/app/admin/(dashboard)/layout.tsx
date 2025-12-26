import Link from "next/link";
import { LayoutDashboard, CalendarDays, BellRing, Settings, LogOut, Wallet, ChefHat } from "lucide-react";
import { logoutAdmin } from "@/lib/auth-actions";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
      
      {/* --- SIDEBAR (DESKTOP) --- */}
      <aside className="hidden md:flex w-64 bg-zinc-900 text-zinc-400 flex-col fixed h-full z-20 shadow-xl">
        <div className="h-20 flex items-center px-8 border-b border-zinc-800">
          <span className="font-serif text-xl font-bold text-zinc-100 tracking-widest">HERITAGE.</span>
        </div>

        {/* Menu Administratif */}
        <nav className="flex-1 px-4 py-8 space-y-2">
          <NavItem href="/admin/dashboard" icon={<LayoutDashboard className="w-5 h-5"/>} label="Overview" />
          <NavItem href="/admin/reservations" icon={<CalendarDays className="w-5 h-5"/>} label="Reservations" />
          <NavItem href="/admin/requests" icon={<BellRing className="w-5 h-5"/>} label="Live Requests" />
          <NavItem href="/admin/finance" icon={<Wallet className="w-5 h-5"/>} label="Finance" />
          <NavItem href="/admin/settings" icon={<Settings className="w-5 h-5"/>} label="Settings" />
        </nav>

        {/* --- KDS MODE BUTTON (SPECIAL) --- */}
        {/* Tombol Besar Khusus Orang Dapur */}
        <div className="px-4 pb-4">
          <Link 
            href="/admin/kitchen" 
            className="flex items-center justify-center gap-3 w-full bg-batik text-white py-4 rounded-xl shadow-lg shadow-batik/20 hover:bg-white hover:text-batik transition-all duration-300 group"
          >
            <ChefHat className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Open</p>
              <p className="text-sm font-bold uppercase tracking-widest">Kitchen Mode</p>
            </div>
          </Link>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-zinc-800">
          <form action={logoutAdmin}>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-800 hover:text-red-400 transition-colors text-xs uppercase tracking-widest">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* --- MOBILE TOP BAR --- */}
      <div className="md:hidden h-16 bg-zinc-900 flex items-center justify-between px-6 sticky top-0 z-30 shadow-md">
        <span className="font-serif text-lg font-bold text-zinc-100 tracking-widest">HERITAGE.</span>
        <form action={logoutAdmin}>
          <button className="text-zinc-400 hover:text-red-400 p-2">
            <LogOut className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 pb-24 md:pb-8">
        {children}
      </main>

      {/* --- BOTTOM NAVIGATION (MOBILE) --- */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-zinc-200 z-30 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <nav className="grid grid-cols-5 items-end h-16 max-w-md mx-auto relative">
          
          <MobileNavItem href="/admin/dashboard" icon={<LayoutDashboard className="w-6 h-6"/>} label="Home" />
          <MobileNavItem href="/admin/reservations" icon={<CalendarDays className="w-6 h-6"/>} label="Guests" />
          
          {/* CENTER: KITCHEN MODE (Di Mobile, Lonceng Request diganti/ditambah Kitchen jika perlu, 
              tapi biasanya Kitchen pakai Tablet/Desktop. Kita taruh Kitchen sebagai opsi spesial di tengah jika mau, 
              atau tetap Requests. Di sini saya pertahankan Requests untuk Waiter, karena Chef biasanya tidak pakai HP). */}
          <div className="flex justify-center h-full relative">
            <div className="absolute -top-6">
              <Link href="/admin/requests" className="flex items-center justify-center w-14 h-14 bg-batik text-white rounded-full shadow-lg shadow-batik/40 hover:bg-zinc-800 transition-all active:scale-95 ring-4 ring-gray-50">
                <BellRing className="w-6 h-6" />
              </Link>
            </div>
            <span className="text-[9px] font-medium uppercase tracking-wide text-batik mb-2">Alerts</span>
          </div>

          <MobileNavItem href="/admin/kitchen" icon={<ChefHat className="w-6 h-6"/>} label="Kitchen" /> {/* Kitchen Masuk Menu Bawah */}
          <MobileNavItem href="/admin/finance" icon={<Wallet className="w-6 h-6"/>} label="Finance" />

        </nav>
      </div>

    </div>
  );
}

// Helpers tetap sama...
function NavItem({ href, icon, label }: any) {
  return (
    <Link href={href} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-800 hover:text-white transition-colors">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </Link>
  )
}

function MobileNavItem({ href, icon, label }: any) {
  return (
    <Link href={href} className="flex flex-col items-center justify-center h-full gap-1 text-zinc-400 hover:text-batik transition-colors pb-1">
      {icon}
      <span className="text-[10px] font-medium uppercase tracking-wide">{label}</span>
    </Link>
  )
}