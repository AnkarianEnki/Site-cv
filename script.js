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

    // Charger le thème sauvegardé
    if (localStorage.getItem("theme") === "dark") {
      html.classList.add("dark");
      themeToggle.textContent = "☀️ Mode clair";
    }

    themeToggle.addEventListener("click", () => {
      html.classList.toggle("dark");

      document.body.classList.add("animate__animated", "animate__fadeIn");
      setTimeout(() => {
        document.body.classList.remove("animate__animated", "animate__fadeIn");
      }, 500);

      if (html.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "☀️ Mode clair";
      } else {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌙 Mode sombre";
      }
    });