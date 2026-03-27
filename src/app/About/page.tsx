import Header from "@/app/About/components/Header"
import Section1 from "@/app/About/components/Section1"
import Section2 from "@/app/About/components/Section2"
import Section3 from "@/app/About/components/Section3"
import Section4 from "@/app/About/components/Section4"
import Section5 from "@/app/About/components/Section5"

export default function About() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
    </div>
  );
}