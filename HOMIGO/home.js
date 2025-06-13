     // JavaScript functionality embedded in the HTML file
        document.addEventListener('DOMContentLoaded', function() {
            
            // Smooth scrolling for navigation links
            function scrollToSection(sectionId) {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }

            // Add click event listeners to navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);
                    scrollToSection(targetId);
                    
                    // Update active nav link
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                });
            });

            // Add click event listeners to scroll buttons
            document.querySelectorAll('[data-scroll-to]').forEach(button => {
                button.addEventListener('click', function() {
                    const targetId = this.getAttribute('data-scroll-to');
                    scrollToSection(targetId);
                });
            });

            // Counter animation for statistics
            function animateCounter(element, target) {
                let current = 0;
                const increment = target / 100;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    element.textContent = Math.floor(current).toLocaleString();
                }, 20);
            }

            // Intersection Observer for counter animation
            const observerOptions = {
                threshold: 0.5,
                rootMargin: '0px 0px -100px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counters = entry.target.querySelectorAll('[data-count]');
                        counters.forEach(counter => {
                            const target = parseInt(counter.getAttribute('data-count'));
                            animateCounter(counter, target);
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            // Observe the hero section for counter animation
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                observer.observe(heroSection);
            }

            // Search form functionality
            const searchForm = document.querySelector('.search-form');
            if (searchForm) {
                searchForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const destination = document.getElementById('destination-input').value;
                    const date = document.getElementById('date-input').value;
                    const travelers = document.getElementById('travelers-input').value;
                    
                    if (!destination || !date) {
                        alert('Please fill in destination and departure date');
                        return;
                    }
                    
                    // Simulate search functionality
                    alert(`Searching for trips to ${destination} on ${date} for ${travelers} traveler(s)`);
                });
            }

            // Contact form functionality
            const contactForm = document.querySelector('.contact-form');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const name = document.getElementById('name').value;
                    const email = document.getElementById('email').value;
                    const subject = document.getElementById('subject').value;
                    const message = document.getElementById('message').value;
                    
                    if (!name || !email || !subject || !message) {
                        alert('Please fill in all fields');
                        return;
                    }
                    
                    // Simulate form submission
                    alert('Thank you for your message! We will get back to you soon.');
                    contactForm.reset();
                });
            }

            // Load more destinations functionality
            const loadMoreBtn = document.getElementById('load-more-destinations');
            if (loadMoreBtn) {
                loadMoreBtn.addEventListener('click', function() {
                    const destinationsGrid = document.getElementById('destinations-grid');
                    
                    // Additional destinations data
                    const additionalDestinations = [
                        {
                            title: 'Tokyo, Japan',
                            subtitle: 'Modern Metropolis',
                            icon: 'bi-building',
                            rating: '4.9',
                            duration: '6 days',
                            people: '2-6 people',
                            price: '$1,599'
                        },
                        {
                            title: 'Santorini, Greece',
                            subtitle: 'Island Paradise',
                            icon: 'bi-sun',
                            rating: '4.8',
                            duration: '4 days',
                            people: '2-4 people',
                            price: '$1,199'
                        },
                        {
                            title: 'Machu Picchu, Peru',
                            subtitle: 'Ancient Wonder',
                            icon: 'bi-mountain',
                            rating: '4.7',
                            duration: '8 days',
                            people: '4-10 people',
                            price: '$1,799'
                        }
                    ];

                    additionalDestinations.forEach(dest => {
                        const destCard = document.createElement('div');
                        destCard.className = 'col-lg-4 col-md-6';
                        destCard.innerHTML = `
                            <div class="destination-card">
                                <div class="destination-image">
                                    <i class="bi ${dest.icon}" style="font-size: 3rem;"></i>
                                    <div class="destination-overlay">
                                        <button class="quick-view-btn">
                                            <i class="bi bi-eye"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="destination-content">
                                    <h3 class="destination-title">${dest.title}</h3>
                                    <p class="destination-subtitle">${dest.subtitle}</p>
                                    <div class="mb-3">
                                        <span class="meta-item">
                                            <i class="bi bi-star-fill"></i>
                                            ${dest.rating}
                                        </span>
                                        <span class="meta-item">
                                            <i class="bi bi-clock"></i>
                                            ${dest.duration}
                                        </span>
                                        <span class="meta-item">
                                            <i class="bi bi-people"></i>
                                            ${dest.people}
                                        </span>
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span class="price">${dest.price}</span>
                                        <button class="btn btn-outline-primary-custom btn-sm">View Details</button>
                                    </div>
                                </div>
                            </div>
                        `;
                        destinationsGrid.appendChild(destCard);
                    });

                    // Hide the load more button after loading
                    this.style.display = 'none';
                });
            }

            // Navbar scroll effect
            window.addEventListener('scroll', function() {
                const navbar = document.querySelector('.navbar');
                if (window.scrollY > 100) {
                    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                } else {
                    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                }
            });

            // Destination search suggestions
            const destinationInput = document.getElementById('destination-input');
            if (destinationInput) {
                const suggestions = [
                    'Paris, France',
                    'Tokyo, Japan',
                    'New York, USA',
                    'London, UK',
                    'Rome, Italy',
                    'Barcelona, Spain',
                    'Amsterdam, Netherlands',
                    'Prague, Czech Republic',
                    'Vienna, Austria',
                    'Budapest, Hungary'
                ];

                destinationInput.addEventListener('input', function() {
                    const value = this.value.toLowerCase();
                    const suggestionsContainer = document.getElementById('destination-suggestions');
                    
                    if (!suggestionsContainer) {
                        const container = document.createElement('div');
                        container.id = 'destination-suggestions';
                        container.className = 'list-group position-absolute w-100';
                        container.style.zIndex = '1000';
                        container.style.top = '100%';
                        this.parentNode.appendChild(container);
                    }

                    const container = document.getElementById('destination-suggestions');
                    container.innerHTML = '';

                    if (value.length > 0) {
                        const filtered = suggestions.filter(s => 
                            s.toLowerCase().includes(value)
                        ).slice(0, 5);

                        filtered.forEach(suggestion => {
                            const item = document.createElement('button');
                            item.className = 'list-group-item list-group-item-action';
                            item.textContent = suggestion;
                            item.addEventListener('click', function() {
                                destinationInput.value = suggestion;
                                container.innerHTML = '';
                            });
                            container.appendChild(item);
                        });
                    }
                });

                // Hide suggestions when clicking outside
                document.addEventListener('click', function(e) {
                    if (!destinationInput.contains(e.target)) {
                        const container = document.getElementById('destination-suggestions');
                        if (container) {
                            container.innerHTML = '';
                        }
                    }
                });
            }

            // Quick view functionality for destination cards
            document.addEventListener('click', function(e) {
                if (e.target.closest('.quick-view-btn')) {
                    e.preventDefault();
                    const card = e.target.closest('.destination-card');
                    const title = card.querySelector('.destination-title').textContent;
                    alert(`Quick view for ${title} - This would open a modal with more details!`);
                }
            });

            // Book tour functionality
            document.addEventListener('click', function(e) {
                if (e.target.closest('.btn') && e.target.textContent.includes('Book')) {
                    e.preventDefault();
                    const card = e.target.closest('.tour-card, .destination-card');
                    const title = card.querySelector('.tour-title, .destination-title').textContent;
                    alert(`Booking ${title} - This would redirect to the booking page!`);
                }
            });

            // Set minimum date for date input to today
            const dateInput = document.getElementById('date-input');
            if (dateInput) {
                const today = new Date().toISOString().split('T')[0];
                dateInput.min = today;
            }

            console.log('WanderLust website loaded successfully!');
        });