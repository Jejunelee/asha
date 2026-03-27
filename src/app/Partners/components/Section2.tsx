"use client";

import { useEffect, useRef } from "react";

export default function Section3() {
  const sectionRef = useRef<HTMLElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === card1Ref.current) {
              entry.target.classList.add("animate-fadeInLeft");
            }
            if (entry.target === card2Ref.current) {
              entry.target.classList.add("animate-fadeInLeft");
            }
            if (entry.target === card3Ref.current) {
              entry.target.classList.add("animate-fadeInLeft");
            }
            // Unobserve after animation is added
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (card1Ref.current) observer.observe(card1Ref.current);
    if (card2Ref.current) observer.observe(card2Ref.current);
    if (card3Ref.current) observer.observe(card3Ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-8">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Vertical Cards Container */}
        <div className="flex flex-col gap-6">
          
          {/* Card 1 - International Chains */}
          <div 
            ref={card1Ref}
            className="bg-[#efefef] rounded-lg p-6 md:p-8 opacity-0"
          >
            <h3 className="text-3xl md:text-4xl font-jost font-semibold text-gray-900 transition-colors duration-300 hover:text-[#921A1B]">
              International Chains
            </h3>

            <div className="w-16 h-[3px] bg-[#921A1B] mt-3 mb-4 transform origin-left transition-transform duration-500 hover:scale-x-150" />

            <p className="text-gray-800 text-xl md:text-2xl font-jost leading-relaxed transition-transform duration-300 hover:translate-x-2">
              To imbibe Filipino hospitality culture, apply experiential learning
              and provide career opportunities for all ASHA graduates
            </p>
          </div>

          {/* Card 2 - Local Luxury */}
          <div 
            ref={card2Ref}
            className="bg-[#efefef] rounded-lg p-6 md:p-8 opacity-0"
          >
            <h3 className="text-3xl md:text-4xl font-jost font-semibold text-gray-900 transition-colors duration-300 hover:text-[#921A1B]">
              Local Luxury
            </h3>

            <div className="w-16 h-[3px] bg-[#921A1B] mt-3 mb-4 transform origin-left transition-transform duration-500 hover:scale-x-150" />

            <p className="text-gray-800 text-xl md:text-2xl font-jost leading-relaxed transition-transform duration-300 hover:translate-x-2">
              To imbibe Filipino hospitality culture, apply experiential learning
              and provide career opportunities for all ASHA graduates
            </p>
          </div>

          {/* Card 3 - Boutique Partners */}
          <div 
            ref={card3Ref}
            className="bg-[#efefef] rounded-lg p-6 md:p-8 opacity-0"
          >
            <h3 className="text-3xl md:text-4xl font-jost font-semibold text-gray-900 transition-colors duration-300 hover:text-[#921A1B]">
              Boutique Partners
            </h3>

            <div className="w-16 h-[3px] bg-[#921A1B] mt-3 mb-4 transform origin-left transition-transform duration-500 hover:scale-x-150" />

            <p className="text-gray-800 text-xl md:text-2xl font-jost leading-relaxed transition-transform duration-300 hover:translate-x-2">
              To imbibe Filipino hospitality culture, apply experiential learning
              and provide career opportunities for all ASHA graduates
            </p>
          </div>

        </div>

      </div>

      <style jsx>{`
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

        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </section>
  );
}