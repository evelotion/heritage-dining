import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function PaymentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center pt-12 pb-20">
      
      {/* Header Minimalis */}
      <div className="mb-8 text-center">
        <Link href="/" className="font-serif text-2xl font-bold tracking-[0.15em] text-ink hover:text-batik">
          HERITAGE.
        </Link>
        <div className="flex items-center justify-center gap-2 mt-2 text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
          <ShieldCheck className="w-3 h-3" />
          <span className="font-medium tracking-wide">Secure Checkout</span>
        </div>
      </div>

      {/* Konten Utama */}
      <main className="w-full max-w-lg bg-white shadow-xl shadow-zinc-200/50 rounded-2xl overflow-hidden border border-zinc-100">
        {children}
      </main>

      {/* Footer Minimalis */}
      <p className="mt-8 text-[10px] text-zinc-400 uppercase tracking-widest">
        Powered by Midtrans & Heritage GXP
      </p>
    </div>
  );
}