
"use strict";

// ===== Demo Login Credentials =====
// IMPORTANT: Ye sirf practice ke liye hain.
// Real password ya sensitive credentials yahan mat rakho.
const DEMO_EMAIL = "admin@sharmawatchrepair.com";
const DEMO_PASSWORD = "WatchDemo@123";

// ===== Login Page Elements =====
const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const loginMessage = document.getElementById("loginMessage");

// ===== Show / Hide Password =====
if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", function () {
        const isHidden = passwordInput.type === "password";

        passwordInput.type = isHidden ? "text" : "password";

        togglePassword.innerHTML = isHidden
            ? '<i class="bi bi-eye-slash"></i>'
            : '<i class="bi bi-eye"></i>';

        togglePassword.setAttribute(
            "aria-label",
            isHidden ? "Hide password" : "Show password"
        );
    });
}

// ===== Demo Login =====
if (loginForm && emailInput && passwordInput && loginMessage) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const enteredEmail = emailInput.value.trim().toLowerCase();
        const enteredPassword = passwordInput.value;

        loginMessage.textContent = "";
        loginMessage.style.color = "#c62828";

        if (
            enteredEmail === DEMO_EMAIL &&
            enteredPassword === DEMO_PASSWORD
        ) {
            // Demo only; this is NOT secure authentication.
            sessionStorage.setItem("demoAdminLoggedIn", "true");

            loginMessage.style.color = "#218653";
            loginMessage.textContent = "Login successful!";

            window.location.href = "dashboard.html";
        } else {
            loginMessage.textContent =
                "Incorrect email or password. Please try again.";
        }
    });
}

// ===== Dashboard Demo Check =====
const currentPage = window.location.pathname
    .split("/")
    .pop()
    .toLowerCase();

if (currentPage === "dashboard.html") {
    if (sessionStorage.getItem("demoAdminLoggedIn") !== "true") {
        window.location.replace("login.html");
    }
}

// ===== Logout =====
const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {
    logoutButton.addEventListener("click", function () {
        sessionStorage.removeItem("demoAdminLoggedIn");
        window.location.replace("login.html");
    });
}
