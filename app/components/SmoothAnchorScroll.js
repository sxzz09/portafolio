"use client";

import { useEffect } from "react";

const DURATION_MS = 1400;

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function scrollToY(y) {
  window.scrollTo({ top: y, left: 0, behavior: "instant" });
}

export default function SmoothAnchorScroll() {
  useEffect(() => {
    const root = document.documentElement;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let frame = 0;

    function endAnchorScroll() {
      cancelAnimationFrame(frame);
      root.classList.remove("is-anchoring");
    }

    function onClick(event) {
      const link = event.target.closest('a[href^="#"]');
      if (!link || event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const id = link.getAttribute("href")?.slice(1);
      if (!id) return;

      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      cancelAnimationFrame(frame);

      const marginTop =
        parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
      const nextY = Math.round(
        target.getBoundingClientRect().top + window.scrollY - marginTop,
      );

      if (prefersReduced) {
        scrollToY(nextY);
        history.pushState(null, "", `#${id}`);
        return;
      }

      root.classList.add("is-anchoring");

      const startY = window.scrollY;
      const distance = nextY - startY;
      const startedAt = performance.now();

      function tick(now) {
        const progress = Math.min(1, (now - startedAt) / DURATION_MS);
        const y = Math.round(startY + distance * easeInOutCubic(progress));
        scrollToY(y);

        if (progress < 1) {
          frame = requestAnimationFrame(tick);
          return;
        }

        scrollToY(nextY);
        history.pushState(null, "", `#${id}`);
        requestAnimationFrame(endAnchorScroll);
      }

      frame = requestAnimationFrame(tick);
    }

    document.addEventListener("click", onClick);
    return () => {
      endAnchorScroll();
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
