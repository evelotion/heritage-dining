"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: 0 | 100 | 200 | 300 | 500 | 700; // Pilihan delay (ms)
  duration?: number; // Opsional: custom duration
  variant?: "blur" | "slide" | "fade";
  threshold?: number; // Seberapa banyak elemen muncul baru animasi (0.1 = 10%)
}

export const Reveal = ({
  children,
  className,
  delay = 0,
  duration, // Nanti bisa dipake kalau mau inline style, tp skrg kita pakai class
  variant = "slide",
  threshold = 0.2, // Default: tunggu 20% elemen muncul baru animasi
}: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Bikin Observer (Mata-mata)
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Jika elemen muncul di layar (isIntersecting)
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stop mengamati biar gak animasi ulang pas scroll naik-turun (One-time reveal)
          observer.unobserve(element);
        }
      },
      {
        threshold: threshold, // Trigger saat % elemen terlihat
        rootMargin: "0px 0px -50px 0px", // Trigger sedikit sebelum elemen full masuk (offset)
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold]);

  // Logic Class
  // 1. Base State: opacity-0 (Hilang)
  // 2. Active State: opacity-100 + Class Animasi (Muncul)
  
  const animationClass = 
    variant === "blur" ? "animate-blur-in" : 
    variant === "fade" ? "animate-fade-in" :
    "animate-slide-up"; // Default slide

  const delayClass = delay === 0 ? "" : `delay-${delay}`;

  return (
    <div
      ref={ref}
      className={cn(
        // Selalu invisible di awal
        "transition-opacity duration-1000", 
        !isVisible ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0", // Fallback smooth kalau JS belum load
        isVisible ? `${animationClass} ${delayClass}` : "opacity-0", // Apply animasi hanya jika Visible
        className
      )}
    >
      {children}
    </div>
  );
};