"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Wine, Utensils } from "lucide-react";

// --- TYPES ---
type Course = {
  id: string;
  sequence: number;
  name: string;
  description: string | null;
  tags: string | null;
  pairing: string | null;
  pairingNote: string | null;
};

type Chapter = {
  title: string;
  description: string | null;
  courses: Course[];
};

// --- REUSABLE PAPER COMPONENT ---
// Komponen ini menangani tampilan kertas, dekorasi batik, dan tombol navigasi pojok (Hint)
const PaperLayout = ({
  children,
  onNext,
  onPrev,
}: {
  children: React.ReactNode;
  onNext?: () => void;
  onPrev?: () => void;
}) => (
  <div className="relative w-full h-full bg-[#fffbf2] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col group/paper overflow-hidden">
    {/* --- DEKORASI KERTAS (JANGAN DIUBAH) --- */}
    {/* Dekorasi Binding Atas */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-5 bg-zinc-100/80 rounded-b-xl border-b border-x border-zinc-200 shadow-inner z-20"></div>

    {/* Border Batik Frame */}
    <div className="absolute inset-4 border-2 border-batik/60 border-double pointer-events-none z-10"></div>
    <div className="absolute inset-6 border border-batik/20 pointer-events-none z-10"></div>

    {/* Sudut Batik */}
    <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-batik z-20"></div>
    <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-batik z-20"></div>
    <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-batik z-20"></div>
    <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-batik z-20"></div>
    {/* --------------------------------------- */}

    {/* Content Container */}
    <div className="relative px-8 md:px-10 py-24 text-center flex-1 h-full flex flex-col">
      {children}
    </div>

    {/* --- NEW: CORNER HINTS (PETUNJUK DI POJOK KERTAS) --- */}

    {/* Hint Next (Kanan Bawah) - Muncul kalau ada props onNext */}
    {onNext && (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute bottom-6 right-8 z-30 flex items-center gap-2 text-batik/40 hover:text-batik transition-all duration-300 cursor-pointer group/hint"
        aria-label="Next Page"
      >
        <span className="text-[9px] uppercase tracking-widest font-serif opacity-0 group-hover/hint:opacity-100 transition-opacity transform translate-x-2 group-hover/hint:translate-x-0">
          Next Page
        </span>
        <div className="w-8 h-8 rounded-full border border-batik/10 flex items-center justify-center group-hover/hint:bg-batik/10 group-hover/hint:border-batik/30 transition-colors">
          <ChevronRight className="w-4 h-4" />
        </div>
      </button>
    )}

    {/* Hint Prev (Kiri Bawah) - Muncul kalau ada props onPrev */}
    {onPrev && (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute bottom-6 left-8 z-30 flex items-center gap-2 text-batik/40 hover:text-batik transition-all duration-300 cursor-pointer group/hint flex-row-reverse"
        aria-label="Previous Page"
      >
        <span className="text-[9px] uppercase tracking-widest font-serif opacity-0 group-hover/hint:opacity-100 transition-opacity transform -translate-x-2 group-hover/hint:translate-x-0">
          Previous
        </span>
        <div className="w-8 h-8 rounded-full border border-batik/10 flex items-center justify-center group-hover/hint:bg-batik/10 group-hover/hint:border-batik/30 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </div>
      </button>
    )}
  </div>
);

// --- MAIN COMPONENT ---
export default function MenuBook({ chapter }: { chapter: Chapter }) {
  // STATE: 0 = Food Part 1, 1 = Food Part 2, 2 = Pairing
  const [page, setPage] = useState(0);

  // 1. LOGIC SPLIT DATA (Membagi menu jadi 2 bagian)
  const midPoint = Math.ceil(chapter.courses.length / 2);
  const foodPart1 = chapter.courses.slice(0, midPoint);
  const foodPart2 = chapter.courses.slice(midPoint);
  const pairingList = chapter.courses.filter((c) => c.pairing);

  // LOGIC NAVIGASI
  const nextPage = () => {
    if (page < 2) setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  // LOGIC ROTASI 3D
  // Page 0 (0deg) -> Page 1 (-180deg) -> Page 2 (-360deg)
  const rotation = page * -180;

  return (
    <div className="flex items-center justify-center gap-6 md:gap-16 w-full px-4 py-8 perspective-1000">
      {/* --- LEFT ARROW (EXTERNAL) --- */}
      <button
        onClick={prevPage}
        disabled={page === 0}
        className={`hidden md:flex flex-col items-center gap-2 transition-all duration-500 z-50 ${
          page === 0
            ? "opacity-0 pointer-events-none translate-x-4"
            : "opacity-100 hover:-translate-x-2"
        }`}
      >
        <div className="w-14 h-14 rounded-full bg-white shadow-xl shadow-zinc-200 border border-zinc-100 flex items-center justify-center text-batik hover:text-ink transition-colors">
          <ChevronLeft className="w-6 h-6" strokeWidth={1.5} />
        </div>
        <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-medium">
          Back
        </span>
      </button>

      {/* --- THE 3D FLIPPER CONTAINER --- */}
      <div className="relative w-full max-w-xl [perspective:2000px]">
        <div
          className="relative transition-transform duration-1000 ease-in-out [transform-style:preserve-3d] grid grid-cols-1 grid-rows-1"
          style={{ transform: `rotateY(${rotation}deg)` }}
        >
          {/* ==============================================================
              FRONT FACE (Visible at Page 0 and Page 2)
              Ini merender Food Part 1 ATAU Pairing, tergantung halaman mana
             ============================================================== */}
          <div className="col-start-1 row-start-1 w-full [backface-visibility:hidden] z-20">
            {/* Logic Button Internal: 
                - Kalau Page 0: Tombol Next bawa ke Page 1.
                - Kalau Page 2: Tombol Prev bawa ke Page 1. 
            */}
            <PaperLayout
              onNext={page === 0 ? nextPage : undefined}
              onPrev={page === 2 ? prevPage : undefined}
            >
              {page >= 2 ? (
                // --- KONTEN HALAMAN 3: PAIRING ---
                <>
                  <div className="mb-10 space-y-4">
                    <div className="flex justify-center items-center gap-2 text-batik mb-2">
                      <Wine className="w-4 h-4" />
                      <span className="text-xs font-bold tracking-[0.4em] uppercase block">
                        Beverage Pairing
                      </span>
                    </div>
                    <div className="w-full h-[1px] bg-batik/30 mx-auto max-w-[120px]"></div>
                    <h1 className="text-3xl md:text-4xl font-serif italic text-ink">
                      {chapter.title}
                    </h1>
                    <p className="text-gray-500 text-sm font-light italic">
                      Curated wines & artisanal teas.
                    </p>
                  </div>

                  <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    {pairingList.map((course) => (
                      <div key={course.id} className="group relative">
                        <div className="mb-1 flex flex-col items-center gap-1">
                          <span className="text-[9px] text-batik/60 font-serif tracking-widest border-b border-batik/20 pb-0.5">
                            PAIRING FOR NO.{" "}
                            {String(course.sequence).padStart(2, "0")}
                          </span>
                        </div>
                        <h3 className="text-lg md:text-xl font-serif text-amber-900/80 mb-1 group-hover:text-batik transition-colors">
                          {course.pairing}
                        </h3>
                        <p className="text-gray-500 font-light italic text-xs leading-relaxed max-w-xs mx-auto border-l-2 border-batik/20 pl-4">
                          "{course.pairingNote}"
                        </p>
                      </div>
                    ))}
                    {pairingList.length === 0 && (
                      <p className="text-zinc-400 text-xs italic mt-10">
                        Pairing selection to be announced.
                      </p>
                    )}
                  </div>

                  {/* Footer Indicator */}
                  <div className="mt-6 pt-4 border-t border-batik/10">
                    <p className="text-[9px] text-zinc-400 tracking-widest uppercase">
                      Page 3 of 3
                    </p>
                  </div>
                </>
              ) : (
                // --- KONTEN HALAMAN 1: FOOD PART 1 ---
                <>
                  <div className="mb-10 space-y-4">
                    <div className="flex justify-center items-center gap-2 text-batik mb-2">
                      <Utensils className="w-4 h-4" />
                      <span className="text-xs font-bold tracking-[0.4em] uppercase block">
                        The Prologue
                      </span>
                    </div>
                    <div className="w-full h-[1px] bg-batik/30 mx-auto max-w-[120px]"></div>
                    <h1 className="text-3xl md:text-4xl font-serif italic text-ink">
                      {chapter.title}
                    </h1>
                    <p className="text-gray-500 text-sm font-light italic">
                      Part I: The beginning of the journey.
                    </p>
                  </div>

                  <div className="space-y-8 flex-1">
                    {foodPart1.map((course) => (
                      <div key={course.id} className="group relative">
                        <div className="mb-2 flex justify-center">
                          <span className="text-[10px] text-batik/60 font-serif tracking-widest border-b border-batik/20 pb-0.5">
                            NO. {String(course.sequence).padStart(2, "0")}
                          </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-serif text-ink mb-2 group-hover:text-batik transition-colors">
                          {course.name}
                        </h3>
                        <p className="text-gray-500 font-light text-sm leading-relaxed max-w-xs mx-auto">
                          {course.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Footer Indicator */}
                  <div className="mt-6 pt-4 border-t border-batik/10">
                    <p className="text-[9px] text-zinc-400 tracking-widest uppercase">
                      Page 1 of 3
                    </p>
                  </div>
                </>
              )}
            </PaperLayout>
          </div>

          {/* ==============================================================
              BACK FACE (Visible at Page 1)
              Ini Selalu Merender Food Part 2
             ============================================================== */}
          <div className="col-start-1 row-start-1 w-full [backface-visibility:hidden] [transform:rotateY(180deg)] z-10">
            {/* Page 1 butuh tombol Next (ke Pairing) DAN Prev (ke Prologue) */}
            <PaperLayout onNext={nextPage} onPrev={prevPage}>
              {/* --- KONTEN HALAMAN 2: FOOD PART 2 --- */}
              <div className="mb-10 space-y-4">
                <div className="flex justify-center items-center gap-2 text-batik mb-2">
                  <Utensils className="w-4 h-4" />
                  <span className="text-xs font-bold tracking-[0.4em] uppercase block">
                    The Climax
                  </span>
                </div>
                <div className="w-full h-[1px] bg-batik/30 mx-auto max-w-[120px]"></div>
                <h1 className="text-3xl md:text-4xl font-serif italic text-ink">
                  {chapter.title}
                </h1>
                <p className="text-gray-500 text-sm font-light italic">
                  Part II: The crescendo of flavors.
                </p>
              </div>

              <div className="space-y-8 flex-1">
                {foodPart2.map((course) => (
                  <div key={course.id} className="group relative">
                    <div className="mb-2 flex justify-center">
                      <span className="text-[10px] text-batik/60 font-serif tracking-widest border-b border-batik/20 pb-0.5">
                        NO. {String(course.sequence).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-serif text-ink mb-2 group-hover:text-batik transition-colors">
                      {course.name}
                    </h3>
                    <p className="text-gray-500 font-light text-sm leading-relaxed max-w-xs mx-auto">
                      {course.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer Indicator */}
              <div className="mt-6 pt-4 border-t border-batik/10">
                <p className="text-[9px] text-zinc-400 tracking-widest uppercase">
                  Page 2 of 3
                </p>
              </div>
            </PaperLayout>
          </div>
        </div>
      </div>

      {/* --- RIGHT ARROW (EXTERNAL) --- */}
      <button
        onClick={nextPage}
        disabled={page === 2}
        className={`hidden md:flex flex-col items-center gap-2 transition-all duration-500 z-50 ${
          page === 2
            ? "opacity-0 pointer-events-none -translate-x-4"
            : "opacity-100 hover:translate-x-2"
        }`}
      >
        {/* Tombol dengan efek Ping biar eye-catching */}
        <div className="relative w-14 h-14 rounded-full bg-white shadow-xl shadow-zinc-200 border border-zinc-100 flex items-center justify-center text-batik hover:text-ink transition-colors group">
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-batik opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-batik"></span>
          </span>
          <ChevronRight className="w-6 h-6" strokeWidth={1.5} />
        </div>
        <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-medium">
          Next
        </span>
      </button>

      {/* --- MOBILE NAVIGATION (BOTTOM) --- */}
      <div className="absolute -bottom-24 w-full flex justify-between items-center px-4 md:hidden">
        <button
          onClick={prevPage}
          disabled={page === 0}
          className={`flex items-center gap-2 text-xs uppercase tracking-widest transition-opacity ${page === 0 ? "opacity-0" : "text-batik opacity-100"}`}
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        {/* Simple Dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${page === i ? "bg-batik" : "bg-zinc-300"}`}
            />
          ))}
        </div>

        <button
          onClick={nextPage}
          disabled={page === 2}
          className={`flex items-center gap-2 text-xs uppercase tracking-widest transition-opacity ${page === 2 ? "opacity-0" : "text-batik font-bold opacity-100"}`}
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
