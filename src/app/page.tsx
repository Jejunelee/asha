"use client";

import { useRef } from "react";
import Hero from "./components/landing/Hero";
import ShortCourses from "./components/landing/ShortCourses";
import BYD from "./components/landing/BYD";
import Latest from "./components/landing/Latest";
import Lead from "./components/landing/Lead";

export default function Home() {
  const leadRef = useRef<HTMLElement>(null);

  return (
    <div className="min-h-screen bg-zinc-50">
      <Hero ref={leadRef} />
      <ShortCourses />
      <BYD />
      <Lead ref={leadRef} />
    </div>
  );
}