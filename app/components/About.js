"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const HEADER_MS = 100;

export default function About() {
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
        if (href.includes("#sobre-mi") || text.includes("sobre mí")) {
          setTimeout(() => {
            reveal();
          }, 350);
        }
      }
    }

    function onHashChange() {
      if (window.location.hash === "#sobre-mi") {
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
      id="sobre-mi"
      ref={rootRef}
      className="relative mx-auto max-w-6xl px-6 py-20 sm:px-8"
    >
      <p
        className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-red-400/90"
        style={getAnimStyle(0)}
      >
        Conóceme
      </p>
      <h2
        className="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
        style={getAnimStyle(HEADER_MS)}
      >
        Sobre mí
      </h2>

      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-start">
 
<div
  className="flex flex-col items-center gap-6 sm:flex-row sm:items-start lg:col-span-7"
  style={getAnimStyle(HEADER_MS * 2)}
>
          {/* Foto estilo carnet con zoom al hover */}
          <div className="group relative shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-red-500/40">
            <div className="relative h-44 w-36 sm:h-52 sm:w-40">
              <Image
                src="/mi-foto.jpg"
                alt="Sebastián"
                fill
                className="object-cover transition duration-500 group-hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent opacity-60" />
            </div>
          </div>

        
          <p className="text-base leading-relaxed text-zinc-400">
            ¡Hola! Mi nombre es Sebastián Rodríguez y actualmente soy estudiante de Informática en el{" "}
            <a
              href="https://webiujocatia.wordpress.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-red-400 underline underline-offset-4 decoration-red-500/40 transition hover:text-red-300 hover:decoration-red-400"
            >
              Instituto Universitario Jesús Obrero.
            </a>{" "}
            Estoy enfocado en el desarrollo frontend y productos web modernos. Me
            apasiona construir interfaces limpias, fluidas e intuitivas.
          </p>
        </div>

     
        <div
          className="grid gap-4 sm:grid-cols-2 lg:col-span-5"
          style={getAnimStyle(HEADER_MS * 3)}
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-red-500/40 hover:bg-white/[0.05]">
            <h3 className="text-sm font-semibold text-red-300">
              Criterio UI / UX
            </h3>
            <p className="mt-1.5 text-xs text-zinc-400">
              Enfoque en composición visual, jerarquía clara y estética moderna.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-red-500/40 hover:bg-white/[0.05]">
            <h3 className="text-sm font-semibold text-red-300">
              Desarrollo con IA
            </h3>
            <p className="mt-1.5 text-xs text-zinc-400">
              Uso eficiente de herramientas de IA para maquetación y desarrollo acelerado.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-red-500/40 hover:bg-white/[0.05]">
            <h3 className="text-sm font-semibold text-red-300">
              Resolución Ágil
            </h3>
            <p className="mt-1.5 text-xs text-zinc-400">
              Capacidad para descomponer problemas complejos en soluciones rápidas.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-red-500/40 hover:bg-white/[0.05]">
            <h3 className="text-sm font-semibold text-red-300">
              Aprendizaje Continuo
            </h3>
            <p className="mt-1.5 text-xs text-zinc-400">
              Adaptación rápida a nuevas herramientas, librerías y entornos de trabajo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}