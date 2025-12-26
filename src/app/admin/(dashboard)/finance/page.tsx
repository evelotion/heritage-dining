import { prisma } from "@/lib/db";
import { Download, Coins, ArrowUpRight, ArrowDownLeft, Wallet } from "lucide-react";

// Helper function kecil untuk cek validitas tanggal
function isValidDate(d: Date) {
  return d instanceof Date && !isNaN(d.getTime());
}

export default async function FinancePage({ searchParams }: { searchParams: Promise<{ date?: string }> }) {
  const params = await searchParams;
  
  // 1. Setup Tanggal dengan SAFE FALLBACK
  let todayStr = params.date;
  
  // Validasi: Kalau user kirim sampah, atau kosong, paksa pakai hari ini
  if (!todayStr || !isValidDate(new Date(todayStr))) {
    todayStr = new Date().toISOString().split('T')[0];
  }

  const startDate = new Date(todayStr);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 1);

  // 2. Query Data (Aman sekarang, karena startDate pasti valid)
  const newDeposits = await prisma.reservation.findMany({
    where: {
      bookingDate: { gte: startDate, lt: endDate },
      depositAmount: { gt: 0 },
      status: { not: 'CANCELLED' }
    },
    include: { user: true }
  });

  const redeemedDeposits = newDeposits.filter(r => r.isRedeemed);

  const totalIncome = newDeposits.reduce((sum, r) => sum + r.depositAmount, 0);
  const totalRedeemed = redeemedDeposits.reduce((sum, r) => sum + r.depositAmount, 0);
  const totalPending = totalIncome - totalRedeemed;

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* --- HEADER (MOBILE OPTIMIZED) --- */}
      {/* Perubahan: items-start di mobile agar rata kiri, md:items-end di desktop */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-zinc-200 pb-6 gap-6">
        
        {/* Judul Halaman */}
        <div className="w-full md:w-auto">
          <h1 className="text-2xl font-serif text-zinc-900">Financial Report</h1>
          <p className="text-sm text-zinc-500 mt-1">Daily reconciliation for Accounting & POS.</p>
        </div>
        
        {/* Controls Section */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          
          {/* Form Filter */}
          <form className="flex gap-2 w-full sm:w-auto">
            <input 
              type="date" 
              name="date"
              defaultValue={todayStr}
              // Input dibuat flex-1 di mobile agar lebar penuh
              className="flex-1 sm:flex-none px-3 py-2 bg-white border border-zinc-300 rounded-lg text-sm text-zinc-700 min-w-[140px] focus:outline-none focus:border-batik"
            />
            <button className="px-4 py-2 bg-zinc-900 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-batik transition-colors">
              Filter
            </button>
          </form>
          
          {/* Tombol Export (Disembunyikan labelnya di desktop, tapi icon only) */}
          <button className="hidden sm:flex p-2 border border-zinc-200 rounded-lg text-zinc-500 hover:text-batik hover:border-batik transition-colors" title="Export CSV">
            <Download className="w-5 h-5" />
          </button>

          {/* Tombol Export Khusus Mobile (Full Width Text) */}
          <button className="sm:hidden w-full flex items-center justify-center gap-2 py-2 border border-zinc-200 rounded-lg text-zinc-500 text-xs font-bold uppercase tracking-widest hover:text-batik hover:border-batik transition-colors">
            <Download className="w-4 h-4" /> Export Data
          </button>

        </div>
      </div>

      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        
        {/* Gross */}
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs uppercase tracking-widest text-zinc-400">Gross Deposit</h3>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-full">
              <ArrowDownLeft className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-serif text-zinc-900 font-bold">
            IDR {(totalIncome / 1000).toLocaleString()}k
          </p>
          <p className="text-xs text-zinc-400 mt-1">From {newDeposits.length} transactions</p>
        </div>

        {/* Redeemed */}
        <div className="bg-white p-6 rounded-xl border-l-4 border-l-emerald-500 border-y border-r border-zinc-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-1 bg-emerald-500 text-white text-[9px] font-bold uppercase tracking-widest rounded-bl-lg">
            Match POS
          </div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs uppercase tracking-widest text-emerald-700">Settled</h3>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-full">
              <CheckCircleIcon className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-serif text-emerald-700 font-bold">
            IDR {(totalRedeemed / 1000).toLocaleString()}k
          </p>
          <p className="text-xs text-emerald-600/70 mt-1">Processed in POS today</p>
        </div>

        {/* Pending */}
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs uppercase tracking-widest text-zinc-400">Float / Pending</h3>
            <div className="p-2 bg-orange-50 text-orange-600 rounded-full">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-serif text-zinc-900 font-bold">
            IDR {(totalPending / 1000).toLocaleString()}k
          </p>
          <p className="text-xs text-zinc-400 mt-1">Held in Gateway</p>
        </div>

      </div>

      {/* --- TRANSACTION TABLE (Horizontal Scroll untuk Mobile) --- */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50">
          <h2 className="font-bold text-zinc-700 text-sm">Transaction Details</h2>
        </div>
        
        {/* Wrapper overflow-x-auto agar tabel bisa di-scroll samping di HP */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left min-w-[600px]">
            <thead className="bg-white text-zinc-400 font-medium border-b border-zinc-100">
              <tr>
                <th className="px-6 py-3 font-medium uppercase text-[10px] tracking-widest whitespace-nowrap">Time</th>
                <th className="px-6 py-3 font-medium uppercase text-[10px] tracking-widest">Guest / Code</th>
                <th className="px-6 py-3 font-medium uppercase text-[10px] tracking-widest">Amount</th>
                <th className="px-6 py-3 font-medium uppercase text-[10px] tracking-widest">Status</th>
                <th className="px-6 py-3 font-medium uppercase text-[10px] tracking-widest text-right">Payment ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {newDeposits.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-zinc-400 italic">No transactions for this date.</td>
                </tr>
              ) : (
                newDeposits.map((res) => (
                  <tr key={res.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4 text-zinc-500 whitespace-nowrap">
                      {new Date(res.bookingDate).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-zinc-900">{res.user.fullName}</div>
                      <div className="text-xs text-zinc-400 font-mono">#{res.reservationCode}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-zinc-900 whitespace-nowrap">
                      IDR {(res.depositAmount / 1000).toLocaleString()}k
                    </td>
                    <td className="px-6 py-4">
                      {res.isRedeemed ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-widest rounded-full">
                          Redeemed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 text-[10px] font-bold uppercase tracking-widest rounded-full">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right text-xs font-mono text-zinc-400 whitespace-nowrap">
                      {res.paymentId || "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

// Icon Helper
function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" />
    </svg>
  )
}