
// =================================
// UPLYST - REGISTRATION VALIDATION
// =================================

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const terms = document.getElementById("terms").checked;

        if (!name || !email || !password || !confirmPassword) {
            alert("Please fill in all required fields.");
            return;
        }

        if (password.length < 8) {
            alert("Password must contain at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        if (!terms) {
            alert("Please accept the Terms and Conditions.");
            return;
        }

        alert("All details look good! Backend registration will be connected soon.");
    });
}
