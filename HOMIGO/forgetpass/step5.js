document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const goToLoginBtn = document.getElementById("go-to-login")

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

  // Button Event Listener
  goToLoginBtn.addEventListener("click", () => {
    // Clear stored email data
    localStorage.removeItem("resetEmail")

    showToast("Redirecting to login...", "info")
    setTimeout(() => {
      window.location.href = "../login/login.html"
    }, 1000)
  })

  // Auto-redirect after 10 seconds
  setTimeout(() => {
    if (confirm("Would you like to go to the login page now?")) {
      goToLoginBtn.click()
    }
  }, 10000)

  console.log("Step 5 - Success initialized successfully!")
})
