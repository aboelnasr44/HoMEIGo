document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const form = document.getElementById("new-password-form")
  const newPasswordInput = document.getElementById("new-password")
  const confirmPasswordInput = document.getElementById("confirm-new-password")
  const resetBtn = document.getElementById("reset-password-btn")
  const togglePasswordBtn = document.getElementById("toggle-password")
  const toggleConfirmPasswordBtn = document.getElementById("toggle-confirm-password")
  const passwordMeter = document.getElementById("password-meter")
  const passwordMatch = document.getElementById("password-match")

  const passwordRequirements = {
    length: document.getElementById("req-length"),
    uppercase: document.getElementById("req-uppercase"),
    lowercase: document.getElementById("req-lowercase"),
    number: document.getElementById("req-number"),
    special: document.getElementById("req-special"),
  }

  // Initialize Bootstrap Toast
  let toast = null
  const toastEl = document.getElementById("toast")
  const toastMessage = document.getElementById("toast-message")

  if (window.bootstrap && window.bootstrap.Toast) {
    toast = new window.bootstrap.Toast(toastEl)
  }

  // Utility Functions
  function showToast(message, type = "info") {
    if (!toast) return

    const iconMap = {
      success: "fa-check-circle text-success",
      error: "fa-exclamation-circle text-danger",
      warning: "fa-exclamation-triangle text-warning",
      info: "fa-info-circle text-primary",
    }

    const toastHeader = toastEl.querySelector(".toast-header i")
    if (toastHeader) {
      toastHeader.className = `fas ${iconMap[type]} me-2`
    }

    toastMessage.textContent = message
    toast.show()
  }

  function setLoadingState(button, isLoading) {
    const btnText = button.querySelector(".btn-text")
    const btnLoading = button.querySelector(".btn-loading")

    if (isLoading) {
      button.classList.add("loading")
      button.disabled = true
      if (btnText) btnText.classList.add("d-none")
      if (btnLoading) btnLoading.classList.remove("d-none")
    } else {
      button.classList.remove("loading")
      button.disabled = false
      if (btnText) btnText.classList.remove("d-none")
      if (btnLoading) btnLoading.classList.add("d-none")
    }
  }

  // Check if user came from previous steps
  const resetEmail = localStorage.getItem("resetEmail")
  if (!resetEmail) {
    showToast("Please start the reset process from the beginning", "warning")
    setTimeout(() => {
      window.location.href = "step1-email.html"
    }, 2000)
    return
  }

  // Password Strength Checking
  function isPasswordStrong(password) {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    }

    return Object.values(requirements).every((req) => req)
  }

  function checkPasswordStrength() {
    const password = newPasswordInput.value
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    }

    // Update requirement indicators
    Object.keys(requirements).forEach((key) => {
      const element = passwordRequirements[key]
      if (requirements[key]) {
        element.classList.add("met")
        element.classList.remove("not-met")
        element.innerHTML = `<i class="fas fa-check"></i> ${element.textContent.replace(/^.*?\s/, "")}`
      } else {
        element.classList.add("not-met")
        element.classList.remove("met")
        element.innerHTML = element.textContent.replace(/<i.*?<\/i>\s*/, "")
      }
    })

    // Update strength meter
    const strength = Object.values(requirements).filter(Boolean).length
    passwordMeter.className = "password-strength-meter"

    if (password.length === 0) {
      passwordMeter.style.width = "0%"
    } else if (strength <= 2) {
      passwordMeter.classList.add("weak")
    } else if (strength <= 4) {
      passwordMeter.classList.add("medium")
    } else {
      passwordMeter.classList.add("strong")
    }

    checkPasswordMatch()
  }

  function checkPasswordMatch() {
    const password = newPasswordInput.value
    const confirmPassword = confirmPasswordInput.value

    if (confirmPassword.length === 0) {
      passwordMatch.textContent = ""
      passwordMatch.classList.remove("match", "no-match")
    } else if (password === confirmPassword) {
      passwordMatch.textContent = "✓ Passwords match"
      passwordMatch.classList.add("match")
      passwordMatch.classList.remove("no-match")
    } else {
      passwordMatch.textContent = "✗ Passwords do not match"
      passwordMatch.classList.add("no-match")
      passwordMatch.classList.remove("match")
    }
  }

  // Password Toggle Functionality
  function togglePasswordVisibility(input, toggleButton) {
    const icon = toggleButton.querySelector("i")
    if (input.type === "password") {
      input.type = "text"
      icon.classList.remove("fa-eye")
      icon.classList.add("fa-eye-slash")
    } else {
      input.type = "password"
      icon.classList.remove("fa-eye-slash")
      icon.classList.add("fa-eye")
    }
  }

  // Event Listeners
  newPasswordInput.addEventListener("input", checkPasswordStrength)
  confirmPasswordInput.addEventListener("input", checkPasswordMatch)

  togglePasswordBtn.addEventListener("click", () => {
    togglePasswordVisibility(newPasswordInput, togglePasswordBtn)
  })

  toggleConfirmPasswordBtn.addEventListener("click", () => {
    togglePasswordVisibility(confirmPasswordInput, toggleConfirmPasswordBtn)
  })

  // Form Handler
  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const password = newPasswordInput.value
    const confirmPassword = confirmPasswordInput.value

    if (!password || !confirmPassword) {
      showToast("Please fill in all password fields", "error")
      return
    }

    if (password !== confirmPassword) {
      showToast("Passwords do not match", "error")
      return
    }

    if (!isPasswordStrong(password)) {
      showToast("Please meet all password requirements", "error")
      return
    }

    setLoadingState(resetBtn, true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      showToast("Password reset successfully!", "success")

      // Redirect to success page
      setTimeout(() => {
        window.location.href = "step5-success.html"
      }, 1000)
    } catch (error) {
      showToast("Failed to reset password. Please try again.", "error")
    } finally {
      setLoadingState(resetBtn, false)
    }
  })

  // Auto-focus new password input
  newPasswordInput.focus()

  console.log("Step 4 - New Password initialized successfully!")
})
