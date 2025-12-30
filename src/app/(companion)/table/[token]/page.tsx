import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Utensils, Wine, BellRing, Lock } from "lucide-react";

// Tipe props untuk halaman dinamis (Next.js 16)
type Props = {
  params: Promise<{ token: string }>;
};

export default async function TablePage({ params }: Props) {
  // 1. Ambil token dari URL
  const { token } = await params;

  // 2. Cari Reservasi berdasarkan Kode
  const reservation = await prisma.reservation.findUnique({
    where: { reservationCode: token },
    include: {
      user: true,
      chapter: true,
    },
  });

  // Jika kode tidak ditemukan sama sekali di database
  if (!reservation) {
    return notFound();
  }



  // 0. Cek apakah ini TOKEN DEMO ABADI?
  const isDemoMode = token === "DEMO-123";

  // 1. Validasi Tanggal: Apakah booking ini untuk hari ini?
  const today = new Date();
  const bookingDate = new Date(reservation.bookingDate);
  const isToday = today.toDateString() === bookingDate.toDateString();

  // 2. Validasi Status: Apakah tamu sudah Check-In (Status: SEATED)?
  const isSeated = reservation.status === "SEATED";

  // LOGIC BARU: Kalau ini DEMO-123, kita LEWATI (bypass) semua validasi tanggal/status
  // Jika BUKAN demo mode DAN (belum seated ATAU bukan hari ini), baru kita blokir.
  if (!isDemoMode && (!isSeated || !isToday)) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-8 text-center space-y-6 animate-fade-in">
        <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-800 shadow-2xl shadow-black">
          <Lock className="w-8 h-8 text-zinc-500" />
        </div>
        <div className="space-y-2">
          <h1 className="text-zinc-200 font-serif text-2xl">
            Table Not Active
          </h1>
          <p className="text-zinc-500 text-sm font-light leading-relaxed max-w-xs mx-auto">
            {!isToday
              ? "This reservation link is not for today."
              : "Please wait for our staff to seat you and activate your table experience."}
          </p>
        </div>
        <div className="pt-8 border-t border-dashed border-zinc-800 w-full max-w-[200px]">
          <p className="text-[10px] uppercase tracking-widest text-batik">
            Heritage Dining
          </p>
        </div>
      </div>
    );
  }
 
  return (
    <div className="flex flex-col min-h-screen pb-20 animate-fade-in">
      {/* Header Sambutan */}
      <header className="px-8 pt-12 pb-6 text-center space-y-2">
        <p className="text-[10px] uppercase tracking-[0.3em] text-batik">
          Table Companion
        </p>
        <h1 className="font-serif text-3xl text-zinc-100">
          Sugeng Rawuh, <br />
          <span className="italic text-batik">{reservation.user.fullName}</span>
        </h1>
        <p className="text-xs text-zinc-500 font-light mt-2">
          Tonight, we present <strong>{reservation.chapter.title}</strong>
        </p>
      </header>

      {/* Divider */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent my-4"></div>

      {/* Main Actions Grid */}
      <div className="px-6 grid grid-cols-1 gap-4 mt-4">
        {/* Tombol Menu Digital */}
        <Link
          href={`/table/${token}/menu`}
          className="group relative h-40 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex items-center justify-center transition-all active:scale-95 hover:border-zinc-700"
        >
          <div className="absolute inset-0 bg-[url('/assets/companion/menu-bg.png')] bg-cover opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="relative text-center space-y-2">
            <Utensils className="w-8 h-8 mx-auto text-batik mb-2" />
            <h3 className="font-serif text-xl tracking-widest uppercase text-zinc-200">
              The Menu
            </h3>
            <p className="text-[10px] text-zinc-400">View tonight's courses</p>
          </div>
        </Link>

        <div className="grid grid-cols-2 gap-4">
          {/* Tombol Pairing */}
          <Link
            href={`/table/${token}/pairing`}
            className="h-32 bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col items-center justify-center gap-2 active:bg-zinc-800 transition-colors group hover:border-zinc-700"
          >
            <Wine className="w-6 h-6 text-zinc-500 group-hover:text-batik transition-colors" />
            <span className="text-xs uppercase tracking-widest text-zinc-400 group-hover:text-zinc-200 transition-colors">
              Pairing
            </span>
          </Link>

          {/* Tombol Panggil Staff (Request) */}
          <Link
            href={`/table/${token}/request`}
            className="h-32 bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col items-center justify-center gap-2 active:bg-zinc-800 transition-colors hover:border-zinc-700"
          >
            <BellRing className="w-6 h-6 text-batik animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-zinc-300">
              Request Staff
            </span>
          </Link>
        </div>
      </div>

      {/* Footer Quote */}
      <div className="mt-auto pt-10 px-8 text-center">
        <p className="font-serif italic text-zinc-600 text-sm">
          "Flavor is the memory of the land."
        </p>
      </div>
    </div>
  );
}
