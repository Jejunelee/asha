// app/our-programs/fnb/page.tsx

"use client";

import Image from "next/image";

export default function FnBPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="w-full bg-white">
        {/* Hero Image */}
        <div className="relative w-full h-[clamp(260px,70vh,730px)] overflow-hidden group">
          <Image
            src="/Landing/About/3.png"
            alt="Food and Beverage Service - Hospitality training"
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="100vw"
          />
          
          {/* Subtle gradient overlay on image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* Diagonal pattern overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 25px, rgba(255,255,255,0.05) 35px, rgba(255,255,255,0.1) 70px)`,
            }} />
          </div>
        </div>
      </section>

      {/* FnB Program Section - Full Width */}
      <section className="w-full bg-[#f3f3f3] py-12 sm:py-12 md:py-14 lg:py-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          
          {/* Content - Full width */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 flex-wrap">
              <h2 className="font-jost text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight text-black">
                Food & Beverage Service
              </h2>

              <span className="bg-[#921A1B] text-white text-xl px-4 py-3 rounded-full font-medium">
                6 Days
              </span>
            </div>

            <div className="font-jost leading-tight text-black space-y-4 text-sm sm:text-base md:text-2xl">
                          <p className="font-semibold">
                Taking Care People.
              </p>
              <p className="font-semibold text-[#921A1B]">
                Great service goes beyond bringing food to a table.
              </p>

              <p>
                It's noticing the couple celebrating an anniversary and timing their courses perfectly. It's remembering the regular who always orders the same wine. It's handling complaints with grace and turning unhappy diners into loyal customers.
              </p>

              <p>
                This course teaches you table service, customer interaction, menu knowledge, and restaurant operations. You'll learn how to read a room, anticipate needs, and deliver the kind of experience that earns tips, compliments, and repeat customers.
              </p>

              <div className="pt-4">
                <p className="font-semibold text-[#921A1B] mb-4">
                  What you'll master:
                </p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Table setting and service techniques</li>
                  <li>Customer interaction and communication</li>
                  <li>Menu knowledge and pairing recommendations</li>
                  <li>Order management and coordination</li>
                  <li>Problem-solving and service recovery</li>
                </ul>
              </div>
            </div>

            {/* Two Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button className="font-jost bg-[#921A1B] hover:bg-[#6e1415] text-white px-32 py-3 rounded-2xl text-xl font-medium transition shadow-md hover:shadow-lg">
                Enroll Now
              </button>
              <button className="font-jost bg-[#938F8F] hover:bg-[#7a7676] text-white px-32 py-3 rounded-2xl text-xl font-medium transition shadow-md hover:shadow-lg">
                Download Curriculum
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}