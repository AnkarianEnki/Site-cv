const sections = document.querySelectorAll(".hidden-section");

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show-section", "animate__animated", "animate__fadeInUp");
      obs.unobserve(entry.target); // Stoppe l'observation une fois affichée
    }
  });
}, { threshold: 0.2 });

// Active l’observation
sections.forEach(section => observer.observe(section));
