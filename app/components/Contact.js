"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SocialLinks from "./SocialLinks";

const HEADER_MS = 100;

export default function Contact() {
  const rootRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const reveal = useCallback(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    function checkPosition() {
      if (!rootRef.current) return;
      const rect = rootRef.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.85) {
        reveal();
        window.removeEventListener("scroll", checkPosition);
      }
    }

    function onClick(e) {
      const target = e.target.closest("a, button");
      if (target) {
        const href = target.getAttribute("href") || "";
        const text = target.innerText?.toLowerCase() || "";
        if (href.includes("#contacto") || text.includes("contacto")) {
          setTimeout(() => {
            reveal();
          }, 350);
        }
      }
    }

    function onHashChange() {
      if (window.location.hash === "#contacto") {
        reveal();
      }
    }

    window.addEventListener("scroll", checkPosition);
    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHashChange);

    checkPosition();

    return () => {
      window.removeEventListener("scroll", checkPosition);
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [reveal]);

  const getAnimStyle = (delay) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0px)" : "translateY(40px)",
    transition: `opacity 1000ms cubic-bezier(0.16, 1, 0.3, 1) ${
      visible ? delay : 0
    }ms, transform 1000ms cubic-bezier(0.16, 1, 0.3, 1) ${
      visible ? delay : 0
    }ms`,
    willChange: "opacity, transform",
  });

  return (
    <section
      id="contacto"
      ref={rootRef}
      className="relative border-t border-white/10 bg-zinc-950/50 py-24 text-white scroll-mt-10"
    >
      <div className="mx-auto max-w-6xl px-6 text-center sm:px-8">
        <p
          className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-red-400/90"
          style={getAnimStyle(0)}
        >
          ¿Hablamos?
        </p>

        <h2
          className="text-3xl font-semibold tracking-tight text-white sm:text-5xl"
          style={getAnimStyle(HEADER_MS)}
        >
          Trabajemos juntos
        </h2>

        <p
          className="mx-auto mt-4 max-w-xl text-base text-zinc-400 sm:text-lg"
          style={getAnimStyle(HEADER_MS * 2)}
        >
          Estoy disponible para nuevos proyectos, oportunidades laborales o
          simplemente para conectar. ¡Escríbeme!
        </p>

        
        <div
          className="mt-10 flex justify-center"
          style={getAnimStyle(HEADER_MS * 3)}
        >
          <SocialLinks />
        </div>

       
        <div
          className="mt-12 flex justify-center"
          style={getAnimStyle(HEADER_MS * 4)}
        >
          <a
            href="#inicio"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-zinc-400 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-white"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="size-3.5 fill-none stroke-current stroke-2"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
            Volver arriba
          </a>
        </div>

        <p
          className="mt-12 text-xs text-zinc-600"
          style={getAnimStyle(HEADER_MS * 4.5)}
        >
          © {new Date().getFullYear()} Sebastián. Diseñado y construido con Next.js
          & Tailwind CSS.
        </p>
      </div>
    </section>
  );
}