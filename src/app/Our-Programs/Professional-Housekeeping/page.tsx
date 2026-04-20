// app/our-programs/professional-housekeeping/page.tsx

"use client";

import Image from "next/image";
import Link from "next/link";

export default function ProfessionalHousekeepingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="w-full bg-white">
        {/* Hero Image */}
        <div className="relative w-full h-[clamp(260px,70vh,730px)] overflow-hidden group">
          <Image
            src="/Programs/Specific/4.png"
            alt="Professional Housekeeping - Hospitality education and training"
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
                Professional Housekeeping
              </h2>

              <span className="bg-[#921A1B] text-white text-xl px-4 py-3 rounded-full font-medium">
                5 Days
              </span>
            </div>

            <h3 className="font-jost text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#921A1B] font-medium flex flex-wrap items-center gap-3">
              The Details That Make the Difference
            </h3>

            <div className="font-jost leading-tight text-black space-y-4 text-sm sm:text-base md:text-2xl">
              <p>
                A guest checks into their room after a 14-hour flight. They're exhausted, irritable, desperate for a shower and sleep.
              </p>

              <p>
                They walk in and see a bed perfectly made with crisp corners, a smooth duvet, pillows arranged just right. The bathroom gleams. Fresh towels are folded precisely. Everything is exactly where it should be.
              </p>

              <p>
                They exhale. Finally, they can rest. This is what great housekeeping does.
              </p>

              <p>
                This course teaches you room preparation, bed making, linen care, and guest service—the skills that turn a clean room into an experience worth paying for. You'll learn the international standards that define luxury hospitality, the attention to detail that separates good from exceptional, and the speed that makes you valuable to employers.
              </p>

              <p className="font-semibold">
                What you'll master:
              </p>

              <p>
                • Systematic room cleaning and preparation
                <br />
                • Bed making to five-star standards
                <br />
                • Linen handling and care
                <br />
                • Guest service and communication
                <br />
                • Quality control and inspection protocols
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