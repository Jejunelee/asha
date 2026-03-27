"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Section3() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === imageRef.current) {
              entry.target.classList.add("animate-fadeInUp");
            }
            if (entry.target === visionRef.current) {
              entry.target.classList.add("animate-fadeInLeft");
            }
            if (entry.target === missionRef.current) {
              entry.target.classList.add("animate-fadeInRight");
            }
            // Unobserve after animation is added
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (imageRef.current) observer.observe(imageRef.current);
    if (visionRef.current) observer.observe(visionRef.current);
    if (missionRef.current) observer.observe(missionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-8">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Gray Card Container - 30% larger proportionately */}
        <div className="bg-[#efefef] rounded-lg p-6 md:p-8">
          
          {/* Top Image - 30% larger height */}
          <div 
            ref={imageRef}
            className="relative w-full h-[338px] md:h-[416px] mb-6 rounded-sm overflow-hidden opacity-0"
          >
            <Image
              src="/Landing/About/1.png"
              alt="ASHA graduates"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
              priority
            />
          </div>

          {/* Vision & Mission - 30% larger gap */}
          <div className="grid md:grid-cols-2 gap-16">
            
            {/* Vision */}
            <div 
              ref={visionRef}
              className="opacity-0"
            >
              <h3 className="text-3xl md:text-4xl font-jost font-semibold text-gray-900 transition-colors duration-300 hover:text-[#921A1B]">
                Vision
              </h3>

              <div className="w-16 h-[3px] bg-[#921A1B] mt-3 mb-4 transform origin-left transition-transform duration-500 hover:scale-x-150" />

              <p className="text-gray-800 text-xl md:text-2xl font-jost leading-relaxed max-w-md transition-transform duration-300 hover:translate-x-2">
                To be the home of future global hospitality leaders.
              </p>
            </div>

            {/* Mission */}
            <div 
              ref={missionRef}
              className="opacity-0"
            >
              <h3 className="text-3xl md:text-4xl font-jost font-semibold text-gray-900 transition-colors duration-300 hover:text-[#921A1B]">
                Mission
              </h3>

              <div className="w-16 h-[3px] bg-[#921A1B] mt-3 mb-4 transform origin-left transition-transform duration-500 hover:scale-x-150" />

              <p className="text-gray-800 text-xl md:text-2xl font-jost leading-relaxed max-w-lg transition-transform duration-300 hover:translate-x-2">
                To imbibe Filipino hospitality culture, apply experiential learning
                and provide career opportunities for all ASHA graduates
              </p>
            </div>

          </div>
          
        </div>

      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-fadeInRight {
          animation: fadeInRight 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </section>
  );
}