"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

        {/* Fixed gradient overlay - left side only */}
        <div className="absolute inset-y-0 left-0 w-full md:w-[55%] lg:w-[50%] bg-gradient-to-r from-[#921A1B]/50 via-[#921A1B]/50 to-transparent" />
        
        {/* Image indicator dots - visible on all devices */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index 
                  ? 'w-8 bg-[#F15B19]' 
                  : 'w-1.5 bg-white/60 hover:bg-white'
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ---------- CONTENT ---------- */}
      <div className="relative z-20 flex items-start md:items-center justify-center md:justify-start h-full pt-12 md:pt-0 px-6 lg:px-10 text-center md:text-left">
        <div className="max-w-[1700px] w-full mx-auto">
          <div className="max-w-[1100px] mx-auto md:mx-0">

            <h2 className={`text-white font-semibold font-jost text-orange-500 leading-[0.95] text-3xl sm:text-3xl md:text-[5rem] mt-1 relative ${
              isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              Build your Hospitality Career <br />
from Classroom to Industry
            </h2>

            <p className={`mt-6 font-jost leading-tight text-white text-base sm:text-lg md:text-[1.7rem] max-w-[38ch] sm:max-w-[42ch] md:max-w-[1000px] mx-auto md:mx-0 transition-all duration-700 delay-300 ${
              isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
ASHA trains you in real hotels and restaurants from day one. You'll work alongside industry professionals, not sit in a classroom.
            </p>

            {/* Two Rounded Buttons */}
            <div className={`mt-8 md:mt-12 flex flex-col sm:flex-row gap-4 justify-center md:justify-start transition-all duration-700 delay-400 ${
              isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <button
                onClick={handleBookCall}
                className="font-jost bg-[#921A1B] hover:bg-[#bf1d1e] text-white font-base px-8 py-4 md:px- md:py-4 text-base md:text-[clamp(24px,1.5vw,20px)] transition shadow-lg active:scale-95 rounded-2xl w-full max-w-[240px] mx-auto sm:mx-0"
              >
                Book a Call
              </button>
              <button
                onClick={handleScheduleCall}
                className="font-jost bg-[#921A1B] hover:bg-[#bf1d1e] text-white font-base px-8 py-4 md:px-8 md:py-4 text-base md:text-[clamp(24px,1.5vw,20px)] transition shadow-lg active:scale-95 rounded-2xl w-full max-w-[240px] mx-auto sm:mx-0"
              >
                Schedule a Call
              </button>
            </div>

            {/* Mobile trust indicator */}
            <p className={`mt-4 text-xs font-jost text-gray-500 md:hidden transition-all duration-700 delay-500 ${
              isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              Free consultation • No obligation
            </p>
          </div>
        </div>
      </div>

      {/* ---------- CONTROLS ---------- */}
      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 md:left-[20%] md:translate-x-0 z-30 flex items-center justify-between w-[100px] sm:w-[110px] px-4 py-2 bg-[#DDC8B7] shadow-md md:rounded-none transition-all duration-700 delay-600 ${
        isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        <button 
          onClick={prev} 
          className="hover:text-[#F15B19] transition p-1 active:scale-90"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} className="md:size-[28px]" />
        </button>
        <button 
          onClick={next} 
          className="hover:text-[#F15B19] transition p-1 active:scale-90"
          aria-label="Next image"
        >
          <ChevronRight size={24} className="md:size-[28px]" />
        </button>
      </div>
    </section>
  );
}