       const experiences = [
            {
                id: 1,
                title: "Live with Mostafa in Cairo",
                location: "Cairo, Egypt",
                price: 89,
                rating: 4.9,
                reviews: 127,
                type: "stay",
                description: "3 Days + Local Food + Old Cairo Tour",
                verified: true,
                image: "cairo"
            },
            {
                id: 2,
                title: "Traditional Cooking with Maria",
                location: "Tuscany, Italy",
                price: 65,
                rating: 4.8,
                reviews: 89,
                type: "food",
                description: "Learn authentic Italian recipes",
                verified: true,
                image: "tuscany"
            },
            {
                id: 3,
                title: "Mountain Adventure with Raj",
                location: "Himalayas, Nepal",
                price: 120,
                rating: 4.9,
                reviews: 156,
                type: "tour",
                description: "5 Days trekking with local guide",
                verified: true,
                image: "nepal"
            },
            {
                id: 4,
                title: "Beach Life with Carlos",
                location: "Tulum, Mexico",
                price: 75,
                rating: 4.7,
                reviews: 203,
                type: "stay",
                description: "Beachfront stay + Cenote tours",
                verified: true,
                image: "tulum"
            },
            {
                id: 5,
                title: "Safari Experience with Amara",
                location: "Serengeti, Tanzania",
                price: 200,
                rating: 5.0,
                reviews: 78,
                type: "tour",
                description: "3 Days wildlife safari adventure",
                verified: true,
                image: "safari"
            },
            {
                id: 6,
                title: "Temple Stay with Kenji",
                location: "Kyoto, Japan",
                price: 95,
                rating: 4.8,
                reviews: 134,
                type: "stay",
                description: "Traditional temple experience",
                verified: true,
                image: "kyoto"
            }
        ];

        // Load experiences on page load
        document.addEventListener('DOMContentLoaded', function() {
            loadExperiences();
            animateStats();
            initializeScrollAnimations();
        });

        // Load and display experiences
        function loadExperiences() {
            const container = document.getElementById('experiencesContainer');
            const loading = document.getElementById('loadingExperiences');
            
            loading.style.display = 'block';
            
            setTimeout(() => {
                loading.style.display = 'none';
                
                experiences.forEach(experience => {
                    const experienceCard = createExperienceCard(experience);
                    container.appendChild(experienceCard);
                });
            }, 1500);
        }

        // Create experience card element
        function createExperienceCard(experience) {
            const col = document.createElement('div');
            col.className = 'col-lg-4 col-md-6';
            
            const iconMap = {
                'stay': 'bi-house-door',
                'food': 'bi-cup-hot',
                'tour': 'bi-compass'
            };
            
            col.innerHTML = `
                <div class="experience-card" onclick="viewExperience(${experience.id})">
                    <div class="experience-image">
                        <i class="bi ${iconMap[experience.type]}" style="font-size: 3rem;"></i>
                        ${experience.verified ? '<div class="verified-badge"><i class="bi bi-patch-check-fill me-1"></i>Verified Host</div>' : ''}
                        <div class="experience-overlay">
                            <button class="quick-view-btn">
                                <i class="bi bi-eye"></i>
                            </button>
                        </div>
                    </div>
                    <div class="experience-content">
                        <h3 class="experience-title">${experience.title}</h3>
                        <p class="experience-subtitle">
                            <i class="bi bi-geo-alt me-1"></i>${experience.location}
                        </p>
                        <p class="text-muted mb-3">${experience.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="price">$${experience.price}/night</div>
                            <div class="text-warning">
                                ${generateStars(experience.rating)}
                                <small class="text-muted ms-1">(${experience.reviews})</small>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            return col;
        }

        // Generate star rating
        function generateStars(rating) {
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 !== 0;
            let stars = '';
            
            for (let i = 0; i < fullStars; i++) {
                stars += '<i class="bi bi-star-fill"></i>';
            }
            
            if (hasHalfStar) {
                stars += '<i class="bi bi-star-half"></i>';
            }
            
            return stars;
        }

        // Search functionality
        function performSearch() {
            const searchInput = document.getElementById('searchInput');
            const query = searchInput.value.trim();
            
            if (query) {
                // Show loading state
                const searchBtn = document.querySelector('.btn-search');
                const originalText = searchBtn.innerHTML;
                searchBtn.innerHTML = '<i class="bi bi-arrow-clockwise spin me-2"></i>Searching...';
                searchBtn.disabled = true;
                
                // Simulate search delay
                setTimeout(() => {
                    searchBtn.innerHTML = originalText;
                    searchBtn.disabled = false;
                    
                    // Scroll to experiences section
                    document.getElementById('experiences').scrollIntoView({
                        behavior: 'smooth'
                    });
                    
                    // Show search results notification
                    showNotification(`Found ${experiences.length} experiences for "${query}"`, 'success');
                }, 2000);
            } else {
                showNotification('Please enter a destination to search', 'warning');
            }
        }

        // Scroll to search section
        function scrollToSearch() {
            document.getElementById('search').scrollIntoView({
                behavior: 'smooth'
            });
        }

        // View experience details
        function viewExperience(id) {
            const experience = experiences.find(exp => exp.id === id);
            if (experience) {
                showNotification(`Opening details for "${experience.title}"`, 'info');
                // In a real app, this would navigate to the experience details page
            }
        }

        // Show host dashboard
        function showHostDashboard() {
            showNotification('Redirecting to Host Dashboard...', 'info');
            // In a real app, this would navigate to the host dashboard
        }

        // Animate statistics counters
        function animateStats() {
            const stats = document.querySelectorAll('.stat-number, .stats-number');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const target = parseInt(entry.target.getAttribute('data-count'));
                        animateCounter(entry.target, target);
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            stats.forEach(stat => observer.observe(stat));
        }

        // Counter animation
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

        // Initialize scroll animations
        function initializeScrollAnimations() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            });
            
            document.querySelectorAll('.feature-card, .experience-card, .step-card').forEach(el => {
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

        // Handle search on Enter key
        document.getElementById('searchInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
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

        // Navbar background on scroll
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
              });