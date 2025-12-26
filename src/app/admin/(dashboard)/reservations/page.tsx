import { prisma } from "@/lib/db";
import { checkInGuest, redeemDeposit } from "@/lib/admin-actions"; // cancelReservation sudah dipindah ke component baru
import { CalendarDays, User, Clock, Coins, CheckCheck, AlertCircle } from "lucide-react";
import AssignTableForm from "@/components/features/AssignTableForm";
import ReservationActions from "@/components/features/ReservationActions"; // <--- Component Baru
import Search from "@/components/ui/search";

export default async function AdminReservationsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const params = await searchParams;
  const query = params.query || '';

  // --- 1. LOGIKA FILTER RESERVASI ---
  let whereCondition: any = {
    status: { not: 'CANCELLED' } 
  };

  // Setup batas waktu hari ini (00:00 - 23:59)
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  if (query) {
    // Mode Search: Cari semua (termasuk masa lalu)
    whereCondition = {
      OR: [
        { reservationCode: { contains: query, mode: 'insensitive' } },
        { user: { fullName: { contains: query, mode: 'insensitive' } } }
      ]
    };
  } else {
    // Mode Default: Hanya Hari Ini & Masa Depan (biar admin fokus ke operasional hari ini)
    whereCondition = {
      status: { not: 'CANCELLED' },
      bookingDate: { gte: todayStart }
    };
  }

  // Ambil Data Reservasi Utama
  const reservations = await prisma.reservation.findMany({
    where: whereCondition,
    include: {
      user: true,
      table: true
    },
    orderBy: { bookingDate: 'asc' }
  });

  // =========================================================================
  // 🛡️ LOGIC FIX: DETEKSI MEJA TERPAKAI
  // =========================================================================
  // Ambil meja yang SEDANG diduduki (SEATED) atau SUDAH di-assign untuk hari ini
  const occupiedData = await prisma.reservation.findMany({
    where: {
      AND: [
        { tableId: { not: null } },
        {
          OR: [
            { status: 'SEATED' }, 
            {
              status: 'CONFIRMED',
              bookingDate: {
                gte: todayStart,
                lte: todayEnd
              }
            }
          ]
        }
      ]
    },
    select: { tableId: true }
  });

  // List ID meja yang sibuk
  const occupiedTableIds = occupiedData
    .map(session => session.tableId)
    .filter((id): id is string => id !== null);

  // Ambil data Master Table untuk Dropdown Assign
  const tables = await prisma.table.findMany({
    orderBy: { tableNumber: 'asc' }
  });

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-zinc-200 pb-6 gap-4">
        <div>
          <h1 className="text-2xl font-serif text-zinc-900">Guest List</h1>
          <p className="text-sm text-zinc-500 mt-1">Manage bookings and floor assignments.</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full md:w-auto">
          <div className="w-full md:w-64">
            <Search placeholder="Search name or code..." />
          </div>
          <div className="bg-white border border-zinc-200 px-4 py-2 rounded-lg text-sm text-zinc-600 shadow-sm flex items-center justify-center gap-2 whitespace-nowrap">
            <CalendarDays className="w-4 h-4 text-batik" />
            <span>Total: <strong>{reservations.length}</strong></span>
          </div>
        </div>
      </div>

      {/* --- RESERVATION LIST --- */}
      <div className="grid gap-4">
        {reservations.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-zinc-200 rounded-xl bg-zinc-50/50">
            <p className="text-zinc-500 font-medium">No reservations found.</p>
            <p className="text-zinc-400 text-xs mt-1">
              {query ? `No match for "${query}"` : "No upcoming bookings for today."}
            </p>
          </div>
        ) : (
          reservations.map((res) => {
            const hasTable = !!res.tableId; 

            return (
              <div key={res.id} className="bg-white border border-zinc-200 rounded-xl p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between shadow-sm hover:border-batik transition-colors group">
                
                {/* BAGIAN KIRI: INFO TAMU */}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                      res.status === 'SEATED' ? 'bg-green-100 text-green-700' : 'bg-zinc-100 text-zinc-500'
                    }`}>
                      {res.status}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">#{res.reservationCode}</span>
                    
                    {new Date(res.bookingDate) < new Date() && res.status !== 'SEATED' && (
                      <span className="text-[9px] bg-red-50 text-red-500 px-2 py-0.5 rounded border border-red-100">Past Date</span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-zinc-800 flex items-center gap-2">
                    {res.user.fullName}
                    <span className="text-sm font-normal text-zinc-500">({res.pax} Pax)</span>
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3"/> 
                      {new Date(res.bookingDate).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                      <span className="text-zinc-300 mx-1">|</span>
                      {new Date(res.bookingDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3"/> {res.user.phone}
                    </span>
                  </div>

                  {res.notes && <p className="text-xs text-orange-600 mt-2 italic">Note: {res.notes}</p>}

                  {/* INFO PEMBAYARAN */}
                  {res.depositAmount > 0 && (
                    <div className="mt-3 flex items-center gap-2">
                      <div className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded border ${
                        res.isRedeemed 
                          ? 'bg-gray-100 text-gray-400 border-gray-200' 
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        <Coins className="w-3 h-3" />
                        <span className="font-bold">IDR {(res.depositAmount / 1000).toLocaleString()}k</span>
                        {res.isRedeemed ? '(Redeemed)' : '(Active Deposit)'}
                      </div>
                      {!res.isRedeemed && res.status === 'SEATED' && (
                        <form action={redeemDeposit}>
                          <input type="hidden" name="id" value={res.id} />
                          <button className="text-[10px] uppercase font-bold text-batik hover:underline flex items-center gap-1" title="Mark as used in POS">
                            Redeem Now <CheckCheck className="w-3 h-3" />
                          </button>
                        </form>
                      )}
                    </div>
                  )}
                </div>

                {/* BAGIAN KANAN: ACTION AREA */}
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                  
                  {/* 1. ASSIGN TABLE */}
                  <div className="flex flex-col items-end">
                    <AssignTableForm 
                      reservationId={res.id} 
                      currentTableId={res.tableId} 
                      tables={tables}
                      occupiedTableIds={occupiedTableIds} 
                    />
                    {/* Warning jika belum ada meja */}
                    {!hasTable && res.status === 'CONFIRMED' && (
                      <span className="text-[9px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Assign table first
                      </span>
                    )}
                  </div>
                  
                  {/* 2. CHECK-IN BUTTON */}
                  {res.status === 'CONFIRMED' && (
                    <form action={checkInGuest}>
                      <input type="hidden" name="id" value={res.id} />
                      <button 
                        disabled={!hasTable}
                        className={`px-6 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-colors shadow-lg shadow-zinc-200 flex items-center gap-2 ${
                          hasTable 
                            ? "bg-zinc-900 text-white hover:bg-batik cursor-pointer" 
                            : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                        }`}
                        title={!hasTable ? "Please assign a table first" : "Check In Guest"}
                      >
                        Check In
                      </button>
                    </form>
                  )}

                  {/* 3. MENU ACTIONS (CANCEL, dll) - DROPDOWN */}
                  {res.status !== 'SEATED' && (
                    <ReservationActions id={res.id} />
                  )}

                </div>

              </div>
            )
          })
        )}
      </div>

    </div>
  );
}