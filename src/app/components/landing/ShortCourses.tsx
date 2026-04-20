"use client";

import Image from "next/image";
import { useState } from "react";

export default function Section2() {
  const [openClassic, setOpenClassic] = useState(false);
  const [openSignature, setOpenSignature] = useState(false);
  const [openPremium, setOpenPremium] = useState(false);

  const items = [
    { title: "BARISTA", image: "/Landing/ShortCourses/11.png", action: () => setOpenClassic(true), description: "Practical barista skills" },
    { title: "FRONT OFFICE", image: "/Landing/ShortCourses/22.png", action: () => setOpenSignature(true), description: "Master guest service" },
    { title: "COOKERY", image: "/Landing/ShortCourses/33.png", action: () => setOpenPremium(true), description: "Professional kitchen skills" },
  ];

  return (
    <>
      <section className="w-full py-6 md:py-10 lg:py-12 bg-[#f6f6f6]">
        <div className="text-center mb-6 md:mb-8 lg:mb-12 px-3 sm:px-4">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[35px] font-jost font-semibold text-black">
            Also Offering: <span className="text-[#921A1B]">Short Courses</span>
            <span className="block text-xs sm:text-sm md:text-base text-gray-600 mt-1 md:inline md:mt-0 md:ml-2">(5 Days - 1 month)</span>
          </h2>
        </div>
        
        {/* Grid that shows 3 columns on all devices */}
        <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8">
            {items.map((item, i) => (
              <div 
                key={i} 
                onClick={item.action} 
                className="relative w-full aspect-[4/3] md:aspect-square overflow-hidden rounded-lg md:rounded-xl shadow-md md:shadow-lg lg:shadow-xl cursor-pointer group"
              >
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  sizes="(max-width: 640px) 33vw, (max-width: 768px) 33vw, (max-width: 1024px) 33vw, 33vw" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30" />
                
                {/* Content - optimized for mobile */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2 sm:p-3 md:p-4 lg:p-6 text-white text-center">
                  <h3 className="font-jost text-sm sm:text-base md:text-xl lg:text-[32px] xl:text-[42px] font-bold md:font-normal leading-tight mb-1 sm:mb-2 md:mb-3">
                    {item.title}
                  </h3>
                  <p className="font-jost text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-xl text-white/90 max-w-[90%] hidden sm:block">
                    {item.description}
                  </p>
                  {/* Short version for very small screens */}
                  <p className="font-jost text-[9px] text-white/90 max-w-[90%] sm:hidden">
                    {item.description === "Practical barista skills" && "Barista skills"}
                    {item.description === "Master guest service" && "Guest service"}
                    {item.description === "Professional kitchen skills" && "Kitchen skills"}
                  </p>
                </div>
                
                {/* Hover overlay with Learn More button - optimized for touch */}
                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 p-2 sm:p-3 md:p-4 text-center">
                  <button className="font-jost bg-[#921A1B] text-white px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-1.5 sm:py-2 md:py-3 lg:py-4 rounded-lg md:rounded-xl text-[10px] sm:text-xs md:text-sm font-medium hover:bg-[#bf1d1e] transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="md:hidden text-center mt-6">
        </div>
      </section>
    </>
  );
}