"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Biar bisa highlight menu aktif
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site"; // Import Config biar dinamis
import { cn } from "@/lib/utils"; // Optional: buat rapihin class logic

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Cek URL sekarang lagi dimana

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-paper/90 backdrop-blur-md border-b border-subtle">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* 1. Logo Area (DINAMIS DARI CONFIG) */}
          <div className="flex-1 z-50">
            <Link
              href="/"
              onClick={closeMenu}
              className="font-serif text-2xl tracking-[0.15em] font-bold text-ink hover:text-batik transition-colors uppercase"
            >
              {siteConfig.name}
            </Link>
          </div>

          {/* 2. Desktop Menu (DINAMIS DARI CONFIG) */}
          <div className="hidden md:flex items-center gap-10 text-xs font-medium tracking-[0.2em] uppercase text-ink/80">
            {siteConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "hover:text-batik transition-colors",
                  pathname === item.href ? "text-batik font-bold" : "" // Active State
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* 3. Actions */}
          <div className="flex-1 flex justify-end items-center gap-6 z-50">
            {/* Tombol Reserve */}
            <Link
              href="/reservations"
              className="hidden md:inline-block px-6 py-2.5 bg-ink text-paper text-xs tracking-[0.2em] uppercase hover:bg-batik transition-all duration-500 ease-out"
            >
              Reserve
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-ink hover:text-batik transition-colors p-2"
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <X
                  className="w-6 h-6 animate-in spin-in-90 duration-300"
                  strokeWidth={1.5}
                />
              ) : (
                <Menu
                  className="w-6 h-6 animate-in fade-in duration-300"
                  strokeWidth={1.5}
                />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* --- MOBILE FULLSCREEN MENU OVERLAY --- */}
      <div
        className={cn(
          "fixed inset-0 bg-paper z-40 flex flex-col justify-center items-center transition-all duration-500 ease-in-out md:hidden",
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        {/* Pattern Hiasan */}
        <div className="absolute inset-0 opacity-5 bg-[url('/assets/patterns/stardust.png')] pointer-events-none"></div>

        <div className="flex flex-col gap-8 text-center z-50">
          {/* Mobile Links (DINAMIS DARI CONFIG) */}
          {siteConfig.mainNav.map((item) => (
            <MobileLink key={item.href} href={item.href} onClick={closeMenu}>
              {item.title}
            </MobileLink>
          ))}

          <div className="w-12 h-[1px] bg-batik mx-auto my-4"></div>

          <Link
            href="/reservations"
            onClick={closeMenu}
            className="text-lg font-bold uppercase tracking-[0.2em] text-batik hover:text-ink transition-colors"
          >
            Reserve Table
          </Link>

          <div className="mt-8 text-xs text-gray-400">
            <Link
              href="/guest/login"
              onClick={closeMenu}
              className="hover:text-batik underline"
            >
              Guest Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

// Komponen Kecil MobileLink (Gak Berubah)
function MobileLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="font-serif text-3xl text-ink hover:text-batik hover:italic transition-all duration-300"
    >
      {children}
    </Link>
  );
}
