// Elemen utama
const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const backToTop = document.getElementById("backToTop");
const scrollProgress = document.getElementById("scrollProgress");

// Tema
function setTheme(theme) {
  body.classList.toggle("dark-theme", theme === "dark");
  themeIcon.textContent = theme === "dark" ? "☾" : "☼";
  themeToggle.setAttribute(
    "aria-label",
    theme === "dark" ? "Aktifkan mode terang" : "Aktifkan mode gelap"
  );
  localStorage.setItem("portfolio-theme", theme);
}

const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
setTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const nextTheme = body.classList.contains("dark-theme") ? "light" : "dark";
  setTheme(nextTheme);
});

// Navigasi mobile
function closeMenu() {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Buka navigasi");
}

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Tutup navigasi" : "Buka navigasi"
  );
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("click", (event) => {
  if (
    !navLinks.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    closeMenu();
  }
});

// Animasi saat elemen terlihat
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

// Filter proyek
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const emptyFilter = document.getElementById("emptyFilter");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;
    let visibleCount = 0;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const isMatch =
        selectedFilter === "all" ||
        card.dataset.category === selectedFilter;

      card.classList.toggle("hidden", !isMatch);

      if (isMatch) visibleCount++;
    });

    emptyFilter.hidden = visibleCount !== 0;
  });
});

// Detail proyek
const projectDetails = {
  emerys: {
    title: "PKM-KC EMERYS 2026",
    description:
      "EMERYS merupakan proyek smart wearable sandal berbasis TinyML dan IoT untuk mitigasi risiko jatuh pada lansia. Dalam proyek ini, saya bertanggung jawab pada pengembangan front-end aplikasi mobile serta pengelolaan administrasi proyek, termasuk laporan, logbook, dan keuangan.",
    tags: ["TinyML", "IoT", "Mobile Apps", "Front-End", "Administrasi Proyek"]
  },
  access: {
    title: "Sistem Pelaporan Basis Data Microsoft Access",
    description:
      "Proyek akademik berupa pengembangan fitur pelaporan basis data untuk studi kasus usaha konveksi simulasi Orizon Print House. Pekerjaan mencakup kueri relasional, fungsi agregasi, penyaringan, pengurutan, pratinjau cetak, dan ekspor PDF.",
    tags: ["Microsoft Access", "INNER JOIN", "SQL", "Reporting"]
  },
  postgresql: {
    title: "Praktikum Pemrograman Basis Data PostgreSQL",
    description:
      "Praktikum berfokus pada perancangan basis data relasional, pengembangan query SQL, implementasi trigger dan function, serta optimasi performa query menggunakan indeks dan EXPLAIN ANALYZE.",
    tags: ["PostgreSQL", "Navicat Premium", "SQL", "Database"]
  },
  ipusnas: {
    title: "Perancangan Ulang UI/UX iPusnas",
    description:
      "Proyek perancangan ulang antarmuka iPusnas menggunakan pendekatan Design Thinking. Prosesnya meliputi riset, ideasi, penyusunan alur pengguna, wireframe, prototipe interaktif di Figma, dan pengujian kegunaan menggunakan Maze.",
    tags: ["UI/UX", "Design Thinking", "Figma", "Maze"]
  },
  odoo: {
    title: "Eksplorasi Implementasi Odoo ERP",
    description:
      "Proyek eksplorasi simulasi penerapan Odoo ERP pada studi kasus bisnis konveksi/manufaktur Valora Craft Co. Kegiatan mencakup pemahaman keterkaitan modul dan analisis alur bisnis dari pengadaan hingga akuntansi.",
    tags: ["Odoo ERP", "Business Process", "Manufacturing", "Accounting"]
  }
};

const projectModal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTags = document.getElementById("modalTags");
const modalClose = document.getElementById("modalClose");

function openProjectModal(projectKey) {
  const project = projectDetails[projectKey];

  if (!project) return;

  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalTags.replaceChildren();

  project.tags.forEach((tag) => {
    const tagElement = document.createElement("span");
    tagElement.textContent = tag;
    modalTags.appendChild(tagElement);
  });

  projectModal.classList.add("show");
  projectModal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
  modalClose.focus();
}

function closeProjectModal() {
  projectModal.classList.remove("show");
  projectModal.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");
}

document.querySelectorAll(".detail-button").forEach((button) => {
  button.addEventListener("click", () => {
    openProjectModal(button.dataset.project);
  });
});

modalClose.addEventListener("click", closeProjectModal);

projectModal.querySelectorAll("[data-close-modal]").forEach((element) => {
  element.addEventListener("click", closeProjectModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProjectModal();
    closeMenu();
  }
});

// Progres scroll, menu aktif, dan tombol ke atas
const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

function handleScroll() {
  const scrollTop = window.scrollY;
  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress =
    scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;

  scrollProgress.style.width = `${progress}%`;
  backToTop.classList.toggle("show", scrollTop > 450);

  let currentSection = "home";

  sections.forEach((section) => {
    if (scrollTop >= section.offsetTop - 150) {
      currentSection = section.id;
    }
  });

  navigationLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${currentSection}`;
    link.classList.toggle("active", isActive);
  });
}

window.addEventListener("scroll", handleScroll);
handleScroll();

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Tahun footer
document.getElementById("currentYear").textContent =
  new Date().getFullYear();