"use client";

import { useActionState } from "react";
import { loginAdmin } from "@/lib/auth-actions";
import { ShieldCheck, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAdmin, null);

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <ShieldCheck className="w-12 h-12 text-batik mx-auto mb-4" />
          <h1 className="text-xl font-serif text-zinc-100 tracking-widest uppercase">
            Staff Portal
          </h1>
          <p className="text-xs text-zinc-500 mt-2">
            Authorized Personnel Only
          </p>
        </div>

        {/* --- PERBAIKAN DI SINI --- */}
        {/* Cek apakah ada state.error, bukan state.success/message */}
        {state?.error && (
          <div className="mb-6 p-3 bg-red-900/30 border border-red-800 rounded text-red-400 text-xs text-center">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <div>
            <input
              name="username"
              type="text"
              placeholder="Username"
              className="w-full bg-black border border-zinc-800 text-zinc-200 px-4 py-3 rounded-lg text-sm focus:border-batik focus:outline-none transition-colors"
            />
          </div>
          <div>
            {/* Pastikan name="password" sudah benar */}
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full bg-black border border-zinc-800 text-zinc-200 px-4 py-3 rounded-lg text-sm focus:border-batik focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-batik text-white py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all flex justify-center items-center gap-2"
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Access System"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
