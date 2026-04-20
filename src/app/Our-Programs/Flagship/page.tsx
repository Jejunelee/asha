// app/our-programs/flagship/page.tsx

"use client";

import Image from "next/image";
import Link from "next/link";

export default function FlagshipPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="w-full bg-white">
        {/* Hero Image - Enhanced */}
        <div className="relative w-full h-[clamp(260px,70vh,730px)] overflow-hidden group">
          <Image
            src="/Landing/About/3.png"
            alt="About ASHA - Hospitality education and training"
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

      {/* Flagship Program Section - Full Width */}
      <section className="w-full bg-[#f3f3f3] py-12 sm:py-12 md:py-14 lg:py-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          
          {/* Content - Full width */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 flex-wrap">
              <h2 className="font-jost text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight text-black">
                Flagship Program
              </h2>

              <span className="bg-[#921A1B] text-white text-xl px-4 py-3 rounded-full font-medium">
                1 year Program
              </span>
            </div>

            <h3 className="font-jost text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#921A1B] font-medium flex flex-wrap items-center gap-3">
              Certificate in Hotel and Restaurant Operations (CHRO)
            </h3>

            <div className="font-jost leading-tight text-black space-y-4 text-sm sm:text-base md:text-2xl">
              <p>
                One year. Five skills. Real job offers when you graduate.
              </p>

              <p>
                Most hospitality schools teach you what a hotel room should look like. We teach you how to prepare 20 of them before checkout time.
              </p>

              <p>
                Most programs explain how restaurants work. We put you on the floor during Friday night dinner rush.
              </p>

              <p>
                The CHRO program gives you complete, hands-on mastery of five core hospitality skills:
                <br />
                <strong>Food &amp; Beverage Service</strong> – Table service, customer interaction, restaurant operations
                <br />
                <strong>Bartending</strong> – Classic and contemporary cocktails, bar management, service speed
                <br />
                <strong>Commercial Cooking</strong> – Knife skills, cooking methods, kitchen operations, plating
                <br />
                <strong>Housekeeping</strong> – Room preparation, linen care, guest service, quality standards
                <br />
                <strong>Front Office</strong> – Check-in/out procedures, reservations, guest relations, problem-solving
              </p>

              <p className="font-semibold">
                Here's the difference:
              </p>

              <p>
                You won't just learn these skills—you'll practice them in real hotels and restaurants with real guests who expect real excellence. Your internship is integrated throughout your training, not just tacked on at the end, so by the time you graduate, you've already worked the job you're applying for.
              </p>

              <p>
                On graduation day, you'll be choosing which job offer to accept, not hoping someone takes a chance on you.
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