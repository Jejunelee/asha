import Hero from "./components/landing/Hero";
import ShortCourses from "./components/landing/ShortCourses";
import BYD from "./components/landing/BYD";
import Latest from "./components/landing/Latest";
import Lead from "./components/landing/Lead";


export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Hero />
      <ShortCourses />
      <BYD />
      <Lead />

    </div>
  );
}