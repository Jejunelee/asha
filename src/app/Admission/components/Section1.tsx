"use client";

import React, { useState } from 'react';

interface FormData {
  lastName: string;
  firstName: string;
  email: string;
  phoneNumber: string;
  telephoneNumber: string;
  gender: string;
  civilStatus: string;
  course: string;
  highestEducationalAttainment: string;
}

interface FormErrors {
  lastName?: string;
  firstName?: string;
  email?: string;
  phoneNumber?: string;
  telephoneNumber?: string;
  gender?: string;
  civilStatus?: string;
  course?: string;
  highestEducationalAttainment?: string;
}

export default function ApplyingFor() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    lastName: '',
    firstName: '',
    email: '',
    phoneNumber: '',
    telephoneNumber: '',
    gender: '',
    civilStatus: '',
    course: '',
    highestEducationalAttainment: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const totalSteps = 3;

  const validateStep = (stepToValidate: number): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (stepToValidate === 1) {
      // Step 1: Personal Information
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
        isValid = false;
      } else if (formData.lastName.trim().length < 2) {
        newErrors.lastName = 'Last name must be at least 2 characters';
        isValid = false;
      }

      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required';
        isValid = false;
      } else if (formData.firstName.trim().length < 2) {
        newErrors.firstName = 'First name must be at least 2 characters';
        isValid = false;
      }

      if (!formData.gender) {
        newErrors.gender = 'Please select your gender';
        isValid = false;
      }

      if (!formData.civilStatus) {
        newErrors.civilStatus = 'Please select your civil status';
        isValid = false;
      }
    } 
    else if (stepToValidate === 2) {
      // Step 2: Contact Information
      const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
      if (!formData.email.trim()) {
        newErrors.email = 'Email address is required';
        isValid = false;
      } else if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address';
        isValid = false;
      }

      const phoneRegex = /^[\+\d\s\(\)-]{8,20}$/;
      if (!formData.phoneNumber.trim()) {
        newErrors.phoneNumber = 'Mobile number is required';
        isValid = false;
      } else if (!phoneRegex.test(formData.phoneNumber.trim()) || formData.phoneNumber.trim().length < 8) {
        newErrors.phoneNumber = 'Please enter a valid mobile number (min 8 digits)';
        isValid = false;
      }

      if (formData.telephoneNumber.trim() && (!phoneRegex.test(formData.telephoneNumber.trim()) || formData.telephoneNumber.trim().length < 8)) {
        newErrors.telephoneNumber = 'Please enter a valid telephone number';
        isValid = false;
      }
    }
    else if (stepToValidate === 3) {
      // Step 3: Academic Information
      if (!formData.course.trim()) {
        newErrors.course = 'Please specify the course you\'re applying for';
        isValid = false;
      } else if (formData.course.trim().length < 3) {
        newErrors.course = 'Course name must be more specific';
        isValid = false;
      }

      if (!formData.highestEducationalAttainment) {
        newErrors.highestEducationalAttainment = 'Please select your highest educational attainment';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, totalSteps));
      // Clear errors for next step
      setErrors({});
      // Removed: window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Scroll to first error
      const firstErrorField = document.querySelector('.border-red-400');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handlePrevious = () => {
    setStep(prev => Math.max(prev - 1, 1));
    setErrors({});
    // Removed: window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

    if (!validateStep(3)) {
      const firstErrorField = document.querySelector('.border-red-400');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // ACTUAL API CALL - Send to our new application endpoint
      const response = await fetch('/api/send-application', {
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
        message: result.message || '🎉 Application submitted successfully! Our admissions team will contact you within 24 hours.',
      });
      
      // Reset form and go back to step 1
      setFormData({
        lastName: '',
        firstName: '',
        email: '',
        phoneNumber: '',
        telephoneNumber: '',
        gender: '',
        civilStatus: '',
        course: '',
        highestEducationalAttainment: '',
      });
      setStep(1);
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 5000);
    } catch (error) {
      // Error
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : '⚠️ Submission failed. Please check your connection and try again.',
      });
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepTitle = () => {
    switch(step) {
      case 1: return "Personal Information";
      case 2: return "Contact Details";
      case 3: return "Academic Information";
      default: return "Application Form";
    }
  };

  const getStepDescription = () => {
    switch(step) {
      case 1: return "Tell us about yourself";
      case 2: return "How can we reach you?";
      case 3: return "Your educational background";
      default: return "";
    }
  };

  return (
    <section className="w-full py-20 md:py-24 lg:py-28 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7b1e1e]/20 via-[#7b1e1e]/60 to-[#7b1e1e]/20" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#7b1e1e]/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#7b1e1e]/5 rounded-full blur-3xl" />
      
      <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-10 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="font-jost text-4xl md:text-5xl font-bold text-[#1a0e0e] mb-4">
            Apply for <span className="text-[#7b1e1e]">Admission</span>
          </h2>
          <p className="font-jost text-gray-600 text-lg max-w-2xl mx-auto">
            Complete your application in just a few steps. We're here to help you start your journey.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex-1 text-center">
                <div className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center font-jost font-semibold transition-all duration-300 ${
                  step >= stepNumber 
                    ? 'bg-[#7b1e1e] text-white shadow-lg' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {stepNumber}
                </div>
                <p className={`text-xs mt-2 font-jost ${
                  step >= stepNumber ? 'text-[#7b1e1e] font-semibold' : 'text-gray-400'
                }`}>
                  {stepNumber === 1 && "Personal"}
                  {stepNumber === 2 && "Contact"}
                  {stepNumber === 3 && "Academic"}
                </p>
              </div>
            ))}
          </div>
          <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-[#7b1e1e] h-full transition-all duration-500 ease-out"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100 transition-all duration-300">
          {/* Step Header */}
          <div className="mb-8 pb-6 border-b border-gray-100">
            <h3 className="font-jost text-2xl font-bold text-gray-800 mb-2">
              {getStepTitle()}
            </h3>
            <p className="font-jost text-gray-500">
              {getStepDescription()}
            </p>
          </div>

          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="font-jost text-base font-semibold text-gray-700 flex items-center gap-1.5 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="e.g. Santos"
                    className={`font-jost w-full px-5 py-4 text-base rounded-xl border transition-all duration-200 outline-none focus:ring-2 placeholder:text-gray-400 text-black ${
                      errors.lastName
                        ? 'border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-200'
                        : 'border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#7b1e1e] focus:ring-[#7b1e1e]/20'
                    }`}
                  />
                  {errors.lastName && (
                    <p className="font-jost text-xs text-red-500 mt-1">{errors.lastName}</p>
                  )}
                </div>

                <div>
                  <label className="font-jost text-base font-semibold text-gray-700 flex items-center gap-1.5 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="e.g. Maria"
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="font-jost text-base font-semibold text-gray-700 flex items-center gap-1.5 mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={`font-jost w-full px-5 py-4 text-base rounded-xl border transition-all duration-200 outline-none focus:ring-2 bg-gray-50/50 focus:bg-white focus:border-[#7b1e1e] focus:ring-[#7b1e1e]/20 text-black custom-select ${
                      errors.gender ? 'border-red-400 bg-red-50' : 'border-gray-200'
                    }`}
                  >
                    <option value="">Select gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                  {errors.gender && (
                    <p className="font-jost text-xs text-red-500 mt-1">{errors.gender}</p>
                  )}
                </div>

                <div>
                  <label className="font-jost text-base font-semibold text-gray-700 flex items-center gap-1.5 mb-2">
                    Civil Status
                  </label>
                  <select
                    name="civilStatus"
                    value={formData.civilStatus}
                    onChange={handleInputChange}
                    className={`font-jost w-full px-5 py-4 text-base rounded-xl border transition-all duration-200 outline-none focus:ring-2 bg-gray-50/50 focus:bg-white focus:border-[#7b1e1e] focus:ring-[#7b1e1e]/20 text-black custom-select ${
                      errors.civilStatus ? 'border-red-400 bg-red-50' : 'border-gray-200'
                    }`}
                  >
                    <option value="">Select civil status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                  </select>
                  {errors.civilStatus && (
                    <p className="font-jost text-xs text-red-500 mt-1">{errors.civilStatus}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Contact Information */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in-up">
              <div>
                <label className="font-jost text-base font-semibold text-gray-700 flex items-center gap-1.5 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="maria.santos@email.com"
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
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="+63 912 345 6789"
                  className={`font-jost w-full px-5 py-4 text-base rounded-xl border transition-all duration-200 outline-none focus:ring-2 placeholder:text-gray-400 text-black ${
                    errors.phoneNumber
                      ? 'border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-200'
                      : 'border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#7b1e1e] focus:ring-[#7b1e1e]/20'
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="font-jost text-xs text-red-500 mt-1">{errors.phoneNumber}</p>
                )}
              </div>

              <div>
                <label className="font-jost text-base font-semibold text-gray-700 flex items-center gap-1.5 mb-2">
                  Telephone Number <span className="text-gray-400 text-sm font-normal">(Optional)</span>
                </label>
                <input
                  type="tel"
                  name="telephoneNumber"
                  value={formData.telephoneNumber}
                  onChange={handleInputChange}
                  placeholder="(02) 8123 4567"
                  className={`font-jost w-full px-5 py-4 text-base rounded-xl border transition-all duration-200 outline-none focus:ring-2 placeholder:text-gray-400 text-black ${
                    errors.telephoneNumber
                      ? 'border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-200'
                      : 'border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#7b1e1e] focus:ring-[#7b1e1e]/20'
                  }`}
                />
                {errors.telephoneNumber && (
                  <p className="font-jost text-xs text-red-500 mt-1">{errors.telephoneNumber}</p>
                )}
              </div>
            </div>
          )}

{/* Step 3: Academic Information */}
{step === 3 && (
  <div className="space-y-6 animate-fade-in-up">
    <div>
      <label className="font-jost text-base font-semibold text-gray-700 flex items-center gap-1.5 mb-2">
        Course Applying For
      </label>

      <select
        name="course"
        value={formData.course}
        onChange={handleInputChange}
        className={`font-jost w-full px-5 py-4 text-base rounded-xl border transition-all duration-200 outline-none focus:ring-2 bg-gray-50/50 focus:bg-white focus:border-[#7b1e1e] focus:ring-[#7b1e1e]/20 text-black custom-select ${
          errors.course ? 'border-red-400 bg-red-50' : 'border-gray-200'
        }`}
      >
        <option value="">Select course</option>
        <option value="Hotel & Restaurants Operations">Hotel & Restaurants Operations</option>
        <option value="Food and Beverage Service">Food and Beverage Service</option>
        <option value="Barista">Barista</option>
        <option value="Housekeeping">Housekeeping</option>
        <option value="Butler">Butler</option>
        <option value="Front Office">Front Office</option>
        <option value="Bartending">Bartending</option>
        <option value="Cookery">Cookery</option>
      </select>

      {errors.course && (
        <p className="font-jost text-xs text-red-500 mt-1">{errors.course}</p>
      )}
    </div>

    <div>
      <label className="font-jost text-base font-semibold text-gray-700 flex items-center gap-1.5 mb-2">
        Highest Educational Attainment
      </label>
      <select
        name="highestEducationalAttainment"
        value={formData.highestEducationalAttainment}
        onChange={handleInputChange}
        className={`font-jost w-full px-5 py-4 text-base rounded-xl border transition-all duration-200 outline-none focus:ring-2 bg-gray-50/50 focus:bg-white focus:border-[#7b1e1e] focus:ring-[#7b1e1e]/20 text-black custom-select ${
          errors.highestEducationalAttainment ? 'border-red-400 bg-red-50' : 'border-gray-200'
        }`}
      >
        <option value="">Select educational attainment</option>
        <option value="elementary">Elementary Graduate</option>
        <option value="high-school">High School Graduate</option>
        <option value="senior-high">Senior High School Graduate</option>
        <option value="associate">Associate Degree</option>
        <option value="bachelor">Bachelor's Degree</option>
        <option value="master">Master's Degree</option>
        <option value="doctorate">Doctorate Degree</option>
      </select>

      {errors.highestEducationalAttainment && (
        <p className="font-jost text-xs text-red-500 mt-1">
          {errors.highestEducationalAttainment}
        </p>
      )}
    </div>
  </div>
)}

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4 mt-10 pt-6 border-t border-gray-100">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="font-jost px-8 py-3 text-base rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transform transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-200"
              >
                ← Previous
              </button>
            )}
            
            {step < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                className="font-jost px-8 py-3 text-base rounded-xl bg-[#7b1e1e] text-white font-semibold shadow-md hover:bg-[#641818] hover:shadow-lg transform transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#7b1e1e]/40 ml-auto"
              >
                Next →
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="font-jost px-8 py-3 text-base rounded-xl bg-[#7b1e1e] text-white font-semibold shadow-md hover:bg-[#641818] hover:shadow-lg transform transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#7b1e1e]/40 disabled:opacity-70 disabled:cursor-not-allowed ml-auto flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Application</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Feedback Message */}
          {submitStatus.type && (
            <div className={`mt-6 p-4 rounded-xl flex items-start gap-3 ${
              submitStatus.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {submitStatus.type === 'success' ? (
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
          animation: fadeInUp 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
        }
        
        /* Custom select styling to fix chevron position */
        .custom-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 1.5rem;
          padding-right: 2.5rem !important;
        }
        
        /* Firefox support */
        .custom-select::-ms-expand {
          display: none;
        }
      `}</style>
    </section>
  );
}