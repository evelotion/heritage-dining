import { prisma } from "@/lib/db";
import { activateChapter, createTable, deleteTable, createChapter, deleteChapter } from "@/lib/admin-actions"; 
import { BookOpen, CheckCircle, Clock, AlertTriangle, Grid, Plus, Trash2, Users, FileText, Edit } from "lucide-react";

// --- TAMBAHAN WAJIB (FIX ERROR BUILD) ---
export const dynamic = 'force-dynamic'; 

export default async function SettingsPage() {
  // 1. Ambil Data Chapter
  const chapters = await prisma.chapter.findMany({
    orderBy: { sequence: 'asc' },
    include: { _count: { select: { courses: true } } }
  });

  // 2. Ambil Data Meja
  const tables = await prisma.table.findMany({
    orderBy: { tableNumber: 'asc' }
  });

  return (
    <div className="space-y-12 animate-fade-in pb-20">
      
      {/* Header */}
      <div className="border-b border-zinc-200 pb-6">
        <h1 className="text-2xl font-serif text-zinc-900">System Settings</h1>
        <p className="text-sm text-zinc-500 mt-1">Manage seasonal chapters and restaurant configurations.</p>
      </div>

      {/* --- 1. CHAPTER MANAGEMENT --- */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50 flex justify-between items-center">
          <h2 className="font-bold text-zinc-700 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-batik" />
            Seasonal Chapters
          </h2>
          <span className="text-xs text-zinc-400 bg-white px-2 py-1 border border-zinc-200 rounded">
            Changes reflect on public site immediately
          </span>
        </div>

        <div className="p-6 border-b border-zinc-100">
          {/* FORM ADD CHAPTER BARU */}
          <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-200">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Draft New Season</h3>
            <form action={createChapter} className="flex flex-col md:flex-row gap-4 items-end">
              <div className="w-20 space-y-1">
                <label className="text-[10px] text-zinc-400 uppercase">Seq #</label>
                <input 
                  name="sequence" 
                  type="number" 
                  defaultValue={chapters.length + 1}
                  required
                  className="w-full px-3 py-2 border border-zinc-300 rounded text-sm focus:outline-none focus:border-batik"
                />
              </div>
              <div className="flex-1 space-y-1 w-full">
                <label className="text-[10px] text-zinc-400 uppercase">Chapter Title</label>
                <input 
                  name="title" 
                  type="text" 
                  placeholder="e.g. Chapter II: Spice Route" 
                  required
                  className="w-full px-3 py-2 border border-zinc-300 rounded text-sm focus:outline-none focus:border-batik"
                />
              </div>
              <div className="flex-[2] space-y-1 w-full">
                <label className="text-[10px] text-zinc-400 uppercase">Short Description</label>
                <input 
                  name="description" 
                  type="text" 
                  placeholder="A journey through the spice islands..." 
                  className="w-full px-3 py-2 border border-zinc-300 rounded text-sm focus:outline-none focus:border-batik"
                />
              </div>
              <button className="px-6 py-2 bg-zinc-900 text-white text-sm font-bold rounded hover:bg-batik transition-colors flex items-center gap-2 whitespace-nowrap">
                <Plus className="w-4 h-4" /> Create Draft
              </button>
            </form>
          </div>
        </div>

        <div className="divide-y divide-zinc-100">
          {chapters.map((chapter) => (
            <div key={chapter.id} className={`p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${chapter.isActive ? 'bg-orange-50/50' : 'hover:bg-zinc-50'}`}>
              
              {/* Info Chapter */}
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                    Seq #{chapter.sequence}
                  </span>
                  {chapter.isActive && (
                    <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                      <CheckCircle className="w-3 h-3" /> Active Live
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-serif text-zinc-800">{chapter.title}</h3>
                <p className="text-sm text-zinc-500 font-light max-w-lg">{chapter.description}</p>
                <div className="pt-2 flex gap-4 text-xs text-zinc-400">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {new Date(chapter.startDate).toLocaleDateString()} - {new Date(chapter.endDate).toLocaleDateString()}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><FileText className="w-3 h-3"/> {chapter._count.courses} Courses</span>
                </div>
              </div>

              {/* Action Button Area */}
              <div className="flex items-center gap-3 self-start md:self-center">
                
                {/* 1. MANAGE MENU LINK (Isi Makanan) */}
                <a 
                  href={`/admin/settings/${chapter.id}`}
                  className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-batik border border-zinc-300 hover:border-batik px-4 py-2 rounded-lg transition-colors"
                >
                  Menu
                </a>

                {/* 2. TOMBOL EDIT (Hanya jika TIDAK AKTIF) */}
                <a 
                  href={chapter.isActive ? '#' : `/admin/settings/${chapter.id}/edit`}
                  className={`p-2 rounded-lg border transition-colors ${
                    chapter.isActive 
                      ? 'border-zinc-100 text-zinc-300 cursor-not-allowed' 
                      : 'border-zinc-300 text-zinc-500 hover:border-batik hover:text-batik'
                  }`}
                  title={chapter.isActive ? "Cannot edit active chapter" : "Edit Details"}
                  aria-disabled={chapter.isActive}
                >
                  <Edit className="w-4 h-4" />
                </a>

                {/* 3. TOMBOL DELETE (Hanya jika TIDAK AKTIF) */}
                <form action={deleteChapter}>
                  <input type="hidden" name="id" value={chapter.id} />
                  <button 
                    disabled={chapter.isActive}
                    className={`p-2 rounded-lg border transition-colors flex items-center ${
                      chapter.isActive 
                        ? 'border-zinc-100 text-zinc-300 cursor-not-allowed' 
                        : 'border-zinc-300 text-zinc-500 hover:border-red-500 hover:text-red-500'
                    }`}
                    title={chapter.isActive ? "Cannot delete active chapter" : "Delete Chapter"}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </form>

                {/* 4. TOMBOL ACTIVATE / STATUS */}
                {chapter.isActive ? (
                  <button disabled className="ml-2 px-4 py-2 border border-green-200 text-green-600 text-xs font-bold uppercase tracking-widest rounded-lg bg-green-50 opacity-80 cursor-default">
                    Live
                  </button>
                ) : (
                  <form action={activateChapter}>
                    <input type="hidden" name="id" value={chapter.id} />
                    <button className="ml-2 px-4 py-2 bg-zinc-900 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-batik transition-colors shadow-lg shadow-zinc-200">
                      Activate
                    </button>
                  </form>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* --- 2. FLOOR PLAN MANAGEMENT --- */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50 flex justify-between items-center">
          <h2 className="font-bold text-zinc-700 flex items-center gap-2">
            <Grid className="w-4 h-4 text-batik" />
            Floor Plan & Tables
          </h2>
          <span className="text-xs text-zinc-400 bg-white px-2 py-1 border border-zinc-200 rounded">
            Total Capacity: {tables.reduce((acc, t) => acc + t.capacity, 0)} Pax
          </span>
        </div>

        <div className="p-6">
          {/* Form Tambah Meja */}
          <div className="mb-8 bg-zinc-50 p-4 rounded-lg border border-zinc-200">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Add New Table</h3>
            <form action={createTable} className="flex gap-4 items-end">
              <div className="flex-1 space-y-1">
                <label className="text-[10px] text-zinc-400 uppercase">Table Name/Number</label>
                <input 
                  name="tableNumber" 
                  type="text" 
                  placeholder="e.g. T12 or VIP-2" 
                  required
                  className="w-full px-4 py-2 border border-zinc-300 rounded text-sm focus:outline-none focus:border-batik"
                />
              </div>
              <div className="w-32 space-y-1">
                <label className="text-[10px] text-zinc-400 uppercase">Capacity</label>
                <input 
                  name="capacity" 
                  type="number" 
                  min="1" 
                  placeholder="Pax" 
                  required
                  className="w-full px-4 py-2 border border-zinc-300 rounded text-sm focus:outline-none focus:border-batik"
                />
              </div>
              <button className="px-6 py-2 bg-zinc-900 text-white text-sm font-bold rounded hover:bg-batik transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add
              </button>
            </form>
          </div>

          {/* Grid Daftar Meja */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {tables.map((table) => (
              <div key={table.id} className="relative group bg-white border border-zinc-200 rounded-lg p-4 flex flex-col items-center justify-center gap-2 hover:border-batik transition-colors">
                <span className="text-xl font-serif font-bold text-zinc-800">{table.tableNumber}</span>
                <div className="flex items-center gap-1 text-xs text-zinc-400">
                  <Users className="w-3 h-3" />
                  <span>{table.capacity}p</span>
                </div>

                {/* Delete Button (Muncul saat hover) */}
                <form action={deleteTable} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <input type="hidden" name="id" value={table.id} />
                  <button className="text-zinc-300 hover:text-red-500 p-1" title="Remove Table">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- 3. DANGER ZONE --- */}
      <div className="p-6 border border-red-100 bg-red-50 rounded-xl flex items-start gap-4">
        <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
        <div>
          <h3 className="text-red-700 font-bold text-sm">Emergency Controls</h3>
          <p className="text-red-600/80 text-xs mt-1 leading-relaxed">
            Close restaurant for today (disable all reservations). Use this only for emergencies like maintenance or private buyouts.
          </p>
          <button className="mt-3 px-4 py-2 bg-white border border-red-200 text-red-600 text-xs font-bold rounded hover:bg-red-50 transition-colors">
            Close Restaurant
          </button>
        </div>
      </div>

    </div>
  );
}