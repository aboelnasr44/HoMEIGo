document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const sentEmailElement = document.getElementById("sent-email")
  const continueBtn = document.getElementById("continue-to-verification")
  const backToRequestBtn = document.getElementById("back-to-request")

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

  // Load email from localStorage
  const resetEmail = localStorage.getItem("resetEmail")
  if (resetEmail) {
    sentEmailElement.textContent = resetEmail
  } else {
    // If no email found, redirect back to step 1
    showToast("Please start the reset process again", "warning")
    setTimeout(() => {
      window.location.href = "./step1.html"
    }, 2000)
  }

  // Button Event Listeners
  continueBtn.addEventListener("click", () => {
    showToast("Proceeding to verification...", "info")
    setTimeout(() => {
      window.location.href = "./step3.html"
    }, 1000)
  })

  backToRequestBtn.addEventListener("click", () => {
    // Clear stored email
    localStorage.removeItem("resetEmail")
    showToast("Going back to email entry...", "info")
    setTimeout(() => {
      window.location.href = "./step1.html"
    }, 1000)
  })

  console.log("Step 2 - Email Sent initialized successfully!")
})
