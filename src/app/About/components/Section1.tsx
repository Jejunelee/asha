"use client";

export default function Section1() {
  return (
    <section className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* Intro */}
        <div className="mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          <div className="border-l-4 border-[#921A1B] pl-4 sm:pl-5 md:pl-6 lg:pl-8">
            <h2 className="font-jost text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight text-black">
              The Asian School of Hospitality and Arts is{" "}
              <span className="text-[#921A1B] block sm:inline">
                home to dream future global hospitality leaders
              </span>
            </h2>
          </div>

          <div className="mt-5 sm:mt-6 md:mt-8 space-y-3 sm:space-y-4 text-black font-jost leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl">
            <p>
              ASHA is powered by the same expert team behind Cravings and CCA, Manila. 
              Together, they create a synergy that drives real-world education in the 
              hospitality and tourism industry.
            </p>

            <p>
              In partnership with the Center for Culinary Arts (CCA) and Brittany Hotel, 
              ASHA blends academic learning with real-world training. This collaboration 
              gives students hands-on experience and industry-ready skills that meet the 
              evolving demands of hospitality.
            </p>
          </div>
        </div>

        {/* How we started */}
        <div className="mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-5">
            <div className="w-0.5 sm:w-1 h-5 sm:h-6 md:h-7 lg:h-8 bg-[#921A1B]"></div>
            <h2 className="font-jost text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight text-black">
              How we <span className="text-[#921A1B]">started</span>
            </h2>
          </div>

          <div className="space-y-3 sm:space-y-4 text-black font-jost leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl">
            <p className="text-gray-700 italic text-sm sm:text-base md:text-lg lg:text-xl">
              "In 2009, mother and daughter Susana 'Annie' Guerrero and Marinela 'Badjie' 
              Guerrero-Trinidad had an idea they couldn't shake."
            </p>

            <p>
              They had watched the industry up close and seen how hard it was for talented 
              young Filipinos to break in—how steep the learning curve was, how many never 
              got their shot.
            </p>

            <p>
              They decided to change that. Not with another classroom program teaching 
              theory, but with a school where students would actually work in hotels and 
              restaurants. Your classroom would be a hotel lobby. Your lab would be a 
              professional kitchen.
            </p>

            <p className="font-medium text-[#921A1B] text-sm sm:text-base md:text-lg lg:text-xl">
              Your first day of training would feel like your first day on the job.
            </p>

            <p>
              That's how ASHA started. Fifteen years later, that's still how we run it.
            </p>
          </div>
        </div>

        {/* What makes ASHA different */}
        <div>
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-5">
            <div className="w-0.5 sm:w-1 h-5 sm:h-6 md:h-7 lg:h-8 bg-[#921A1B]"></div>
            <h2 className="font-jost text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight text-black">
              What Makes ASHA <span className="text-[#921A1B]">different</span>
            </h2>
          </div>

          <div className="space-y-4 sm:space-y-5 md:space-y-6 text-black font-jost leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl">
            <div className="flex gap-2 sm:gap-3 md:gap-4">
              <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-[#921A1B]/10 flex items-center justify-center mt-0.5 sm:mt-1">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#921A1B]"></div>
              </div>
              <p className="flex-1">
                <span className="font-semibold">Real-world expertise.</span> ASHA is powered by the 
                same team behind The Cravings Group and the Center for Culinary Arts, Manila. 
                When we teach you, it's the exact systems, standards, and skills that run 
                successful hospitality businesses right now.
              </p>
            </div>

            <div className="flex gap-2 sm:gap-3 md:gap-4">
              <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-[#921A1B]/10 flex items-center justify-center mt-0.5 sm:mt-1">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#921A1B]"></div>
              </div>
              <p className="flex-1">
                <span className="font-semibold">Working hotel campus.</span> Our partnership with 
                Brittany Hotel turns our campus into a working hotel. Housekeeping happens in 
                real guest rooms. Front office training involves real check-ins and check-outs. 
                Food and beverage service means serving real diners who expect real excellence.
              </p>
            </div>

            <div className="flex gap-2 sm:gap-3 md:gap-4">
              <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-[#921A1B]/10 flex items-center justify-center mt-0.5 sm:mt-1">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#921A1B]"></div>
              </div>
              <p className="flex-1">
                <span className="font-semibold">Graduate ready.</span> By the time you graduate, 
                you've already worked hundreds of real shifts. You know what the job feels like 
                because you've already been doing it.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}