"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function Section2() {
  const timeline = [
    {
      year: "2009",
      title: "The Beginning",
      text: `Annie and Badjie founded ASHA with one clear goal: bridge the gap between education and employment. Give students the skills employers actually want, in environments that replicate the actual job.`,
    },
    {
      year: "Early Years",
      title: "Building the Foundation",
      text: `We started with TESDA-accredited programs focused on hands-on training. From day one, students were in kitchens, at front desks, and behind bars, learning by doing instead of sitting in lecture halls.`,
    },
    {
      year: "Expansion",
      title: "Adding Academic Depth",
      text: `As demand grew, we expanded to CHED-recognized degree programs, combining practical skill-building with formal credentials that open doors globally.`,
    },
    {
      year: "Today",
      title: "Leading the Industry",
      text: `ASHA is now one of the Philippines' premier hospitality schools, known for producing graduates who are ready to work from day one. Companies don't need to spend months training them because they already know the job.\n\nOur commitment to sustainable, green hospitality means our students are prepared to lead an industry that's evolving fast.`,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile && lineRef.current) {
      const updateLineHeight = () => {
        const nodes = document.querySelectorAll('.timeline-node');
        if (nodes.length >= 2 && lineRef.current) {
          const firstNode = nodes[0] as HTMLElement;
          const lastNode = nodes[nodes.length - 1] as HTMLElement;
          const container = lineRef.current.parentElement;
          
          if (container) {
            const firstRect = firstNode.getBoundingClientRect();
            const lastRect = lastNode.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            
            const startY = firstRect.top + firstRect.height / 2 - containerRect.top;
            const endY = lastRect.top + lastRect.height / 2 - containerRect.top;
            
            lineRef.current.style.top = `${startY}px`;
            lineRef.current.style.height = `${endY - startY}px`;
            lineRef.current.style.opacity = '1';
          }
        }
      };
      
      updateLineHeight();
      window.addEventListener('resize', updateLineHeight);
      window.addEventListener('scroll', updateLineHeight);
      
      return () => {
        window.removeEventListener('resize', updateLineHeight);
        window.removeEventListener('scroll', updateLineHeight);
      };
    }
  }, [isMobile]);

  return (
    <section className="relative w-full py-8 sm:py-11 md:py-14 lg:py-17 overflow-hidden">
      {/* Reduced padding: was py-12 sm:py-16 md:py-20 lg:py-24, now reduced by 30% */}
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/Landing/About/2.png"
          alt="ASHA graduates"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#5A0F0F]/95 via-[#5A0F0F]/90 to-[#5A0F0F]/95" />

      {/* Content */}
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        
        {/* Header */}
        <div className="text-center md:text-left mb-7 md:mb-11 lg:mb-14">
          {/* Reduced margin: was mb-10 md:mb-16 lg:mb-20, now reduced by 30% */}
          <h2 className="font-jost text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-white">
            ASHA Through the Years
          </h2>
        </div>

        {/* Mobile Dropdown View */}
        {isMobile ? (
          <div className="space-y-4">
            {timeline.map((item, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:border-white/30 transition-all duration-300"
              >
                <button
                  onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                  // Reduced padding: was py-5, now reduced by 30% to py-4
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#921A1B] to-[#C73C3C] flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-medium text-white/70 block mb-1">
                        {item.year}
                      </span>
                      <h3 className="font-jost text-lg font-semibold text-white">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <ChevronDown 
                    className={`w-5 h-5 text-white transition-transform duration-300 flex-shrink-0 ${
                      activeIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    activeIndex === index ? 'max-h-[500px] pb-4' : 'max-h-0'
                  }`}
                  // Reduced padding: was pb-6, now reduced by 30% to pb-4
                >
                  <p className="text-white/80 leading-relaxed text-base sm:text-lg">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Desktop Timeline View with Vertical Line */
          <div className="relative">
            {/* Vertical Line */}
            <div 
              ref={lineRef}
              className="absolute left-[18px] w-[10px] bg-gradient-to-b from-[#921A1B] via-white/50 to-[#921A1B] rounded-full shadow-lg transition-all duration-300"
              style={{ opacity: 0 }}
            />
            
            <div className="space-y-11 lg:space-y-14">
              {/* Reduced spacing: was space-y-16 lg:space-y-20, now reduced by 30% */}
              {timeline.map((item, i) => (
                <div key={i} className="group relative pl-14 lg:pl-16">
                  
                  {/* Timeline Node */}
                  <div className="timeline-node absolute left-0 top-0">
                    <div className="relative">
                      {/* Glow effect */}
                      <div className="absolute inset-0 rounded-full bg-[#921A1B]/30 blur-md group-hover:blur-xl transition-all duration-300"></div>
                      {/* Outer ring */}
                      <div className="absolute inset-[-4px] rounded-full bg-white/20 group-hover:scale-150 transition-transform duration-300"></div>
                      {/* Main dot */}
                      <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-white to-gray-100 flex items-center justify-center shadow-2xl group-hover:shadow-[0_0_30px_rgba(146,26,27,0.5)] transition-all duration-300">
                        <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#921A1B] to-[#C73C3C] group-hover:scale-125 transition-transform duration-300"></div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="group-hover:translate-x-3 transition-all duration-300">
                    {/* Year Badge */}
                    <div className="inline-block mb-3">
                      {/* Reduced margin: was mb-4, now reduced by 30% to mb-3 */}
                      <span className="text-sm font-semibold text-white/80 tracking-wide uppercase bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20">
                        {item.year}
                      </span>
                    </div>

                    <h3 className="font-jost text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4">
                      {/* Reduced margin: was mb-5, now reduced by 30% to mb-4 */}
                      {item.title}
                    </h3>

                    {/* Description text */}
                    <p className="text-white/90 leading-relaxed text-lg md:text-xl lg:text-2xl max-w-7xl">
                      {item.text}
                    </p>
                    
                    {/* Decorative line */}
                    <div className="w-16 h-0.5 bg-gradient-to-r from-[#921A1B] to-transparent mt-4 group-hover:w-300 transition-all duration-500">
                      {/* Reduced margin: was mt-6, now reduced by 30% to mt-4 */}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}