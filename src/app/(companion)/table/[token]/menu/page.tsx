import { prisma } from "@/lib/db";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

type Props = { params: Promise<{ token: string }> };

export default async function TableMenuPage({ params }: Props) {
  const { token } = await params;

  // Ambil Reservasi & Chapter & Courses
  const reservation = await prisma.reservation.findUnique({
    where: { reservationCode: token },
    include: {
      chapter: {
        include: { courses: { orderBy: { sequence: 'asc' } } }
      }
    }
  });

  if (!reservation) return <div>Invalid Session</div>;

  return (
    <div className="min-h-screen bg-zinc-950 pb-20">
      
      {/* Navigasi Balik */}
      <div className="sticky top-0 z-20 bg-zinc-950/80 backdrop-blur-md px-6 py-4 border-b border-zinc-900 flex items-center">
        <Link href={`/table/${token}`} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
          <ChevronLeft className="w-5 h-5" />
          <span className="text-xs uppercase tracking-widest">Back</span>
        </Link>
        <span className="ml-auto text-xs text-batik font-bold tracking-widest">
          {reservation.chapter.courses.length} COURSES
        </span>
      </div>

      {/* List Course (Timeline Style) */}
      <div className="px-6 py-8 space-y-12">
        {reservation.chapter.courses.map((course, index) => (
          <div key={course.id} className="relative pl-8 border-l border-zinc-800">
            {/* Bullet Point */}
            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-zinc-900 border border-batik rounded-full"></div>
            
            {/* Content */}
            <div className="space-y-3">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
                Course {String(index + 1).padStart(2, '0')}
              </span>
              <h2 className="font-serif text-2xl text-zinc-100">{course.name}</h2>
              <p className="text-zinc-400 text-sm font-light leading-relaxed italic">
                {course.description}
              </p>
              
              {course.tags && (
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-zinc-900 text-[9px] uppercase tracking-wider text-zinc-500 rounded">
                    {course.tags}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}