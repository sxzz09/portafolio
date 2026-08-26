"use client";

import SocialLinks from "./SocialLinks";
import { useLanguage } from "../context/LanguageContext";

export default function Hero() {
  const { lang, toggleLanguage, t } = useLanguage();

  return (
    <section className="gpu-section relative isolate flex min-h-screen flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 contain-paint [transform:translateZ(0)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(127,29,29,0.28),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(185,28,28,0.14),transparent_50%)]" />
        <div className="animate-drift absolute -left-24 top-16 size-[28rem] rounded-full bg-red-950/50 blur-3xl will-change-transform" />
        <div className="animate-drift absolute -right-16 bottom-0 size-[24rem] rounded-full bg-rose-950/40 blur-3xl will-change-transform [animation-delay:-6s]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[72px_72px] mask-[radial-gradient(ellipse_at_center,black,transparent_72%)]" />
      </div>

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 sm:px-8">
        {/* Switcher de idioma con animación de deslizamiento (Slide) */}
        <button
          onClick={toggleLanguage}
          aria-label="Cambiar idioma"
          className="relative flex items-center rounded-full border border-white/10 bg-zinc-900/80 p-1 text-xs font-semibold backdrop-blur-sm transition hover:border-red-500/40"
        >
          {/* Indicador con slide animado */}
          <span
            className={`absolute top-1 bottom-1 w-[28px] rounded-full bg-red-500/20 border border-red-500/50 transition-transform duration-300 ease-out ${
              lang === "es" ? "translate-x-0" : "translate-x-[28px]"
            }`}
          />

          {/* Opción ES */}
          <span
            className={`relative z-10 flex h-5 w-[28px] items-center justify-center transition-colors duration-300 ${
              lang === "es" ? "text-red-400 font-bold" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            ES
          </span>

          {/* Opción EN */}
          <span
            className={`relative z-10 flex h-5 w-[28px] items-center justify-center transition-colors duration-300 ${
              lang === "en" ? "text-red-400 font-bold" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
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
        <p
          className="animate-fade-up mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-3 py-1 text-xs font-medium tracking-wide text-red-400"
          style={{ animationDelay: "0.05s" }}
        >
          <span className="size-1.5 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.95)]" />
          {t.available}
        </p>

        <p
          className="animate-fade-up mb-3 text-sm font-medium uppercase tracking-[0.22em] text-red-400/90"
          style={{ animationDelay: "0.12s" }}
        >
          {t.devTitle}
        </p>

        <h1
          className="animate-fade-up max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-7xl lg:text-8xl"
          style={{ animationDelay: "0.18s" }}
        >
          {t.greeting}{" "}
          <span className="bg-gradient-to-r from-red-500 via-rose-400 to-red-300 bg-clip-text text-transparent">
            Sebastián
          </span>
        </h1>

        <p
          className="animate-fade-up mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl"
          style={{ animationDelay: "0.28s" }}
        >
          {t.heroDesc}
        </p>

        <div
          className="animate-fade-up mt-10 flex flex-wrap items-center gap-4"
          style={{ animationDelay: "0.38s" }}
        >
          <a
            href="#proyectos"
            className="inline-flex items-center gap-2 rounded-full border border-transparent bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:border-red-500 hover:bg-red-50"
          >
            {t.viewProjects}
            <span aria-hidden="true">→</span>
          </a>

          <a
            href="#contacto"
            className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-6 py-3 text-sm font-semibold text-red-200 transition hover:border-red-500 hover:bg-red-500/20 hover:text-white"
          >
            {t.contactMe}
          </a>
        </div>
      </div>
    </section>
  );
}