"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";

const HEADER_MS = 100;

export default function Projects() {
  const rootRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const { lang, t } = useLanguage();

  const PROJECTS = [
    {
      id: "iessentials",
      title:
        lang === "es"
          ? "iEssentials — Web App E-Commerce & Catálogo Digital interactivo"
          : "iEssentials — E-Commerce Web App & Interactive Digital Catalog",
      description: t.project1Desc,
      extendedDescription: t.project1Extended,
      howIBuiltIt:
        lang === "es"
          ? "Desarrollado utilizando Next.js App Router para renderizado híbrido y optimización SEO. Se aplicó Tailwind CSS para un diseño responsivo ágil."
          : "Built using Next.js App Router for hybrid rendering and SEO optimization. Tailwind CSS was applied for fluid responsive styling.",
      howItWorks:
        lang === "es"
          ? "El usuario puede ver los productos, agregarlos al carrito de compras, elegir el método de pago y finalizar la compra."
          : "Users can view products, add them to the shopping cart, select a payment method, and complete the purchase.",
      tags: ["Next.js", "Tailwind CSS", "TypeScript"],
      image: "/proyecto-1.png",
      extraImages: ["/proyecto-1-screenshot1.png", "/proyecto-1-screenshot2.png"],
      link: "https://catalogo-iessentials.vercel.app/",
      isLive: true,
    },
    {
      id: "trackready",
      title:
        lang === "es"
          ? "TrackReady: La solución para Simracers."
          : "TrackReady: The solution for Simracers.",
      description: t.project2Desc,
      extendedDescription: t.project2Extended,
      howIBuiltIt:
        lang === "es"
          ? "Desarrollado utilizando Next.js, Typescript y Tailwind CSS, con un algoritmo capaz de crear setups a nivel profesional."
          : "Developed using Next.js, TypeScript, and Tailwind CSS, with an algorithm capable of creating professional-level setups.",
      howItWorks:
        lang === "es"
          ? "El usuario puede ver un catálogo de coches GT3, elegir un circuito, seleccionar el modo (Quali o Carrera) y descargar archivos JSON optimizados listos para usar en el simulador."
          : "Users can view a catalog of GT3 cars, select a circuit, choose the mode (Quali or Race), and download optimized JSON files ready to use in the simulator.",
      tags: ["Next.js", "Tailwind CSS", "TypeScript"],
      image: "/proyecto-2.png",
      extraImages: ["/proyecto-2-screenshot1.png", "/proyecto-2-screenshot2.png"],
      link: "",
      isLive: false,
    },
    {
      title: lang === "es" ? "TrackReady: La solución para Simracers." : "TrackReady: The solution for Simracers.",
      description: t.project2Desc,
      tags: ["Next.js", "Tailwind CSS", "React", "TypeScript"],
      image: "/proyecto-2.png",
      link: "",
    },
  ];

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    requestAnimationFrame(() => {
      setIsAnimating(true);
    });
  };

  const handleCloseModal = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setSelectedProject(null);
    }, 400);
  };

  const handleMouseMove = (e) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (rootRef.current) {
      const rect = rootRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setVisible(false);
        const timer = setTimeout(() => setVisible(true), 50);
        return () => clearTimeout(timer);
      }
    }
  }, [lang]);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedProject]);

  // Animación de aparición suave sin saltos ni retrasos
  const getAnimStyle = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0px)" : "translateY(30px)",
    transition: `opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 800ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    willChange: "opacity, transform",
  });

  return (
    <section
      id="proyectos"
      ref={rootRef}
      className="relative mx-auto max-w-6xl px-6 py-20 sm:px-8 scroll-mt-10"
    >
      <p
        className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-red-400/90"
        style={getAnimStyle(0)}
      >
        {t.projectsTag}
      </p>
      <h2
        className="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
        style={getAnimStyle(HEADER_MS)}
      >
        {t.projectsTitle}
      </h2>

      {/* Grid de Proyectos */}
      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {PROJECTS.map((project) => (
          <div key={project.id} style={getAnimStyle(0)}>
            <article
              onClick={() => handleOpenModal(project)}
              onMouseMove={handleMouseMove}
              className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md transition-transform duration-300 ease-out hover:-translate-y-2 hover:border-red-500/50 hover:bg-white/[0.06] hover:shadow-[0_20px_40px_-15px_rgba(239,68,68,0.25)]"
            >
              {/* Spotlight Glow del cursor */}
              <div
                className="pointer-events-none absolute -inset-px z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(280px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(239, 68, 68, 0.2), transparent 80%)`,
                }}
              />

              {/* Contenedor de Imagen Principal */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-900">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-30" />
              </div>

              {/* Contenido de la Tarjeta */}
              <div className="relative z-20 flex flex-1 flex-col justify-between p-6">
                <div>
                  <h3 className="text-xl font-semibold text-white transition-colors duration-300 group-hover:text-red-400">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/5 bg-white/5 px-2.5 py-1 text-xs font-medium text-zinc-300 transition-colors duration-300 hover:border-white/20 hover:bg-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-red-400 transition-colors duration-300 hover:text-red-300"
                  >
                    {t.seeMore}
                    <svg
                      viewBox="0 0 24 24"
                      className="size-3.5 fill-none stroke-current stroke-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>

      {/* MODAL DE VISIÓN EXTENDIDA */}
      {selectedProject && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md transition-opacity duration-400 ease-out ${isAnimating ? "opacity-100" : "opacity-0"
            }`}
          onClick={handleCloseModal}
        >
          <div
            className={`relative max-h-[90vh] w-full max-w-3xl overflow-y-auto overflow-x-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${isAnimating
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-12 opacity-0 scale-95"
              }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Imagen Principal de Preview en la Cabecera */}
            <div className="group/hero relative aspect-[16/9] w-full overflow-hidden bg-zinc-900">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover object-top transition-transform duration-700 ease-out group-hover/hero:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

              {/* Botón de Cerrar Flotante */}
              <button
                onClick={handleCloseModal}
                className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-black/50 p-2 text-zinc-300 backdrop-blur-md transition-all duration-300 hover:rotate-90 hover:border-red-500/50 hover:bg-red-500/20 hover:text-white"
                aria-label={t.close || "Cerrar"}
              >
                <svg className="size-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Contenido del Modal */}
            <div className="p-6 sm:p-8 pt-4">
              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                {selectedProject.title}
              </h3>

              <p className="mt-4 text-base leading-relaxed text-zinc-300">
                {selectedProject.extendedDescription}
              </p>

              {/* Secciones de Trabajo */}
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div className="group/box rounded-xl border border-white/5 bg-white/[0.02] p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-red-500/30 hover:bg-white/[0.04] hover:shadow-[0_8px_25px_-5px_rgba(239,68,68,0.15)]">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-red-400 transition-colors duration-300 group-hover/box:text-red-300">
                    {t.howIBuiltIt || "¿Cómo lo hice?"}
                  </h4>
                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed group-hover/box:text-zinc-300 transition-colors duration-300">
                    {selectedProject.howIBuiltIt}
                  </p>
                </div>

                <div className="group/box rounded-xl border border-white/5 bg-white/[0.02] p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-red-500/30 hover:bg-white/[0.04] hover:shadow-[0_8px_25px_-5px_rgba(239,68,68,0.15)]">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-red-400 transition-colors duration-300 group-hover/box:text-red-300">
                    {t.howItWorks || "¿Cómo funciona?"}
                  </h4>
                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed group-hover/box:text-zinc-300 transition-colors duration-300">
                    {selectedProject.howItWorks}
                  </p>
                </div>
              </div>

              {/* Capturas Secundarias */}
              <div className="mt-8">
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">
                  {t.screenshots || "Capturas adicionales"}
                </h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  {selectedProject.extraImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="group/img relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-900 transition-all duration-300 ease-out hover:border-red-500/40 hover:shadow-[0_8px_25px_-5px_rgba(239,68,68,0.2)]"
                    >
                      <Image
                        src={img}
                        alt={`${selectedProject.title} - Screenshot ${idx + 1}`}
                        fill
                        className="object-cover object-top transition-transform duration-500 ease-out group-hover/img:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Acciones */}
              <div className="mt-8 flex justify-end gap-3 border-t border-white/10 pt-4">
                <button
                  onClick={handleCloseModal}
                  className="rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-400 transition-colors duration-300 hover:border-white/20 hover:bg-white/5 hover:text-white active:scale-95"
                >
                  {t.close || "Cerrar"}
                </button>
                {selectedProject.isLive && selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-red-500 hover:shadow-[0_0_25px_rgba(239,68,68,0.45)] active:scale-95"
                  >
                    {t.visitProject || "Visitar Proyecto"}
                    <svg
                      className="size-4 fill-none stroke-current stroke-2 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
