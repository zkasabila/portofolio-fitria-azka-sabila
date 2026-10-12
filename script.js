const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const currentYear = document.getElementById("currentYear");

// Tema
function getSavedTheme() {
  try {
    return localStorage.getItem("fas_theme");
  } catch (error) {
    return null;
  }
}

function setTheme(theme) {
  const isDark = theme === "dark";

  document.body.classList.toggle("dark-mode", isDark);
  themeIcon.textContent = isDark ? "☀" : "☾";

  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap"
  );

  try {
    localStorage.setItem("fas_theme", theme);
  } catch (error) {
    // Tema tetap berfungsi tanpa penyimpanan.
  }
}

setTheme(getSavedTheme() === "dark" ? "dark" : "light");

themeToggle.addEventListener("click", function () {
  const isDark = document.body.classList.contains("dark-mode");
  setTheme(isDark ? "light" : "dark");
});

// Navigasi mobile
menuToggle.addEventListener("click", function () {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
  );
});

navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka menu navigasi");
  });
});

window.addEventListener("resize", function () {
  if (window.innerWidth > 800) {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

// Tahun footer
currentYear.textContent = new Date().getFullYear();