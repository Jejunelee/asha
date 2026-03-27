// components/Loading.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Loading() {
  const [isExiting, setIsExiting] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    // Start exit animation after 2 seconds
    const exitTimer = setTimeout(() => setIsExiting(true), 2000);
    
    // Remove component after animation completes (2.5 seconds)
    const removeTimer = setTimeout(() => {
      setIsMounted(false);
      document.body.style.overflow = 'auto';
    }, 2500);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Don't render anything when unmounted
  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div
        className={`transition-all duration-500 ease-in-out ${
          isExiting ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Image
          src="/Landing/GIFLOGO.gif"
          alt="Loading"
          width={200}
          height={67}
          priority
        />
      </div>
    </div>
  );
}