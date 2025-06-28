    // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            // Hide loading overlay
            setTimeout(() => {
                document.getElementById('loadingOverlay').classList.add('hidden');
            }, 1000);

            // Initialize all features
            initializeScrollAnimations();
            initializeScrollProgress();
            initializeFormValidation();
            initializeSmoothScrolling();
        });

        // Scroll animations
        function initializeScrollAnimations() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        
                        // Stagger animation for contact cards
                        if (entry.target.classList.contains('contact-card')) {
                            const cards = entry.target.parentElement.children;
                            const index = Array.from(cards).indexOf(entry.target);
                            entry.target.style.transitionDelay = `${index * 0.1}s`;
                        }
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            // Observe all animated elements
            document.querySelectorAll('.glass-container, .contact-card, .location-card, .contact-form-container').forEach(el => {
                observer.observe(el);
            });
        }

        // Scroll progress bar
        function initializeScrollProgress() {
            const progressBar = document.getElementById('scrollProgress');
            
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset;
                const docHeight = document.body.scrollHeight - window.innerHeight;
                const scrollPercent = (scrollTop / docHeight) * 100;
                progressBar.style.width = scrollPercent + '%';
            });
        }

        // Form validation
        function initializeFormValidation() {
            const form = document.getElementById('contactFormElement');
            const inputs = form.querySelectorAll('input, select, textarea');

            // Real-time validation
            inputs.forEach(input => {
                input.addEventListener('input', function() {
                    validateField(this);
                });

                input.addEventListener('blur', function() {
                    validateField(this);
                });
            });

            // Form submission
            form.addEventListener('submit', handleFormSubmit);
        }

        function validateField(field) {
            const value = field.value.trim();
            let isValid = true;

            // Remove previous validation classes
            field.classList.remove('is-valid', 'is-invalid');

            if (field.hasAttribute('required') && !value) {
                isValid = false;
            } else if (field.type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(value);
            } else if (field.type === 'tel' && value) {
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                isValid = phoneRegex.test(value.replace(/[\s\-$$$$]/g, ''));
            }

            // Apply validation class
            if (value) {
                field.classList.add(isValid ? 'is-valid' : 'is-invalid');
            }

            return isValid;
        }

        function handleFormSubmit(e) {
            e.preventDefault();
            
            const form = e.target;
            const formData = new FormData(form);
            const submitBtn = document.getElementById('submitBtn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            
            // Validate all fields
            let isFormValid = true;
            const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
            
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isFormValid = false;
                }
            });

            if (!isFormValid) {
                showAlert('Please fill in all required fields correctly.', 'danger');
                return;
            }

            // Show loading state
            btnText.classList.add('d-none');
            btnLoading.classList.remove('d-none');
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                // Reset button state
                btnText.classList.remove('d-none');
                btnLoading.classList.add('d-none');
                submitBtn.disabled = false;

                // Show success message
                showAlert('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
                
                // Reset form
                form.reset();
                form.querySelectorAll('.is-valid, .is-invalid').forEach(field => {
                    field.classList.remove('is-valid', 'is-invalid');
                });

                // Scroll to top of form
                document.getElementById('contactForm').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 2000);
        }

        function showAlert(message, type = 'info') {
            const alertContainer = document.getElementById('alertContainer');
            const alertHTML = `
                <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                    <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'danger' ? 'exclamation-triangle' : 'info-circle'} me-2"></i>
                    ${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `;
            alertContainer.innerHTML = alertHTML;

            // Auto-dismiss after 5 seconds
            setTimeout(() => {
                const alert = alertContainer.querySelector('.alert');
                if (alert) {
                    const bsAlert = new bootstrap.Alert(alert);
                    bsAlert.close();
                }
            }, 5000);
        }

        // Smooth scrolling
        function initializeSmoothScrolling() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }

        // FAQ functionality
        function toggleFAQ(button) {
            const answer = button.nextElementSibling;
            const isActive = button.classList.contains('active');

            // Close all other FAQs
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('active');
            });

            // Toggle current FAQ
            if (!isActive) {
                button.classList.add('active');
                answer.classList.add('active');
            }
        }

        // Contact method handlers
        function openEmailClient() {
            window.location.href = 'mailto:hello@homeigo.com?subject=Contact%20Inquiry';
        }

        function callSupport() {
            window.location.href = 'tel:+15551234567';
        }

        function openChat() {
            showAlert('Live chat feature would be integrated here with a service like Intercom or Zendesk.', 'info');
        }

        function openWhatsApp() {
            window.open('https://wa.me/15559876543?text=Hello%20Homeigo%20Support', '_blank');
        }

        function scrollToForm() {
            document.getElementById('contactForm').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }

        function showHostDashboard() {
            showAlert('Redirecting to Host Dashboard...', 'info');
        }

        // Navbar background on scroll
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        });

        // Add parallax effect to hero section
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroSection = document.getElementById('heroSection');
            if (heroSection) {
                heroSection.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                // Close any open alerts
                document.querySelectorAll('.alert').forEach(alert => alert.remove());
                
                // Close all FAQs
                document.querySelectorAll('.faq-question').forEach(q => {
                    q.classList.remove('active');
                    q.nextElementSibling.classList.remove('active');
                });
            }
        });

        console.log('Contact page initialized successfully!');