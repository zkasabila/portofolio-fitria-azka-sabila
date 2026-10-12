const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const currentYear = document.getElementById("currentYear");

// Mengatur tema website
function setTheme(isDark) {
  document.body.classList.toggle("dark-mode", isDark);
  themeIcon.textContent = isDark ? "☀" : "☾";

  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap"
  );

  localStorage.setItem("fas-theme", isDark ? "dark" : "light");
}

// Memuat tema yang terakhir dipilih
const savedTheme = localStorage.getItem("fas-theme");
setTheme(savedTheme === "dark");

// Mengganti tema ketika tombol diklik
themeToggle.addEventListener("click", function () {
  const isDark = document.body.classList.contains("dark-mode");
  setTheme(!isDark);
});

// Membuka dan menutup menu pada perangkat mobile
menuToggle.addEventListener("click", function () {
  const isOpen = navMenu.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Tutup menu" : "Buka menu"
  );
});

// Menutup menu setelah tautan navigasi dipilih
const navLinks = navMenu.querySelectorAll("a");

navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka menu");
  });
});

// Menampilkan tahun secara otomatis
currentYear.textContent = new Date().getFullYear();