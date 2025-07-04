// Attendre que le DOM soit chargé
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling pour les liens de navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        // Calculer la position avec offset pour le header fixe
        const headerHeight = 80; // Hauteur du header fixe
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Animation d'apparition au scroll pour les éléments de la galerie
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observer tous les éléments de la galerie
  document.querySelectorAll(".gallery-item").forEach((item) => {
    // Initialiser l'état pour l'animation
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
    item.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    observer.observe(item);
  });

  // Effet de parallaxe léger pour le hero
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector(".hero");
    const heroContent = document.querySelector(".hero-content");

    if (hero && heroContent) {
      heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });

  // Animation au survol des boutons
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px) scale(1.05)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Effet de flottement sur les éléments de contact
  document.querySelectorAll(".contact-item").forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) scale(1.02)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Mise à jour de la navigation active selon la section visible
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener("scroll", function () {
    let current = "";
    const scrollPosition = window.pageYOffset + 100; // Offset pour le header

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
});

// Style CSS pour le lien actif (à ajouter dans votre CSS)
const style = document.createElement("style");
style.textContent = `
    .nav-links a.active {
        color: #8e44ad;
        font-weight: bold;
        position: relative;
    }
    
    .nav-links a.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(to right, #8e44ad, #3498db);
        border-radius: 1px;
    }
`;
document.head.appendChild(style);
