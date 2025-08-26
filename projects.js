// --- Sélecteurs ---
const yearFilter = document.getElementById("filter-year");
const typeFilter = document.getElementById("filter-type");
const langFilter = document.getElementById("filter-lang");
const resetBtn = document.getElementById("reset-filters");
const projectCards = document.querySelectorAll(".project-card");

// --- Fonction de filtrage ---
function filterProjects() {
  const selectedYear = yearFilter.value;
  const selectedType = typeFilter.value;
  const selectedLang = langFilter.value;

  projectCards.forEach(card => {
    const cardYear = card.dataset.year;
    const cardType = card.dataset.type;
    const cardLang = card.dataset.lang;

    const matchYear = (selectedYear === "all" || cardYear === selectedYear);
    const matchType = (selectedType === "all" || cardType === selectedType);
    const matchLang = (selectedLang === "all" || cardLang === selectedLang);

    if (matchYear && matchType && matchLang) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// --- Réinitialisation des filtres ---
function resetFilters() {
  yearFilter.value = "all";
  typeFilter.value = "all";
  langFilter.value = "all";
  filterProjects();
}

// --- Ajout des listeners ---
yearFilter.addEventListener("change", filterProjects);
typeFilter.addEventListener("change", filterProjects);
langFilter.addEventListener("change", filterProjects);
resetBtn.addEventListener("click", resetFilters);
