"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Hero() {
  const images = ["/Landing/Hero/1.png"];
  const [index, setIndex] = useState(0);
  const [leadOpen, setLeadOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const prev = () => {
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const next = () => {
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  // Swipe handling for mobile
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) next();
    if (isRightSwipe) prev();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
    }, 1500);

    return () => clearInterval(interval);
  }, [images.length]);

  // Intersection Observer for section transitions
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleBookCall = () => {
    // Add your book a call logic here
    console.log("Book a Call clicked");
  };

  const handleScheduleCall = () => {
    // Add your schedule a call logic here
    console.log("Schedule a Call clicked");
  };

  return (
    <section 
      ref={sectionRef}
      className={`relative w-full h-[600px] sm:h-[610px] md:h-[670px] lg:h-[860px] overflow-hidden transition-all duration-1000 ${
        isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      {/* ---------- FULL WIDTH BACKGROUND IMAGE (ALL DEVICES) ---------- */}
      <div 
        className="absolute inset-0 w-full h-full"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt="Catering table setup"
            fill
            priority
            className={`object-cover transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            sizes="100vw"
          />
        ))}

        {/* Enhanced gradient overlay - left side only */}
        <div className="absolute inset-y-0 left-0 w-full md:w-[55%] lg:w-[50%] bg-gradient-to-r from-[#921A1B]/50 via-[#921A1B]/40 to-transparent" />
        
        {/* Decorative diagonal pattern overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(15deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 70px)`,
          }} />
        </div>
        
        {/* Image indicator dots - enhanced */}
        <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 lg:bottom-20 left-1/2 -translate-x-1/2 z-30 flex gap-2 sm:gap-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                i === index 
                  ? 'w-6 sm:w-8 bg-[#F15B19] shadow-lg shadow-[#F15B19]/50' 
                  : 'w-1.5 sm:w-2 bg-white/50 hover:bg-white/80 hover:scale-110'
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
        
        {/* Optional navigation arrows - visible on hover for desktop */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* ---------- CONTENT ---------- */}
      <div className="relative z-20 flex items-start md:items-center justify-center md:justify-start h-full pt-12 md:pt-0 px-4 sm:px-6 lg:px-10 xl:px-16 text-center md:text-left">
        <div className="max-w-[1700px] w-full mx-auto">
          <div className="max-w-[1100px] mx-auto md:mx-0">

            <h2 className={`text-white font-semibold font-jost text-orange-500 leading-[1.05] sm:leading-[1.03] md:leading-[0.95] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-1 transition-all duration-700 delay-100 ${
              isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`} style={{ textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5), 1px 1px 2px rgba(0, 0, 0, 0.3)' }}>
              Build your Hospitality Career <br />
from Classroom to Industry
            </h2>

            <p className={`mt-4 sm:mt-5 md:mt-6 font-jost leading-relaxed sm:leading-tight text-white text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl max-w-[38ch] sm:max-w-[42ch] md:max-w-[800px] lg:max-w-[900px] mx-auto md:mx-0 transition-all duration-700 delay-200 ${
              isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`} style={{ textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5), 1px 1px 2px rgba(0, 0, 0, 0.3)' }}>
              ASHA trains you in real hotels and restaurants from day one. You'll work alongside industry professionals, not sit in a classroom.
            </p>

            {/* Two Rounded Buttons - Enhanced */}
            <div className={`mt-6 sm:mt-8 md:mt-10 lg:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start transition-all duration-700 delay-300 ${
              isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <button
                onClick={handleBookCall}
                className="font-jost bg-gradient-to-r from-[#921A1B] to-[#b32526] hover:from-[#b32526] hover:to-[#921A1B] text-white font-medium px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg lg:text-xl transition-all duration-300 shadow-lg hover:shadow-2xl active:scale-95 rounded-xl sm:rounded-2xl w-full max-w-[200px] sm:max-w-[220px] md:max-w-[240px] mx-auto sm:mx-0 hover:-translate-y-0.5"
                style={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.4), 0px 0px 2px rgba(0, 0, 0, 0.2)' }}
              >
                Book a Call
              </button>
              <button
                onClick={handleScheduleCall}
                className="font-jost bg-gradient-to-r from-[#921A1B] to-[#b32526] hover:from-[#b32526] hover:to-[#921A1B] text-white font-medium px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg lg:text-xl transition-all duration-300 shadow-lg hover:shadow-2xl active:scale-95 rounded-xl sm:rounded-2xl w-full max-w-[200px] sm:max-w-[220px] md:max-w-[240px] mx-auto sm:mx-0 hover:-translate-y-0.5"
                style={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.4), 0px 0px 2px rgba(0, 0, 0, 0.2)' }}
              >
                Schedule a Call
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}