document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const form = document.getElementById("request-reset-form")
  const emailInput = document.getElementById("reset-email")
  const submitBtn = document.getElementById("send-reset-btn")
  const backToLoginLink = document.getElementById("back-to-login")

  // Initialize Bootstrap Toast
  let toast = null
  const toastEl = document.getElementById("toast")
  const toastMessage = document.getElementById("toast-message")

  if (window.bootstrap && window.bootstrap.Toast) {
    toast = new window.bootstrap.Toast(toastEl)
  }

  // Utility Functions
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

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

  function showFieldError(field, message) {
    field.classList.add("is-invalid")
    field.classList.remove("is-valid")
    const feedback = field.parentNode.querySelector(".invalid-feedback")
    if (feedback) {
      feedback.textContent = message
    }
  }

  function clearFieldError(field) {
    field.classList.remove("is-invalid")
    field.classList.add("is-valid")
  }

  // Form Handler
  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const email = emailInput.value.trim()

    if (!email) {
      showFieldError(emailInput, "Email is required")
      return
    }

    if (!validateEmail(email)) {
      showFieldError(emailInput, "Please enter a valid email address")
      return
    }

    clearFieldError(emailInput)
    setLoadingState(submitBtn, true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Store email in localStorage for next step
      localStorage.setItem("resetEmail", email)

      showToast("Reset link sent successfully!", "success")

      // Redirect to next step
      setTimeout(() => {
        window.location.href = "./step2.html"
      }, 1000)
    } catch (error) {
      showToast("Failed to send reset link. Please try again.", "error")
    } finally {
      setLoadingState(submitBtn, false)
    }
  })

  // Email Input Validation
  emailInput.addEventListener("input", () => {
    const email = emailInput.value.trim()
    if (email && validateEmail(email)) {
      clearFieldError(emailInput)
    }
  })

  // Back to Login Handler
  backToLoginLink.addEventListener("click", (e) => {
    e.preventDefault()
    showToast("Redirecting to login...", "info")
    setTimeout(() => {
      window.location.href = "../login/login.html"
    }, 1000)
  })

  // Auto-focus email input
  emailInput.focus()

  console.log("Step 1 - Email Request initialized successfully!")
})
