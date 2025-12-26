import { prisma } from "@/lib/db";
import { updateChapter } from "@/lib/admin-actions";
import Link from "next/link";
import { ArrowLeft, Save, ShieldAlert } from "lucide-react";
import { redirect } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export default async function EditChapterPage({ params }: Props) {
  const { id } = await params;

  const chapter = await prisma.chapter.findUnique({
    where: { id }
  });

  if (!chapter) return <div>Chapter not found</div>;

  // Proteksi Ganda: Jika user iseng masuk URL edit chapter aktif, tendang keluar.
  if (chapter.isActive) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 space-y-4">
        <ShieldAlert className="w-16 h-16 text-red-500" />
        <h1 className="text-2xl font-bold text-zinc-900">Access Denied</h1>
        <p className="text-zinc-500 max-w-md">
          You cannot edit a <strong>Live Active Chapter</strong>. <br/>
          Please activate another chapter first to make this one editable.
        </p>
        <Link href="/admin/settings" className="text-sm font-bold text-batik hover:underline">
          &larr; Go Back
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12 animate-fade-in">
      
      {/* Header */}
      <div className="mb-8">
        <Link href="/admin/settings" className="flex items-center gap-2 text-zinc-400 hover:text-zinc-600 text-sm mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Cancel & Back
        </Link>
        <h1 className="text-3xl font-serif text-zinc-900">Edit Season Details</h1>
        <p className="text-zinc-500 text-sm mt-1">Update the narrative for {chapter.title}.</p>
      </div>

      {/* Edit Form */}
      <div className="bg-white p-8 rounded-xl border border-zinc-200 shadow-sm">
        <form action={updateChapter} className="space-y-6">
          <input type="hidden" name="id" value={chapter.id} />
          
          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-1 space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Sequence</label>
              <input 
                name="sequence" 
                type="number" 
                defaultValue={chapter.sequence}
                className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-batik font-mono"
              />
            </div>
            <div className="col-span-3 space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Title</label>
              <input 
                name="title" 
                type="text" 
                defaultValue={chapter.title}
                className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-batik font-serif text-lg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Description (Story)</label>
            <textarea 
              name="description" 
              rows={4}
              defaultValue={chapter.description || ""}
              className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-batik text-sm leading-relaxed"
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button className="flex items-center gap-2 bg-zinc-900 text-white px-8 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-batik transition-colors shadow-lg">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}