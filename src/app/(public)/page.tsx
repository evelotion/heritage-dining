"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal"; // Import Component Animasi Baru

// --- Tipe Data ---
type SoloSlide = {
  type: "solo";
  name: string;
  role: string;
  image: string;
  quote: string;
};

type DuoSlide = {
  type: "duo";
  members: {
    name: string;
    role: string;
    image: string;
  }[];
};

type TeamSlide = SoloSlide | DuoSlide;

export default function HomePage() {
  // STATE
  const [currentSlide, setCurrentSlide] = useState(0);

  // DATA
  const teamSlides: TeamSlide[] = [
    {
      type: "solo",
      name: "Aditya Wijaya",
      role: "Executive Chef",
      image: "/assets/team/exchef.png",
      quote: "My kitchen is a sanctuary where we listen to the soil.",
    },
    {
      type: "solo",
      name: "Sarah Jenkins",
      role: "General Manager",
      image: "/assets/team/gm.png",
      quote: "Service is the invisible art of anticipation.",
    },
    {
      type: "duo",
      members: [
        {
          name: "Lestari Putri",
          role: "Head Sous Chef",
          image: "/assets/team/sous.png",
        },
        {
          name: "Budi Santoso",
          role: "Head Sommelier",
          image: "/assets/team/sommelier.png",
        },
      ],
    },
    {
      type: "duo",
      members: [
        {
          name: "Pierre Dubois",
          role: "Pastry Chef",
          image: "/assets/team/pastry.png",
        },
        {
          name: "Raka Dimas",
          role: "Chef de Partie",
          image: "/assets/team/cdp.png", // Typo fix dari gallery ke team biar konsisten path
        },
      ],
    },
  ];

  // LOGIC
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === teamSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? teamSlides.length - 1 : prev - 1));
  };

  return (
    <div className="flex flex-col w-full bg-paper overflow-x-hidden">
      {/* --- SECTION 1: HERO --- */}
      <section className="relative min-h-screen flex flex-col md:flex-row">
        {/* Text Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center md:justify-start px-8 md:px-24 py-20 md:pt-10 bg-paper z-20 order-2 md:order-1">
          <div className="space-y-8 max-w-xl">
            {/* Tagline */}
            <Reveal delay={0}>
              <div className="flex items-center gap-4">
                <span className="h-[1px] w-12 bg-batik"></span>
                <span className="text-batik text-xs font-bold tracking-[0.3em] uppercase">
                  Now Serving
                </span>
              </div>
            </Reveal>

            {/* Headline */}
            <Reveal delay={200}>
              <h1 className="text-5xl md:text-7xl font-serif text-ink leading-[1.1]">
                Chapter I: <br />
                <span className="italic text-batik">Origins</span>
              </h1>
            </Reveal>

            {/* Description */}
            <Reveal delay={300}>
              <p className="text-gray-500 leading-relaxed font-light text-base md:text-lg">
                A tasting journey back to the beginning. Exploring the primal
                elements that birthed the flavor of the Archipelago.
              </p>
            </Reveal>

            {/* Buttons */}
            <Reveal delay={500}>
              <div className="flex flex-col sm:flex-row gap-5 pt-4">
                <Link
                  href="/reservations"
                  className="group flex items-center justify-center px-8 py-4 bg-ink text-paper text-xs tracking-[0.2em] uppercase hover:bg-batik transition-all duration-500"
                >
                  <span>Book Table</span>
                  <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/menu"
                  className="flex items-center justify-center px-8 py-4 border border-subtle text-ink text-xs tracking-[0.2em] uppercase hover:border-batik hover:text-batik transition-colors duration-300"
                >
                  View Menu
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full md:w-1/2 relative h-[50vh] md:h-auto bg-zinc-200 overflow-hidden group order-1 md:order-2">
          {/* Animasi Blur In untuk gambar besar */}
          <Reveal variant="blur" className="w-full h-full absolute inset-0">
            <Image
              src="/assets/home/hero-main.png"
              alt="Heritage Dining Hero"
              fill
              priority
              className="object-cover object-center transition-transform duration-[3s] group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={95}
            />
            <div className="absolute inset-0 bg-black/10 mix-blend-multiply z-10"></div>
          </Reveal>
        </div>
      </section>

      {/* --- SECTION 2: PHILOSOPHY --- */}
      <section className="py-12 md:py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center space-y-8 md:space-y-10">
          <Reveal>
            <span className="text-batik text-xs font-bold tracking-[0.3em] uppercase block">
              The Philosophy
            </span>
          </Reveal>

          <Reveal delay={200}>
            <h2 className="text-3xl md:text-5xl font-serif leading-snug text-ink">
              "We do not just serve food.
              <br />
              We curate <span className="italic text-batik">memories</span> of
              the land."
            </h2>
          </Reveal>

          <Reveal delay={300}>
            <div className="w-20 h-[1px] bg-subtle mx-auto mb-8"></div>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 text-left text-base leading-relaxed text-gray-500 font-light max-w-4xl mx-auto">
              <p>
                In our debut chapter, <strong>Origins</strong>, we strip away
                the modern noise to rediscover the essence of Indonesian
                ingredients. Inspired by the <em>Kawung</em> motif, representing
                purity and the void.
              </p>
              <p>
                Each course is a stanza in a poem, crafted not just to feed, but
                to tell the story of where we come from. This is fine dining,
                reimagined for the modern soul.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- SECTION 3: THE ARTISANS --- */}
      {/* --- SECTION 3: THE ARTISANS (MOBILE OPTIMIZED) --- */}
      <section className="py-16 md:py-32 bg-paper overflow-hidden relative">
        {/* Background Ornament (Optional - Batik Samar) */}
        <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] opacity-[0.03] pointer-events-none">
           <Image 
             src="/assets/story/motif-kawung.png" 
             alt="pattern" 
             fill 
             className="object-contain"
           />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative h-full">
          {/* Header Minimalis */}
          <Reveal className="mb-8 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-subtle pb-6">
            <div>
              <span className="text-batik text-xs font-bold tracking-[0.3em] uppercase block mb-3">
                Behind The Pass
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-ink">The Artisans</h2>
            </div>
            
            {/* DESKTOP NAVIGATION (Hidden on Mobile) */}
            <div className="hidden md:flex gap-4">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full border border-subtle flex items-center justify-center hover:border-batik hover:text-batik hover:bg-batik/5 transition-all duration-300 group"
              >
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full border border-subtle flex items-center justify-center hover:border-batik hover:text-batik hover:bg-batik/5 transition-all duration-300 group"
              >
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </Reveal>

          {/* CAROUSEL CONTENT */}
          <Reveal variant="blur" delay={200} className="w-full">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-1000 cubic-bezier(0.2, 0.8, 0.2, 1)"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {teamSlides.map((slide, idx) => (
                  <div key={idx} className="w-full flex-shrink-0 px-1 md:px-4">
                    
                    {/* --- SOLO LAYOUT --- */}
                    {slide.type === "solo" && (
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center">
                        {/* Image Column */}
                        <div className="md:col-span-5 relative px-4 md:px-0">
                          <div className="relative w-full aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-t-[10rem] border-[1px] border-subtle/50 shadow-2xl shadow-ink/5">
                            <Image
                              src={slide.image}
                              alt={slide.name}
                              fill
                              className="object-cover transition-transform duration-[2s] hover:scale-105"
                            />
                            {/* Texture Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent"></div>
                          </div>
                          
                          {/* Decorative Badge (Size adjusted for mobile) */}
                          <div className="absolute -bottom-4 -right-2 md:-bottom-6 md:-right-6 w-16 h-16 md:w-24 md:h-24 bg-paper rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite] z-10 shadow-lg border border-subtle">
                             <div className="w-12 h-12 md:w-20 md:h-20 border border-dashed border-batik rounded-full"></div>
                          </div>
                          <div className="absolute -bottom-4 -right-2 md:-bottom-6 md:-right-6 w-16 h-16 md:w-24 md:h-24 flex items-center justify-center z-20">
                             <span className="text-[8px] md:text-[10px] font-bold tracking-widest uppercase text-batik">Est. 2024</span>
                          </div>
                        </div>

                        {/* Text Column */}
                        <div className="md:col-span-7 flex flex-col justify-center pl-0 md:pl-10 mt-6 md:mt-0 text-center md:text-left">
                          <div className="space-y-4 md:space-y-6">
                            <blockquote className="font-serif text-2xl md:text-5xl text-ink leading-[1.2] md:leading-[1.15]">
                              "{slide.quote}"
                            </blockquote>
                            
                            <div className="h-[1px] w-20 bg-batik mx-auto md:mx-0"></div>
                            
                            <div>
                              <h3 className="text-lg md:text-xl font-serif text-ink">{slide.name}</h3>
                              <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-500 mt-1">
                                {slide.role}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* --- DUO LAYOUT --- */}
                    {slide.type === "duo" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 max-w-5xl mx-auto pt-4">
                        {slide.members.map((member, mIdx) => (
                          <div 
                            key={mIdx} 
                            className={`flex flex-col items-center text-center ${mIdx === 1 ? 'md:mt-16' : ''}`}
                          >
                            <div className="relative w-full max-w-[240px] md:max-w-[300px] aspect-[3/4] mb-4 md:mb-6 group">
                               <div className="absolute inset-0 border border-batik/30 rounded-t-full translate-x-2 translate-y-2 transition-transform duration-500 group-hover:translate-x-3 group-hover:translate-y-3"></div>
                               <div className="relative w-full h-full rounded-t-full overflow-hidden bg-zinc-200 shadow-lg">
                                  <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                  />
                               </div>
                            </div>

                            <div className="space-y-1">
                              <h3 className="text-xl md:text-2xl font-serif text-ink">{member.name}</h3>
                              <p className="text-[10px] uppercase tracking-[0.2em] text-batik font-bold">
                                {member.role}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* MOBILE CONTROL BAR (New Layout) */}
            <div className="flex md:hidden items-center justify-between mt-10 gap-4">
              {/* Prev Button */}
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border border-subtle flex items-center justify-center text-ink/50 hover:border-batik hover:text-batik transition-colors active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              {/* Progress Bar (Center) */}
              <div className="flex-1 h-[1px] bg-subtle relative overflow-hidden rounded-full">
                <div 
                  className="absolute top-0 left-0 h-full bg-batik transition-all duration-500 ease-out"
                  style={{ width: `${((currentSlide + 1) / teamSlides.length) * 100}%` }}
                ></div>
              </div>

              {/* Next Button */}
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border border-subtle flex items-center justify-center text-ink/50 hover:border-batik hover:text-batik transition-colors active:scale-95"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* DESKTOP PROGRESS BAR (Hidden on Mobile) */}
            <div className="hidden md:block w-full h-[1px] bg-subtle mt-16 md:mt-24 relative overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-batik transition-all duration-500 ease-out"
                  style={{ width: `${((currentSlide + 1) / teamSlides.length) * 100}%` }}
                ></div>
            </div>

          </Reveal>
        </div>
      </section>

      {/* --- SECTION 4: MENU HIGHLIGHTS --- */}
      <section className="py-10 md:py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 gap-6">
              <div className="space-y-4">
                <span className="text-batik text-xs font-bold tracking-[0.3em] uppercase block">
                  Chapter Highlights
                </span>
                <h2 className="text-4xl md:text-5xl font-serif text-ink">
                  The Journey of{" "}
                  <span className="italic text-batik">Origins</span>
                </h2>
              </div>
              <Link
                href="/menu"
                className="text-xs uppercase tracking-widest text-gray-400 hover:text-batik border-b border-transparent hover:border-batik pb-1 transition-colors"
              >
                View Full Menu &rarr;
              </Link>
            </div>
          </Reveal>

          {/* Cards Grid - Dengan Staggered Delay */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <Reveal delay={0}>
              <div className="group cursor-pointer flex flex-col items-center text-center gap-5">
                <div className="aspect-[4/5] w-full bg-zinc-200 relative overflow-hidden shadow-md">
                  <Image
                    src="/assets/home/menu1.png"
                    alt="The Volcanic Soil"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="space-y-2 w-full">
                  <h3 className="text-2xl font-serif text-ink group-hover:text-batik transition-colors">
                    The Volcanic Soil
                  </h3>
                  <div className="flex items-center justify-center gap-3">
                    <span className="h-[1px] w-4 bg-subtle group-hover:bg-batik transition-colors"></span>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
                      Roots • Earth • Raw
                    </p>
                    <span className="h-[1px] w-4 bg-subtle group-hover:bg-batik transition-colors"></span>
                  </div>
                  <p className="text-sm text-gray-500 font-light leading-relaxed max-w-xs mx-auto">
                    Heirloom ingredients harvested fresh from the nutrient-rich
                    slopes of Java's volcanoes.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Card 2 - Delay 200ms */}
            <Reveal delay={200}>
              <div className="group cursor-pointer flex flex-col items-center text-center gap-5 md:mt-8">
                <div className="aspect-[4/5] w-full bg-zinc-200 relative overflow-hidden shadow-md">
                  <Image
                    src="/assets/home/menu2.png"
                    alt="The Ancient Hearth"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="space-y-2 w-full">
                  <h3 className="text-2xl font-serif text-ink group-hover:text-batik transition-colors">
                    The Ancient Hearth
                  </h3>
                  <div className="flex items-center justify-center gap-3">
                    <span className="h-[1px] w-4 bg-subtle group-hover:bg-batik transition-colors"></span>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
                      Charcoal • Fire • Smoke
                    </p>
                    <span className="h-[1px] w-4 bg-subtle group-hover:bg-batik transition-colors"></span>
                  </div>
                  <p className="text-sm text-gray-500 font-light leading-relaxed max-w-xs mx-auto">
                    Ingredients transformed slowly over open wood fire,
                    imparting a smoky soul to the dish.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Card 3 - Delay 400ms */}
            <Reveal delay={300}>
              <div className="group cursor-pointer flex flex-col items-center text-center gap-5">
                <div className="aspect-[4/5] w-full bg-zinc-200 relative overflow-hidden shadow-md">
                  <Image
                    src="/assets/home/menu3.png"
                    alt="Modern Heritage"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="space-y-2 w-full">
                  <h3 className="text-2xl font-serif text-ink group-hover:text-batik transition-colors">
                    Modern Heritage
                  </h3>
                  <div className="flex items-center justify-center gap-3">
                    <span className="h-[1px] w-4 bg-subtle group-hover:bg-batik transition-colors"></span>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
                      Plating • Texture • Art
                    </p>
                    <span className="h-[1px] w-4 bg-subtle group-hover:bg-batik transition-colors"></span>
                  </div>
                  <p className="text-sm text-gray-500 font-light leading-relaxed max-w-xs mx-auto">
                    A reimagining of tradition, where nature's raw beauty meets
                    modern culinary precision.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
