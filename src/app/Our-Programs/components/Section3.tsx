"use client";

export default function Section1() {
  return (
    <section className="w-full mt-20">
      <div className="max-w-8xl w-[75%] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* Header Row */}
        <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
          
          <div>
            <h2 className="font-jost text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-black">
              Also Offering:{" "}
              <span className="text-[#921A1B]">Short Courses</span>
            </h2>

            <div className="w-12 h-[3px] bg-[#921A1B] mt-4" />
          </div>

          <div className="bg-[#938F8F] text-white px-5 py-2.5 rounded-full text-base sm:text-xl font-medium">
            6 Days - 1 Month
          </div>

        </div>

        {/* Description */}
        <div className="space-y-6 max-w-3xl">
          
          <p className="font-jost text-black leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl">
            Maybe you're not ready for a full year. Maybe you need to upskill quickly
            for a job opportunity. Maybe you want to test the field before committing
            to a longer program.
          </p>

          <p className="font-jost text-black leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl">
            Our short courses give you concentrated, hands-on training in specific
            hospitality skills. Industry practitioners who work these jobs every day
            will teach you.
          </p>

          {/* Key Details */}
          <div className="font-jost text-black space-y-1 text-sm sm:text-base md:text-lg lg:text-xl">
            <p>
              <span className="font-semibold">Duration:</span> 6 days to 1 month
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