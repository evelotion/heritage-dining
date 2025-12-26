import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import GuestNavbar from "@/components/layout/GuestNavbar";
import GuestTicket from "@/components/features/GuestTicket";
import { Reveal } from "@/components/ui/Reveal";

export default async function GuestDashboard() {
  // 1. Ambil Session Cookie (Isinya adalah User ID)
  const cookieStore = await cookies();
  const userId = cookieStore.get("guest_session")?.value;

  // Security Check: Kalau gak ada cookie, tendang keluar
  if (!userId) {
    redirect("/api/auth/logout");
  }

  // 2. Fetch Data Reservasi TERBARU milik User ini
  // Kita pakai 'findFirst' karena user bisa punya banyak history reservasi
  const reservation = await prisma.reservation.findFirst({
    where: {
      userId: userId, // Cari berdasarkan User ID
    },
    orderBy: {
      bookingDate: "desc", // Ambil yang paling baru / masa depan
    },
    include: {
      user: true,
      table: true,
      chapter: true,
      guestPreferences: true,
    },
  });

  // Kalau user ini gak punya reservasi sama sekali (aneh tapi mungkin), logout
  if (!reservation) {
    redirect("/api/auth/logout");
  }

  // 3. Render Dashboard
  return (
    <div className="min-h-screen bg-paper">
      {/* Navbar khusus tamu */}
      <GuestNavbar userName={reservation.user.fullName || "Guest"} />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <Reveal>
            <h1 className="font-serif text-4xl text-ink mb-4">
              Your Reservation
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-gray-500 font-light">
              We are looking forward to serving you on{" "}
              {new Date(reservation.bookingDate).toLocaleDateString()}.
            </p>
          </Reveal>
        </div>

        {/* Layout Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Kolom Kiri: Tiket Digital */}
          <Reveal variant="blur" delay={200}>
            <GuestTicket reservation={reservation} />
          </Reveal>

          {/* Kolom Kanan: Info Menu */}
          <div className="space-y-8 py-4">
            <Reveal
              delay={300}
              className="bg-white p-8 border border-subtle shadow-sm"
            >
              <h3 className="font-serif text-xl mb-4 text-ink">
                Important Information
              </h3>
              <ul className="text-sm text-gray-500 space-y-3 list-disc pl-4 font-light leading-relaxed">
                <li>Please arrive 15 minutes before your scheduled time.</li>
                <li>Dress code is smart casual. No slippers or beachwear.</li>
                <li>
                  Your menu:{" "}
                  <strong>
                    {reservation.chapter?.title || "Seasonal Menu"}
                  </strong>
                </li>
                <li>
                  Dietary requests:{" "}
                  <span className="text-ink font-medium">
                    {reservation.guestPreferences?.allergies ||
                      "No specific allergies recorded."}
                  </span>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={500} className="text-center">
              <p className="text-xs text-gray-400 mb-4">
                Need to make changes?
              </p>
              <button className="text-sm text-batik hover:text-ink underline transition-colors">
                Contact Concierge
              </button>
            </Reveal>
          </div>
        </div>
      </main>
    </div>
  );
}
