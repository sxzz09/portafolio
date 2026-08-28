import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white selection:bg-red-500/30 selection:text-red-200">
      <div className="min-h-screen flex flex-col justify-center">
        <Hero />
      </div>

      <About />

      <TechStack />

      <Projects />

      {/* Sección final de Contacto y Footer */}
      <Contact />
    </main>
  );
}