// app/our-programs/executive-butler/page.tsx

"use client";

import Image from "next/image";
import Link from "next/link";

export default function ExecutiveButlerPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="w-full bg-white">
        {/* Hero Image */}
        <div className="relative w-full h-[clamp(260px,70vh,730px)] overflow-hidden group">
          <Image
            src="/Programs/Specific/1.png"
            alt="Executive Butler - Hospitality education and training"
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
                Executive Butler
              </h2>

              <span className="bg-[#921A1B] text-white text-xl px-4 py-3 rounded-full font-medium">
                5 Days
              </span>
            </div>

            <h3 className="font-jost text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#921A1B] font-medium flex flex-wrap items-center gap-3">
              Foundation Skills for Executive Butlers
            </h3>

            <div className="font-jost leading-tight text-black space-y-4 text-sm sm:text-base md:text-2xl">
              <p>
                The difference between basic service and executive-level butlering isn't just etiquette. It's precision, anticipation, discretion, and the ability to deliver seamless service under any circumstance.
              </p>

              <p>
                This course builds your foundation in professional butler service and luxury household management. You'll learn the standards of formal service, guest relations, and operational excellence required in high-end private and corporate environments. You'll be trained to execute with confidence, attention to detail, and quiet efficiency.
              </p>

              <p className="font-semibold">
                What you'll master:
              </p>

              <p>
                • Formal dining and service etiquette (à la carte, silver service, table setting)
                <br />
                • Guest relations and personalized service
                <br />
                • Household and staff management fundamentals
                <br />
                • Wardrobe care and valet services
                <br />
                • Professional communication and discretion standards
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