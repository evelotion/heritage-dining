import Link from 'next/link'
import { ArrowLeft, Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center p-6 text-center animate-fade-in">
      
      {/* Icon Dekoratif */}
      <div className="mb-8 p-6 bg-white border border-zinc-200 rounded-full shadow-sm">
        <Compass className="w-12 h-12 text-batik animate-pulse" strokeWidth={1} />
      </div>

      {/* Pesan Utama */}
      <h1 className="font-serif text-4xl md:text-5xl text-ink mb-4">
        Lost in the Archipelago?
      </h1>
      
      <p className="text-zinc-500 font-light max-w-md mb-10 leading-relaxed">
        We apologize, but the page you are looking for does not exist. 
        Perhaps it has moved, or it was just a fleeting aroma.
      </p>

      {/* Tombol Balik */}
      <Link 
        href="/" 
        className="group flex items-center gap-3 px-8 py-3 bg-ink text-paper text-xs uppercase tracking-[0.2em] hover:bg-batik transition-all duration-300"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Return Home
      </Link>

      {/* Footer Kecil */}
      <div className="absolute bottom-10 text-[10px] text-zinc-300 uppercase tracking-widest">
        404 - Page Not Found
      </div>

    </div>
  )
}