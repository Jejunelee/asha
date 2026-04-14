"use client";

import React, { useState, forwardRef } from 'react';

interface FormData {
  firstName: string;
  surname: string;
  email: string;
  phone: string;
  course: string;
}

interface FormErrors {
  firstName?: string;
  surname?: string;
  email?: string;
  phone?: string;
  course?: string;
}

const Lead = forwardRef<HTMLElement>((props, ref) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    surname: '',
    email: '',
    phone: '',
    course: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
      isValid = false;
    }

    // Surname validation
    if (!formData.surname.trim()) {
      newErrors.surname = 'Surname is required';
      isValid = false;
    } else if (formData.surname.trim().length < 2) {
      newErrors.surname = 'Surname must be at least 2 characters';
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Phone validation
    const phoneRegex = /^[\+\d\s\(\)-]{8,20}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Contact number is required';
      isValid = false;
    } else if (!phoneRegex.test(formData.phone.trim()) || formData.phone.trim().length < 8) {
      newErrors.phone = 'Please enter a valid phone number (min 8 digits)';
      isValid = false;
    }

    // Course validation
    if (!formData.course.trim()) {
      newErrors.course = 'Please specify your course inquiry';
      isValid = false;
    } else if (formData.course.trim().length < 3) {
      newErrors.course = 'Course inquiry must be more specific';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    // Clear submit status when user starts typing
    if (submitStatus.type !== null) {
      setSubmitStatus({ type: null, message: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = document.querySelector('.border-red-400');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/send-mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Submission failed');
      }
      
      // Success
      setSubmitStatus({
        type: 'success',
        message: result.message || '✨ Thank you! Your inquiry has been sent. Our team will contact you shortly.',
      });
      
      // Reset form
      setFormData({
        firstName: '',
        surname: '',
        email: '',
        phone: '',
        course: '',
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 5000);
    } catch (error) {
      // Error
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : '⚠️ Submission failed. Please try again later.',
      });
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      ref={ref}
      className="w-full py-20 md:py-24 lg:py-28 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7b1e1e]/20 via-[#7b1e1e]/60 to-[#7b1e1e]/20" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#7b1e1e]/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#7b1e1e]/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Text - Enhanced */}
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <h2 className="font-jost text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a0e0e] leading-[1.2] tracking-tight">
                Ready to build
                <br />
                your <span className="text-[#7b1e1e] relative inline-block">
                  dreams
                  <svg 
                    className="absolute -bottom-2 left-0 w-full h-2" 
                    viewBox="0 0 200 8" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M2 5.5C40 2 120 2 198 5.5" 
                      stroke="#7b1e1e" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeDasharray="4 3"
                    />
                  </svg>
                </span>?
              </h2>
            </div>
            
            <p className="font-jost text-gray-600 text-lg leading-relaxed max-w-md">
              Take the first step toward your future. Fill out the form and our expert advisors will guide you through the journey.
            </p>
          </div>

          {/* Form - ENLARGED MODAL CARD */}
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100 transition-all duration-300 hover:shadow-3xl space-y-8 transform hover:scale-[1.01]">
            
            {/* Row 1: First Name + Surname */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="font-jost text-base font-semibold text-gray-700 flex items-center gap-1.5 mb-2">
                  <svg className="w-5 h-5 text-[#7b1e1e]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="e.g. James"
                  className={`font-jost w-full px-5 py-4 text-base rounded-xl border transition-all duration-200 outline-none focus:ring-2 placeholder:text-gray-400 text-black ${
                    errors.firstName
                      ? 'border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-200'
                      : 'border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#7b1e1e] focus:ring-[#7b1e1e]/20'
                  }`}
                />
                {errors.firstName && (
                  <p className="font-jost text-xs text-red-500 mt-1">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="font-jost text-base font-semibold text-gray-700 flex items-center gap-1.5 mb-2">
                  <svg className="w-5 h-5 text-[#7b1e1e]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Surname
                </label>
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleInputChange}
                  placeholder="e.g. Carter"
                  className={`font-jost w-full px-5 py-4 text-base rounded-xl border transition-all duration-200 outline-none focus:ring-2 placeholder:text-gray-400 text-black ${
                    errors.surname
                      ? 'border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-200'
                      : 'border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#7b1e1e] focus:ring-[#7b1e1e]/20'
                  }`}
                />
                {errors.surname && (
                  <p className="font-jost text-xs text-red-500 mt-1">{errors.surname}</p>
                )}
              </div>
            </div>

            {/* Row 2: Email + Contact Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="font-jost text-base font-semibold text-gray-700 flex items-center gap-1.5 mb-2">
                  <svg className="w-5 h-5 text-[#7b1e1e]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="hello@example.com"
                  className={`font-jost w-full px-5 py-4 text-base rounded-xl border transition-all duration-200 outline-none focus:ring-2 placeholder:text-gray-400 text-black ${
                    errors.email
                      ? 'border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-200'
                      : 'border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#7b1e1e] focus:ring-[#7b1e1e]/20'
                  }`}
                />
                {errors.email && (
                  <p className="font-jost text-xs text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="font-jost text-base font-semibold text-gray-700 flex items-center gap-1.5 mb-2">
                  <svg className="w-5 h-5 text-[#7b1e1e]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Contact Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 000-9999"
                  className={`font-jost w-full px-5 py-4 text-base rounded-xl border transition-all duration-200 outline-none focus:ring-2 placeholder:text-gray-400 text-black ${
                    errors.phone
                      ? 'border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-200'
                      : 'border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#7b1e1e] focus:ring-[#7b1e1e]/20'
                  }`}
                />
                {errors.phone && (
                  <p className="font-jost text-xs text-red-500 mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Row 3: Course Inquiry with Submit Button */}
            <div className="space-y-4">
              <label className="font-jost text-base font-semibold text-gray-700 flex items-center gap-1.5">
                <svg className="w-5 h-5 text-[#7b1e1e]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Course Inquiry
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    placeholder="e.g. Web Development, Data Science, UI/UX Design"
                    className={`font-jost w-full px-5 py-4 text-base rounded-xl border transition-all duration-200 outline-none focus:ring-2 placeholder:text-gray-400 text-black ${
                      errors.course
                        ? 'border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-200'
                        : 'border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#7b1e1e] focus:ring-[#7b1e1e]/20'
                    }`}
                  />
                  {errors.course && (
                    <p className="font-jost text-xs text-red-500 mt-1">{errors.course}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="font-jost px-10 py-4 text-lg rounded-xl bg-[#7b1e1e] text-white font-bold shadow-lg hover:bg-[#641818] hover:shadow-xl transform transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#7b1e1e]/40 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-[#7b1e1e] flex items-center justify-center gap-2 group min-w-[170px]"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
              <p className="font-jost text-xs text-gray-400 flex items-center gap-1 mt-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                We'll never share your info. Privacy guaranteed.
              </p>
            </div>

            {/* Feedback Message */}
            {submitStatus.type && (
              <div className={`p-4 rounded-xl flex items-start gap-3 ${
                submitStatus.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {submitStatus.type === 'success' ? (
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                <span className="font-jost text-sm">{submitStatus.message}</span>
              </div>
            )}
          </form>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
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
          animation: fadeInUp 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
        }
      `}</style>
    </section>
  );
});

Lead.displayName = 'Lead';

export default Lead;