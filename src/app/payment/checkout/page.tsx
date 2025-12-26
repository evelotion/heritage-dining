import { prisma } from "@/lib/db";
import { processMockPayment } from "@/lib/payment-actions";
import { Calendar, Clock, Users, CreditCard } from "lucide-react";
import { redirect } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";

type Props = { searchParams: Promise<{ code: string }> };

export default async function CheckoutPage({ searchParams }: Props) {
  const { code } = await searchParams;

  // --- 1. SAFETY CHECK (Fix Error Prisma) ---
  // Kalau URL gak ada ?code=..., langsung stop atau redirect
  if (!code) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper text-ink">
        <p>Error: Missing Reservation Code.</p>
      </div>
    );
  }

  // 2. Ambil Data Reservasi
  const reservation = await prisma.reservation.findUnique({
    where: { reservationCode: code },
    include: { chapter: true, user: true },
  });

  // Validasi Keamanan: Kalo data gak ketemu di DB
  if (!reservation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper text-ink">
        <p>Error: Reservation not found for code "{code}".</p>
      </div>
    );
  }

  // Validasi Status: Kalo udah bayar, jangan bayar lagi
  if (reservation.status !== "PENDING") {
    redirect(`/guest/login?code=${code}`);
  }

  // Hitung Nominal (Misal Deposit Flat 500rb per pax)
  const DEPOSIT_PER_PAX = 500000;
  const totalAmount = reservation.pax * DEPOSIT_PER_PAX;

  return (
    // ... (Code Render UI sama seperti sebelumnya, gak berubah)
    <div>
      {/* --- Order Summary (Header) --- */}
      <Reveal
        variant="blur"
        className="bg-zinc-900 text-white p-8 text-center relative overflow-hidden"
      >
        <div className="relative z-10">
          <p className="text-xs text-zinc-400 uppercase tracking-widest mb-2">
            Deposit Required
          </p>
          <h1 className="font-serif text-4xl mb-1">
            IDR {(totalAmount / 1000).toLocaleString("id-ID")}k
          </h1>
          <p className="text-[10px] text-zinc-500">Includes Tax & Service</p>
        </div>

        {/* Pattern Hiasan */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/assets/patterns/stardust.png')]"></div>
      </Reveal>

      {/* --- Details --- */}
      <div className="p-8 space-y-6">
        <div className="space-y-4 text-sm">
          <Reveal delay={100}>
            <div className="flex justify-between items-center border-b border-dashed border-zinc-200 pb-3">
              <span className="text-zinc-500 flex items-center gap-2">
                <Users className="w-4 h-4" /> Guest
              </span>
              <span className="font-medium text-ink">
                {reservation.user.fullName}
              </span>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="flex justify-between items-center border-b border-dashed border-zinc-200 pb-3">
              <span className="text-zinc-500 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Date
              </span>
              <span className="font-medium text-ink">
                {new Date(reservation.bookingDate).toLocaleDateString()}
              </span>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex justify-between items-center border-b border-dashed border-zinc-200 pb-3">
              <span className="text-zinc-500 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Time
              </span>
              <span className="font-medium text-ink">
                {new Date(reservation.bookingDate).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </Reveal>

          <Reveal delay={500}>
            <div className="flex justify-between items-center pb-1">
              <span className="text-zinc-500">Menu</span>
              <span className="font-serif italic text-batik">
                {reservation.chapter.title}
              </span>
            </div>
          </Reveal>
        </div>

        {/* --- Payment Action (MOCK) --- */}
        <Reveal delay={700} className="pt-4 space-y-3">
          <form action={processMockPayment}>
            <input type="hidden" name="code" value={code} />
            <button className="w-full py-4 bg-batik text-white font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-ink transition-colors flex items-center justify-center gap-2 shadow-lg shadow-batik/20">
              <CreditCard className="w-4 h-4" />
              Pay Now (Simulation)
            </button>
          </form>

          <p className="text-[10px] text-center text-zinc-400 leading-relaxed px-4">
            By proceeding, you verify that you are not a robot. <br />
            Wait, actually you are just testing.
          </p>
        </Reveal>
      </div>
    </div>
  );
}
