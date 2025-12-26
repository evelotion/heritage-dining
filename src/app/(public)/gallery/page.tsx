"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal"; // Import Reveal

// Definisi Tipe Data
type Category = "All" | "Interior" | "Culinary" | "Atmosphere";

interface GalleryImage {
  src: string;
  alt: string;
  category: Category;
  height: string;
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const galleryImages: GalleryImage[] = [
    {
      src: "/assets/gallery/gallery-1.png",
      alt: "Main Dining Hall",
      category: "Interior",
      height: "h-64",
    },
    {
      src: "/assets/gallery/gallery-2.png",
      alt: "Main Course/Fire & Earth",
      category: "Culinary",
      height: "h-96",
    },
    {
      src: "/assets/gallery/gallery-3.png",
      alt: "Lounge/Detail",
      category: "Atmosphere",
      height: "h-64",
    },
    {
      src: "/assets/gallery/gallery-4.png",
      alt: "Appetizer/Ocean",
      category: "Culinary",
      height: "h-80",
    },
    {
      src: "/assets/gallery/gallery-5.png",
      alt: "Dessert/Forest",
      category: "Culinary",
      height: "h-64",
    },
    {
      src: "/assets/gallery/gallery-6.png",
      alt: "Interior Bar",
      category: "Interior",
      height: "h-72",
    },
    {
      src: "/assets/gallery/gallery-7.png",
      alt: "Wine Cellar/Private",
      category: "Interior",
      height: "h-96",
    },
    {
      src: "/assets/gallery/gallery-8.png",
      alt: "Signature Drink",
      category: "Culinary",
      height: "h-64",
    },
    {
      src: "/assets/gallery/gallery-9.png",
      alt: "The Art of Service",
      category: "Atmosphere",
      height: "h-80",
    },
    {
      src: "/assets/gallery/gallery-10.png",
      alt: "The Root: Truffle & Earth",
      category: "Culinary",
      height: "h-80",
    },
    {
      src: "/assets/gallery/gallery-11.png",
      alt: "The Forager: Duck & Moss",
      category: "Culinary",
      height: "h-64",
    },
    {
      src: "/assets/gallery/gallery-12.png",
      alt: "The Deep: Octopus & Ink",
      category: "Culinary",
      height: "h-96",
    },
    {
      src: "/assets/gallery/gallery-13.png",
      alt: "The Inferno: Cacao & Smoke",
      category: "Culinary",
      height: "h-72",
    },
    {
      src: "/assets/gallery/gallery-14.png",
      alt: "The Volcano: Snapper & Ink",
      category: "Culinary",
      height: "h-80",
    },
  ];

  const categories: Category[] = ["All", "Interior", "Culinary", "Atmosphere"];

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <div className="bg-paper min-h-screen text-ink pb-20 overflow-x-hidden">
      {/* --- Header --- */}
      <section className="pt-32 pb-8 px-6 text-center md:pt-10">
        <Reveal>
          <span className="text-batik text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
            The Gallery
          </span>
        </Reveal>

        <Reveal delay={200}>
          <h1 className="font-serif text-4xl md:text-6xl text-ink mb-6">
            A Visual Feast
          </h1>
        </Reveal>

        <Reveal delay={300}>
          <p className="text-gray-500 font-light max-w-lg mx-auto mb-10 text-sm md:text-base leading-relaxed">
            Curated moments of our atmosphere, culinary artistry, and the quiet
            rhythm of service.
          </p>
        </Reveal>

        {/* --- CATEGORY TABS --- */}
        <Reveal delay={500} className="w-full max-w-md mx-auto">
          <div className="flex gap-3 overflow-x-auto pb-4 px-4 justify-start md:justify-center snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "flex-shrink-0 snap-center px-5 py-2 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-full border transition-all duration-300",
                  activeCategory === cat
                    ? "bg-ink text-white border-ink shadow-md"
                    : "bg-white text-gray-400 border-gray-200 hover:text-batik hover:border-batik"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      {/* --- Masonry Grid --- */}
      <section className="px-4 md:px-12 max-w-7xl mx-auto min-h-[500px]">
        <div className="columns-1 md:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {filteredImages.map((img, idx) => (
            // Kita bungkus pakai Reveal, tapi kasih 'break-inside-avoid' biar gak potong di kolom
            <Reveal
              key={`${img.src}-${idx}`}
              delay={100} // Sedikit delay standar, biar scroll trigger handle sisanya
              className="break-inside-avoid relative overflow-hidden rounded-sm group cursor-pointer"
            >
              <div className="relative w-full">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 w-full p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0 hidden md:block">
                <span className="text-white text-[10px] font-bold tracking-[0.2em] uppercase border-b border-batik pb-2">
                  {img.category} • {img.alt}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <Reveal>
            <div className="text-center py-20 text-gray-400 italic text-sm">
              No images found in this category.
            </div>
          </Reveal>
        )}
      </section>

      {/* --- Instagram Feed Teaser --- */}
      <Reveal className="mt-20 md:mt-32 text-center px-6">
        <a
          href="#"
          className="text-[10px] md:text-xs text-gray-400 hover:text-batik transition-colors uppercase tracking-widest border-b border-transparent hover:border-batik pb-1"
        >
          Follow us @HeritageDining
        </a>
      </Reveal>
    </div>
  );
}
