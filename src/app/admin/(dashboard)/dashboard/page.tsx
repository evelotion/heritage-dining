import { prisma } from "@/lib/db";
import { Bell, CheckCircle, Clock, Users } from "lucide-react";
import { revalidatePath } from "next/cache";

// --- TAMBAHAN WAJIB ---
// Ini memaksa Next.js untuk merender halaman ini di server setiap kali request masuk (Real-time),
// dan melewati proses render saat build (yang bikin error tadi).
export const dynamic = 'force-dynamic'; 

// --- SERVER ACTION KECIL (Inline) ---
async function markAsResolved(formData: FormData) {
  'use server'
  const id = formData.get('id') as string
  await prisma.serviceRequest.update({
    where: { id },
    data: { status: 'RESOLVED' }
  })
  revalidatePath('/admin/dashboard')
}

export default async function AdminDashboard() {
  // ... (Sisa kode ke bawah SAMA PERSIS, tidak ada yang perlu diubah) ...
  // 1. Ambil Data Real-time
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // A. Request Aktif (Belum Resolved)
  const activeRequests = await prisma.serviceRequest.findMany({
    where: { status: 'NEW' },
    include: { 
      reservation: { include: { table: true } } 
    },
    orderBy: { createdAt: 'asc' } 
  });
  // B. Total Tamu Hari Ini
  const todayReservations = await prisma.reservation.aggregate({
    _sum: { pax: true },
    _count: { id: true },
    where: {
      bookingDate: {
        gte: today,
        lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
      },
      status: { not: 'CANCELLED' }
    }
  });

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex justify-between items-end border-b border-zinc-200 pb-6">
        <div>
          <h1 className="text-3xl font-serif text-zinc-900">Live Operations</h1>
          <p className="text-sm text-zinc-500 mt-1">Real-time overview of the floor.</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-widest text-zinc-400">Total Pax Today</p>
          <p className="text-2xl font-serif text-batik font-bold">
            {todayReservations._sum.pax || 0} <span className="text-sm text-zinc-400 font-sans font-normal">Guests</span>
          </p>
        </div>
      </div>

      {/* --- LIVE REQUEST FEED --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Kolom Kiri: Notifikasi (Prioritas Utama) */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
            <Bell className="w-4 h-4 text-red-500" />
            Incoming Requests ({activeRequests.length})
          </h2>

          {activeRequests.length === 0 ? (
            <div className="p-12 border-2 border-dashed border-zinc-200 rounded-xl text-center text-zinc-400">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500/50" />
              <p className="text-sm">All clear. No pending requests.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {activeRequests.map((req) => (
                <div key={req.id} className="bg-white border-l-4 border-batik shadow-sm p-6 rounded-r-xl flex justify-between items-center animate-pulse">
                  
                  {/* Info Request */}
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        {req.type}
                      </span>
                      <span className="text-xs text-zinc-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> 
                        {new Date(req.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                    <h3 className="text-lg font-serif text-zinc-800">
                      Table {req.reservation.table?.tableNumber || "Unassigned"} 
                      <span className="text-zinc-400 text-sm mx-2">•</span> 
                      {req.reservation.reservationCode}
                    </h3>
                  </div>

                  {/* Action Button */}
                  <form action={markAsResolved}>
                    <input type="hidden" name="id" value={req.id} />
                    <button className="bg-zinc-900 text-white px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-batik transition-colors flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Done
                    </button>
                  </form>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Kolom Kanan: Quick Stats / Floor Status */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Floor Status
          </h2>
          
          {/* Card Sederhana */}
          <div className="bg-white p-6 rounded-xl border border-zinc-100 shadow-sm space-y-6">
            <div>
              <p className="text-xs text-zinc-400 uppercase tracking-widest mb-1">Reservations</p>
              <p className="text-2xl font-medium text-zinc-800">{todayReservations._count.id || 0}</p>
            </div>
            <hr className="border-zinc-100"/>
            <div>
              <p className="text-xs text-zinc-400 uppercase tracking-widest mb-1">Current Chapter</p>
              <p className="text-lg font-serif italic text-batik">Origins</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}