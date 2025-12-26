import { prisma } from "@/lib/db";
import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";
import MenuBook from "@/components/features/MenuBook"; 
import { Reveal } from "@/components/ui/Reveal"; // 1. Import Reveal

export const dynamic = 'force-dynamic';

export default async function MenuPage() {
  // 1. Ambil Chapter yang sedang AKTIF
  const activeChapter = await prisma.chapter.findFirst({
    where: { isActive: true },
    include: {
      courses: {
        orderBy: { sequence: 'asc' }
      }
    }
  });

  // --- KONDISI: BELUM ADA CHAPTER AKTIF ---
  if (!activeChapter) {
    return (
      <section className="min-h-screen bg-paper flex flex-col items-center justify-center p-6 text-center">
        
        {/* Icon */}
        <Reveal variant="blur">
          <div className="p-6 rounded-full bg-zinc-100 border border-zinc-200 mb-6">
            <UtensilsCrossed className="w-8 h-8 text-zinc-400" />
          </div>
        </Reveal>

        {/* Heading */}
        <Reveal delay={200}>
          <h1 className="font-serif text-3xl md:text-4xl text-ink mb-4">
            The Kitchen is Preparing...
          </h1>
        </Reveal>

        {/* Description */}
        <Reveal delay={300}>
          <p className="text-zinc-500 max-w-md leading-relaxed font-light">
            We are currently curating our next seasonal chapter. 
            Please check back soon for the unveiling of our new tasting journey.
          </p>
        </Reveal>

        {/* Back Link */}
        <Reveal delay={500}>
          <div className="mt-8">
            <Link href="/" className="text-xs uppercase tracking-widest text-batik hover:text-ink transition-colors border-b border-batik pb-1">
              Return to Home
            </Link>
          </div>
        </Reveal>
      </section>
    );
  }

  // --- KONDISI: ADA CHAPTER AKTIF ---
  return (
    <section className="min-h-screen py-24 px-4 bg-zinc-100/80 flex flex-col items-center overflow-hidden">
      
      {/* --- THE MENU BOOK (SLIDER) --- */}
      {/* Kita kasih efek Blur In buat buku menunya biar elegan */}
      <Reveal variant="blur" className="w-full flex justify-center z-10">
        <MenuBook chapter={activeChapter} />
      </Reveal>

      {/* --- CTA SECTION --- */}
      <div className="mt-20 mb-10 text-center space-y-6 max-w-lg px-4">
        
        {/* Heading CTA */}
        <Reveal delay={200}>
          <h2 className="font-serif text-3xl md:text-4xl text-ink">
            Ready to taste <span className="italic text-batik">{activeChapter.title}</span>?
          </h2>
        </Reveal>

        {/* Subtext */}
        <Reveal delay={300}>
          <p className="text-gray-500 text-base font-light">
            Seats are limited for this chapter. Reserve your experience today.
          </p>
        </Reveal>

        {/* Button */}
        <Reveal delay={500}>
          <Link 
            href="/reservations"
            className="inline-block px-12 py-5 bg-batik text-white text-xs tracking-[0.2em] uppercase hover:bg-ink transition-all duration-500 shadow-xl shadow-batik/20 hover:-translate-y-1 rounded-sm"
          >
            Reserve a Table
          </Link>
        </Reveal>

      </div>

    </section>
  );
}