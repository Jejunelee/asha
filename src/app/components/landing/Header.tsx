"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on window resize (if switching to desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && open) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const navItems = [
    { href: "/about", label: "About" },
    { href: "/chro-program", label: "CHRO Program" },
    { href: "/short-courses", label: "Short Courses" },
    { href: "/partners-careers", label: "Partners & Careers" },
    { href: "/alumni", label: "Alumni" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full
        transition-all duration-300
        ${scrolled ? "py-1 bg-white/95 backdrop-blur-md shadow-md" : "py-2 bg-white"}`}
      >
        <div className="max-w-8xl w-[88%] mx-auto flex items-center justify-between px-6">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center group" 
            onClick={() => open && setOpen(false)}
          >
            <Image
              src="/Landing/Logo.png"
              alt="ASHA Logo"
              width={110}
              height={40}
              priority
              className={`object-contain transition-all duration-300
              ${scrolled ? "scale-[0.9]" : "scale-100"}`}
            />
          </Link>

          {/* Right Side */}
          <div
            className={`flex items-center gap-4 md:gap-6 transition-all duration-300
            ${scrolled ? "scale-[0.95]" : "scale-100"}`}
          >
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 text-lg font-medium font-jost text-gray-700">
              {navItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className="hover:text-black transition-colors duration-200 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-700 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Contact Button */}
            <button
              onClick={() => setLeadOpen(true)}
              className="hidden md:inline-block bg-red-700 hover:bg-red-800 text-white px-5 py-2 rounded-full transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.97]"
            >
              Contact Us
            </button>

            {/* Hamburger - improved touch target */}
            <button
              className="md:hidden text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Dropdown - solid background */}
      <div
        className={`fixed left-0 right-0 z-40 md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white shadow-xl
        ${open ? "max-h-[calc(100vh-73px)] opacity-100" : "max-h-0 opacity-0"}`}
        style={{ 
          top: scrolled ? '65px' : '73px',
          pointerEvents: open ? 'auto' : 'none'
        }}
      >
        <nav className="flex flex-col h-full overflow-y-auto pb-8">
          {/* Navigation Links */}
          <div className="flex-1 px-6 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-4 text-gray-700 font-jost text-lg border-b border-gray-200 hover:text-red-700 transition-colors group"
              >
                <span>{item.label}</span>
                <ChevronRight size={20} className="text-gray-400 group-hover:text-red-700 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
            
            {/* Mobile Contact Button */}
            <button
              onClick={() => {
                setLeadOpen(true);
                setOpen(false);
              }}
              className="w-full flex items-center justify-between py-4 text-gray-700 font-jost text-lg border-b border-gray-200 hover:text-red-700 transition-colors group"
            >
              <span>Contact Us</span>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-red-700 group-hover:translate-x-1 transition-all" />
            </button>
          </div>

          {/* Call to Action Section */}
          <div className="px-6 pt-4 pb-6 bg-gray-50 mt-auto">
            <p className="text-sm text-gray-600 mb-3 font-medium">Get in touch with us</p>
            <button
              onClick={() => {
                setLeadOpen(true);
                setOpen(false);
              }}
              className="flex items-center justify-between w-full bg-red-700 text-white px-6 py-4 rounded-xl text-lg font-medium
              shadow-lg shadow-red-700/30
              hover:bg-red-800 active:scale-[0.98] transition-all duration-200"
            >
              <span>Contact Us</span>
              <ChevronRight size={22} />
            </button>
          </div>
        </nav>
      </div>

      {/* Backdrop overlay when menu is open */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/20 md:hidden z-30"
          style={{ top: scrolled ? '65px' : '73px' }}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}