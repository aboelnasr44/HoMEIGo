     // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            // Hide loading overlay
            setTimeout(() => {
                document.getElementById('loadingOverlay').classList.add('hidden');
            }, 1000);

            // Get URL parameters for booking details
            const urlParams = new URLSearchParams(window.location.search);
            populateBookingDetails(urlParams);

            // Initialize all features
            initializeCardFormatting();
            initializeFormValidation();
            initializeCardPreview();
        });

        // Populate booking details from URL parameters
        function populateBookingDetails(params) {
            const experienceName = params.get('experience');
            const hostName = params.get('host');
            const price = params.get('price');
            const duration = params.get('duration');

            if (experienceName) {
                document.getElementById('experienceName').textContent = experienceName;
            }
            if (hostName) {
                document.getElementById('hostName').textContent = hostName;
            }
            if (price) {
                const basePrice = parseFloat(price);
                const serviceFee = basePrice * 0.15;
                const taxes = (basePrice + serviceFee) * 0.08;
                const total = basePrice + serviceFee + taxes;

                document.getElementById('basePrice').textContent = `$${basePrice.toFixed(2)}`;
                document.getElementById('serviceFee').textContent = `$${serviceFee.toFixed(2)}`;
                document.getElementById('taxes').textContent = `$${taxes.toFixed(2)}`;
                document.getElementById('totalAmount').textContent = `$${total.toFixed(2)}`;
                
                // Update pay button
                const payButton = document.getElementById('payButton');
                const btnText = payButton.querySelector('.btn-text');
                btnText.innerHTML = `<i class="bi bi-lock me-2"></i>Pay Securely - $${total.toFixed(2)}`;
            }
            if (duration) {
                document.getElementById('duration').textContent = duration;
            }
        }

        // Enhanced card number formatting
        function formatCardNumber(value) {
            // Remove all non-digits
            const digits = value.replace(/\D/g, '');
            
            // Format based on card type
            if (digits.startsWith('34') || digits.startsWith('37')) {
                // American Express: 4-6-5 format
                return digits.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3').trim();
            } else {
                // Visa, Mastercard, etc: 4-4-4-4 format
                return digits.replace(/(\d{4})/g, '$1 ').trim();
            }
        }

        function formatExpiryDate(value) {
            const digits = value.replace(/\D/g, '');
            if (digits.length >= 2) {
                return digits.substring(0, 2) + '/' + digits.substring(2, 4);
            }
            return digits;
        }

        function detectCardType(number) {
            const digits = number.replace(/\D/g, '');
            
            if (digits.startsWith('4')) return { type: 'visa', icon: '💳' };
            if (digits.startsWith('5') || digits.startsWith('2')) return { type: 'mastercard', icon: '💳' };
            if (digits.startsWith('34') || digits.startsWith('37')) return { type: 'amex', icon: '💳' };
            if (digits.startsWith('6')) return { type: 'discover', icon: '💳' };
            
            return { type: 'unknown', icon: '💳' };
        }

        function validateCardNumber(number) {
            const digits = number.replace(/\D/g, '');
            
            // Basic length check
            if (digits.length < 13 || digits.length > 19) return false;
            
            // Luhn algorithm
            let sum = 0;
            let isEven = false;
            
            for (let i = digits.length - 1; i >= 0; i--) {
                let digit = parseInt(digits[i]);
                
                if (isEven) {
                    digit *= 2;
                    if (digit > 9) {
                        digit -= 9;
                    }
                }
                
                sum += digit;
                isEven = !isEven;
            }
            
            return sum % 10 === 0;
        }

        function validateExpiryDate(expiry) {
            const [month, year] = expiry.split('/');
            if (!month || !year) return false;
            
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear() % 100;
            const currentMonth = currentDate.getMonth() + 1;
            
            const expMonth = parseInt(month);
            const expYear = parseInt(year);
            
            if (expMonth < 1 || expMonth > 12) return false;
            if (expYear < currentYear) return false;
            if (expYear === currentYear && expMonth < currentMonth) return false;
            
            return true;
        }

        function initializeCardFormatting() {
            const cardNumberInput = document.getElementById('cardNumberInput');
            const expiryInput = document.getElementById('expiryDate');
            const cvvInput = document.getElementById('cvv');

            // Card number formatting and validation
            cardNumberInput.addEventListener('input', function(e) {
                const formatted = formatCardNumber(e.target.value);
                e.target.value = formatted;
                
                // Update card preview
                updateCardPreview();
                
                // Validate card number
                const isValid = validateCardNumber(formatted);
                if (formatted.length > 0) {
                    e.target.classList.toggle('is-valid', isValid);
                    e.target.classList.toggle('is-invalid', !isValid);
                } else {
                    e.target.classList.remove('is-valid', 'is-invalid');
                }
            });

            // Expiry date formatting and validation
            expiryInput.addEventListener('input', function(e) {
                const formatted = formatExpiryDate(e.target.value);
                e.target.value = formatted;
                
                // Update card preview
                updateCardPreview();
                
                // Validate expiry date
                if (formatted.length === 5) {
                    const isValid = validateExpiryDate(formatted);
                    e.target.classList.toggle('is-valid', isValid);
                    e.target.classList.toggle('is-invalid', !isValid);
                } else {
                    e.target.classList.remove('is-valid', 'is-invalid');
                }
            });

            // CVV validation
            cvvInput.addEventListener('input', function(e) {
                // Only allow digits
                e.target.value = e.target.value.replace(/\D/g, '');
                
                const isValid = e.target.value.length >= 3;
                if (e.target.value.length > 0) {
                    e.target.classList.toggle('is-valid', isValid);
                    e.target.classList.toggle('is-invalid', !isValid);
                } else {
                    e.target.classList.remove('is-valid', 'is-invalid');
                }
            });
        }

        function initializeCardPreview() {
            const cardholderInput = document.getElementById('cardholderName');
            
            cardholderInput.addEventListener('input', function(e) {
                updateCardPreview();
                
                // Validate cardholder name
                const isValid = e.target.value.trim().length >= 2;
                if (e.target.value.length > 0) {
                    e.target.classList.toggle('is-valid', isValid);
                    e.target.classList.toggle('is-invalid', !isValid);
                } else {
                    e.target.classList.remove('is-valid', 'is-invalid');
                }
            });
        }

        function updateCardPreview() {
            const cardNumber = document.getElementById('cardNumberInput').value;
            const cardHolder = document.getElementById('cardholderName').value;
            const expiry = document.getElementById('expiryDate').value;
            
            // Update card number display
            const cardNumberDisplay = document.getElementById('cardNumber');
            cardNumberDisplay.textContent = cardNumber || '#### #### #### ####';
            
            // Update cardholder name
            const cardHolderDisplay = document.getElementById('cardHolder');
            cardHolderDisplay.textContent = cardHolder.toUpperCase() || 'JOHN DOE';
            
            // Update expiry date
            const cardExpiryDisplay = document.getElementById('cardExpiry');
            cardExpiryDisplay.textContent = expiry || 'MM/YY';
            
            // Update card brand
            const cardType = detectCardType(cardNumber);
            const cardBrandDisplay = document.getElementById('cardBrand');
            cardBrandDisplay.textContent = cardType.icon;
            
            // Update card styling based on type
            const creditCard = document.getElementById('creditCard');
            creditCard.className = 'credit-card ' + cardType.type;
        }

        function initializeFormValidation() {
            const form = document.getElementById('paymentForm');
            const billingAddressInput = document.getElementById('billingAddress');

            // Billing address validation
            billingAddressInput.addEventListener('input', function(e) {
                const isValid = e.target.value.trim().length >= 10;
                if (e.target.value.length > 0) {
                    e.target.classList.toggle('is-valid', isValid);
                    e.target.classList.toggle('is-invalid', !isValid);
                } else {
                    e.target.classList.remove('is-valid', 'is-invalid');
                }
            });

            // Form submission
            form.addEventListener('submit', handlePaymentSubmission);
        }

        function handlePaymentSubmission(e) {
            e.preventDefault();
            
            const form = e.target;
            const payButton = document.getElementById('payButton');
            const btnText = payButton.querySelector('.btn-text');
            const btnLoading = payButton.querySelector('.btn-loading');
            
            // Validate all fields
            let isFormValid = true;
            const requiredInputs = form.querySelectorAll('input[required]');
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('is-invalid');
                    isFormValid = false;
                } else {
                    // Specific validations
                    if (input.id === 'cardNumberInput') {
                        const isValid = validateCardNumber(input.value);
                        input.classList.toggle('is-valid', isValid);
                        input.classList.toggle('is-invalid', !isValid);
                        if (!isValid) isFormValid = false;
                    } else if (input.id === 'expiryDate') {
                        const isValid = validateExpiryDate(input.value);
                        input.classList.toggle('is-valid', isValid);
                        input.classList.toggle('is-invalid', !isValid);
                        if (!isValid) isFormValid = false;
                    } else if (input.id === 'cvv') {
                        const isValid = input.value.length >= 3;
                        input.classList.toggle('is-valid', isValid);
                        input.classList.toggle('is-invalid', !isValid);
                        if (!isValid) isFormValid = false;
                    }
                }
            });

            if (!isFormValid) {
                showAlert('Please fill in all required fields correctly.', 'danger');
                return;
            }

            // Show loading state
            btnText.classList.add('d-none');
            btnLoading.classList.remove('d-none');
            payButton.disabled = true;

            // Simulate payment processing
            setTimeout(() => {
                // Reset button state
                btnText.classList.remove('d-none');
                btnLoading.classList.add('d-none');
                payButton.disabled = false;

                // Show success message
                showAlert('Payment processed successfully! Redirecting to confirmation page...', 'success');
                
                // Simulate redirect
                setTimeout(() => {
                    showAlert('Booking confirmed! Check your email for details.', 'success');
                }, 2000);
            }, 3000);
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

        // Navbar background on scroll
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        });

        // Security features - basic protection
        document.addEventListener('keydown', function(e) {
            // Prevent F12, Ctrl+Shift+I, Ctrl+U (basic security)
            if (e.key === 'F12' || 
                (e.ctrlKey && e.shiftKey && e.key === 'I') || 
                (e.ctrlKey && e.key === 'u')) {
                e.preventDefault();
                showAlert('Developer tools are disabled for security reasons.', 'warning');
            }
        });

        // Prevent right-click context menu on sensitive elements
        document.querySelectorAll('.credit-card, .payment-form').forEach(element => {
            element.addEventListener('contextmenu', function(e) {
                e.preventDefault();
            });
        });

        // Placeholder function for host dashboard
        window.showHostDashboard = function() {
            alert("Host dashboard feature coming soon!");
        };

        console.log('Secure payment page initialized successfully!');