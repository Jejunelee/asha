"use client";

export default function BYD() {
  return (
    <section className="relative w-full bg-gradient-to-br from-red-700 via-red-800 to-red-900 text-white py-24 px-6 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative max-w-7xl mx-auto text-center">
        
        {/* Heading with Animation */}
        <div className="space-y-4 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
            Build your dreams.
          </h1>
          
          <p className="mt-4 text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Experience the Difference, Discover endless possibilities.
          </p>
        </div>

        {/* 3 Column Features */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Admissions */}
          <div className="group relative p-8 transition-all duration-300 hover:transform hover:-translate-y-2">
            <div className="relative flex flex-col items-center">
              {/* Outer circle with border, inner white circle */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-10 border-white/50 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-10 h-10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                      style={{ color: 'rgb(185, 28, 28)' }}
                    >
                      <path d="M12 6v12m6-6H6" strokeLinecap="round" />
                      <path d="M4 4h16v16H4z" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold tracking-wide mt-6 mb-3">
                ADMISSIONS
              </h3>

              <p className="text-base text-white/80 leading-relaxed max-w-xs">
                Everything you need to apply and get started at ASHA.
              </p>
              
              <button className="mt-6 text-sm font-semibold text-white/80 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                Learn More 
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Partners */}
          <div className="group relative p-8 transition-all duration-300 hover:transform hover:-translate-y-2">
            <div className="relative flex flex-col items-center">
              {/* Outer circle with border, inner white circle */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-10 border-white/50 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-10 h-10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                      style={{ color: 'rgb(185, 28, 28)' }}
                    >
                      <path
                        d="M17 20h5V4H2v16h5m10 0V8H7v12m10 0H7"
                        strokeLinecap="round"
                      />
                      <path d="M12 12l2 2 4-4" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold tracking-wide mt-6 mb-3">
                OUR PARTNERS
              </h3>

              <p className="text-base text-white/80 leading-relaxed max-w-xs">
                Working with trusted partners to support quality education and opportunities.
              </p>
              
              <button className="mt-6 text-sm font-semibold text-white/80 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                Explore Partners
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Visit */}
          <div className="group relative p-8 transition-all duration-300 hover:transform hover:-translate-y-2">
            <div className="relative flex flex-col items-center">
              {/* Outer circle with border, inner white circle */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-10 border-white/50 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-10 h-10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                      style={{ color: 'rgb(185, 28, 28)' }}
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
                      <path d="M8 14h.01M12 14h.01M16 14h.01" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold tracking-wide mt-6 mb-3">
                SCHEDULE A VISIT
              </h3>

              <p className="text-base text-white/80 leading-relaxed max-w-xs">
                Visit our campus and see what learning at ASHA is like.
              </p>
              
              <button className="mt-6 text-sm font-semibold text-white/80 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                Book Now
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </section>
  );
}