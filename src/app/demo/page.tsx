import Link from "next/link";
import {
  Monitor,
  Smartphone,
  ShieldCheck,
  ArrowRight,
  ChefHat,
} from "lucide-react";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200 font-sans selection:bg-orange-500/30 overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-orange-900/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-zinc-800/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 md:pt-10">
        {/* Header Section */}
        <div className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
            Live Preview
          </div>

          <h1 className="text-5xl md:text-7xl font-serif text-white tracking-tight">
            Heritage <span className="italic text-orange-500">Dining</span>
          </h1>

          <p className="text-zinc-400 max-w-xl mx-auto font-light text-lg leading-relaxed">
            A complete Guest Experience Platform for modern fine dining.{" "}
            <br className="hidden md:block" />
            Select a role below to start the interactive demo.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* 1. GUEST WEBSITE */}
          <Link href="/" className="group relative">
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-2xl transform transition-transform duration-500 group-hover:scale-[1.02] opacity-50"></div>
            <div className="relative h-full bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 p-8 rounded-2xl transition-colors group-hover:border-orange-500/30 flex flex-col">
              <div className="w-14 h-14 bg-zinc-800 rounded-xl flex items-center justify-center mb-6 text-orange-500 border border-zinc-700 group-hover:bg-orange-500 group-hover:text-black transition-all duration-300">
                <Monitor className="w-7 h-7" />
              </div>

              <h3 className="text-2xl font-serif text-white mb-3">
                Public Website
              </h3>
              <p className="text-sm text-zinc-400 mb-8 leading-relaxed flex-grow">
                Immersive landing page with storytelling, menu gallery, and
                real-time reservation system.
              </p>

              <div className="flex items-center text-xs font-bold uppercase tracking-widest text-white group-hover:text-orange-500 transition-colors">
                Launch Site <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </Link>

          {/* 2. COMPANION APP (MOBILE) */}
          <Link href="/table/DEMO-123" className="group relative">
            <div className="absolute inset-0 bg-gradient-to-b from-orange-900/20 to-zinc-900 rounded-2xl transform transition-transform duration-500 group-hover:scale-[1.02] opacity-50"></div>
            <div className="relative h-full bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 p-8 rounded-2xl transition-colors group-hover:border-orange-500 flex flex-col">
              <div className="absolute top-4 right-4 bg-orange-500 text-black text-[10px] font-bold px-3 py-1 rounded-full">
                TRY THIS
              </div>

              <div className="w-14 h-14 bg-zinc-800 rounded-xl flex items-center justify-center mb-6 text-orange-500 border border-zinc-700 group-hover:bg-orange-500 group-hover:text-black transition-all duration-300">
                <Smartphone className="w-7 h-7" />
              </div>

              <h3 className="text-2xl font-serif text-white mb-3">
                Companion App
              </h3>
              <p className="text-sm text-zinc-400 mb-6 leading-relaxed flex-grow">
                The mobile interface for seated guests. View digital menu,
                pairing guide, and call for service.
              </p>

              <div className="bg-black/50 p-3 rounded-lg border border-zinc-800/50 mb-6">
                <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-zinc-500">
                  <span>Demo Token</span>
                  <span className="text-orange-400 font-mono text-xs">
                    DEMO-123
                  </span>
                </div>
              </div>

              <div className="flex items-center text-xs font-bold uppercase tracking-widest text-white group-hover:text-orange-500 transition-colors">
                Simulate Mobile <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </Link>

          {/* 3. ADMIN DASHBOARD */}
          <Link href="/admin/login" className="group relative">
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-2xl transform transition-transform duration-500 group-hover:scale-[1.02] opacity-50"></div>
            <div className="relative h-full bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 p-8 rounded-2xl transition-colors group-hover:border-orange-500/30 flex flex-col">
              <div className="w-14 h-14 bg-zinc-800 rounded-xl flex items-center justify-center mb-6 text-orange-500 border border-zinc-700 group-hover:bg-orange-500 group-hover:text-black transition-all duration-300">
                <ShieldCheck className="w-7 h-7" />
              </div>

              <h3 className="text-2xl font-serif text-white mb-3">
                Manager Admin
              </h3>
              <p className="text-sm text-zinc-400 mb-6 leading-relaxed flex-grow">
                Full control dashboard. Manage reservations, kitchen display
                system (KDS), and finances.
              </p>

              <div className="bg-black/50 p-3 rounded-lg border border-zinc-800/50 mb-6 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500 uppercase tracking-wider">
                    User
                  </span>
                  <span className="text-zinc-300 font-mono">admin</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500 uppercase tracking-wider">
                    Pass
                  </span>
                  <span className="text-zinc-300 font-mono">12345678</span>
                </div>
              </div>

              <div className="flex items-center text-xs font-bold uppercase tracking-widest text-white group-hover:text-orange-500 transition-colors">
                Login Dashboard <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-24 text-center border-t border-zinc-900 pt-8 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-zinc-600">
            <ChefHat className="w-4 h-4" />
            <span className="text-xs uppercase tracking-[0.2em]">
              Restaurant OS v1.0
            </span>
          </div>
          <p className="text-zinc-700 text-xs">
            &copy; {new Date().getFullYear()} Crafted for Fine Dining
            Excellence.
          </p>
        </div>
      </div>
    </div>
  );
}
