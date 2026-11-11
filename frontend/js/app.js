
// =================================
// UPLYST - THEME SWITCHER
// =================================

// Get the theme button
const themeToggle = document.getElementById("themeToggle");

// Get the saved theme from browser storage
let currentTheme = localStorage.getItem("uplyst-theme") || "dark";

// Apply the theme
function applyTheme(theme) {

    document.documentElement.setAttribute("data-theme", theme);

    // Update button icon
    if (theme === "dark") {
        themeToggle.textContent = "☀️";
        themeToggle.setAttribute("aria-label", "Switch to light mode");
    } else {
        themeToggle.textContent = "🌙";
        themeToggle.setAttribute("aria-label", "Switch to dark mode");
    }

    // Save user's preference
    localStorage.setItem("uplyst-theme", theme);
}

// Apply saved theme when page opens
applyTheme(currentTheme);

// Switch theme when button is clicked
themeToggle.addEventListener("click", function () {

    currentTheme = currentTheme === "dark" ? "light" : "dark";

    applyTheme(currentTheme);

});
