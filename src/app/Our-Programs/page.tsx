import Header from "@/app/Our-Programs/components/Header"
import Section3 from "./components/Section3";
import Section2 from "./components/Section2";
import Section1 from "@/app/Our-Programs/components/Section1"
import Section4 from "@/app/Our-Programs/components/Section4"

export default function About() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      <Section1 />
      <Section2 />
      <Section3 />
    <Section4 />
    </div>
  );
}