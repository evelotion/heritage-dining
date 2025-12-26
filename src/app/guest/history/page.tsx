import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import GuestNavbar from "@/components/layout/GuestNavbar";
import { Calendar, Clock, MapPin, ChefHat } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal"; // Import Reveal

export default async function GuestHistoryPage() {
  // 1. Auth Check (Sama seperti dashboard)
  const cookieStore = await cookies();
  const sessionReservationId = cookieStore.get("guest_session")?.value;

  if (!sessionReservationId) redirect("/guest/login");

  // 2. Ambil data User dari sesi reservasi saat ini
  const currentSession = await prisma.reservation.findUnique({
    where: { id: sessionReservationId },
    select: { userId: true }
  });

  if (!currentSession) redirect("/guest/login");

  // 3. Ambil SEMUA reservasi milik User tersebut
  const history = await prisma.reservation.findMany({
    where: {
      userId: currentSession.userId,
      id: { not: sessionReservationId } 
    },
    include: {
      chapter: true,
      table: true,
      user: true 
    },
    orderBy: { bookingDate: 'desc' }
  });

  // Ambil nama user untuk navbar
  const user = await prisma.user.findUnique({
    where: { id: currentSession.userId }
  });

  return (
    <div className="min-h-screen bg-paper">
      <GuestNavbar userName={user?.fullName || "Guest"} />

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <Reveal>
            <h1 className="font-serif text-3xl text-ink mb-2">Dining Journal</h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-gray-500 font-light text-sm">
              A collection of your past culinary journeys with us.
            </p>
          </Reveal>
        </div>

        {/* --- LIST HISTORY --- */}
        <div className="space-y-6">
          {history.length === 0 ? (
            // Empty State
            <Reveal variant="blur" delay={200}>
              <div className="text-center py-20 border-2 border-dashed border-zinc-200 rounded-xl">
                <ChefHat className="w-10 h-10 text-zinc-300 mx-auto mb-4" />
                <p className="text-zinc-400 font-serif text-lg">No past journeys found.</p>
                <p className="text-zinc-300 text-xs mt-1">Your current reservation is waiting in the dashboard.</p>
              </div>
            </Reveal>
          ) : (
            // List Items
            history.map((res, index) => (
              <Reveal 
                key={res.id} 
                delay={100} // Kasih sedikit delay biar smooth pas scroll
                className="bg-white p-6 md:p-8 rounded-xl border border-subtle shadow-sm flex flex-col md:flex-row gap-6 md:items-center justify-between group hover:border-batik transition-colors"
              >
                
                {/* Info Utama */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 text-[9px] font-bold uppercase tracking-widest rounded ${
                      res.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                      res.status === 'CANCELLED' ? 'bg-red-50 text-red-500' :
                      'bg-zinc-100 text-zinc-500'
                    }`}>
                      {res.status}
                    </span>
                    <span className="text-xs font-mono text-zinc-300">#{res.reservationCode}</span>
                  </div>
                  <h3 className="font-serif text-xl text-ink group-hover:text-batik transition-colors">
                    {res.chapter.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-xs text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> 
                      {new Date(res.bookingDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> 
                      {new Date(res.bookingDate).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> 
                      {res.table?.tableNumber || "Unassigned"}
                    </span>
                  </div>
                </div>

                {/* Info Tambahan / Aksi */}
                <div className="text-right">
                  <span className="text-2xl font-serif text-zinc-200 group-hover:text-batik/20 transition-colors">
                    {new Date(res.bookingDate).getFullYear()}
                  </span>
                </div>

              </Reveal>
            ))
          )}
        </div>
      </main>
    </div>
  );
}