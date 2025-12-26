import Image from "next/image";

export default function CompanionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 1. CONTAINER UTAMA: Kunci tinggi layar (h-screen) & matikan scroll window (overflow-hidden)
    <div className="h-screen w-full bg-zinc-950 text-zinc-200 antialiased flex overflow-hidden selection:bg-batik selection:text-white">
      
      {/* --- KIRI: GAMBAR DIAM (STATIC) --- */}
      {/* 'h-full' memastikannya setinggi layar, tanpa scrollbar sendiri */}
      <div className="hidden md:block flex-1 relative h-full">
        
        {/* Gambar Interior */}
        <Image
          src="/assets/home/hero-main.png"
          alt="Heritage Dining Atmosphere"
          fill
          className="object-cover object-center brightness-[0.6]"
          priority
        />
        
        {/* Overlay Text (Pemanis) */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent flex flex-col justify-end p-12">
           <div className="max-w-lg space-y-4">
            <h2 className="font-serif text-4xl text-white leading-tight">
              Where tradition meets <span className="text-batik italic">innovation</span>.
            </h2>
            <div className="h-[1px] w-16 bg-batik"></div>
            <p className="text-zinc-400 font-light text-sm tracking-wide opacity-80">
              Scan the QR code on your table to unlock the full companion experience.
            </p>
          </div>
        </div>
      </div>

      {/* --- KANAN: KONTEN SCROLLABLE --- */}
      {/* Kuncinya di sini: 'h-full' + 'overflow-y-auto'. 
          Ini bikin cuma area ini yang punya scrollbar. */}
      <main className="w-full md:w-[28rem] flex-shrink-0 h-full overflow-y-auto relative bg-zinc-950 border-l border-zinc-900 shadow-2xl">
        
        {/* Background Texture (Tetap ada) */}
        {/* Kita set 'fixed' position relative terhadap main container biar patternya statis */}
        <div className="absolute inset-0 opacity-20 pointer-events-none z-0" 
             style={{ backgroundImage: "url('/assets/patterns/stardust.png')" }}>
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 min-h-full">
          {children}
        </div>
      </main>

    </div>
  );
}