
        // Signup Page JavaScript
        document.addEventListener("DOMContentLoaded", () => {
            // Get form elements
            const signupForm = document.getElementById("signupForm");
            const firstNameInput = document.getElementById("firstName");
            const lastNameInput = document.getElementById("lastName");
            const emailInput = document.getElementById("email");
            const phoneInput = document.getElementById("phone");
            const passwordInput = document.getElementById("password");
            const confirmPasswordInput = document.getElementById("confirmPassword");
            const passwordToggle = document.getElementById("passwordToggle");
            const confirmPasswordToggle = document.getElementById("confirmPasswordToggle");
            const signupBtn = document.getElementById("signupBtn");
            const signupBtnText = document.getElementById("signupBtnText");
            const loadingText = document.getElementById("loadingText");
            const alertContainer = document.getElementById("alertContainer");
            const termsCheckbox = document.getElementById("terms");
            const newsletterCheckbox = document.getElementById("newsletter");
            const userTypeInput = document.getElementById("userType");

            // User type elements
            const userTypeCards = document.querySelectorAll(".user-type-card");
            const hostFields = document.getElementById("hostFields");
            const touristFields = document.getElementById("touristFields");

            // Host-specific fields
            const locationInput = document.getElementById("location");
            const experienceTypeInput = document.getElementById("experienceType");
            const languagesInput = document.getElementById("languages");

            // Tourist-specific fields
            const interestsInput = document.getElementById("interests");

            // Password strength elements
            const strengthFill = document.getElementById("strengthFill");
            const strengthLevel = document.getElementById("strengthLevel");

            // Social signup buttons
            const googleSignupBtn = document.getElementById("googleSignup");
            const facebookSignupBtn = document.getElementById("facebookSignup");
            const githubSignupBtn = document.getElementById("githubSignup");

            // Links
            const loginLink = document.getElementById("loginLink");

            // Toast
            const toastEl = document.getElementById("toast");
            const toast = new bootstrap.Toast(toastEl);
            const toastMessage = document.getElementById("toast-message");

            // ===== USER TYPE SELECTION =====
            userTypeCards.forEach(card => {
                card.addEventListener("click", function() {
                    const userType = this.getAttribute("data-type");
                    selectUserType(userType);
                });

                card.addEventListener("keydown", function(e) {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        const userType = this.getAttribute("data-type");
                        selectUserType(userType);
                    }
                });
            });

            function selectUserType(type) {
                // Update UI
                userTypeCards.forEach(card => card.classList.remove("active"));
                document.querySelector(`[data-type="${type}"]`).classList.add("active");
                
                // Set hidden input
                userTypeInput.value = type;
                
                // Show/hide relevant fields
                if (type === "host") {
                    hostFields.classList.add("active");
                    touristFields.style.display = "none";
                    
                    // Update button text
                    signupBtnText.innerHTML = '<i class="fas fa-home me-2"></i>Create Host Account';
                    loadingText.textContent = "Creating Host Account...";
                    
                    // Make host fields required
                    locationInput.required = true;
                    experienceTypeInput.required = true;
                    languagesInput.required = true;
                    
                    // Remove tourist field requirements
                    interestsInput.required = false;
                    
                } else if (type === "tourist") {
                    hostFields.classList.remove("active");
                    touristFields.style.display = "block";
                    
                    // Update button text
                    signupBtnText.innerHTML = '<i class="fas fa-suitcase me-2"></i>Create Tourist Account';
                    loadingText.textContent = "Creating Tourist Account...";
                    
                    // Remove host field requirements
                    locationInput.required = false;
                    experienceTypeInput.required = false;
                    languagesInput.required = false;
                    
                    // Tourist fields are optional
                    interestsInput.required = false;
                }
                
                // Clear any validation states
                clearValidationStates();
            }

            function clearValidationStates() {
                document.querySelectorAll(".form-control").forEach(input => {
                    input.classList.remove("is-valid", "is-invalid");
                });
                alertContainer.innerHTML = "";
            }

            // ===== PASSWORD TOGGLE FUNCTIONALITY =====
            function setupPasswordToggle(input, toggle) {
                toggle.addEventListener("click", () => {
                    const type = input.getAttribute("type") === "password" ? "text" : "password";
                    input.setAttribute("type", type);
                    const icon = toggle.querySelector("i");
                    if (type === "password") {
                        icon.classList.remove("fa-eye-slash");
                        icon.classList.add("fa-eye");
                    } else {
                        icon.classList.remove("fa-eye");
                        icon.classList.add("fa-eye-slash");
                    }
                });
            }

            setupPasswordToggle(passwordInput, passwordToggle);
            setupPasswordToggle(confirmPasswordInput, confirmPasswordToggle);

            // ===== FORM VALIDATION =====
            function validateName(name) {
                return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name.trim());
            }

            function validateEmail(email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            }

            function validatePhone(phone) {
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                return phoneRegex.test(phone.replace(/\s/g, ''));
            }

            function validatePassword(password) {
                return password.length >= 8;
            }

            function checkPasswordStrength(password) {
                let strength = 0;
                let level = "weak";

                // Length check
                if (password.length >= 8) strength++;
                if (password.length >= 12) strength++;

                // Character variety checks
                if (/[a-z]/.test(password)) strength++;
                if (/[A-Z]/.test(password)) strength++;
                if (/[0-9]/.test(password)) strength++;
                if (/[^A-Za-z0-9]/.test(password)) strength++;

                // Determine strength level
                if (strength <= 2) {
                    level = "weak";
                    strengthFill.className = "strength-fill weak";
                } else if (strength <= 3) {
                    level = "fair";
                    strengthFill.className = "strength-fill fair";
                } else if (strength <= 4) {
                    level = "good";
                    strengthFill.className = "strength-fill good";
                } else {
                    level = "strong";
                    strengthFill.className = "strength-fill strong";
                }

                strengthLevel.textContent = level.charAt(0).toUpperCase() + level.slice(1);
                return strength;
            }

            function validatePasswordMatch(password, confirmPassword) {
                return password === confirmPassword;
            }

            function showAlert(message, type = "danger") {
                const iconMap = {
                    success: "fa-check-circle text-success",
                    warning: "fa-exclamation-triangle text-warning",
                    danger: "fa-exclamation-circle text-danger",
                    info: "fa-info-circle text-primary",
                };

                const alertHTML = `
                    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                        <i class="fas ${iconMap[type]} me-2"></i>
                        ${message}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `;

                alertContainer.innerHTML = alertHTML;

                // Auto-dismiss after 5 seconds
                setTimeout(() => {
                    const alert = alertContainer.querySelector(".alert");
                    if (alert) {
                        const bsAlert = new bootstrap.Alert(alert);
                        bsAlert.close();
                    }
                }, 5000);
            }

            function showToast(message, type = "info") {
                const iconMap = {
                    success: "fa-check-circle text-success",
                    warning: "fa-exclamation-triangle text-warning",
                    error: "fa-exclamation-circle text-danger",
                    info: "fa-info-circle text-primary",
                };

                const toastHeader = toast._element.querySelector(".toast-header i");
                toastHeader.className = `fas ${iconMap[type]} me-2`;
                toastMessage.textContent = message;
                toast.show();
            }

            function setLoadingState(isLoading) {
                const btnText = signupBtn.querySelector(".btn-text");
                const btnLoading = signupBtn.querySelector(".btn-loading");

                if (isLoading) {
                    btnText.classList.add("d-none");
                    btnLoading.classList.remove("d-none");
                    signupBtn.disabled = true;
                } else {
                    btnText.classList.remove("d-none");
                    btnLoading.classList.add("d-none");
                    signupBtn.disabled = false;
                }
            }

            // ===== REAL-TIME VALIDATION =====
            firstNameInput.addEventListener("input", function () {
                const name = this.value.trim();
                if (name && !validateName(name)) {
                    this.classList.add("is-invalid");
                    this.classList.remove("is-valid");
                } else if (name) {
                    this.classList.add("is-valid");
                    this.classList.remove("is-invalid");
                } else {
                    this.classList.remove("is-valid", "is-invalid");
                }
            });

            lastNameInput.addEventListener("input", function () {
                const name = this.value.trim();
                if (name && !validateName(name)) {
                    this.classList.add("is-invalid");
                    this.classList.remove("is-valid");
                } else if (name) {
                    this.classList.add("is-valid");
                    this.classList.remove("is-invalid");
                } else {
                    this.classList.remove("is-valid", "is-invalid");
                }
            });

            emailInput.addEventListener("input", function () {
                const email = this.value.trim();
                if (email && !validateEmail(email)) {
                    this.classList.add("is-invalid");
                    this.classList.remove("is-valid");
                } else if (email) {
                    this.classList.add("is-valid");
                    this.classList.remove("is-invalid");
                } else {
                    this.classList.remove("is-valid", "is-invalid");
                }
            });

            phoneInput.addEventListener("input", function () {
                const phone = this.value.trim();
                if (phone && !validatePhone(phone)) {
                    this.classList.add("is-invalid");
                    this.classList.remove("is-valid");
                } else if (phone) {
                    this.classList.add("is-valid");
                    this.classList.remove("is-invalid");
                } else {
                    this.classList.remove("is-valid", "is-invalid");
                }
            });

            passwordInput.addEventListener("input", function () {
                const password = this.value;
                const strength = checkPasswordStrength(password);

                if (password && !validatePassword(password)) {
                    this.classList.add("is-invalid");
                    this.classList.remove("is-valid");
                } else if (password) {
                    this.classList.add("is-valid");
                    this.classList.remove("is-invalid");
                } else {
                    this.classList.remove("is-valid", "is-invalid");
                    strengthFill.className = "strength-fill";
                    strengthLevel.textContent = "Weak";
                }

                // Check confirm password match if it has value
                if (confirmPasswordInput.value) {
                    const match = validatePasswordMatch(password, confirmPasswordInput.value);
                    if (match) {
                        confirmPasswordInput.classList.add("is-valid");
                        confirmPasswordInput.classList.remove("is-invalid");
                    } else {
                        confirmPasswordInput.classList.add("is-invalid");
                        confirmPasswordInput.classList.remove("is-valid");
                    }
                }
            });

            confirmPasswordInput.addEventListener("input", function () {
                const password = passwordInput.value;
                const confirmPassword = this.value;

                if (confirmPassword && !validatePasswordMatch(password, confirmPassword)) {
                    this.classList.add("is-invalid");
                    this.classList.remove("is-valid");
                } else if (confirmPassword) {
                    this.classList.add("is-valid");
                    this.classList.remove("is-invalid");
                } else {
                    this.classList.remove("is-valid", "is-invalid");
                }
            });

            // ===== FORM SUBMISSION =====
            signupForm.addEventListener("submit", (e) => {
                e.preventDefault();

                // Check if user type is selected
                if (!userTypeInput.value) {
                    showAlert("Please select whether you want to join as a Tourist or Host.");
                    return;
                }

                const firstName = firstNameInput.value.trim();
                const lastName = lastNameInput.value.trim();
                const email = emailInput.value.trim();
                const phone = phoneInput.value.trim();
                const password = passwordInput.value;
                const confirmPassword = confirmPasswordInput.value;
                const termsAccepted = termsCheckbox.checked;
                const newsletterSubscribed = newsletterCheckbox.checked;
                const userType = userTypeInput.value;

                // Get type-specific fields
                let location = "", experienceType = "", languages = "", interests = "";
                
                if (userType === "host") {
                    location = locationInput.value.trim();
                    experienceType = experienceTypeInput.value;
                    languages = languagesInput.value.trim();
                } else if (userType === "tourist") {
                    interests = interestsInput.value.trim();
                }

                // Clear previous alerts
                alertContainer.innerHTML = "";

                // Validate inputs
                let isValid = true;

                if (!firstName || !validateName(firstName)) {
                    firstNameInput.classList.add("is-invalid");
                    isValid = false;
                }

                if (!lastName || !validateName(lastName)) {
                    lastNameInput.classList.add("is-invalid");
                    isValid = false;
                }

                if (!email || !validateEmail(email)) {
                    emailInput.classList.add("is-invalid");
                    isValid = false;
                }

                if (!phone || !validatePhone(phone)) {
                    phoneInput.classList.add("is-invalid");
                    isValid = false;
                }

                if (!password || !validatePassword(password)) {
                    passwordInput.classList.add("is-invalid");
                    isValid = false;
                }

                if (!confirmPassword || !validatePasswordMatch(password, confirmPassword)) {
                    confirmPasswordInput.classList.add("is-invalid");
                    isValid = false;
                }

                // Validate host-specific fields
                if (userType === "host") {
                    if (!location) {
                        locationInput.classList.add("is-invalid");
                        isValid = false;
                    }
                    if (!experienceType) {
                        experienceTypeInput.classList.add("is-invalid");
                        isValid = false;
                    }
                    if (!languages) {
                        languagesInput.classList.add("is-invalid");
                        isValid = false;
                    }
                }

                if (!termsAccepted) {
                    termsCheckbox.classList.add("is-invalid");
                    isValid = false;
                }

                if (!isValid) {
                    showAlert("Please fill in all required fields correctly and accept the terms.");
                    return;
                }

                // Check password strength
                const strength = checkPasswordStrength(password);
                if (strength < 3) {
                    showAlert("Please choose a stronger password for better security.", "warning");
                    return;
                }

                // Simulate signup process
                setLoadingState(true);

                // Simulate API call
                setTimeout(() => {
                    setLoadingState(false);

                    // Check if email already exists (demo)
                    if (email === "test@example.com") {
                        showAlert("This email is already registered. Please use a different email or sign in.");
                        return;
                    }

                    // Success
                    const accountType = userType === "host" ? "Host" : "Tourist";
                    showAlert(`${accountType} account created successfully! Please check your email to verify your account.`, "success");

                    // Store user data (demo)
                    const userData = {
                        firstName,
                        lastName,
                        email,
                        phone,
                        userType,
                        newsletterSubscribed,
                        createdAt: new Date().toISOString(),
                    };

                    // Add type-specific data
                    if (userType === "host") {
                        userData.location = location;
                        userData.experienceType = experienceType;
                        userData.languages = languages;
                    } else {
                        userData.interests = interests;
                    }

                    localStorage.setItem("pendingUser", JSON.stringify(userData));
                    showToast(`Welcome! Your ${accountType.toLowerCase()} account has been created.`, "success");

                    // Redirect after success message
                    setTimeout(() => {
                        showToast("Redirecting to login page...", "info");
                        // window.location.href = 'login.html';
                    }, 3000);
                }, 2500);
            });

            // ===== SOCIAL SIGNUP HANDLERS =====
            googleSignupBtn.addEventListener("click", () => {
                if (!userTypeInput.value) {
                    showAlert("Please select whether you want to join as a Tourist or Host first.");
                    return;
                }
                showToast("Google signup integration would be implemented here.", "info");
                console.log("Google signup clicked for:", userTypeInput.value);
            });

            facebookSignupBtn.addEventListener("click", () => {
                if (!userTypeInput.value) {
                    showAlert("Please select whether you want to join as a Tourist or Host first.");
                    return;
                }
                showToast("Facebook signup integration would be implemented here.", "info");
                console.log("Facebook signup clicked for:", userTypeInput.value);
            });

            githubSignupBtn.addEventListener("click", () => {
                if (!userTypeInput.value) {
                    showAlert("Please select whether you want to join as a Tourist or Host first.");
                    return;
                }
                showToast("GitHub signup integration would be implemented here.", "info");
                console.log("GitHub signup clicked for:", userTypeInput.value);
            });

            // ===== LINK HANDLERS =====
            loginLink.addEventListener("click", (e) => {
                e.preventDefault();
                showToast("Redirecting to login page...", "info");
                // window.location.href = 'login.html';
                console.log("Login link clicked");
            });

            // ===== TERMS CHECKBOX VALIDATION =====
            termsCheckbox.addEventListener("change", function () {
                if (this.checked) {
                    this.classList.remove("is-invalid");
                }
            });

            // ===== KEYBOARD SHORTCUTS =====
            document.addEventListener("keydown", (e) => {
                // Enter key to submit form when focused on form elements
                if (e.key === "Enter" && e.target.tagName === "INPUT") {
                    signupForm.dispatchEvent(new Event("submit"));
                }

                // Escape key to clear form
                if (e.key === "Escape") {
                    signupForm.reset();
                    alertContainer.innerHTML = "";
                    clearValidationStates();
                    userTypeCards.forEach(card => card.classList.remove("active"));
                    userTypeInput.value = "";
                    hostFields.classList.remove("active");
                    touristFields.style.display = "none";
                    strengthFill.className = "strength-fill";
                    strengthLevel.textContent = "Weak";
                }
            });

            // ===== SMOOTH ANIMATIONS =====
            // Add entrance animations
            const animateElements = document.querySelectorAll(".signup-container, .brand-section");
            animateElements.forEach((el, index) => {
                el.style.opacity = "0";
                el.style.transform = "translateY(30px)";
                setTimeout(() => {
                    el.style.transition = "all 0.6s ease";
                    el.style.opacity = "1";
                    el.style.transform = "translateY(0)";
                }, index * 200);
            });

            // ===== FOCUS MANAGEMENT =====
            // Auto-focus first user type card
            userTypeCards[0].focus();

            console.log("Signup page initialized successfully!");
        });

        // ===== GLOBAL ERROR HANDLER =====
        window.addEventListener("error", (e) => {
            console.error("JavaScript error:", e.error);
        });

        // Add loading animation to page
        window.addEventListener("load", () => {
            document.body.classList.add("loaded");
        });