"use client";

import Image from "next/image";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn,
  FaPhoneAlt, 
  FaEnvelope,
  FaMapMarkerAlt
} from "react-icons/fa";
import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";
import { FaTiktok } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { 
      icon: FaFacebookF, 
      href: "https://www.facebook.com/ashaschool/", 
      label: "Facebook",
      color: "hover:bg-[#1877f2]"
    },
    { 
      icon: FaInstagram, 
      href: "https://www.instagram.com/ashaschoolph/", 
      label: "Instagram",
      color: "hover:bg-gradient-to-br hover:from-[#f58529] hover:via-[#dd2a7b] hover:to-[#8134af]"
    },
    { 
      icon: FaTiktok, 
      href: "https://www.tiktok.com/@ashaschoolph", 
      label: "TikTok",
      color: "hover:bg-[#000000]"
    },
    { 
      icon: FaLinkedinIn, 
      href: "https://www.linkedin.com/school/asian-school-of-hospitality-arts/", 
      label: "LinkedIn",
      color: "hover:bg-[#0A66C2]"
    }
  ];

  const contactInfo = [
    { icon: FaMapMarkerAlt, text: "Room 504, Brittany Hotel, BGC", link: null },
    { icon: MdPhone, text: "+63 939 633 4548", link: "" },
    { icon: MdEmail, text: "admission@asha.edu.ph", link: "mailto:admission@asha.edu.ph" }
  ];

  const quickLinks = [
    { name: "About Us", href: "/About" },
    { name: "Programs", href: "/Our-Offerings" },
    { name: "Admissions", href: "/Admission" },
  ];

  return (
    <footer className="w-full bg-gradient-to-r from-[#921A1B] to-[#6e5f5f] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-6 md:py-12">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          
          {/* COLUMN 1 - Logo and Description */}
          <div className="space-y-3 md:space-y-4">
            <Image
              src="/Landing/Logo.png"
              alt="ASHA Logo - Asian School for Hospitality Arts"
              width={120}
              height={45}
              className="object-contain brightness-0 invert md:w-[160px] md:h-[60px]"
              priority
            />
            
            <p className="text-xs md:text-sm leading-relaxed opacity-90">
              Asian School for Hospitality Arts (ASHA) is dedicated to 
              shaping future leaders in the hospitality industry through 
              excellence in education and hands-on training.
            </p>
          </div>

          {/* COLUMN 2 - Quick Links */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-base md:text-lg font-semibold tracking-wide uppercase">
              Quick Links
            </h3>
            
            <ul className="space-y-1.5 md:space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-xs md:text-sm opacity-90 hover:opacity-100 hover:translate-x-1 transition-all inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a 
                  href="https://asha.edu.ph/about/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs md:text-sm opacity-90 hover:opacity-100 hover:translate-x-1 transition-all inline-block"
                >
                  Website
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 3 - Contact Information */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-base md:text-lg font-semibold tracking-wide uppercase">
              Contact Us
            </h3>
            
            <div className="space-y-2 md:space-y-3">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                const content = (
                  <>
                    <Icon size={14} className="flex-shrink-0 md:text-base" />
                    <span className="text-xs md:text-sm opacity-90">{item.text}</span>
                  </>
                );
                
                return (
                  <div key={index} className="flex items-center gap-2 md:gap-3">
                    {item.link ? (
                      <a href={item.link} className="flex items-center gap-2 md:gap-3 hover:opacity-100 transition-opacity">
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-center gap-2 md:gap-3">
                        {content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* COLUMN 4 - Social Media */}
          <div className="space-y-4 md:space-y-6">
            <div className="space-y-3 md:space-y-4">
              <h3 className="text-base md:text-lg font-semibold tracking-wide uppercase">
                Follow Us
              </h3>
              
              <div className="flex gap-2 md:gap-3 flex-wrap">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 flex items-center justify-center 
                        hover:scale-110 transition-all duration-300 ${social.color} hover:text-white`}
                    >
                      <Icon size={14} className="md:text-base" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Optional: Copyright text */}
            <div className="pt-2 md:pt-4">
              <p className="text-[10px] md:text-xs opacity-70">
                © {currentYear} ASHA. All rights reserved.
              </p>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}