        // Forgot Password Page JavaScript
        document.addEventListener("DOMContentLoaded", () => {
          // Get form elements
          const resetForm = document.getElementById("resetForm")
          const emailInput = document.getElementById("email")
          const resetBtn = document.getElementById("resetBtn")
          const alertContainer = document.getElementById("alertContainer")
          const successMessage = document.getElementById("successMessage")

          // Toast
          const toastEl = document.getElementById("toast")
          const toastMessage = document.getElementById("toast-message")

          // Bootstrap Toast
          let toast = null
          if (window.bootstrap && window.bootstrap.Toast) {
            toast = new window.bootstrap.Toast(toastEl)
          }

          // ===== FORM VALIDATION =====
          function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            return emailRegex.test(email)
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
            const btnText = resetBtn.querySelector(".btn-text")
            const btnLoading = resetBtn.querySelector(".btn-loading")

            if (isLoading) {
              btnText.classList.add("d-none")
              btnLoading.classList.remove("d-none")
              resetBtn.disabled = true
            } else {
              btnText.classList.remove("d-none")
              btnLoading.classList.add("d-none")
              resetBtn.disabled = false
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

          function showSuccess() {
            resetForm.style.display = "none"
            successMessage.classList.remove("d-none")

            // Auto-redirect after 5 seconds
            setTimeout(() => {
              window.location.href = "login.html"
            }, 5000)
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

          // ===== FORM SUBMISSION =====
          resetForm.addEventListener("submit", (e) => {
            e.preventDefault()

            const email = emailInput.value.trim()

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

            if (!isValid) {
              showAlert("Please enter a valid email address.")
              return
            }

            // Simulate password reset process
            setLoadingState(true)

            // Simulate API call
            setTimeout(() => {
              setLoadingState(false)

              // Simulate different scenarios
              const random = Math.random()

              if (random > 0.2) {
                // 80% chance of success
                showSuccess()
                showToast("Password reset email sent successfully!", "success")
              } else {
                // 20% chance of error
                showAlert("Email not found in our system. Please check your email address or create a new account.", "danger")
                showToast("Email not found", "error")
              }
            }, 2000)
          })

          // ===== KEYBOARD SHORTCUTS =====
          document.addEventListener("keydown", (e) => {
            // Enter key to submit form when focused on email input
            if (e.key === "Enter" && e.target === emailInput) {
              e.preventDefault()
              resetForm.dispatchEvent(new Event("submit"))
            }

            // Escape key to clear form
            if (e.key === "Escape") {
              resetForm.reset()
              alertContainer.innerHTML = ""
              emailInput.classList.remove("is-valid", "is-invalid")
              showToast("Form cleared", "info")
            }
          })

          // ===== SMOOTH ANIMATIONS =====
          // Add entrance animations
          const animateElements = document.querySelectorAll(".forgot-container, .brand-section")
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

          console.log("Forgot password page initialized successfully!")
        })

        // ===== GLOBAL ERROR HANDLER =====
        window.addEventListener("error", (e) => {
          console.error("JavaScript error:", e.error)
        })

        // Add loading animation to page
        window.addEventListener("load", () => {
          document.body.classList.add("loaded")
        })