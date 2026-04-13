"use client";

import Image from "next/image";
import Link from "next/link";

export default function Section1() {
  return (
    <section className="w-full bg-[#f3f3f3] py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
      <div className="max-w-8xl w-[92%] sm:w-[90%] md:w-[88%] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
        
        {/* LEFT CONTENT - takes up more space on desktop, full width on mobile */}
        <div className="space-y-4 sm:space-y-5 md:space-y-6 w-full md:flex-1" style={{ flex: "1.05" }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 flex-wrap">
            <h2 className="font-jost text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight text-black">
              Flagship Program
            </h2>

            <span className="bg-[#921A1B] text-white text-base sm:text-lg md:text-xl px-3 sm:px-4 py-1.5 sm:py-2 md:py-3 rounded-full font-medium inline-block">
              1 year Program
            </span>
          </div>

          <h3 className="font-jost text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-[#921A1B] font-medium flex flex-wrap items-center gap-2 sm:gap-3">
            Certificate in Hotel and Restaurant Operations (CHRO)
          </h3>

          <div className="font-jost leading-relaxed text-black space-y-2 sm:space-y-3 md:space-y-4 text-sm sm:text-base md:text-lg lg:text-xl">
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
            <button className="mt-6 sm:mt-8 md:mt-10 font-jost bg-[#938F8F] hover:bg-gray-500 text-white px-5 sm:px-6 md:px-7 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-base transition cursor-pointer">
              Learn More
            </button>
          </Link>
        </div>

        {/* RIGHT IMAGE - responsive sizing */}
        <div className="w-full md:flex-1 mt-4 sm:mt-6 md:mt-0" style={{ flex: "0.7" }}>
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[720px] rounded-sm overflow-hidden">
            <Image
              src="/Programs/2.png"
              alt="Hospitality student preparing drink"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

      </div>
    </section>
  );
}