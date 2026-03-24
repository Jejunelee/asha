"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronRight, Utensils, Sparkles } from "lucide-react";


export default function Section2() {
  const [openClassic, setOpenClassic] = useState(false);
  const [openSignature, setOpenSignature] = useState(false);
  const [openPremium, setOpenPremium] = useState(false);

  const items = [
    { title: "BARISTA", image: "/Landing/ShortCourses/11.png", action: () => setOpenClassic(true), description: "Practical barista skills for café-ready careers.", icon: <Utensils size={20} /> },
    { title: "FRONT OFFICE", image: "/Landing/ShortCourses/22.png", action: () => setOpenSignature(true), description: "Master guest service and front desk operations.", icon: <Sparkles size={20} /> },
    { title: "COOKERY", image: "/Landing/ShortCourses/33.png", action: () => setOpenPremium(true), description: "Learn practical skills for the professional kitchen.", icon: <Sparkles size={20} /> },
  ];

  return (
    <>
      <section className="w-full py-10 md:py-12 bg-[#f6f6f6]">
        <div className="text-center mb-8 md:mb-12 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-[35px] font-jost font-semibold text-black">Also Offering: <span className="text-[#921A1B]">Short Courses </span>(6 Days - 1 month)</h2>
          <p className="md:hidden text-gray-500 text-sm mt-2">Choose from our carefully curated selection</p>
        </div>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 sm:px-6 md:px-8">
          {items.map((item, i) => (
            <div key={i} onClick={item.action} className="relative w-full aspect-[4/3] md:aspect-square overflow-hidden rounded-xl md:rounded-lg shadow-lg md:shadow-xl cursor-pointer group">
              <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30" />
              
              {/* Default state - always visible */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6 text-white text-center">
                <h3 className="font-jost text-[32px] lg:text-[42px] font-normal leading-tight mb-3">{item.title}</h3>
                <p className="mt-2 text-xl text-white/90 max-w-[90%]">{item.description}</p>
              </div>
              
              {/* Hover overlay with Learn More button */}
              <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-center">
                <button className="flex items-center gap-2 bg-[#921A1B] text-white px-12 py-4 rounded-xl text-sm font-medium hover:bg-[#bf1d1e] transition-colors">
                  Learn More <ChevronRight size={16} />
                </button>
              </div>
              
              <div className="absolute top-3 right-3 md:hidden bg-[#F28C28] text-white p-2 rounded-full shadow-lg">{item.icon}</div>
            </div>
          ))}
        </div>
        <div className="md:hidden text-center mt-8"><button onClick={() => setOpenClassic(true)} className="inline-flex items-center gap-2 text-[#F28C28] font-medium">View all offerings <ChevronRight size={18} /></button></div>
      </section>

    </>
  );
}