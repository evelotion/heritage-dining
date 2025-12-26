import { prisma } from "@/lib/db";
import Link from "next/link";
import { updateCourseProgress, completeDiningSession } from "@/lib/admin-actions"; // Tambah completeDiningSession
import { Archive } from "lucide-react";
import { ChefHat, ArrowLeft, AlertTriangle, Clock, ChevronRight } from "lucide-react";

export const dynamic = 'force-dynamic'; // Pastikan data selalu fresh

export default async function KitchenPage() {
  // Ambil tamu yang sedang makan (SEATED)
  const activeTables = await prisma.reservation.findMany({
    where: { status: 'SEATED' },
    include: { 
      table: true, 
      guestPreferences: true,
      chapter: { include: { courses: true } } 
    },
    orderBy: { bookingDate: 'asc' } 
  });

  return (
    <div className="min-h-screen bg-black text-white p-6 font-mono selection:bg-batik selection:text-white">
      
      {/* HEADER KDS */}
      <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard" className="p-2 bg-zinc-800 rounded hover:bg-zinc-700 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold tracking-widest flex items-center gap-3">
            <ChefHat className="w-8 h-8 text-batik" />
            KITCHEN DISPLAY SYSTEM
          </h1>
        </div>
        <div className="flex gap-6 text-sm font-bold text-zinc-500">
          <span>ACTIVE TABLES: <span className="text-white text-xl">{activeTables.length}</span></span>
          <span className="animate-pulse text-green-500">● LIVE</span>
        </div>
      </div>

      {/* TICKET RAIL (GRID) */}
      {activeTables.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-zinc-600 border-2 border-dashed border-zinc-900 rounded-xl">
          <p className="text-2xl font-bold">ALL CLEAR</p>
          <p className="text-sm mt-2">Waiting for guests to check-in...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {activeTables.map((res) => {
            const totalCourses = res.chapter.courses.length;
            
            // Mencegah error jika totalCourses 0 (walau jarang terjadi)
            const safeTotal = totalCourses > 0 ? totalCourses : 1; 
            const progress = Math.round((res.currentCourse / safeTotal) * 100);
            
            const isAllergy = res.guestPreferences?.allergies;
            // Cek apakah sudah selesai (Finish)
            const isFinished = res.currentCourse >= totalCourses;

            return (
              <div key={res.id} className={`flex flex-col justify-between rounded-lg border-t-8 p-4 min-h-[320px] transition-all duration-300 ${
                isAllergy ? 'bg-zinc-900 border-red-600' : 'bg-zinc-900 border-blue-500'
              }`}>
                
                {/* HEADER TIKET */}
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-4xl font-bold tracking-tight">
                      {res.table?.tableNumber || "N/A"}
                    </span>
                    <span className="text-xl font-bold bg-white text-black px-2 py-1 rounded">
                      {res.pax} PAX
                    </span>
                  </div>

                  {/* ALERGI ALERT */}
                  {isAllergy && (
                    <div className="bg-red-950/50 border border-red-900 text-red-200 p-3 rounded mb-4 font-bold text-sm flex items-start gap-2 animate-pulse">
                      <AlertTriangle className="w-5 h-5 shrink-0 text-red-500" />
                      <span className="uppercase">{res.guestPreferences?.allergies}</span>
                    </div>
                  )}

                  {/* COURSE INDICATOR */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-bold text-zinc-500 uppercase tracking-widest">
                      <span>Progress</span>
                      <span>{res.currentCourse} / {totalCourses}</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${isFinished ? 'bg-green-500' : 'bg-blue-500'}`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      ></div>
                    </div>
                    
                    <div className={`text-center py-4 rounded border border-dashed ${isFinished ? 'border-green-900 bg-green-900/10' : 'border-zinc-800'}`}>
                      <p className={`text-lg font-bold ${isFinished ? 'text-green-500' : 'text-white'}`}>
                        {res.currentCourse === 0 ? "JUST SEATED" : 
                         isFinished ? "SERVICE COMPLETE" : 
                         `ON COURSE ${res.currentCourse}`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CONTROLS */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                  
                  {/* TOMBOL KIRI (UNDO) */}
                  <form action={updateCourseProgress} className="contents">
                    <input type="hidden" name="id" value={res.id} />
                    <input type="hidden" name="action" value="PREV" />
                    <button 
                      disabled={res.currentCourse <= 0} 
                      className="bg-zinc-800 hover:bg-zinc-700 py-4 rounded text-zinc-400 font-bold uppercase tracking-wider text-xs disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      Undo
                    </button>
                  </form>

                  {/* TOMBOL KANAN (LOGIKA GANDA) */}
                  {!isFinished ? (
                    // KONDISI A: Masih Masak -> Tombol FIRE
                    <form action={updateCourseProgress} className="contents">
                      <input type="hidden" name="id" value={res.id} />
                      <input type="hidden" name="action" value="NEXT" />
                      <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-lg shadow-blue-900/20 active:scale-95 transition-all">
                        Fire <ChevronRight className="w-4 h-4" />
                      </button>
                    </form>
                  ) : (
                    // KONDISI B: Sudah Selesai -> Tombol CLEAR
                    <form action={completeDiningSession} className="contents">
                      <input type="hidden" name="id" value={res.id} />
                      <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-lg shadow-emerald-900/20 active:scale-95 transition-all animate-pulse">
                        Clear <Archive className="w-4 h-4" />
                      </button>
                    </form>
                  )}
                  
                </div>

                <div className="mt-4 text-center border-t border-zinc-800 pt-3">
                   <div className="text-[10px] font-bold text-zinc-600 flex items-center justify-center gap-2 uppercase tracking-widest">
                      <Clock className="w-3 h-3" />
                      Seated: {new Date(res.bookingDate).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                   </div>
                </div>

              </div>
            )
          })}
        </div>
      )}
    </div>
  );
}