import dynamic from "next/dynamic";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Navbar from "@/components/Navbar";
import Skills from "@/components/Skills";
import Leadership from "@/components/Leadership";
import Certifications from "@/components/Certifications";
import Projects from "@/components/Projects";
import AboutMe from "@/components/AboutMe";
import Contact from "@/components/Contact";
import SocialSidebar from "@/components/SocialSidebar";

const NeuralScene  = dynamic(() => import("@/components/NeuralScene"),  { ssr: false });
const NeuralChains = dynamic(() => import("@/components/NeuralChains"), { ssr: false });

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen relative">
      <Navbar />
      <SocialSidebar />
      <NeuralChains />
      <ScrollyCanvas />
      <Skills />
      <NeuralScene />
      <div id="events"><Leadership /></div>
      <div id="certifications"><Certifications /></div>
      <div id="projects"><Projects /></div>
      <div id="about"><AboutMe /></div>
      <div id="contact"><Contact /></div>
      <footer className="py-8 text-center text-gray-600 text-xs font-mono border-t border-white/5 bg-[#080808]">
        © {new Date().getFullYear()} Ayan Ahmed. All rights reserved.
      </footer>
    </main>
  );
}
