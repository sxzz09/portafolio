"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const HEADER_MS = 100;

const PROJECTS = [
  {
    title: "Proyecto 1",
    description: "Descripción breve del proyecto y las tecnologías utilizadas.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    image: "/proyecto-1.jpg", // 
    link: "https://github.com",
  },
  {
    title: "Proyecto 2",
    description: "Descripción breve del proyecto y las tecnologías utilizadas.",
    tags: ["React", "Node.js", "MongoDB"],
    image: "/proyecto-2.jpg", // 
    link: "https://github.com",
  },
];

export default function Projects() {
  const rootRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const reveal = useCallback(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    function checkPosition() {
      if (!rootRef.current) return;
      const rect = rootRef.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.75) {
        reveal();
        window.removeEventListener("scroll", checkPosition);
      }
    }

    function onClick(e) {
      const target = e.target.closest("a, button");
      if (target) {
        const href = target.getAttribute("href") || "";
        const text = target.innerText?.toLowerCase() || "";
        if (href.includes("#proyectos") || text.includes("proyectos")) {
          setTimeout(() => {
            reveal();
          }, 350);
        }
      }
    }

    function onHashChange() {
      if (window.location.hash === "#proyectos") {
        reveal();
      }
    }

    window.addEventListener("scroll", checkPosition);
    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("scroll", checkPosition);
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [reveal]);

  const getAnimStyle = (delay) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0px)" : "translateY(60px)",
    transition: `opacity 800ms cubic-bezier(0.34, 1.56, 0.64, 1) ${
      visible ? delay : 0
    }ms, transform 800ms cubic-bezier(0.34, 1.56, 0.64, 1) ${
      visible ? delay : 0
    }ms`,
    willChange: "opacity, transform",
  });

  return (
    <section
      id="proyectos"
      ref={rootRef}
      className="relative mx-auto max-w-6xl px-6 py-20 sm:px-8"
    >
      <p
        className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-red-400/90"
        style={getAnimStyle(0)}
      >
        Portafolio
      </p>
      <h2
        className="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
        style={getAnimStyle(HEADER_MS)}
      >
        Proyectos
      </h2>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {PROJECTS.map((project, index) => (
          <div
            key={project.title}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition duration-300 hover:border-red-500/40 hover:bg-white/[0.05]"
            style={getAnimStyle(HEADER_MS * (2 + index))}
          >
            
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-900">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60" />
            </div>

            {/* Contenido del Proyecto */}
            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <h3 className="text-xl font-semibold text-white transition group-hover:text-red-400">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-400">
                  {project.description}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/5 px-2.5 py-1 text-xs font-medium text-zinc-300 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-red-400 transition hover:text-red-300"
                >
                  Ver más
                  <svg
                    viewBox="0 0 24 24"
                    className="size-3.5 fill-none stroke-current stroke-2"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}