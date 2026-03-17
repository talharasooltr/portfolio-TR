/**
 * Progressive Enhancement
 * ────────────────────────
 * All content is already in the HTML for SEO.
 * This file adds interactivity and polish on top.
 */

(function () {
  "use strict";

  /* ---------- Smooth scroll for anchor links ---------- */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  /* ---------- Scroll-reveal animation for cards ---------- */

  const cards = document.querySelectorAll(".card");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("card--visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach((card) => {
      card.classList.add("card--hidden");
      observer.observe(card);
    });
  }

  /* ---------- Active nav link highlight on scroll ---------- */

  const sections = document.querySelectorAll("header[id], main[id], footer[id]");
  const navLinks = document.querySelectorAll(".nav__link");

  function updateActiveNav() {
    let current = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        "nav__link--active",
        link.getAttribute("href") === `#${current}`
      );
    });
  }

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();

})();
