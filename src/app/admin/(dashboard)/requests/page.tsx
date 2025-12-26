import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CheckCircle2, Clock, History, Filter } from "lucide-react";

// --- SERVER ACTION (Inline) ---
async function resolveRequest(formData: FormData) {
  'use server'
  const id = formData.get('id') as string
  await prisma.serviceRequest.update({
    where: { id },
    data: { status: 'RESOLVED' }
  })
  revalidatePath('/admin/requests')
}

export default async function RequestsPage({ searchParams }: { searchParams: Promise<{ view?: string }> }) {
  // Cek mode view dari URL (?view=history atau default active)
  const params = await searchParams;
  const showHistory = params.view === 'history';

  // Ambil data sesuai filter
  const requests = await prisma.serviceRequest.findMany({
    where: {
      status: showHistory ? 'RESOLVED' : 'NEW'
    },
    include: {
      reservation: { include: { table: true, user: true } }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* --- HEADER & FILTER --- */}
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-zinc-200 pb-6 gap-4">
        <div>
          <h1 className="text-2xl font-serif text-zinc-900">Service Log</h1>
          <p className="text-sm text-zinc-500 mt-1">Monitor and respond to guest needs.</p>
        </div>

        {/* Toggle Filter */}
        <div className="flex bg-zinc-100 p-1 rounded-lg">
          <a 
            href="/admin/requests" 
            className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-md transition-all ${!showHistory ? 'bg-white text-batik shadow-sm' : 'text-zinc-400 hover:text-zinc-600'}`}
          >
            Active
          </a>
          <a 
            href="/admin/requests?view=history" 
            className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-md transition-all ${showHistory ? 'bg-white text-zinc-800 shadow-sm' : 'text-zinc-400 hover:text-zinc-600'}`}
          >
            History
          </a>
        </div>
      </div>

      {/* --- REQUEST LIST --- */}
      <div className="grid gap-4">
        {requests.length === 0 ? (
          <div className="text-center py-20 bg-zinc-50 rounded-xl border border-dashed border-zinc-200">
            <Filter className="w-10 h-10 text-zinc-300 mx-auto mb-3" />
            <p className="text-zinc-400 text-sm">No {showHistory ? 'past' : 'active'} requests found.</p>
          </div>
        ) : (
          requests.map((req) => (
            <div key={req.id} className={`p-6 rounded-xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all ${
              req.status === 'NEW' 
                ? 'bg-white border-l-4 border-l-batik border-y-zinc-200 border-r-zinc-200 shadow-sm' 
                : 'bg-zinc-50 border-zinc-100 opacity-70'
            }`}>
              
              {/* Info Kiri */}
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full ${req.status === 'NEW' ? 'bg-red-50 text-red-600' : 'bg-zinc-200 text-zinc-400'}`}>
                  {req.status === 'NEW' ? <Clock className="w-6 h-6 animate-pulse" /> : <History className="w-6 h-6" />}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-serif text-lg font-bold text-zinc-800">
                      {req.type}
                    </span>
                    <span className="text-xs text-zinc-400 bg-zinc-100 px-2 py-1 rounded">
                      {new Date(req.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-600">
                    Table <strong>{req.reservation.table?.tableNumber || "Unassigned"}</strong> • {req.reservation.user.fullName}
                  </p>
                </div>
              </div>

              {/* Tombol Aksi (Hanya jika NEW) */}
              {req.status === 'NEW' && (
                <form action={resolveRequest}>
                  <input type="hidden" name="id" value={req.id} />
                  <button className="bg-zinc-900 text-white px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-batik transition-colors flex items-center gap-2 shadow-lg shadow-zinc-200">
                    <CheckCircle2 className="w-4 h-4" />
                    Mark Done
                  </button>
                </form>
              )}

              {/* Status Badge (Jika History) */}
              {req.status === 'RESOLVED' && (
                <span className="px-4 py-2 bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-widest rounded-full">
                  Completed
                </span>
              )}

            </div>
          ))
        )}
      </div>

    </div>
  );
}