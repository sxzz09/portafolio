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
    project2Desc: "Descripción breve del proyecto y las tecnologías utilizadas.",
    seeMore: "Ver más",

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
    project2Desc: "Brief description of the project and technologies used.",
    seeMore: "View more",

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