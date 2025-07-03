        // Plan data
        const travelerFeatures = [
            'Browse experiences',
            'Basic search filters',
            'Read reviews',
            'Standard booking',
            'Priority support',
            'Exclusive experiences',
            'Booking discounts',
            'Travel insurance',
            'Personal concierge',
            'VIP experiences',
            'Flexible cancellation'
        ];

        const hostFeatures = [
            'Create host profile',
            'List experiences',
            'Basic analytics',
            'Standard support',
            'Priority listing',
            'Advanced analytics',
            'Marketing tools',
            'Featured badge',
            'Account manager',
            'Custom branding',
            'API access'
        ];

        const faqData = [
            {
                question: "Can I change my plan at any time?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and you'll be charged or credited accordingly."
            },
            {
                question: "Is there a free trial available?",
                answer: "Yes, we offer a 14-day free trial for all premium plans. No credit card required to start your trial."
            },
            {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, Apple Pay, Google Pay, and cryptocurrency payments."
            },
            {
                question: "How does the commission structure work for hosts?",
                answer: "Commission rates vary by plan. Starter hosts pay 5%, Pro hosts pay 3%, and Elite hosts pay only 2% commission per booking."
            },
            {
                question: "Can I cancel my subscription anytime?",
                answer: "Yes, you can cancel your subscription at any time. Your plan will remain active until the end of your current billing period."
            },
            {
                question: "Do you offer refunds?",
                answer: "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, we'll provide a full refund."
            }
        ];

        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            loadComparisonTable();
            loadFAQ();
            initializeAnimations();
        });

        // Toggle between traveler and host plans
        function showTravelerPlans() {
            document.getElementById('travelerPlans').style.display = 'block';
            document.getElementById('hostPlans').style.display = 'none';
            document.getElementById('travelerToggle').classList.add('active');
            document.getElementById('hostToggle').classList.remove('active');
            loadComparisonTable('traveler');
        }

        function showHostPlans() {
            document.getElementById('travelerPlans').style.display = 'none';
            document.getElementById('hostPlans').style.display = 'block';
            document.getElementById('travelerToggle').classList.remove('active');
            document.getElementById('hostToggle').classList.add('active');
            loadComparisonTable('host');
        }

        // Load comparison table
        function loadComparisonTable(type = 'traveler') {
            const table = document.getElementById('comparisonTable');
            const features = type === 'traveler' ? travelerFeatures : hostFeatures;
            const plans = type === 'traveler' 
                ? ['Explorer', 'Adventurer', 'Nomad']
                : ['Starter Host', 'Pro Host', 'Elite Host'];

            let tableHTML = `
                <thead>
                    <tr>
                        <th>Features</th>
                        ${plans.map(plan => `<th class="text-center">${plan}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
            `;

            features.forEach((feature, index) => {
                tableHTML += `<tr><td>${feature}</td>`;
                
                if (type === 'traveler') {
                    // Traveler plan features
                    if (index < 4) {
                        tableHTML += '<td class="text-center"><i class="bi bi-check-circle-fill feature-check"></i></td>';
                        tableHTML += '<td class="text-center"><i class="bi bi-check-circle-fill feature-check"></i></td>';
                        tableHTML += '<td class="text-center"><i class="bi bi-check-circle-fill feature-check"></i></td>';
                    } else if (index < 7) {
                        tableHTML += '<td class="text-center"><i class="bi bi-x-circle feature-cross"></i></td>';
                        tableHTML += '<td class="text-center"><i class="bi bi-check-circle-fill feature-check"></i></td>';
                        tableHTML += '<td class="text-center"><i class="bi bi-check-circle-fill feature-check"></i></td>';
                    } else {
                        tableHTML += '<td class="text-center"><i class="bi bi-x-circle feature-cross"></i></td>';
                        tableHTML += '<td class="text-center"><i class="bi bi-x-circle feature-cross"></i></td>';
                        tableHTML += '<td class="text-center"><i class="bi bi-check-circle-fill feature-check"></i></td>';
                    }
                } else {
                    // Host plan features
                    if (index < 4) {
                        tableHTML += '<td class="text-center"><i class="bi bi-check-circle-fill feature-check"></i></td>';
                        tableHTML += '<td class="text-center"><i class="bi bi-check-circle-fill feature-check"></i></td>';
                        tableHTML += '<td class="text-center"><i class="bi bi-check-circle-fill feature-check"></i></td>';
                    } else if (index < 7) {
                        tableHTML += '<td class="text-center"><i class="bi bi-x-circle feature-cross"></i></td>';
                        tableHTML += '<td class="text-center"><i class="bi bi-check-circle-fill feature-check"></i></td>';
                        tableHTML += '<td class="text-center"><i class="bi bi-check-circle-fill feature-check"></i></td>';
                    } else {
                        tableHTML += '<td class="text-center"><i class="bi bi-x-circle feature-cross"></i></td>';
                        tableHTML += '<td class="text-center"><i class="bi bi-x-circle feature-cross"></i></td>';
                        tableHTML += '<td class="text-center"><i class="bi bi-check-circle-fill feature-check"></i></td>';
                    }
                }
                
                tableHTML += '</tr>';
            });

            tableHTML += '</tbody>';
            table.innerHTML = tableHTML;
        }

        // Load FAQ section
        function loadFAQ() {
            const container = document.getElementById('faqContainer');
            
            faqData.forEach((faq, index) => {
                const faqItem = document.createElement('div');
                faqItem.className = 'faq-item';
                faqItem.innerHTML = `
                    <button class="faq-question" onclick="toggleFAQ(${index})">
                        ${faq.question}
                        <i class="bi bi-chevron-down" id="faq-icon-${index}"></i>
                    </button>
                    <div class="faq-answer" id="faq-answer-${index}">
                        ${faq.answer}
                    </div>
                `;
                container.appendChild(faqItem);
            });
        }

        // Toggle FAQ item
        function toggleFAQ(index) {
            const answer = document.getElementById(`faq-answer-${index}`);
            const icon = document.getElementById(`faq-icon-${index}`);
            
            if (answer.classList.contains('show')) {
                answer.classList.remove('show');
                icon.style.transform = 'rotate(0deg)';
            } else {
                // Close all other FAQs
                document.querySelectorAll('.faq-answer').forEach(item => {
                    item.classList.remove('show');
                });
                document.querySelectorAll('[id^="faq-icon-"]').forEach(item => {
                    item.style.transform = 'rotate(0deg)';
                });
                
                // Open clicked FAQ
                answer.classList.add('show');
                icon.style.transform = 'rotate(180deg)';
            }
        }

        // Select plan
        function selectPlan(planName) {
            const button = event.target;
            const originalText = button.innerHTML;
            
            // Show loading state
            button.innerHTML = '<i class="bi bi-arrow-clockwise spin me-2"></i>Processing...';
            button.disabled = true;
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
                showNotification(`Selected ${planName} plan! Redirecting to checkout...`, 'success');
                
                // In a real app, this would redirect to checkout
                setTimeout(() => {
                    showNotification('Checkout page would open here', 'info');
                }, 2000);
            }, 1500);
        }

        // Initialize animations
        function initializeAnimations() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            });
            
            document.querySelectorAll('.plan-card, .faq-item').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'all 0.6s ease';
                observer.observe(el);
            });
        }

        // Show notification
        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `alert alert-${type} position-fixed`;
            notification.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
            notification.innerHTML = `
                <div class="d-flex align-items-center">
                    <i class="bi bi-info-circle me-2"></i>
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