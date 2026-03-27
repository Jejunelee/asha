"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const events = [
  {
    title: "6-Day Barista Class",
    date: "January 18, 2026",
    description:
      "Students learn essential barista skills through hands-on training with Bea Trinidad",
    image: "/placeholder.png", // replace with actual image
  },
  {
    title: "6-Day Barista Class",
    date: "January 18, 2026",
    description:
      "Students learn essential barista skills through hands-on training with Bea Trinidad",
    image: "/placeholder.png",
  },
  {
    title: "6-Day Barista Class",
    date: "January 18, 2026",
    description:
      "Students learn essential barista skills through hands-on training with Bea Trinidad",
    image: "/placeholder.png",
  },
];

export default function Latest() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
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

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-gradient-to-b from-neutral-200/70 to-neutral-300/50 py-20 px-6 overflow-hidden"
    >
      <div className="max-w-8xl mx-auto text-center">
        
        {/* Header - Exact BYD sizing pattern */}
        <div className={`space-y-2 transition-all duration-700 delay-100 ${
          isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="font-jost text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-black">
            Check out the Latest
          </h2>

          <p className="font-jost mt-0.5 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-600 max-w-7xl mx-auto leading-tight">
            Stay updated on upcoming activities, workshops, and campus events.
          </p>
        </div>

        {/* Cards - Preserving original layout exactly */}
        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {events.map((event, index) => (
            <div
              key={index}
              className={`rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col min-h-[480px] ${
                isInView 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-12 opacity-0'
              }`}
              style={{ transitionDelay: `${150 + index * 100}ms` }}
            >
              {/* Image Container - Enhanced */}
              <div className="relative w-full h-96 bg-gradient-to-br from-neutral-300 to-neutral-400 rounded-xl overflow-hidden group">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Subtle overlay on image only */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>

              {/* Content - Exactly original structure */}
              <div className="flex flex-col flex-grow mt-6">
                <h3 className="font-jost text-black font-semibold text-xl md:text-2xl transition-colors duration-300 group-hover:text-[#921A1B]">
                  {event.title}
                </h3>

                <p className="font-jost text-base md:text-lg italic text-gray-600 mt-1">
                  {event.date}
                </p>

                <p className="font-jost text-gray-700 text-base md:text-lg mt-3 leading-relaxed flex-grow">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Button - Enhanced */}
        <button className={`group font-jost text-xl mt-12 px-12 py-3 bg-gradient-to-r from-[#921A1B] to-[#b32526] text-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95 ${
          isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
        style={{ transitionDelay: '500ms' }}>
          <span className="inline-flex items-center gap-2">
            View All
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </button>

      </div>
    </section>
  );
}