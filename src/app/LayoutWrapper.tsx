// app/LayoutWrapper.tsx
"use client";

import { useState, useEffect } from "react";
import Header from "@/app/components/landing/Header";
import Footer from "@/app/components/landing/Footer";
import Loading from "@/components/Loading";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for Loading component to finish (3 seconds)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Loading />
      {/* Always render content, but hide it visually until loading is done */}
      <div style={{ display: loading ? 'none' : 'block' }}>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}