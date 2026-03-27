"use client";

import Image from "next/image";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaPhoneAlt, 
  FaEnvelope,
  FaMapMarkerAlt
} from "react-icons/fa";
import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { 
      icon: FaFacebookF, 
      href: "https://facebook.com/asha", 
      label: "Facebook",
      color: "hover:bg-[#1877f2]"
    },
    { 
      icon: FaInstagram, 
      href: "https://instagram.com/asha", 
      label: "Instagram",
      color: "hover:bg-gradient-to-br hover:from-[#f58529] hover:via-[#dd2a7b] hover:to-[#8134af]"
    },
    { 
      icon: FaPhoneAlt, 
      href: "tel:+1234567890", 
      label: "Phone",
      color: "hover:bg-[#25D366]"
    },
    { 
      icon: FaEnvelope, 
      href: "mailto:info@asha.edu.ph", 
      label: "Email",
      color: "hover:bg-[#EA4335]"
    }
  ];

  const contactInfo = [
    { icon: FaMapMarkerAlt, text: "Room 504, Brittany Hotel, BGC", link: null },
    { icon: MdPhone, text: "+63 2 1234 5678", link: "tel:+63212345678" },
    { icon: MdEmail, text: "info@asha.edu.ph", link: "mailto:info@asha.edu.ph" }
  ];

  const quickLinks = [
    { name: "About Us", href: "/About" },
    { name: "Programs", href: "/Our-Offerings" },
    { name: "Admissions", href: "/Admission" },
  ];

  return (
    <footer className="w-full bg-gradient-to-r from-[#921A1B] to-[#6e5f5f] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* COLUMN 1 - Logo and Description */}
          <div className="space-y-4">
            <Image
              src="/Landing/Logo.png"
              alt="ASHA Logo - Asian School for Hospitality Arts"
              width={160}
              height={60}
              className="object-contain brightness-0 invert"
              priority
            />
            
            <p className="text-sm leading-relaxed opacity-90">
              Asian School for Hospitality Arts (ASHA) is dedicated to 
              shaping future leaders in the hospitality industry through 
              excellence in education and hands-on training.
            </p>
          </div>

          {/* COLUMN 2 - Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-wide uppercase">
              Quick Links
            </h3>
            
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-sm opacity-90 hover:opacity-100 hover:translate-x-1 transition-all inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3 - Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-wide uppercase">
              Contact Us
            </h3>
            
            <div className="space-y-3">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                const content = (
                  <>
                    <Icon size={18} className="flex-shrink-0" />
                    <span className="text-sm opacity-90">{item.text}</span>
                  </>
                );
                
                return (
                  <div key={index} className="flex items-center gap-3">
                    {item.link ? (
                      <a href={item.link} className="flex items-center gap-3 hover:opacity-100 transition-opacity">
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-center gap-3">
                        {content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* COLUMN 4 - Social Media & Newsletter */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold tracking-wide uppercase">
                Follow Us
              </h3>
              
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`w-10 h-10 rounded-full bg-white/20 flex items-center justify-center 
                        hover:scale-110 transition-all duration-300 ${social.color} hover:text-white`}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>

          </div>

        </div>


      </div>
    </footer>
  );
}