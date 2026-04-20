"use client";

export default function Section1() {
  return (
    <section className="w-full mt-8 sm:mt-12 md:mt-16 lg:mt-20">
      <div className="max-w-8xl w-[90%] sm:w-[85%] md:w-[80%] lg:w-[75%] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
        
        {/* Header Row - Responsive layout */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8">
          
          <div className="w-full sm:w-auto">
            <h2 className="font-jost text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-black">
              Also Offering:{" "}
              <span className="text-[#921A1B]">Short Courses</span>
            </h2>

            <div className="w-10 sm:w-11 md:w-12 h-[2px] sm:h-[3px] bg-[#921A1B] mt-2 sm:mt-3 md:mt-4" />
          </div>

          <div className="bg-[#938F8F] text-white px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full text-xs sm:text-sm md:text-base lg:text-xl font-medium inline-block">
            6 Days - 1 Month
          </div>

        </div>

        {/* Description - Optimized spacing */}
        <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 max-w-3xl">
          
          <p className="font-jost text-black leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
            Maybe you're not ready for a full year. Maybe you need to upskill quickly
            for a job opportunity. Maybe you want to test the field before committing
            to a longer program.
          </p>

          <p className="font-jost text-black leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
            Our short courses give you concentrated, hands-on training in specific
            hospitality skills. Industry practitioners who work these jobs every day
            will teach you.
          </p>

          {/* Key Details - Better spacing on mobile */}
          <div className="font-jost text-black space-y-1.5 sm:space-y-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
            <p>
              <span className="font-semibold">Duration:</span> 5 days to 1 month
            </p>

            <p>
              <span className="font-semibold">Format:</span> Intensive, practical,
              real-world focused
            </p>

            <p>
              <span className="font-semibold">Outcome:</span> Job-ready skills you
              can use immediately
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}