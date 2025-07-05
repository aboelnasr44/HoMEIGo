document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const form = document.getElementById("verification-form")
  const verificationInputs = document.querySelectorAll(".verification-input")
  const verifyBtn = document.getElementById("verify-code-btn")
  const resendLink = document.getElementById("resend-code")

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

  // Check if user came from previous step
  const resetEmail = localStorage.getItem("resetEmail")
  if (!resetEmail) {
    showToast("Please start the reset process from the beginning", "warning")
    setTimeout(() => {
      window.location.href = "./step1.html"
    }, 2000)
    return
  }

  // Verification Code Input Handling
  verificationInputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      if (e.target.value && index < verificationInputs.length - 1) {
        verificationInputs[index + 1].focus()
      }
    })

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !e.target.value && index > 0) {
        verificationInputs[index - 1].focus()
      }
    })

    input.addEventListener("keypress", (e) => {
      if (!/[0-9]/.test(e.key)) {
        e.preventDefault()
      }
    })

    input.addEventListener("paste", (e) => {
      e.preventDefault()
      const pasteData = e.clipboardData.getData("text")
      if (/^\d+$/.test(pasteData)) {
        const digits = pasteData.split("")
        for (let i = 0; i < Math.min(digits.length, verificationInputs.length - index); i++) {
          verificationInputs[index + i].value = digits[i]
          if (index + i < verificationInputs.length - 1) {
            verificationInputs[index + i + 1].focus()
          }
        }
      }
    })
  })

  // Form Handler
  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const code = Array.from(verificationInputs)
      .map((input) => input.value)
      .join("")

    if (code.length !== 6 || !/^\d{6}$/.test(code)) {
      showToast("Please enter a valid 6-digit code", "error")
      return
    }

    setLoadingState(verifyBtn, true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      showToast("Code verified successfully!", "success")

      // Redirect to next step
      setTimeout(() => {
        window.location.href = "./step4.html"
      }, 1000)
    } catch (error) {
      showToast("Invalid verification code. Please try again.", "error")
    } finally {
      setLoadingState(verifyBtn, false)
    }
  })

  // Resend Code Handler
  resendLink.addEventListener("click", async (e) => {
    e.preventDefault()

    resendLink.style.pointerEvents = "none"
    resendLink.textContent = "Sending..."

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      showToast("Verification code resent!", "success")
    } catch (error) {
      showToast("Failed to resend code", "error")
    } finally {
      resendLink.style.pointerEvents = "auto"
      resendLink.textContent = "Resend"
    }
  })

  // Auto-focus first input
  verificationInputs[0].focus()

  console.log("Step 3 - Verification initialized successfully!")
})
