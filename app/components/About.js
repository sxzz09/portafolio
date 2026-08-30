"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";

const HEADER_MS = 100;

function CardSpotlight({ children, className = "" }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-2 hover:border-red-500/50 hover:bg-white/[0.06] hover:shadow-[0_15px_30px_-10px_rgba(239,68,68,0.25)] ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(200px circle at ${position.x}px ${position.y}px, rgba(239, 68, 68, 0.2), transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
}

export default function About() {
  const rootRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const { lang, t } = useLanguage();

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
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

  const getAnimStyle = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0px)" : "translateY(50px)",
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
          {/* Foto de perfil */}
          <CardSpotlight className="shrink-0 p-0 !hover:-translate-y-1">
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
          </CardSpotlight>

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

        {/* Tarjetas de Skills */}
        <div
          className="grid gap-4 sm:grid-cols-2 lg:col-span-5"
          style={getAnimStyle(HEADER_MS * 3)}
        >
          {[
            { title: t.card1Title, desc: t.card1Desc },
            { title: t.card2Title, desc: t.card2Desc },
            { title: t.card3Title, desc: t.card3Desc },
            { title: t.card4Title, desc: t.card4Desc },
          ].map((card, idx) => (
            <CardSpotlight key={idx} className="p-5">
              <h3 className="text-sm font-semibold text-red-300 transition-colors duration-300 group-hover:text-red-400">
                {card.title}
              </h3>
              <p className="mt-1.5 text-xs text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300">
                {card.desc}
              </p>
            </CardSpotlight>
          ))}
        </div>
      </div>
    </section>
  );
}
