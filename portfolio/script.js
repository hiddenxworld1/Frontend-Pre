const toggle = document.getElementById("theme-toggle");

function applyTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
  localStorage.setItem("theme", theme);
}

// Load saved theme
const saved = localStorage.getItem("theme");
if (saved) {
  applyTheme(saved);
} else {
  // auto-detect from OS
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
}

// Toggle theme on click
toggle.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark");
  applyTheme(isDark ? "light" : "dark");
});



const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent!'); // Replace with actual email submission logic
    contactForm.reset();
});
