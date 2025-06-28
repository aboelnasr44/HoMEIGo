        // Login Page JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Get form elements
  const loginForm = document.getElementById("loginForm")
  const emailInput = document.getElementById("email")
  const passwordInput = document.getElementById("password")
  const passwordToggle = document.getElementById("passwordToggle")
  const loginBtn = document.getElementById("loginBtn")
  const alertContainer = document.getElementById("alertContainer")
  const rememberCheckbox = document.getElementById("remember")

  // Social login buttons
  const googleLoginBtn = document.getElementById("googleLogin")
  const facebookLoginBtn = document.getElementById("facebookLogin")
  const githubLoginBtn = document.getElementById("githubLogin")

  // Links
  const forgotPasswordLink = document.getElementById("forgotPassword")
  const signupLink = document.getElementById("signupLink")

  // ===== PASSWORD TOGGLE FUNCTIONALITY =====
  passwordToggle.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
    passwordInput.setAttribute("type", type)

    const icon = passwordToggle.querySelector("i")
    if (type === "password") {
      icon.classList.remove("fa-eye-slash")
      icon.classList.add("fa-eye")
    } else {
      icon.classList.remove("fa-eye")
      icon.classList.add("fa-eye-slash")
    }
  })

  // ===== FORM VALIDATION =====
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  function validatePassword(password) {
    return password.length >= 6
  }

  function showAlert(message, type = "danger") {
    const alertHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                <i class="fas fa-${type === "success" ? "check-circle" : type === "warning" ? "exclamation-triangle" : "exclamation-circle"}"></i>
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `
    alertContainer.innerHTML = alertHTML

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      const alert = alertContainer.querySelector(".alert")
      if (alert) {
        const bsAlert = new bootstrap.Alert(alert)
        bsAlert.close()
      }
    }, 5000)
  }

  function setLoadingState(isLoading) {
    const btnText = loginBtn.querySelector(".btn-text")
    const btnLoading = loginBtn.querySelector(".btn-loading")

    if (isLoading) {
      btnText.classList.add("d-none")
      btnLoading.classList.remove("d-none")
      loginBtn.disabled = true
    } else {
      btnText.classList.remove("d-none")
      btnLoading.classList.add("d-none")
      loginBtn.disabled = false
    }
  }

  // ===== REAL-TIME VALIDATION =====
  emailInput.addEventListener("input", function () {
    const email = this.value.trim()
    if (email && !validateEmail(email)) {
      this.classList.add("is-invalid")
      this.classList.remove("is-valid")
    } else if (email) {
      this.classList.add("is-valid")
      this.classList.remove("is-invalid")
    } else {
      this.classList.remove("is-valid", "is-invalid")
    }
  })

  passwordInput.addEventListener("input", function () {
    const password = this.value
    if (password && !validatePassword(password)) {
      this.classList.add("is-invalid")
      this.classList.remove("is-valid")
    } else if (password) {
      this.classList.add("is-valid")
      this.classList.remove("is-invalid")
    } else {
      this.classList.remove("is-valid", "is-invalid")
    }
  })

  // ===== FORM SUBMISSION =====
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const email = emailInput.value.trim()
    const password = passwordInput.value
    const remember = rememberCheckbox.checked

    // Clear previous alerts
    alertContainer.innerHTML = ""

    // Validate inputs
    let isValid = true

    if (!email) {
      emailInput.classList.add("is-invalid")
      isValid = false
    } else if (!validateEmail(email)) {
      emailInput.classList.add("is-invalid")
      isValid = false
    }

    if (!password) {
      passwordInput.classList.add("is-invalid")
      isValid = false
    } else if (!validatePassword(password)) {
      passwordInput.classList.add("is-invalid")
      isValid = false
    }

    if (!isValid) {
      showAlert("Please fill in all fields correctly.")
      return
    }

    // Simulate login process
    setLoadingState(true)

    // Simulate API call
    setTimeout(() => {
      setLoadingState(false)

      // Demo credentials for testing
      if (email === "demo@example.com" && password === "password") {
        showAlert("Login successful! Redirecting to dashboard...", "success")

        // Store login state if remember me is checked
        if (remember) {
          localStorage.setItem("rememberLogin", "true")
          localStorage.setItem("userEmail", email)
        }

        // Simulate redirect
        setTimeout(() => {
          showAlert("Redirecting to dashboard...", "success")
          // window.location.href = 'dashboard.html';
        }, 1500)
      } else {
        showAlert("Invalid email or password. Try: demo@example.com / password")
      }
    }, 2000)
  })

  // ===== SOCIAL LOGIN HANDLERS =====
  googleLoginBtn.addEventListener("click", () => {
    showAlert("Google login integration would be implemented here.", "warning")
    // In a real application, you would integrate with Google OAuth
    console.log("Google login clicked")
  })

  facebookLoginBtn.addEventListener("click", () => {
    showAlert("Facebook login integration would be implemented here.", "warning")
    // In a real application, you would integrate with Facebook Login
    console.log("Facebook login clicked")
  })

  githubLoginBtn.addEventListener("click", () => {
    showAlert("GitHub login integration would be implemented here.", "warning")
    // In a real application, you would integrate with GitHub OAuth
    console.log("GitHub login clicked")
  })

  // ===== LINK HANDLERS =====
  forgotPasswordLink.addEventListener("click", (e) => {
    e.preventDefault()
    showAlert("Forgot password functionality would be implemented here.", "warning")
    console.log("Forgot password clicked")
  })

  signupLink.addEventListener("click", (e) => {
    e.preventDefault()
    showAlert("Redirecting to signup page...", "warning")
    // window.location.href = 'signup.html';
    console.log("Signup link clicked")
  })

  // ===== REMEMBER ME FUNCTIONALITY =====
  // Check if user should be remembered
  if (localStorage.getItem("rememberLogin") === "true") {
    const savedEmail = localStorage.getItem("userEmail")
    if (savedEmail) {
      emailInput.value = savedEmail
      rememberCheckbox.checked = true
    }
  }

  // ===== KEYBOARD SHORTCUTS =====
  document.addEventListener("keydown", (e) => {
    // Enter key to submit form when focused on form elements
    if (e.key === "Enter" && (e.target === emailInput || e.target === passwordInput)) {
      loginForm.dispatchEvent(new Event("submit"))
    }

    // Escape key to clear form
    if (e.key === "Escape") {
      loginForm.reset()
      alertContainer.innerHTML = ""
      emailInput.classList.remove("is-valid", "is-invalid")
      passwordInput.classList.remove("is-valid", "is-invalid")
    }
  })

  // ===== SMOOTH ANIMATIONS =====
  // Add entrance animations
  const animateElements = document.querySelectorAll(".login-container, .brand-section")
  animateElements.forEach((el, index) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"

    setTimeout(() => {
      el.style.transition = "all 0.6s ease"
      el.style.opacity = "1"
      el.style.transform = "translateY(0)"
    }, index * 200)
  })

  // ===== FOCUS MANAGEMENT =====
  // Auto-focus email input
  emailInput.focus()

  // ===== UTILITY FUNCTIONS =====
  function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  // ===== RESPONSIVE ENHANCEMENTS =====
  function handleResize() {
    // Add any responsive JavaScript logic here
    const isMobile = window.innerWidth <= 768

    if (isMobile) {
      // Mobile-specific enhancements
      document.body.classList.add("mobile-view")
    } else {
      document.body.classList.remove("mobile-view")
    }
  }

  window.addEventListener("resize", debounce(handleResize, 250))
  handleResize() // Initial call

  // ===== ACCESSIBILITY ENHANCEMENTS =====
  // Announce form errors to screen readers
  function announceError(message) {
    const announcement = document.createElement("div")
    announcement.setAttribute("aria-live", "polite")
    announcement.setAttribute("aria-atomic", "true")
    announcement.className = "sr-only"
    announcement.textContent = message
    document.body.appendChild(announcement)

    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }

  // ===== PERFORMANCE OPTIMIZATIONS =====
  // Preload critical resources
  const preloadLinks = ["https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"]

  preloadLinks.forEach((href) => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "style"
    link.href = href
    document.head.appendChild(link)
  })

  console.log("Login page initialized successfully!")
})

// ===== GLOBAL ERROR HANDLER =====
window.addEventListener("error", (e) => {
  console.error("JavaScript error:", e.error)
  // In production, you might want to send this to an error tracking service
})

// ===== SERVICE WORKER REGISTRATION (Optional) =====
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // navigator.serviceWorker.register('/sw.js')
    //     .then(registration => console.log('SW registered'))
    //     .catch(error => console.log('SW registration failed'));
  })
}