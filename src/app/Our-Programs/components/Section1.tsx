"use client";

import Image from "next/image";
import Link from "next/link";

export default function Section1() {
  return (
    <section className="w-full bg-[#f3f3f3] py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-8xl w-[88%] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col md:flex-row gap-12 items-center">
        
        {/* LEFT CONTENT - takes up 30% more space */}
        <div className="space-y-6 md:flex-1" style={{ flex: "1.05" }}>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h2 className="font-jost text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight text-black">
              Flagship Program
            </h2>

            <span className="bg-[#921A1B] text-white text-xl px-4 py-3 rounded-full font-medium mr-50">
              1 year Program
            </span>
          </div>

          <h3 className="font-jost text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#921A1B] font-medium flex flex-wrap items-center gap-3">
            Certificate in Hotel and Restaurant Operations (CHRO)
          </h3>

          <div className="font-jost leading-relaxed text-black space-y-3 sm:space-y-4 text-sm sm:text-base md:text-lg lg:text-xl">
            <p>
              One year. Five skills. Real job offers when you graduate.
              Most hospitality schools teach you what a hotel room should look like.
              We teach you how to prepare 20 of them before checkout time.
            </p>

            <p>
              You won't just learn these skills—you'll practice them in real hotels
              and restaurants with real guests who expect real excellence. Your
              internship is integrated throughout your training, not just tacked on
              at the end, so by the time you graduate, you've already worked the job
              you're applying for.
            </p>
          </div>

          <Link href="/Our-Programs/Flagship">
            <button className="mt-10 font-jost bg-[#938F8F] hover:bg-gray-500 text-white px-7 py-2.5 rounded-2xl text-3xl font-base transition cursor-pointer">
              Learn More
            </button>
          </Link>
        </div>

        {/* RIGHT IMAGE - takes up the remaining space (0.7 ratio) */}
        <div className="w-full md:flex-1" style={{ flex: "0.7" }}>
          <div className="relative w-full h-[720px] rounded-sm overflow-hidden">
            <Image
              src="/Programs/2.png"
              alt="Hospitality student preparing drink"
              fill
              className="object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}