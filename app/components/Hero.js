"use client";

import { useState, useRef } from "react";
import SocialLinks from "./SocialLinks";
import { useLanguage } from "../context/LanguageContext";

export default function Hero() {
  const { lang, toggleLanguage, t } = useLanguage();
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="gpu-section relative isolate flex min-h-screen flex-col overflow-hidden bg-zinc-950"
    >
      {/* Fondo VFX Dinámico */}
      <div className="pointer-events-none absolute inset-0 -z-10 contain-paint">
        {/* Spotlight reactivo al cursor */}
        <div
          className="absolute -inset-px transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(239, 68, 68, 0.15), transparent 80%)`,
          }}
        />

        {/* Ambient Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(127,29,29,0.25),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(185,28,28,0.12),transparent_50%)]" />
        <div className="animate-drift absolute -left-24 top-16 size-[28rem] rounded-full bg-red-950/40 blur-3xl will-change-transform" />
        <div className="animate-drift absolute -right-16 bottom-0 size-[24rem] rounded-full bg-rose-950/30 blur-3xl will-change-transform [animation-delay:-6s]" />

        {/* Grid técnico con máscara */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 sm:px-8">
        <button
          onClick={toggleLanguage}
          aria-label="Cambiar idioma"
          className="relative flex items-center rounded-full border border-white/10 bg-zinc-900/80 p-1 text-xs font-semibold backdrop-blur-sm transition hover:border-red-500/40"
        >
          <span
            className={`absolute top-1 bottom-1 w-[28px] rounded-full bg-red-500/20 border border-red-500/50 transition-transform duration-300 ease-out ${lang === "es" ? "translate-x-0" : "translate-x-[28px]"
              }`}
          />
          <span className={`relative z-10 flex h-5 w-[28px] items-center justify-center transition-colors duration-300 ${lang === "es" ? "text-red-400 font-bold" : "text-zinc-400"}`}>
            ES
          </span>
          <span className={`relative z-10 flex h-5 w-[28px] items-center justify-center transition-colors duration-300 ${lang === "en" ? "text-red-400 font-bold" : "text-zinc-400"}`}>
            EN
          </span>
        </button>

        <nav aria-label="Redes sociales">
          <SocialLinks />
        </nav>
      </header>

      <div
        key={lang}
        id="inicio"
        className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pb-20 pt-8 sm:px-8"
      >
        <p className="animate-fade-up mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-3.5 py-1 text-xs font-medium tracking-wide text-red-400 backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.95)] animate-pulse" />
          {t.available}
        </p>

        <p className="animate-fade-up mb-3 text-sm font-medium uppercase tracking-[0.22em] text-red-400/90">
          {t.devTitle}
        </p>

        <h1 className="animate-fade-up max-w-4xl text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl">
          {t.greeting}{" "}
          <span className="bg-gradient-to-r from-red-500 via-rose-400 to-red-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(239,68,68,0.2)]">
            Sebastián
          </span>
        </h1>

        <p className="animate-fade-up mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
          {t.heroDesc}
        </p>

        <div className="animate-fade-up mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#proyectos"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-zinc-950 transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] active:scale-95"
          >
            {t.viewProjects}
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
          </a>

          <a
            href="#contacto"
            className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-7 py-3.5 text-sm font-semibold text-red-200 backdrop-blur-sm transition-all duration-300 hover:border-red-500 hover:bg-red-500/20 hover:text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.25)] active:scale-95"
          >
            {t.contactMe}
          </a>
        </div>
      </div>
    </section>
  );
}