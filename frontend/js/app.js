
// =================================
// UPLYST - GLOBAL APP SETTINGS
// =================================

// THEME SWITCHER

const themeToggle = document.getElementById("themeToggle");

let currentTheme = localStorage.getItem("uplyst-theme") || "dark";

function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);

    if (themeToggle) {
        themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";

        themeToggle.setAttribute(
            "aria-label",
            theme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
        );
    }

    localStorage.setItem("uplyst-theme", theme);
}

// Apply saved theme
applyTheme(currentTheme);

// Theme button click
if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        currentTheme = currentTheme === "dark" ? "light" : "dark";
        applyTheme(currentTheme);
    });
}


// =================================
// DASHBOARD USER GREETING
// =================================

const userNameElement = document.getElementById("userName");

if (userNameElement) {
    const savedName = localStorage.getItem("uplyst-user-name");

    if (savedName) {
        userNameElement.textContent = savedName;
    }
}
