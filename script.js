const sections = document.querySelectorAll(".hidden-section");
    const themeToggle = document.getElementById("theme-toggle");
    const html = document.documentElement;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show-section", "animate__animated", "animate__fadeInUp");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    sections.forEach(section => observer.observe(section));