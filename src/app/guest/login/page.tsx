import LoginForm from "@/components/features/LoginForm";
import Link from "next/link";
import { Suspense } from "react"; // <--- 1. Import Suspense

export default function GuestLoginPage() {
  return (
    <section className="min-h-screen bg-paper flex flex-col items-center justify-center p-6">
      {/* Brand Header */}
      <div className="text-center mb-12 space-y-4">
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
      <div className="w-full max-w-lg bg-white p-10 md:p-16 shadow-xl shadow-gray-100 border border-subtle">
        <div className="text-center mb-10">
          <h1 className="font-serif text-2xl italic text-ink mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-500 font-light text-sm">
            Please enter your credentials to manage your reservation.
          </p>
        </div>

        {/* 2. Bungkus LoginForm dengan Suspense */}
        <Suspense
          fallback={
            <div className="text-center text-sm text-gray-400">
              Loading login form...
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
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
