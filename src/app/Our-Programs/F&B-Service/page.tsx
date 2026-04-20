// app/our-programs/food-beverage-service/page.tsx

"use client";

import Image from "next/image";
import Link from "next/link";

export default function FoodBeverageServicePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="w-full bg-white">
        {/* Hero Image */}
        <div className="relative w-full h-[clamp(260px,70vh,730px)] overflow-hidden group">
          <Image
            src="/Programs/Specific/7.png"
            alt="Food & Beverage Service - Hospitality education and training"
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

      {/* Course Section - Full Width */}
      <section className="w-full bg-[#f3f3f3] py-12 sm:py-12 md:py-14 lg:py-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          
          {/* Content - Full width */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 flex-wrap">
              <h2 className="font-jost text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight text-black">
                Food & Beverage Service
              </h2>

              <span className="bg-[#921A1B] text-white text-xl px-4 py-3 rounded-full font-medium">
                5 Days
              </span>
            </div>

            <h3 className="font-jost text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#921A1B] font-medium flex flex-wrap items-center gap-3">
              Taking Care of People
            </h3>

            <div className="font-jost leading-tight text-black space-y-4 text-sm sm:text-base md:text-2xl">
              <p>
                Great service goes beyond bringing food to a table.
              </p>

              <p>
                It's noticing the couple celebrating an anniversary and timing their courses perfectly. It's remembering the regular who always orders the same wine. It's handling complaints with grace and turning unhappy diners into loyal customers.
              </p>

              <p>
                This course teaches you table service, customer interaction, menu knowledge, and restaurant operations. You'll learn how to read a room, anticipate needs, and deliver the kind of experience that earns tips, compliments, and repeat customers.
              </p>

              <p className="font-semibold">
                What you'll master:
              </p>

              <p>
                • Table setting and service techniques
                <br />
                • Customer interaction and communication
                <br />
                • Menu knowledge and pairing recommendations
                <br />
                • Order management and coordination
                <br />
                • Problem-solving and service recovery
              </p>
            </div>

            {/* Two Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/Admission">
                <button className="font-jost bg-[#921A1B] hover:bg-[#6e1415] text-white px-32 py-3 rounded-2xl text-xl font-medium transition shadow-md hover:shadow-lg">
                  Enroll Now
                </button>
              </Link>
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