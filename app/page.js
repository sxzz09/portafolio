import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white selection:bg-red-500/30 selection:text-red-200">
      <div className="min-h-screen flex flex-col justify-center">
        <Hero />
      </div>

      <About />

      <section
        id="proyectos"
        className="gpu-section mx-auto max-w-6xl px-6 pb-24 pt-32 scroll-mt-10 sm:px-8"
      >
        <Projects />
      </section>

      {/* Sección final de Contacto */}
      <Contact />
    </main>
  );
}