"use client";

import React, { useState, useEffect } from 'react';

interface FormData {
  firstName: string;
  surname: string;
  email: string;
  phone: string;
  inquiry: string; // Changed from 'course' to 'inquiry'
}

interface FormErrors {
  firstName?: string;
  surname?: string;
  email?: string;
  phone?: string;
  inquiry?: string; // Changed from 'course' to 'inquiry'
}

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    surname: '',
    email: '',
    phone: '',
    inquiry: '', // Changed from 'course' to 'inquiry'
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Close modal on escape key press
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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

    // Inquiry validation (changed from course)
    if (!formData.inquiry.trim()) {
      newErrors.inquiry = 'Please provide your inquiry';
      isValid = false;
    } else if (formData.inquiry.trim().length < 10) {
      newErrors.inquiry = 'Please provide more details (minimum 10 characters)';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      const response = await fetch('/api/send-inquiry', { // Changed endpoint
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
        inquiry: '', // Changed from 'course' to 'inquiry'
      });
      
      // Close modal after successful submission
      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
        onClose();
      }, 2000);
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

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-all duration-300 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl transform transition-all duration-300 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 group"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Content */}
            <div className="p-8 md:p-10">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#7b1e1e]/10 mb-4">
                  <svg className="w-8 h-8 text-[#7b1e1e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h2 className="font-jost text-3xl md:text-4xl font-bold text-[#1a0e0e] mb-2">
                  Contact Us
                </h2>
                <p className="font-jost text-gray-600">
                  Fill out the form below and we'll get back to you shortly
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Row 1: First Name + Surname */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-jost text-sm font-semibold text-gray-700 flex items-center gap-1.5 mb-2">
                      <svg className="w-4 h-4 text-[#7b1e1e]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      className={`font-jost w-full px-4 py-3 text-base rounded-xl border transition-all duration-200 outline-none focus:ring-2 placeholder:text-gray-400 text-black ${
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
                    <label className="font-jost text-sm font-semibold text-gray-700 flex items-center gap-1.5 mb-2">
                      <svg className="w-4 h-4 text-[#7b1e1e]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      className={`font-jost w-full px-4 py-3 text-base rounded-xl border transition-all duration-200 outline-none focus:ring-2 placeholder:text-gray-400 text-black ${
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
                    <label className="font-jost text-sm font-semibold text-gray-700 flex items-center gap-1.5 mb-2">
                      <svg className="w-4 h-4 text-[#7b1e1e]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      className={`font-jost w-full px-4 py-3 text-base rounded-xl border transition-all duration-200 outline-none focus:ring-2 placeholder:text-gray-400 text-black ${
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
                    <label className="font-jost text-sm font-semibold text-gray-700 flex items-center gap-1.5 mb-2">
                      <svg className="w-4 h-4 text-[#7b1e1e]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      className={`font-jost w-full px-4 py-3 text-base rounded-xl border transition-all duration-200 outline-none focus:ring-2 placeholder:text-gray-400 text-black ${
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

                {/* Row 3: Inquiry (Changed from Course) */}
                <div>
                  <label className="font-jost text-sm font-semibold text-gray-700 flex items-center gap-1.5 mb-2">
                    <svg className="w-4 h-4 text-[#7b1e1e]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    Your Inquiry
                  </label>
                  <textarea
                    name="inquiry"
                    value={formData.inquiry}
                    onChange={handleInputChange}
                    placeholder="Please provide details about your inquiry or questions..."
                    rows={4}
                    className={`font-jost w-full px-4 py-3 text-base rounded-xl border transition-all duration-200 outline-none focus:ring-2 placeholder:text-gray-400 text-black resize-y ${
                      errors.inquiry
                        ? 'border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-200'
                        : 'border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#7b1e1e] focus:ring-[#7b1e1e]/20'
                    }`}
                  />
                  {errors.inquiry && (
                    <p className="font-jost text-xs text-red-500 mt-1">{errors.inquiry}</p>
                  )}
                  <p className="font-jost text-xs text-gray-400 mt-2">
                    Please provide as much detail as possible so we can better assist you.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-jost px-6 py-4 text-lg rounded-xl bg-[#7b1e1e] text-white font-bold shadow-lg hover:bg-[#641818] hover:shadow-xl transform transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#7b1e1e]/40 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
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
                      <span>Send Inquiry</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>

                {/* Privacy Note */}
                <p className="font-jost text-xs text-gray-400 flex items-center justify-center gap-1 text-center">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  We'll never share your info. Privacy guaranteed.
                </p>

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
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default ContactForm;