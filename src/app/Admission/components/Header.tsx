"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const [isInView, setIsInView] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);

  return (
    <section className="w-full bg-white">

      {/* Hero Image - Enhanced */}
      <div className="relative w-full h-[clamp(260px,70vh,730px)] overflow-hidden group">
        <Image
          src="/Admission/1.png"
          alt="About ASHA - Hospitality education and training"
          fill
          priority
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="100vw"
        />
        
        {/* Subtle gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Diagonal pattern overlay - matching text block */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 25px, rgba(255,255,255,0.05) 35px, rgba(255,255,255,0.1) 70px)`,
          }} />
        </div>
      </div>

      {/* Text Block - Enhanced */}
      <div 
        ref={textRef}
        className="w-full py-2 md:py-3 lg:py-4 flex flex-col items-center justify-center text-center bg-gradient-to-r from-[#921A1B] via-[#9e2a2b] to-[#726E6E] relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 70px)`,
          }} />
        </div>
        
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl translate-x-1/2 translate-y-1/2" />
        
        <div className={`px-5 md:px-6 relative z-10 transition-all duration-700 ${
          isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h1 className="font-jost text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-wide text-white bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent drop-shadow-lg">
            Admission
          </h1>

          <p className="font-jost text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto">
            One step closer to the future you’ve always imagined.
          </p>
        </div>
      </div>

    </section>
  );
}