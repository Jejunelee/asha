"use client";

import { useEffect, useRef, useState } from "react";

export default function Section4() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.8,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  // More intuitive icons for each benefit
  const benefits = [
    {
      title: "Industry Ready",
      description: "Skills employers want",
      icon: (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 transition-transform duration-300 group-hover:rotate-12"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          style={{ color: 'rgb(146, 26, 27)' }}
        >
          {/* Briefcase + Checkmark - symbolizes job-ready skills */}
          <path d="M20 7h-4.18A3 3 0 0013 4h-2a3 3 0 00-2.82 3H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" strokeLinecap="round" />
          <path d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeLinecap="round" />
          <path d="M17 9l-5 5-3-3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="9" r="1" fill="currentColor" />
        </svg>
      )
    },
    {
      title: "Flexible",
      description: "Study at your pace",
      icon: (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 transition-transform duration-300 group-hover:rotate-12"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          style={{ color: 'rgb(146, 26, 27)' }}
        >
          {/* Clock + Calendar + Play - represents flexible scheduling */}
          <path d="M12 8v4l2.5 2.5" strokeLinecap="round" />
          <circle cx="12" cy="12" r="9" strokeLinecap="round" />
          <path d="M5 3L3 5" strokeLinecap="round" />
          <path d="M19 3l2 2" strokeLinecap="round" />
          <path d="M12 2v2" strokeLinecap="round" />
        </svg>
      )
    },
    {
      title: "Hands on",
      description: "Apprenticeships that lead to jobs",
      icon: (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 transition-transform duration-300 group-hover:rotate-12"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          style={{ color: 'rgb(146, 26, 27)' }}
        >
          {/* Tools + Gears - represents hands-on practical work */}
          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" strokeLinecap="round" />
          <path d="M3 21l2-2" strokeLinecap="round" />
        </svg>
      )
    },
    {
      title: "Connected",
      description: "Local and global career networks",
      icon: (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 transition-transform duration-300 group-hover:rotate-12"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          style={{ color: 'rgb(146, 26, 27)' }}
        >
          {/* Network nodes + Connections - represents professional networking */}
          <circle cx="12" cy="12" r="2.5" strokeLinecap="round" />
          <circle cx="5" cy="5" r="2.5" strokeLinecap="round" />
          <circle cx="19" cy="5" r="2.5" strokeLinecap="round" />
          <circle cx="5" cy="19" r="2.5" strokeLinecap="round" />
          <circle cx="19" cy="19" r="2.5" strokeLinecap="round" />
          <path d="M7.5 7.5L9.5 9.5" strokeLinecap="round" />
          <path d="M14.5 9.5L16.5 7.5" strokeLinecap="round" />
          <path d="M9.5 14.5L7.5 16.5" strokeLinecap="round" />
          <path d="M16.5 16.5L14.5 14.5" strokeLinecap="round" />
          <path d="M12 14.5V19.5" strokeLinecap="round" />
          <path d="M12 4.5V9.5" strokeLinecap="round" />
          <path d="M4.5 12H9.5" strokeLinecap="round" />
          <path d="M14.5 12H19.5" strokeLinecap="round" />
        </svg>
      )
    }
  ];

  return (
    <section className="relative w-full bg-gradient-to-br from-[#921A1B] via-[#7a1617] to-[#5a1011] text-white py-6 sm:py-8 md:py-8 lg:py-10 px-4 sm:px-6 overflow-hidden">
      {/* Background Pattern - Enhanced */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10" />
      
      {/* Decorative Elements - Enhanced with animations */}
      <div className="absolute top-0 right-0 w-56 h-56 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse" 
           style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse" 
           style={{ animationDuration: '10s', animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-[#921A1B]/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      
      <div className="relative max-w-7xl mx-auto text-center">
        
        {/* Heading with Scroll-Triggered Animation - Updated */}
        <div 
          ref={headerRef}
          className={`space-y-1 transition-all duration-700 ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="font-jost text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-white/95 to-white/90 bg-clip-text text-transparent drop-shadow-2xl">
            The ASHA Advantage
          </h1>
          
          <p className="font-jost mt-1 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/95 max-w-7xl mx-auto leading-tight font-medium">
            We're Not Just a School. We're a Pipeline to Real Jobs
          </p>
        </div>

        {/* 4 Column Features - Updated with new icons and text */}
        <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group relative p-3 sm:p-4 md:p-5 transition-all duration-500 hover:transform hover:-translate-y-1 cursor-pointer"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-2xl transition-all duration-500 blur-xl" />
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-2xl transition-all duration-300" />
              
              <div className="relative flex flex-col items-center">
                {/* Outer circle with gradient border */}
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-4 sm:border-[5px] border-white/40 group-hover:border-white/70 transition-all duration-300 flex items-center justify-center shadow-xl">
                    <div className="w-13 h-13 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                      {benefit.icon}
                    </div>
                  </div>
                </div>

                <h3 className="font-jost text-base sm:text-lg md:text-xl font-bold tracking-wide mt-3 sm:mt-4 md:mt-5 mb-0.5 sm:mb-1 bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
                  {benefit.title}
                </h3>

                <p className="font-jost text-xs sm:text-xs md:text-sm text-white/80 leading-relaxed max-w-xs group-hover:text-white/90 transition-colors duration-300">
                  {benefit.description}
                </p>
                
                {/* Decorative underline */}
                <div className="w-6 h-0.5 bg-white/30 group-hover:w-10 group-hover:bg-white/60 transition-all duration-500 mt-1.5 sm:mt-2 rounded-full" />
              </div>
            </div>
          ))}

        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }
        
        .animate-pulse {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}