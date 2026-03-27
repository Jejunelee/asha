"use client";

export default function Section1() {
  return (
    <section className="w-full bg-[#f3f3f3] py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-8xl w-[88%] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center space-y-6 sm:space-y-8">

        {/* Heading */}
        <h1 className="font-jost text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight text-black">
          The Asian School of Hospitality and Arts is <br /> home to{" "}
          <span className="text-[#921A1B]">
            dream future global hospitality leaders
          </span>
        </h1>

        {/* Description */}
        <p className="font-jost text-black leading-relaxed text-md sm:text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto">
          The Asian School of Hospitality Arts recognizes the importance of partnering
          with visionaries and organizations that share its commitment to honing the
          skills and values of future global hospitality leaders. Together, we aim to
          produce globally recognized graduates through holistic programs, authentic
          Filipino hospitality, and excellent real-world training that empowers students
          to thrive in the industry.
        </p>

      </div>
    </section>
  );
}