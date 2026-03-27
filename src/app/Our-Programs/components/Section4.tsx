"use client";

import Image from "next/image";
import { useState } from "react";

export default function Section4() {
  const [openClassic, setOpenClassic] = useState(false);
  const [openSignature, setOpenSignature] = useState(false);
  const [openPremium, setOpenPremium] = useState(false);
  const [openBarista, setOpenBarista] = useState(false);
  const [openFrontOffice, setOpenFrontOffice] = useState(false);
  const [openCookery, setOpenCookery] = useState(false);
  const [openFbService, setOpenFbService] = useState(false);
  const [openHousekeeping, setOpenHousekeeping] = useState(false);
  const [openExecutiveButler, setOpenExecutiveButler] = useState(false);
  const [openBartending, setOpenBartending] = useState(false);

  const items = [
    { title: "BARISTA", image: "/Programs/7.png", action: () => setOpenBarista(true), description: "Practical barista skills for café-ready careers." },
    { title: "FRONT OFFICE", image: "/Programs/4.png", action: () => setOpenFrontOffice(true), description: "Master guest service and front desk operations." },
    { title: "COOKERY", image: "/Programs/5.png", action: () => setOpenCookery(true), description: "Learn practical skills for the professional kitchen." },
    { title: "F&B SERVICE", image: "/Programs/6.png", action: () => setOpenFbService(true), description: "Learn proper service standards, and guest care." },
    { title: "HOUSEKEEPING", image: "/Programs/8.png", action: () => setOpenHousekeeping(true), description: "Detail-driven housekeeping excellence." },
    { title: "EXECUTIVE BUTLER", image: "/Programs/3.png", action: () => setOpenExecutiveButler(true), description: "Refined service standards for elite hospitality." },
    { title: "BARTENDING", image: "/Programs/9.png", action: () => setOpenBartending(true), description: "Master bar skills, speed, and service." },
  ];

  return (
    <>
      <section className="w-full py-10 md:py-12">
        <div className="text-center mb-8 md:mb-12 px-4">
        </div>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8 px-4 sm:px-6 md:px-8">
          {items.map((item, i) => (
            <div key={i} onClick={item.action} className="relative w-full aspect-[4/3] md:aspect-square overflow-hidden rounded-xl md:rounded-lg shadow-lg md:shadow-xl cursor-pointer group">
              <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
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
          <button onClick={() => setOpenClassic(true)} className="font-jost inline-flex items-center gap-2 text-[#F28C28] font-medium">
            View all offerings
          </button>
        </div>
      </section>

      {/* Modal components would go here for each course */}
      {/* Example modal structure - you'll need to implement these */}
      {/* {openBarista && <Modal title="BARISTA" description="..." onClose={() => setOpenBarista(false)} />} */}
      {/* Similarly for other courses */}
    </>
  );
}