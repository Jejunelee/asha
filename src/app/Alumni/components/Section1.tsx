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
  // We duplicate enough times so we never reach the end during normal usage
  // With 4 images, duplicating 100 times gives us 400 images - effectively infinite
  const DUPLICATION_COUNT = 50;
  const extendedImages = Array(DUPLICATION_COUNT).fill(images).flat();
  
  // The middle point where we start - this ensures we can scroll both directions
  const START_INDEX = Math.floor(extendedImages.length / 2) - Math.floor(images.length / 2);

  // Responsive slide dimensions
  const getSlideWidth = () => {
    if (typeof window === 'undefined') return 280 + 20;
    
    if (window.innerWidth < 480) return 220 + 16;
    if (window.innerWidth < 640) return 260 + 20;
    if (window.innerWidth < 768) return 280 + 20;
    if (window.innerWidth < 1024) return 300 + 24;
    if (window.innerWidth < 1280) return 320 + 24;
    return 340 + 24;
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

  // Autoplay functionality
  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setCurrentIndex(prev => prev + 1);
    }, 1000);
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

  // Pause on hover
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

  return (
    <section className="w-full bg-[#F5F5F5] py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-8xl w-[88%] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Desktop Layout: Text left, Carousel right */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8 xl:gap-12">
          {/* LEFT TEXT */}
          <div className="lg:w-2/5 xl:w-1/3 mb-8 lg:mb-0">
            <h2 className="font-jost text-3xl sm:text-4xl md:text-5xl text-black font-bold leading-tight">
              Our
            </h2>

            <h3 className="font-jost text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#921A1B] font-semibold leading-[0.8]">
              Proud Alumni
            </h3>

            <p className="mt-3 sm:mt-4 font-jost text-base sm:text-lg md:text-xl text-black/70">
              Living their dreams (or Where they are now)
            </p>

            {/* controls */}
            <div className="mt-6 sm:mt-8 flex gap-3">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-[#921A1B] text-white flex items-center justify-center hover:bg-[#6f1314] transition-colors duration-200"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-[#921A1B] text-white flex items-center justify-center hover:bg-[#6f1314] transition-colors duration-200"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
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
            {/* Carousel Container with Gradient Overlays */}
            <div className="relative overflow-hidden rounded-xl">
              {/* Left gradient overlay */}
              <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-20 md:w-24 lg:w-28 z-20 pointer-events-none bg-gradient-to-r from-[#F5F5F5] via-[#F5F5F5]/90 to-transparent"></div>
              
              {/* Right gradient overlay */}
              <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-20 md:w-24 lg:w-28 z-20 pointer-events-none bg-gradient-to-l from-[#F5F5F5] via-[#F5F5F5]/90 to-transparent"></div>

              {/* Carousel Track */}
              <div 
                className="flex gap-3 sm:gap-4 md:gap-5 lg:gap-6 py-4"
                style={{
                  transform: getTransformValue(),
                  transition: mounted ? 'transform 500ms ease-out' : 'none',
                }}
              >
                {extendedImages.map((src, index) => {
                  const actualIndex = getActualImageIndex(index);
                  return (
                    <div
                      key={`${src}-${index}`}
                      className="relative flex-shrink-0 rounded-xl overflow-hidden bg-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300"
                      style={{
                        width: mounted ? `${slideWidth - (mounted && window.innerWidth < 480 ? 16 : mounted && window.innerWidth < 640 ? 20 : 24)}px` : '280px',
                        height: mounted ? `${slideWidth - (mounted && window.innerWidth < 480 ? 16 : mounted && window.innerWidth < 640 ? 20 : 24)}px` : '280px',
                      }}
                    >
                      <Image
                        src={src}
                        alt={`Alumni ${actualIndex + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 480px) 220px, (max-width: 640px) 260px, (max-width: 768px) 280px, (max-width: 1024px) 300px, 340px"
                        priority={index < images.length * 2 || index > extendedImages.length - images.length * 2}
                      />
                      
                      {/* Optional overlay for better visibility on light images */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    stopAutoplay();
                    // Calculate the closest index that shows the selected dot
                    const targetIndex = Math.floor(currentIndex / images.length) * images.length + idx;
                    setCurrentIndex(targetIndex);
                    startAutoplay();
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentDotIndex === idx 
                      ? 'w-6 bg-[#921A1B]' 
                      : 'w-2 bg-[#921A1B]/40 hover:bg-[#921A1B]/70'
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