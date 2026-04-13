"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

export default function Section1() {
  const images = [
    "/Programs/1.png",
    "/Programs/2.png",
    "/Programs/3.png",
    "/Programs/4.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const [slideWidth, setSlideWidth] = useState(280 + 20);
  
  // Create a massive extended array for seamless infinite scrolling
  const DUPLICATION_COUNT = 50;
  const extendedImages = Array(DUPLICATION_COUNT).fill(images).flat();
  
  // The middle point where we start
  const START_INDEX = Math.floor(extendedImages.length / 2) - Math.floor(images.length / 2);

  // Responsive slide dimensions - optimized for mobile
  const getSlideWidth = () => {
    if (typeof window === 'undefined') return 280 + 20;
    
    if (window.innerWidth < 480) return 180 + 12;  // Smaller on very small phones
    if (window.innerWidth < 640) return 200 + 14;  // Small phones
    if (window.innerWidth < 768) return 240 + 16;  // Medium phones
    if (window.innerWidth < 1024) return 280 + 20; // Tablets
    if (window.innerWidth < 1280) return 300 + 24; // Small desktops
    return 340 + 24; // Large desktops
  };

  // Update slide dimensions on resize
  useEffect(() => {
    setMounted(true);
    
    const handleResize = () => {
      setSlideWidth(getSlideWidth());
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize at the start position
  useEffect(() => {
    if (mounted) {
      setCurrentIndex(START_INDEX);
    }
  }, [mounted, START_INDEX]);

  // Autoplay functionality - increased speed for better UX
  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setCurrentIndex(prev => prev + 1);
    }, 3000); // Changed from 1000ms to 3000ms for better user experience
  }, []);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  // Start autoplay on mount
  useEffect(() => {
    if (mounted) {
      startAutoplay();
    }
    return () => stopAutoplay();
  }, [mounted, startAutoplay, stopAutoplay]);

  // Navigation handlers
  const nextSlide = useCallback(() => {
    stopAutoplay();
    setCurrentIndex(prev => prev + 1);
    startAutoplay();
  }, [stopAutoplay, startAutoplay]);

  const prevSlide = useCallback(() => {
    stopAutoplay();
    setCurrentIndex(prev => prev - 1);
    startAutoplay();
  }, [stopAutoplay, startAutoplay]);

  // Pause on hover/touch
  const handleMouseEnter = useCallback(() => {
    stopAutoplay();
  }, [stopAutoplay]);

  const handleMouseLeave = useCallback(() => {
    startAutoplay();
  }, [startAutoplay]);

  // Get the actual image index for display (0-3)
  const getActualImageIndex = (index: number) => {
    return index % images.length;
  };

  // Get the current active dot index
  const currentDotIndex = getActualImageIndex(currentIndex);

  // Calculate transform value
  const getTransformValue = () => {
    if (!mounted) return 'none';
    return `translateX(-${currentIndex * slideWidth}px)`;
  };

  // Get slide height (maintain square ratio)
  const getSlideHeight = () => {
    if (typeof window === 'undefined') return 280;
    if (window.innerWidth < 480) return 180;
    if (window.innerWidth < 640) return 200;
    if (window.innerWidth < 768) return 240;
    if (window.innerWidth < 1024) return 280;
    if (window.innerWidth < 1280) return 300;
    return 340;
  };

  return (
    <section className="w-full bg-[#F5F5F5] py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 overflow-hidden">
      <div className="max-w-8xl w-[92%] sm:w-[90%] md:w-[88%] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
        {/* Mobile: Text above carousel, Desktop: Text left, Carousel right */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-6 xl:gap-8 2xl:gap-12">
          {/* LEFT TEXT - Optimized for mobile */}
          <div className="lg:w-2/5 xl:w-1/3 mb-6 sm:mb-8 lg:mb-0 text-center lg:text-left">
            <h2 className="font-jost text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black font-bold leading-tight">
              Our
            </h2>

            <h3 className="font-jost text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-[#921A1B] font-semibold leading-[0.9] sm:leading-[0.85]">
              Proud Alumni
            </h3>

            <p className="mt-2 sm:mt-3 md:mt-4 font-jost text-sm sm:text-base md:text-lg lg:text-xl text-black/70 px-2 sm:px-0">
              Living their dreams (or Where they are now)
            </p>

            {/* Controls - Centered on mobile */}
            <div className="mt-5 sm:mt-6 md:mt-8 flex gap-3 justify-center lg:justify-start">
              <button
                onClick={prevSlide}
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#921A1B] text-white flex items-center justify-center hover:bg-[#6f1314] transition-colors duration-200"
                aria-label="Previous image"
              >
                <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={nextSlide}
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#921A1B] text-white flex items-center justify-center hover:bg-[#6f1314] transition-colors duration-200"
                aria-label="Next image"
              >
                <ChevronRight size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* RIGHT CAROUSEL */}
          <div 
            className="lg:w-3/5 xl:w-2/3 relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleMouseEnter}
            onTouchEnd={handleMouseLeave}
          >
            {/* Carousel Container with Gradient Overlays - Optimized for mobile */}
            <div className="relative overflow-hidden rounded-lg sm:rounded-xl">
              {/* Left gradient overlay - Smaller on mobile */}
              <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 z-20 pointer-events-none bg-gradient-to-r from-[#F5F5F5] via-[#F5F5F5]/90 to-transparent"></div>
              
              {/* Right gradient overlay - Smaller on mobile */}
              <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 z-20 pointer-events-none bg-gradient-to-l from-[#F5F5F5] via-[#F5F5F5]/90 to-transparent"></div>

              {/* Carousel Track */}
              <div 
                className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 py-3 sm:py-4"
                style={{
                  transform: getTransformValue(),
                  transition: mounted ? 'transform 500ms ease-out' : 'none',
                }}
              >
                {extendedImages.map((src, index) => {
                  const actualIndex = getActualImageIndex(index);
                  const slideHeight = getSlideHeight();
                  return (
                    <div
                      key={`${src}-${index}`}
                      className="relative flex-shrink-0 rounded-lg sm:rounded-xl overflow-hidden bg-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300"
                      style={{
                        width: mounted ? `${slideWidth - (mounted && window.innerWidth < 480 ? 12 : mounted && window.innerWidth < 640 ? 14 : 20)}px` : '240px',
                        height: `${slideHeight}px`,
                      }}
                    >
                      <Image
                        src={src}
                        alt={`Alumni ${actualIndex + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 480px) 180px, (max-width: 640px) 200px, (max-width: 768px) 240px, (max-width: 1024px) 280px, 340px"
                        priority={index < images.length * 2 || index > extendedImages.length - images.length * 2}
                      />
                      
                      {/* Optional overlay for better visibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dots indicator - Optimized spacing */}
            <div className="flex justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    stopAutoplay();
                    const targetIndex = Math.floor(currentIndex / images.length) * images.length + idx;
                    setCurrentIndex(targetIndex);
                    startAutoplay();
                  }}
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                    currentDotIndex === idx 
                      ? 'w-4 sm:w-5 md:w-6 bg-[#921A1B]' 
                      : 'w-1.5 sm:w-2 bg-[#921A1B]/40 hover:bg-[#921A1B]/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}