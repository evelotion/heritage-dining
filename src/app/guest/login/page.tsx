import LoginForm from "@/components/features/LoginForm";
import Link from "next/link";
import { Suspense } from "react";
import { CheckCircle2, Sparkles } from "lucide-react"; // Tambah Icon biar visualnya "berbicara"

// 1. Definisi Tipe Props untuk menangkap Search Params (Next.js 16)
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function GuestLoginPage({ searchParams }: Props) {
  // 2. Baca parameter URL
  const params = await searchParams;
  const isPaymentSuccess = params?.new === "true"; // Cek apakah ada ?new=true

  return (
    <section className="min-h-screen bg-paper flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* (Opsional) Hiasan Background tipis biar ga sepi */}
      <div className="absolute inset-0 bg-[url('/assets/patterns/stardust.png')] opacity-5 pointer-events-none"></div>

      {/* Brand Header */}
      <div className="text-center mb-10 space-y-4 relative z-10">
        <Link
          href="/"
          className="font-serif text-3xl font-bold tracking-[0.15em] text-ink hover:text-batik transition-colors"
        >
          HERITAGE.
        </Link>
        <p className="text-xs uppercase tracking-[0.3em] text-batik">
          Guest Portal
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-lg bg-white p-10 md:p-16 shadow-2xl shadow-zinc-200/50 border border-zinc-100 relative z-10 animate-fade-in-up">
        {/* --- LOGIC IMPROVISASI START --- */}
        {isPaymentSuccess ? (
          // A. TAMPILAN SUKSES (Kalau habis bayar)
          <div className="text-center mb-10 space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-2 animate-bounce-slow">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h1 className="font-serif text-2xl text-ink mb-2">
                Payment Confirmed
              </h1>
              <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 px-4 py-1.5 rounded-full">
                <Sparkles className="w-3 h-3 text-green-600" />
                <span className="text-[10px] uppercase tracking-widest text-green-700 font-medium">
                  Table Secured
                </span>
              </div>
            </div>
            <p className="text-gray-500 font-light text-sm leading-relaxed px-4">
              Thank you! Your deposit has been received. <br />
              Please check your ticket below or in your email.
            </p>
          </div>
        ) : (
          // B. TAMPILAN STANDAR (Login Biasa)
          <div className="text-center mb-10">
            <h1 className="font-serif text-2xl italic text-ink mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-500 font-light text-sm">
              Please enter your credentials to manage your reservation.
            </p>
          </div>
        )}
        {/* --- LOGIC IMPROVISASI END --- */}

        {/* Form Login (Tetap dalam Suspense) */}
        <Suspense
          fallback={
            <div className="text-center text-sm text-gray-400 py-8">
              Loading secure portal...
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center relative z-10">
        <Link
          href="/"
          className="text-xs text-gray-400 hover:text-ink transition-colors border-b border-transparent hover:border-gray-400 pb-1"
        >
          &larr; Back to Home
        </Link>
      </div>
    </section>
  );
}
