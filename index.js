// DOM Elements
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const showRegisterLink = document.getElementById("showRegister");
const showLoginLink = document.getElementById("showLogin");
const loginFormElement = document.getElementById("loginFormElement");
const registerFormElement = document.getElementById("registerFormElement");
const messageDiv = document.getElementById("message");
const passwordInput = document.getElementById("registerPassword");
const passwordStrength = document.getElementById("passwordStrength");

// Toggle between login and register forms
showRegisterLink.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.classList.add("inactive");
  loginForm.classList.remove("form-animation");

  setTimeout(() => {
    registerForm.classList.add("active");
    registerForm.classList.add("form-animation");
  }, 10);

  showMessage("", "");
});

showLoginLink.addEventListener("click", (e) => {
  e.preventDefault();
  registerForm.classList.remove("active");
  registerForm.classList.remove("form-animation");

  setTimeout(() => {
    loginForm.classList.remove("inactive");
    loginForm.classList.add("form-animation");
  }, 10);

  showMessage("", "");
});

// Forgot password link
document.getElementById("forgotPassword").addEventListener("click", (e) => {
  e.preventDefault();
  showMessage(
    "Password reset instructions have been sent to your email.",
    "success",
  );
});

// Password strength indicator
passwordInput.addEventListener("input", function () {
  const password = this.value;
  let strength = "weak";

  if (password.length >= 8) {
    strength = "medium";
  }

  if (
    password.length >= 10 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  ) {
    strength = "strong";
  } else if (
    password.length >= 8 &&
    (/[A-Z]/.test(password) || /[0-9]/.test(password))
  ) {
    strength = "medium";
  }

  passwordStrength.className = "strength-fill " + strength;
});

// Show message function
function showMessage(text, type) {
  messageDiv.textContent = text;
  messageDiv.className = "message " + type;
  messageDiv.style.display = text ? "block" : "none";

  if (type === "success") {
    setTimeout(() => {
      messageDiv.style.display = "none";
    }, 5000);
  }
}

// Form validation and submission
loginFormElement.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  if (!username || !password) {
    showMessage("Please fill in all fields.", "error");
    return;
  }

  showMessage("Signing you in...", "success");

  console.log("Login attempt:", { username, password });

  setTimeout(() => {
    loginFormElement.reset();
    showMessage("Login successful! Redirecting...", "success");
  }, 1500);
});

registerFormElement.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById(
    "registerConfirmPassword",
  ).value;

  if (!name || !email || !password || !confirmPassword) {
    showMessage("Please fill in all fields.", "error");
    return;
  }

  if (password !== confirmPassword) {
    showMessage("Passwords do not match.", "error");
    return;
  }

  if (password.length < 6) {
    showMessage("Password must be at least 6 characters.", "error");
    return;
  }

  showMessage("Creating your account...", "success");

  console.log("Registration attempt:", { name, email, password });

  setTimeout(() => {
    registerFormElement.reset();
    passwordStrength.className = "strength-fill";
    showMessage(
      "Account created successfully! You can now sign in.",
      "success",
    );

    setTimeout(() => {
      registerForm.classList.remove("active");
      registerForm.classList.remove("form-animation");

      setTimeout(() => {
        loginForm.classList.remove("inactive");
        loginForm.classList.add("form-animation");
      }, 10);
    }, 2000);
  }, 1500);
});

// Add animation to form inputs on focus
document.querySelectorAll(".input-group input").forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.style.transform = "translateY(-2px)";
  });

  input.addEventListener("blur", function () {
    this.parentElement.style.transform = "translateY(0)";
  });
});
