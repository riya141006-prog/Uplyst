
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Get form values
        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const role = document.getElementById("role").value;
        const terms = document.getElementById("terms").checked;

        const submitButton = registerForm.querySelector("button[type='submit']");

        // Frontend validation
        if (!fullName || !email || !password || !confirmPassword || !role) {
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

        try {
            // Disable button while registering
            submitButton.disabled = true;
            submitButton.textContent = "Creating account...";

            // Send registration details to backend
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fullName,
                    email,
                    password,
                    role
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed.");
            }

            // Save user details for dashboard greeting
            localStorage.setItem("uplyst-user-name", data.user.fullName);
            localStorage.setItem("uplyst-user-id", data.user.id);

            alert("Account created successfully! Welcome to Uplyst.");

            // Redirect to dashboard
            window.location.href = "dashboard.html";

        } catch (error) {
            alert(error.message || "Unable to connect to the server. Please try again.");

        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Create Account";
        }
    });
}
