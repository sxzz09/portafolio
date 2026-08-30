"use client";

import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const translations = {
  es: {
    // Header & Global
    available: "Disponible para proyectos",
    devTitle: "Desarrollador web",
    greeting: "Hola, soy",
    heroDesc: "Diseño y construyo productos digitales con foco en experiencias modernas y soluciones impulsadas por IA.",
    viewProjects: "Ver Proyectos",
    contactMe: "Contáctame",

    // About
    aboutTag: "Conóceme",
    aboutTitle: "Sobre mí",
    aboutText1: "¡Hola! Mi nombre es Sebastián Rodríguez y actualmente soy estudiante de Informática en el",
    aboutText2: "Instituto Universitario Jesús Obrero.",
    aboutText3: "Estoy enfocado en el desarrollo frontend y productos web modernos. Me apasiona construir interfaces limpias, fluidas e intuitivas.",
    card1Title: "Criterio UI / UX",
    card1Desc: "Enfoque en composición visual, jerarquía clara y estética moderna.",
    card2Title: "Desarrollo con IA",
    card2Desc: "Uso eficiente de herramientas de IA para maquetación y desarrollo acelerado.",
    card3Title: "Resolución Ágil",
    card3Desc: "Capacidad para descomponer problemas complejos en soluciones rápidas.",
    card4Title: "Aprendizaje Continuo",
    card4Desc: "Adaptación rápida a nuevas herramientas, librerías y entornos de trabajo.",

    // Tech Stack (NUEVO)
    techTag: "Tecnologías & Herramientas",
    techTitle: "Mi Tech Stack",

    // Projects
    projectsTag: "Portafolio",
    projectsTitle: "Proyectos",
    project1Desc: "Plataforma de comercio electrónico diseñada con una estética minimalista tipo Apple, orientada a la venta de accesorios con soporte de precios al detal y al mayor en tiempo real.",
    project2Desc: "Generador instantáneo de setups para Assetto Corsa Competizione. Abstrae la complejidad de la telemetría en un flujo de 4 pasos, entregando presets optimizados y archivos JSON listos para salir a pista en segundos.",
    project1Extended: "iEssentials es una plataforma de comercio electrónico diseñada con una estética minimalista y elegante, inspirada en el diseño de Apple. El objetivo principal es ofrecer una experiencia de usuario fluida y atractiva para la venta de accesorios, destacando por su interfaz limpia y de alto rendimiento. Incorpora un sistema de autenticación seguro y una interfaz responsiva que garantiza una visualización óptima en cualquier dispositivo.",
    project2Extended: "TrackReady fue creado para resolver la necesidad principal de los simracers. Implementa un generador de presets simple de 4 pasos para Assetto Corsa Competizione, dándote un setup profesional para cada coche GT3 y circuito del juego.",
    seeMore: "Ver más",

    // Modal
    howIBuiltIt: "¿Cómo lo hice?",
    howItWorks: "¿Cómo funciona?",
    screenshots: "Capturas de pantalla",
    close: "Cerrar",
    visitProject: "Visitar Proyecto",

    // Contact & Footer
    contactTag: "¿Hablamos?",
    contactTitle: "Trabajemos juntos",
    contactDesc: "Estoy disponible para nuevos proyectos, oportunidades laborales o simplemente para conectar. ¡Escríbeme!",
    backToTop: "Volver arriba",
    footerText: "Sebastián. Diseñado y construido con Next.js & Tailwind CSS.",
  },
  en: {
    // Header & Global
    available: "Available for projects",
    devTitle: "Web Developer",
    greeting: "Hi, I'm",
    heroDesc: "I design and build digital products focused on modern experiences and AI-driven solutions.",
    viewProjects: "View Projects",
    contactMe: "Contact Me",

    // About
    aboutTag: "Get to know me",
    aboutTitle: "About me",
    aboutText1: "Hi! My name is Sebastián Rodríguez and I am currently a Computer Science student at",
    aboutText2: "Jesús Obrero University Institute.",
    aboutText3: "I am focused on frontend development and modern web products. I am passionate about building clean, smooth, and intuitive interfaces.",
    card1Title: "UI / UX Standards",
    card1Desc: "Focus on visual composition, clear hierarchy, and modern aesthetics.",
    card2Title: "AI-Powered Dev",
    card2Desc: "Efficient use of AI tools for rapid prototyping and accelerated development.",
    card3Title: "Agile Problem Solving",
    card3Desc: "Ability to break down complex issues into quick, efficient solutions.",
    card4Title: "Continuous Learning",
    card4Desc: "Fast adaptation to new tools, libraries, and workspace environments.",

    // Tech Stack (NUEVO)
    techTag: "Technologies & Tools",
    techTitle: "My Tech Stack",

    // Projects
    projectsTag: "Portfolio",
    projectsTitle: "Projects",
    project1Desc: "An e-commerce platform built with an Apple-inspired minimalist aesthetic, designed to showcase and sell accessories with real-time support for both retail and wholesale pricing models.",
    project2Desc: "An instant setup generator for Assetto Corsa Competizione. It turns complex telemetry tuning into a frictionless 4-step workflow, delivering optimized, race-ready JSON presets in seconds.",
    project1Extended: "iEssentials is an e-commerce platform built with a clean, minimalist design focused on high performance and user experience. It supports real-time retail and wholesale pricing, a secure authentication system, and a responsive interface designed to adapt seamlessly across all devices.",
    project2Extended: "TrackReady was created to solve the main need of a simracer. It implements a simple 4 steps preset generator for Assetto Corsa Competizione, giving you a prolevel setup for every gt3 car and circuit of the game.",
    seeMore: "See more",

    // Modal
    howIBuiltIt: "How I built it",
    howItWorks: "How it works",
    screenshots: "Screenshots",
    close: "Close",
    visitProject: "Visit Project",

    // Contact & Footer
    contactTag: "Let's talk",
    contactTitle: "Let's work together",
    contactDesc: "I am available for new projects, job opportunities, or just to connect.",
    backToTop: "Back to top",
    footerText: "Sebastián. Designed and built with Next.js & Tailwind CSS.",
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("es");

  const toggleLanguage = () => {
    setLang((prev) => (prev === "es" ? "en" : "es"));
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

