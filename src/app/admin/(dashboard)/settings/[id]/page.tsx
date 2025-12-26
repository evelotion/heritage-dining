import { prisma } from "@/lib/db";
import { createCourse, deleteCourse } from "@/lib/admin-actions";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Utensils } from "lucide-react";

type Props = { params: Promise<{ id: string }> };

export default async function ChapterDetailPage({ params }: Props) {
  const { id } = await params;

  // 1. Ambil Data Chapter & Courses-nya
  const chapter = await prisma.chapter.findUnique({
    where: { id },
    include: {
      courses: {
        orderBy: { sequence: 'asc' }
      }
    }
  });

  if (!chapter) return <div>Chapter not found</div>;

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      
      {/* Header & Back Button */}
      <div className="flex flex-col gap-4 border-b border-zinc-200 pb-6">
        <Link href="/admin/settings" className="flex items-center gap-2 text-zinc-500 hover:text-batik text-sm transition-colors w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to Settings
        </Link>
        <div>
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Editing Menu For</span>
          <h1 className="text-3xl font-serif text-zinc-900 mt-1">{chapter.title}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- KOLOM KIRI: FORM TAMBAH MENU --- */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-200 sticky top-8">
            <h2 className="font-bold text-zinc-800 flex items-center gap-2 mb-6">
              <Plus className="w-4 h-4 text-batik" /> Add Course
            </h2>
            
            <form action={createCourse} className="space-y-4">
              <input type="hidden" name="chapterId" value={chapter.id} />
              
              <div>
                <label className="text-[10px] uppercase text-zinc-400 font-bold">Sequence #</label>
                <input 
                  name="sequence" 
                  type="number" 
                  defaultValue={chapter.courses.length + 1}
                  className="w-full mt-1 p-2 border border-zinc-300 rounded text-sm focus:outline-none focus:border-batik"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase text-zinc-400 font-bold">Dish Name</label>
                <input 
                  name="name" 
                  type="text" 
                  placeholder="e.g. Ocean's Thread"
                  required
                  className="w-full mt-1 p-2 border border-zinc-300 rounded text-sm focus:outline-none focus:border-batik"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase text-zinc-400 font-bold">Description</label>
                <textarea 
                  name="description" 
                  rows={3}
                  placeholder="Short poetic description..."
                  className="w-full mt-1 p-2 border border-zinc-300 rounded text-sm focus:outline-none focus:border-batik"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase text-zinc-400 font-bold">Tags (Optional)</label>
                <input 
                  name="tags" 
                  type="text" 
                  placeholder="e.g. Shellfish, Spicy"
                  className="w-full mt-1 p-2 border border-zinc-300 rounded text-sm focus:outline-none focus:border-batik"
                />
              </div>

              <button className="w-full py-3 bg-zinc-900 text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-batik transition-colors shadow-lg">
                Add to Menu
              </button>
            </form>
          </div>
        </div>

        {/* --- KOLOM KANAN: DAFTAR MENU (PREVIEW) --- */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-bold text-zinc-800 flex items-center gap-2 mb-2">
            <Utensils className="w-4 h-4 text-batik" /> Current Menu ({chapter.courses.length} Items)
          </h2>

          {chapter.courses.length === 0 ? (
            <div className="p-8 border-2 border-dashed border-zinc-200 rounded-xl text-center text-zinc-400 italic">
              This chapter has no courses yet. Start adding on the left.
            </div>
          ) : (
            <div className="space-y-3">
              {chapter.courses.map((course) => (
                <div key={course.id} className="group bg-white border border-zinc-200 p-5 rounded-xl flex justify-between items-center hover:border-batik transition-colors shadow-sm">
                  
                  <div className="flex gap-4 items-center">
                    <span className="h-8 w-8 flex items-center justify-center bg-zinc-100 rounded-full text-xs font-bold text-zinc-500 font-mono">
                      {String(course.sequence).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-serif text-lg text-zinc-800">{course.name}</h3>
                      <p className="text-xs text-zinc-500 italic">{course.description}</p>
                      {course.tags && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-zinc-50 border border-zinc-100 text-[9px] uppercase text-zinc-400 rounded">
                          {course.tags}
                        </span>
                      )}
                    </div>
                  </div>

                  <form action={deleteCourse}>
                    <input type="hidden" name="id" value={course.id} />
                    <input type="hidden" name="chapterId" value={chapter.id} />
                    <button className="p-2 text-zinc-300 hover:text-red-500 transition-colors" title="Delete Course">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </form>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}