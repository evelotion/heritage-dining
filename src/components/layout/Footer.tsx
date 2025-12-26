import Link from "next/link";
import {
  Instagram,
  Facebook,
  Twitter,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { siteConfig } from "@/config/site"; // Import config biar dinamis

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400 pt-20 pb-10 border-t border-batik">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        {/* 1. Brand & Description (DINAMIS) */}
        <div className="md:col-span-1 space-y-6">
          <Link
            href="/"
            className="font-serif text-2xl text-zinc-100 tracking-widest font-bold uppercase"
          >
            {siteConfig.name}
          </Link>
          <p className="text-xs font-light leading-relaxed max-w-xs">
            {siteConfig.description}
          </p>
        </div>

        {/* 2. Explore / Menu (DINAMIS DARI CONFIG) */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-batik mb-6">
            Explore
          </h4>
          <ul className="space-y-4 text-xs tracking-wide uppercase">
            {siteConfig.mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-white transition-colors"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Contact Info (DINAMIS DARI CONFIG) */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-batik mb-6">
            Contact
          </h4>
          <ul className="space-y-4 text-sm font-light">
            <li className="flex items-start gap-3">
              {/* Icon optional, gue tambahin biar makin manis, kalau gak suka hapus aja <MapPin /> nya */}
              <span className="leading-relaxed">
                {siteConfig.contact.address}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="hover:text-white transition-colors"
              >
                {siteConfig.contact.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="hover:text-white transition-colors"
              >
                {siteConfig.contact.phone}
              </a>
            </li>
          </ul>
        </div>

        {/* 4. Social Media (DINAMIS) */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-batik mb-6">
            Connect
          </h4>
          <div className="flex gap-6">
            {/* Cek dulu linknya ada gak di config, kalau ada baru render iconnya */}
            {siteConfig.socials.instagram && (
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            )}

            {siteConfig.socials.facebook && (
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            )}

            {/* Twitter / X (Optional kalau lo masukin di type definition config) */}
            <a href="#" className="hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright (DINAMIS) */}
      <div className="text-center pt-8 border-t border-zinc-800 text-[10px] uppercase tracking-widest text-zinc-600">
        &copy; {new Date().getFullYear()} {siteConfig.name}. All Rights
        Reserved.
      </div>
    </footer>
  );
}
