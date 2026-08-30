"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";

const HEADER_MS = 100;

export default function About() {
  const rootRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const { lang, t } = useLanguage();

  // Estados independientes de posición y visibilidad para la foto
  const [photoPos, setPhotoPos] = useState({ x: -1000, y: -1000 });
  const [photoActive, setPhotoActive] = useState(false);

  // Estados independientes para las 4 tarjetas
  const [cardPos, setCardPos] = useState({ x: -1000, y: -1000 });
  const [activeCardIdx, setActiveCardIdx] = useState(null);

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

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCardPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handlePhotoMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPhotoPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

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
          {/* Foto con Spotlight */}
          <div
            onMouseMove={handlePhotoMouseMove}
            onMouseEnter={() => setPhotoActive(true)}
            onMouseLeave={() => setPhotoActive(false)}
            className="group relative shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-red-500/50 hover:shadow-[0_15px_30px_-10px_rgba(239,68,68,0.2)]"
          >
            {photoActive && (
              <div
                className="pointer-events-none absolute -inset-px z-10 rounded-2xl transition-opacity duration-300"
                style={{
                  background: `radial-gradient(180px circle at ${photoPos.x}px ${photoPos.y}px, rgba(239, 68, 68, 0.25), transparent 80%)`,
                }}
              />
            )}
            <div className="relative z-0 h-44 w-36 sm:h-52 sm:w-40">
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

        {/* Tarjetas de Skills con Spotlight perfecto */}
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
            <div
              key={idx}
              onMouseMove={handleCardMouseMove}
              onMouseEnter={() => setActiveCardIdx(idx)}
              onMouseLeave={() => setActiveCardIdx(null)}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-red-500/50 hover:bg-white/[0.06] hover:shadow-[0_15px_30px_-10px_rgba(239,68,68,0.25)]"
            >
              {activeCardIdx === idx && (
                <div
                  className="pointer-events-none absolute -inset-px z-10 rounded-2xl transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(160px circle at ${cardPos.x}px ${cardPos.y}px, rgba(239, 68, 68, 0.2), transparent 80%)`,
                  }}
                />
              )}
              <div className="relative z-20">
                <h3 className="text-sm font-semibold text-red-300 transition-colors duration-300 group-hover:text-red-400">
                  {card.title}
                </h3>
                <p className="mt-1.5 text-xs text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
