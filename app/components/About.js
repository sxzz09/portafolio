"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";

const HEADER_MS = 100;

export default function About() {
  const rootRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const { lang, t } = useLanguage();

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Reinicia la visibilidad al cambiar de idioma manteniendo el re-animado
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
        {t.aboutTag}
      </p>
      <h2
        className="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
        style={getAnimStyle(HEADER_MS)}
      >
        {t.aboutTitle}
      </h2>

      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-start">
        <div
          className="flex flex-col items-center gap-6 sm:flex-row sm:items-start lg:col-span-7"
          style={getAnimStyle(HEADER_MS * 2)}
        >
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
            {t.aboutText1}{" "}
            <a
              href="https://webiujocatia.wordpress.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-red-400 underline underline-offset-4 decoration-red-500/40 transition hover:text-red-300 hover:decoration-red-400"
            >
              {t.aboutText2}
            </a>{" "}
            {t.aboutText3}
          </p>
        </div>

        <div
          className="grid gap-4 sm:grid-cols-2 lg:col-span-5"
          style={getAnimStyle(HEADER_MS * 3)}
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-red-500/40 hover:bg-white/[0.05]">
            <h3 className="text-sm font-semibold text-red-300">{t.card1Title}</h3>
            <p className="mt-1.5 text-xs text-zinc-400">{t.card1Desc}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-red-500/40 hover:bg-white/[0.05]">
            <h3 className="text-sm font-semibold text-red-300">{t.card2Title}</h3>
            <p className="mt-1.5 text-xs text-zinc-400">{t.card2Desc}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-red-500/40 hover:bg-white/[0.05]">
            <h3 className="text-sm font-semibold text-red-300">{t.card3Title}</h3>
            <p className="mt-1.5 text-xs text-zinc-400">{t.card3Desc}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-red-500/40 hover:bg-white/[0.05]">
            <h3 className="text-sm font-semibold text-red-300">{t.card4Title}</h3>
            <p className="mt-1.5 text-xs text-zinc-400">{t.card4Desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}