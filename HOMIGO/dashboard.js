  // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            initializeCalculator();
            animateStats();
            initializeScrollAnimations();
        });

        // Earnings Calculator
        function initializeCalculator() {
            const experienceType = document.getElementById('experienceType');
            const pricePerNight = document.getElementById('pricePerNight');
            const nightsPerMonth = document.getElementById('nightsPerMonth');
            const occupancyRate = document.getElementById('occupancyRate');
            const occupancyValue = document.getElementById('occupancyValue');
            const monthlyEarnings = document.getElementById('monthlyEarnings');

            // Update occupancy display
            occupancyRate.addEventListener('input', function() {
                occupancyValue.textContent = this.value + '%';
                calculateEarnings();
            });

            // Calculate earnings on input change
            [experienceType, pricePerNight, nightsPerMonth, occupancyRate].forEach(input => {
                input.addEventListener('input', calculateEarnings);
            });

            function calculateEarnings() {
                const price = parseFloat(pricePerNight.value) || 0;
                const nights = parseFloat(nightsPerMonth.value) || 0;
                const occupancy = parseFloat(occupancyRate.value) || 0;
                
                const grossEarnings = price * nights * (occupancy / 100);
                const netEarnings = grossEarnings * 0.85; // After 15% service fee
                
                monthlyEarnings.textContent = '$' + Math.round(netEarnings).toLocaleString();
                
                // Add animation effect
                monthlyEarnings.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    monthlyEarnings.style.transform = 'scale(1)';
                }, 200);
            }

            // Initial calculation
            calculateEarnings();
        }

        // Animate statistics
        function animateStats() {
            const stats = document.querySelectorAll('.stat-number[data-count]');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const target = parseInt(entry.target.getAttribute('data-count'));
                        const isDollar = entry.target.textContent.includes('$');
                        animateCounter(entry.target, target, isDollar);
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            stats.forEach(stat => observer.observe(stat));
        }

        // Counter animation
        function animateCounter(element, target, isDollar = false) {
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                const value = Math.floor(current).toLocaleString();
                element.textContent = isDollar ? '$' + value : value;
            }, 20);
        }

        // Initialize scroll animations
        function initializeScrollAnimations() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                    }
                });
            });
            
            document.querySelectorAll('.benefit-card, .step-card, .story-card').forEach(el => {
                observer.observe(el);
            });
        }

        // Scroll functions
        function scrollToCalculator() {
            document.getElementById('earningsCalculator').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }

        function scrollToSteps() {
            document.getElementById('how-it-works').scrollIntoView({
                behavior: 'smooth'
            });
        }

        // Start hosting function
        function startHosting() {
            showNotification('Redirecting to host registration...', 'success');
            setTimeout(() => {
                // In a real app, this would redirect to the registration page
                window.location.href = 'host-registration.html';
            }, 1500);
        }

        // Show notification
        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `alert alert-${type} position-fixed`;
            notification.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
            notification.innerHTML = `
                <div class="d-flex align-items-center">
                    <i class="bi bi-${type === 'success' ? 'check-circle' : 'info-circle'} me-2"></i>
                    ${message}
                    <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
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

        // Smooth scrolling for navigation links
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

        // Add interactive effects to cards
        document.querySelectorAll('.benefit-card, .step-card, .story-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });

        // Calculator input validation
        document.getElementById('pricePerNight').addEventListener('input', function() {
            if (this.value < 10) this.value = 10;
            if (this.value > 500) this.value = 500;
        });

        document.getElementById('nightsPerMonth').addEventListener('input', function() {
            if (this.value < 1) this.value = 1;
            if (this.value > 30) this.value = 30;
        });

        console.log('Become a Host page initialized successfully!');