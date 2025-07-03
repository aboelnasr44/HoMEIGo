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

  // Toast
  const toastEl = document.getElementById("toast")
  const toastMessage = document.getElementById("toast-message")

  // Bootstrap Toast
  let toast = null
  if (window.bootstrap && window.bootstrap.Toast) {
    toast = new window.bootstrap.Toast(toastEl)
  }

  // ===== PASSWORD TOGGLE FUNCTIONALITY =====
  function setupPasswordToggle(input, toggle) {
    if (!input || !toggle) return

    toggle.addEventListener("click", () => {
      const type = input.getAttribute("type") === "password" ? "text" : "password"
      input.setAttribute("type", type)
      const icon = toggle.querySelector("i")
      if (icon) {
        if (type === "password") {
          icon.classList.remove("fa-eye-slash")
          icon.classList.add("fa-eye")
        } else {
          icon.classList.remove("fa-eye")
          icon.classList.add("fa-eye-slash")
        }
      }
    })
  }

  setupPasswordToggle(passwordInput, passwordToggle)

  // ===== FORM VALIDATION =====
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  function validatePassword(password) {
    return password.length >= 6
  }

  function showAlert(message, type = "danger") {
    const iconMap = {
      success: "fa-check-circle",
      warning: "fa-exclamation-triangle",
      danger: "fa-exclamation-circle",
      info: "fa-info-circle",
    }

    const alertHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                <i class="fas ${iconMap[type]} me-2"></i>
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `
    alertContainer.innerHTML = alertHTML

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      const alert = alertContainer.querySelector(".alert")
      if (alert && window.bootstrap && window.bootstrap.Alert) {
        const bsAlert = new window.bootstrap.Alert(alert)
        bsAlert.close()
      }
    }, 5000)
  }

  function showToast(message, type = "info") {
    if (!toast) return

    const iconMap = {
      success: "fa-check-circle text-success",
      warning: "fa-exclamation-triangle text-warning",
      error: "fa-exclamation-circle text-danger",
      info: "fa-info-circle text-primary",
    }

    const toastHeader = toastEl.querySelector(".toast-header i")
    if (toastHeader) {
      toastHeader.className = `fas ${iconMap[type]} me-2`
    }
    toastMessage.textContent = message
    toast.show()
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

  function showFieldError(field, message) {
    field.classList.add("is-invalid")
    const feedback = field.parentNode.querySelector(".invalid-feedback")
    if (feedback) {
      feedback.textContent = message
      feedback.style.display = "block"
    }
  }

  function clearFieldError(field) {
    field.classList.remove("is-invalid")
    field.classList.add("is-valid")
    const feedback = field.parentNode.querySelector(".invalid-feedback")
    if (feedback) {
      feedback.style.display = "none"
    }
  }

  // ===== REAL-TIME VALIDATION =====
  emailInput.addEventListener("input", function () {
    const email = this.value.trim()
    if (email && !validateEmail(email)) {
      showFieldError(this, "Please enter a valid email address")
    } else if (email) {
      clearFieldError(this)
    } else {
      this.classList.remove("is-valid", "is-invalid")
    }
  })

  passwordInput.addEventListener("input", function () {
    const password = this.value
    if (password && !validatePassword(password)) {
      showFieldError(this, "Password must be at least 6 characters long")
    } else if (password) {
      clearFieldError(this)
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
      showFieldError(emailInput, "Email is required")
      isValid = false
    } else if (!validateEmail(email)) {
      showFieldError(emailInput, "Please enter a valid email address")
      isValid = false
    }

    if (!password) {
      showFieldError(passwordInput, "Password is required")
      isValid = false
    } else if (!validatePassword(password)) {
      showFieldError(passwordInput, "Password must be at least 6 characters long")
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
      if (email === "demo@homeigo.com" && password === "password123") {
        const userData = {
          firstName: "Sarah",
          lastName: "Johnson",
          email: email,
          phone: "+1 (555) 123-4567",
          userType: "tourist",
          bio: "Travel enthusiast exploring authentic local experiences around the world.",
          loginTime: new Date().toISOString(),
          rememberMe: remember,
          isNewUser: false,
        }

        localStorage.setItem("currentUser", JSON.stringify(userData))
        localStorage.setItem("userSession", "active")

        if (remember) {
          localStorage.setItem("rememberLogin", "true")
          localStorage.setItem("userEmail", email)
          localStorage.setItem("loginTimestamp", new Date().getTime().toString())
        }

        showAlert("Login successful! Welcome back to Homeigo.", "success")
        showToast("Welcome back! Redirecting to your profile...", "success")

        setTimeout(() => {
          window.location.href = "profile.html"
        }, 1500)
      } else if (email === "host@homeigo.com" && password === "host123") {
        const userData = {
          firstName: "Maria",
          lastName: "Rodriguez",
          email: email,
          phone: "+1 (555) 987-6543",
          userType: "host",
          location: "Barcelona, Spain",
          experienceType: "cultural",
          languages: "Spanish, English, French",
          bio: "Local host sharing authentic Spanish culture and cuisine experiences.",
          loginTime: new Date().toISOString(),
          rememberMe: remember,
          isNewUser: false,
        }

        localStorage.setItem("currentUser", JSON.stringify(userData))
        localStorage.setItem("userSession", "active")

        if (remember) {
          localStorage.setItem("rememberLogin", "true")
          localStorage.setItem("userEmail", email)
          localStorage.setItem("userType", "host")
        }

        showAlert("Host login successful! Welcome to your host dashboard.", "success")
        showToast("Welcome Host! Redirecting to your dashboard...", "success")

        setTimeout(() => {
          window.location.href = "host-profile.html"
        }, 1500)
      } else if (email === "tourist@homeigo.com" && password === "tourist123") {
        const userData = {
          firstName: "John",
          lastName: "Smith",
          email: email,
          phone: "+1 (555) 456-7890",
          userType: "tourist",
          interests: "Culture, Food, Adventure, History",
          bio: "Adventure seeker looking for unique local experiences.",
          loginTime: new Date().toISOString(),
          rememberMe: remember,
          isNewUser: false,
        }

        localStorage.setItem("currentUser", JSON.stringify(userData))
        localStorage.setItem("userSession", "active")

        if (remember) {
          localStorage.setItem("rememberLogin", "true")
          localStorage.setItem("userEmail", email)
          localStorage.setItem("userType", "tourist")
        }

        showAlert("Tourist login successful! Start exploring experiences.", "success")
        showToast("Welcome Explorer! Redirecting to your profile...", "success")

        setTimeout(() => {
          window.location.href = "profile.html"
        }, 1500)
      } else {
        showAlert(
          "Invalid email or password. Try demo accounts:<br><strong>demo@homeigo.com / password123</strong><br><strong>host@homeigo.com / host123</strong><br><strong>tourist@homeigo.com / tourist123</strong>",
        )
      }
    }, 2000)
  })

  // ===== SOCIAL LOGIN HANDLERS =====
  googleLoginBtn.addEventListener("click", () => {
    showToast("Google login integration would be implemented here.", "info")
    console.log("Google login clicked")
  })

  facebookLoginBtn.addEventListener("click", () => {
    showToast("Facebook login integration would be implemented here.", "info")
    console.log("Facebook login clicked")
  })

  githubLoginBtn.addEventListener("click", () => {
    showToast("GitHub login integration would be implemented here.", "info")
    console.log("GitHub login clicked")
  })

  // ===== LINK HANDLERS =====
  forgotPasswordLink.addEventListener("click", (e) => {
    e.preventDefault()
    showAlert(
      "Password reset functionality would be implemented here. An email would be sent to reset your password.",
      "info",
    )
    showToast("Password reset email would be sent", "info")
    console.log("Forgot password clicked")
  })

  signupLink.addEventListener("click", (e) => {
    // Allow default navigation but show toast
    showToast("Redirecting to signup page...", "info")
    console.log("Signup link clicked")
  })

  // ===== REMEMBER ME FUNCTIONALITY =====
  // Check if user should be remembered (within 30 days)
  if (localStorage.getItem("rememberLogin") === "true") {
    const savedEmail = localStorage.getItem("userEmail")
    const loginTimestamp = localStorage.getItem("loginTimestamp")

    if (savedEmail && loginTimestamp) {
      const thirtyDaysAgo = new Date().getTime() - 30 * 24 * 60 * 60 * 1000

      if (Number.parseInt(loginTimestamp) > thirtyDaysAgo) {
        emailInput.value = savedEmail
        rememberCheckbox.checked = true
        showToast("Welcome back! We remembered you.", "success")
      } else {
        // Clear expired remember me data
        localStorage.removeItem("rememberLogin")
        localStorage.removeItem("userEmail")
        localStorage.removeItem("loginTimestamp")
      }
    }
  }

  // ===== KEYBOARD SHORTCUTS =====
  document.addEventListener("keydown", (e) => {
    // Enter key to submit form when focused on form elements
    if (e.key === "Enter" && (e.target === emailInput || e.target === passwordInput)) {
      e.preventDefault()
      loginForm.dispatchEvent(new Event("submit"))
    }

    // Escape key to clear form
    if (e.key === "Escape") {
      loginForm.reset()
      alertContainer.innerHTML = ""
      emailInput.classList.remove("is-valid", "is-invalid")
      passwordInput.classList.remove("is-valid", "is-invalid")
      showToast("Form cleared", "info")
    }

    // Ctrl/Cmd + K to focus email input
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault()
      emailInput.focus()
      showToast("Email field focused", "info")
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
  // Auto-focus email input on load
  setTimeout(() => {
    emailInput.focus()
  }, 300)

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
    const isMobile = window.innerWidth <= 768
    if (isMobile) {
      document.body.classList.add("mobile-view")
    } else {
      document.body.classList.remove("mobile-view")
    }
  }

  window.addEventListener("resize", debounce(handleResize, 250))
  handleResize()

  // ===== ACCESSIBILITY ENHANCEMENTS =====
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

  // ===== SECURITY ENHANCEMENTS =====
  // Clear sensitive data on page unload
  window.addEventListener("beforeunload", () => {
    if (!rememberCheckbox.checked) {
      passwordInput.value = ""
    }
  })

  // Detect if caps lock is on
  function detectCapsLock(e) {
    const capsLockOn = e.getModifierState && e.getModifierState("CapsLock")
    if (capsLockOn && e.target === passwordInput) {
      showToast("Caps Lock is on", "warning")
    }
  }

  passwordInput.addEventListener("keydown", detectCapsLock)

  console.log("Login page initialized successfully!")
})

// ===== GLOBAL ERROR HANDLER =====
window.addEventListener("error", (e) => {
  console.error("JavaScript error:", e.error)
})

// Add loading animation to page
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// ===== AUTO-LOGOUT FUNCTIONALITY =====
let inactivityTimer
const INACTIVITY_TIME = 30 * 60 * 1000 // 30 minutes

function resetInactivityTimer() {
  clearTimeout(inactivityTimer)
  inactivityTimer = setTimeout(() => {
    if (localStorage.getItem("currentUser")) {
      localStorage.removeItem("currentUser")
      alert("You have been logged out due to inactivity.")
      // window.location.reload();
    }
  }, INACTIVITY_TIME)
}

// Reset timer on user activity
document.addEventListener("mousemove", resetInactivityTimer)
document.addEventListener("keypress", resetInactivityTimer)
document.addEventListener("click", resetInactivityTimer)
document.addEventListener("scroll", resetInactivityTimer)

// Initialize timer
resetInactivityTimer()
