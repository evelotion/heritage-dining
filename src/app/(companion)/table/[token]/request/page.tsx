import { prisma } from "@/lib/db";
import { submitRequest } from "@/lib/service-actions";
import Link from "next/link";
import { ChevronLeft, GlassWater, UtensilsCrossed, Receipt, User, CheckCircle2 } from "lucide-react";

type Props = { params: Promise<{ token: string }> };

export default async function RequestPage({ params }: Props) {
  const { token } = await params;

  // Cek apakah ada request yang masih "PENDING" (Belum diselesaikan staff)
  // Untuk memberi feedback ke user bahwa "Staff sedang menuju ke sini"
  const reservation = await prisma.reservation.findUnique({
    where: { reservationCode: token },
    include: {
      serviceRequests: {
        where: { status: "NEW" },
        orderBy: { createdAt: "desc" }
      }
    }
  });

  // Jika ada request aktif, ambil yang terakhir
  const activeRequest = reservation?.serviceRequests[0];

  return (
    <div className="min-h-screen bg-zinc-950 pb-20 flex flex-col">
      
      {/* Navigasi */}
      <div className="px-6 py-6">
        <Link href={`/table/${token}`} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
          <ChevronLeft className="w-5 h-5" />
          <span className="text-xs uppercase tracking-widest">Back</span>
        </Link>
      </div>

      <div className="px-8 mt-4 mb-10">
        <h1 className="font-serif text-3xl text-zinc-100 mb-2">Service Assistance</h1>
        <p className="text-zinc-500 text-sm font-light">
          Tap a button below. Our staff will attend to you silently.
        </p>
      </div>

      {/* --- STATUS FEEDBACK AREA --- */}
      {activeRequest && (
        <div className="mx-6 mb-10 p-6 bg-emerald-900/20 border border-emerald-900 rounded-xl flex items-center gap-4 animate-pulse">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
          <div>
            <p className="text-emerald-400 text-sm font-bold tracking-wide uppercase">Request Sent</p>
            <p className="text-emerald-600 text-xs mt-1">
              Staff notified for: <span className="text-emerald-300">{activeRequest.type}</span>
            </p>
          </div>
        </div>
      )}

      {/* --- ACTION GRID --- */}
      <div className="flex-1 px-6 grid grid-cols-2 gap-4">
        
        {/* Helper Component untuk Tombol */}
        <RequestButton token={token} type="WATER" icon={<GlassWater className="w-8 h-8" />} label="Refill Water" />
        <RequestButton token={token} type="CUTLERY" icon={<UtensilsCrossed className="w-8 h-8" />} label="New Cutlery" />
        <RequestButton token={token} type="BILL" icon={<Receipt className="w-8 h-8" />} label="Request Bill" />
        <RequestButton token={token} type="STAFF" icon={<User className="w-8 h-8" />} label="Call Staff" />

      </div>

    </div>
  );
}

// --- CLIENT COMPONENT KECIL UNTUK TOMBOL ---
// Kita buat di file yang sama agar praktis untuk demo
function RequestButton({ token, type, icon, label }: any) {
  return (
    <form action={submitRequest} className="h-full">
      <input type="hidden" name="token" value={token} />
      <input type="hidden" name="type" value={type} />
      
      <button 
        type="submit"
        className="w-full h-40 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col items-center justify-center gap-4 text-zinc-400 hover:bg-zinc-800 hover:text-batik hover:border-batik/30 transition-all active:scale-95"
      >
        {icon}
        <span className="text-xs uppercase tracking-widest">{label}</span>
      </button>
    </form>
  )
}