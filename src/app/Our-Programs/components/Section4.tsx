"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Section4() {
  const router = useRouter();

  const items = [
    { title: "Barista", image: "/Programs/7.png", path: "/Our-Programs/Barista", description: "Practical barista skills for café-ready careers." },
    { title: "Front Office", image: "/Programs/4.png", path: "/Our-Programs/Front-Office", description: "Master guest service and front desk operations." },
    { title: "Cookery", image: "/Programs/5.png", path: "/Our-Programs/Cookery", description: "Learn practical skills for the professional kitchen." },
    { title: "F&B Service", image: "/Programs/6.png", path: "/Our-Programs/F&B-Service", description: "Learn proper service standards, and guest care." },
    { title: "Housekeeping", image: "/Programs/8.png", path: "/Our-Programs/Professional-Housekeeping", description: "Detail-driven housekeeping excellence." },
    { title: "Executive Butler", image: "/Programs/3.png", path: "/Our-Programs/Executive-Butler", description: "Refined service standards for elite hospitality." },
    { title: "Bartending", image: "/Programs/9.png", path: "/Our-Programs/Bartending", description: "Master bar skills, speed, and service." },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <section className="w-full py-10 md:py-12">
        <div className="text-center mb-8 md:mb-12 px-4">
        </div>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8 px-4 sm:px-6 md:px-8">
          {items.map((item, i) => (
            <div 
              key={i} 
              onClick={() => handleNavigation(item.path)} 
              className="relative w-full aspect-[4/3] md:aspect-square overflow-hidden rounded-xl md:rounded-lg shadow-lg md:shadow-xl cursor-pointer group"
            >
              <Image 
                src={item.image} 
                alt={item.title} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30" />
              
              {/* Default state - always visible */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6 text-white text-center">
                <h3 className="font-jost text-[24px] lg:text-[32px] xl:text-[36px] font-normal leading-tight mb-3">{item.title}</h3>
                <p className="font-jost mt-2 text-sm md:text-base text-white/90 max-w-[90%]">{item.description}</p>
              </div>
              
              {/* Hover overlay with Learn More button */}
              <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-center">
                <button className="font-jost bg-[#921A1B] text-white px-8 py-3 md:px-12 md:py-4 rounded-xl text-sm font-medium hover:bg-[#bf1d1e] transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="md:hidden text-center mt-8">
          <button className="font-jost inline-flex items-center gap-2 text-[#F28C28] font-medium">
            View all offerings
          </button>
        </div>
      </section>
    </>
  );
}