import { prisma } from "@/lib/db";
import Link from "next/link";
import { ChevronLeft, Wine, GlassWater } from "lucide-react";

type Props = { params: Promise<{ token: string }> };

export default async function PairingPage({ params }: Props) {
  const { token } = await params;

  // Fetch data, filter cuma course yang punya pairing
  const reservation = await prisma.reservation.findUnique({
    where: { reservationCode: token },
    include: {
      chapter: {
        include: { 
          courses: { 
            orderBy: { sequence: 'asc' },
            // Opsional: Lo bisa filter di level aplikasi kalau mau
          } 
        }
      }
    }
  });

  if (!reservation) return <div>Invalid Session</div>;

  // Filter courses yang punya data pairing aja
  const coursesWithPairing = reservation.chapter.courses.filter(c => c.pairing);

  return (
    <div className="min-h-screen bg-zinc-950 pb-20 relative overflow-hidden">
      
      {/* Background Ornament (Pemanis Visual) */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-batik/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      {/* 1. Header Navigation */}
      <div className="sticky top-0 z-20 bg-zinc-950/90 backdrop-blur-md px-6 py-5 border-b border-zinc-900 flex items-center justify-between">
        <Link href={`/table/${token}`} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs uppercase tracking-widest">Back</span>
        </Link>
        <div className="flex items-center gap-2 text-batik">
          <Wine className="w-4 h-4" />
          <span className="text-xs font-bold tracking-widest uppercase">Curated Sips</span>
        </div>
      </div>

      {/* 2. Intro Text */}
      <div className="px-6 py-8">
        <h1 className="font-serif text-3xl text-zinc-100 mb-2">Beverage Pairing</h1>
        <p className="text-zinc-500 font-light text-sm leading-relaxed">
          A careful selection of wines and artisanal teas to elevate the flavors of 
          <span className="text-batik italic"> {reservation.chapter.title}</span>.
        </p>
      </div>

      {/* 3. Pairing Timeline */}
      <div className="px-6 space-y-10">
        {coursesWithPairing.length === 0 ? (
          // Empty State kalau belum ada data pairing
          <div className="text-center py-10 border border-dashed border-zinc-800 rounded-xl">
            <GlassWater className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
            <p className="text-zinc-500 text-sm">No pairing details available yet.</p>
          </div>
        ) : (
          coursesWithPairing.map((course, index) => (
            <div key={course.id} className="relative">
              
              {/* Connector Line (Garis putus-putus biar beda sama menu makanan) */}
              {index !== coursesWithPairing.length - 1 && (
                <div className="absolute left-[19px] top-10 bottom-[-40px] w-[1px] border-l border-dashed border-zinc-800"></div>
              )}

              <div className="flex gap-6">
                {/* Icon Column */}
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center shadow-lg shadow-black/50">
                    <span className="text-[10px] font-bold text-batik font-serif">
                      {String(course.sequence).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Content Column */}
                <div className="pb-2 space-y-2 flex-1">
                  {/* Pasangan Makanan */}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] uppercase tracking-widest text-zinc-500 bg-zinc-900/50 px-2 py-0.5 rounded">
                      Pairs with {course.name}
                    </span>
                  </div>

                  {/* Nama Minuman (Highlight) */}
                  <h3 className="text-xl font-serif text-amber-50 leading-tight">
                    {course.pairing}
                  </h3>

                  {/* Deskripsi Rasa */}
                  {course.pairingNote && (
                    <p className="text-sm text-zinc-400 font-light italic border-l-2 border-batik/30 pl-3 py-1">
                      "{course.pairingNote}"
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer Note */}
      <div className="px-8 mt-12 mb-6 text-center">
        <p className="text-[10px] text-zinc-600 uppercase tracking-widest">
          Please drink responsibly
        </p>
      </div>

    </div>
  );
}