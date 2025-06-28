        // Sample data
        const bookingsData = [
            {
                id: 1,
                title: "Live with Mostafa in Cairo",
                location: "Cairo, Egypt",
                price: 89,
                rating: 4.9,
                status: "confirmed",
                dates: "Dec 15-18, 2024",
                image: "cairo"
            },
            {
                id: 2,
                title: "Traditional Cooking with Maria",
                location: "Tuscany, Italy",
                price: 65,
                rating: 4.8,
                status: "completed",
                dates: "Nov 20-22, 2024",
                image: "tuscany"
            },
            {
                id: 3,
                title: "Mountain Adventure with Raj",
                location: "Himalayas, Nepal",
                price: 120,
                rating: 4.9,
                status: "pending",
                dates: "Jan 10-15, 2025",
                image: "nepal"
            }
        ];

        const favoritesData = [
            {
                id: 4,
                title: "Beach Life with Carlos",
                location: "Tulum, Mexico",
                price: 75,
                rating: 4.7,
                image: "tulum"
            },
            {
                id: 5,
                title: "Safari Experience with Amara",
                location: "Serengeti, Tanzania",
                price: 200,
                rating: 5.0,
                image: "safari"
            },
            {
                id: 6,
                title: "Temple Stay with Kenji",
                location: "Kyoto, Japan",
                price: 95,
                rating: 4.8,
                image: "kyoto"
            }
        ];

        const reviewsData = [
            {
                id: 1,
                experienceTitle: "Live with Mostafa in Cairo",
                hostName: "Mostafa Ahmed",
                rating: 5,
                date: "November 2024",
                text: "Absolutely incredible experience! Mostafa was the perfect host and showed us the real Cairo. The food was amazing and we learned so much about Egyptian culture. Highly recommend!",
                hostReply: "Thank you Sarah! It was wonderful hosting you and your family. You are always welcome back to Cairo!"
            },
            {
                id: 2,
                experienceTitle: "Traditional Cooking with Maria",
                hostName: "Maria Rossi",
                rating: 5,
                date: "October 2024",
                text: "Maria taught us authentic Italian recipes that have been in her family for generations. The pasta we made was the best I've ever tasted! A truly memorable experience.",
                hostReply: "Grazie mille Sarah! You were wonderful students and I hope you continue making pasta at home!"
            }
        ];

        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            loadBookings();
            loadFavorites();
            loadReviews();
            animateStats();
            initializeScrollAnimations();
            
            // Handle tab changes
            document.querySelectorAll('[data-bs-toggle="pill"]').forEach(tab => {
                tab.addEventListener('shown.bs.tab', function(e) {
                    const targetId = e.target.getAttribute('data-bs-target').substring(1);
                    animateTabContent(targetId);
                });
            });
        });

        // Load bookings
        function loadBookings() {
            const container = document.getElementById('bookingsContainer');
            
            if (bookingsData.length === 0) {
                container.innerHTML = createEmptyState('calendar-x', 'No Bookings Yet', 'Start exploring amazing local experiences!', 'Browse Experiences');
                return;
            }
            
            bookingsData.forEach(booking => {
                const bookingCard = createBookingCard(booking);
                container.appendChild(bookingCard);
            });
        }

        // Load favorites
        function loadFavorites() {
            const container = document.getElementById('favoritesContainer');
            
            if (favoritesData.length === 0) {
                container.innerHTML = createEmptyState('heart', 'No Favorites Yet', 'Save experiences you love for later!', 'Discover Experiences');
                return;
            }
            
            favoritesData.forEach(favorite => {
                const favoriteCard = createFavoriteCard(favorite);
                container.appendChild(favoriteCard);
            });
        }

        // Load reviews
        function loadReviews() {
            const container = document.getElementById('reviewsContainer');
            
            if (reviewsData.length === 0) {
                container.innerHTML = createEmptyState('star', 'No Reviews Yet', 'Share your experiences with other travelers!', 'Book Experience');
                return;
            }
            
            reviewsData.forEach(review => {
                const reviewCard = createReviewCard(review);
                container.appendChild(reviewCard);
            });
        }

        // Create booking card
        function createBookingCard(booking) {
            const col = document.createElement('div');
            col.className = 'col-lg-6 col-md-12';
            
            const statusClass = `status-${booking.status}`;
            const statusText = booking.status.charAt(0).toUpperCase() + booking.status.slice(1);
            
            col.innerHTML = `
                <div class="experience-card">
                    <div class="experience-image">
                        <i class="bi bi-house-door"></i>
                    </div>
                    <div class="experience-content">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h3 class="experience-title">${booking.title}</h3>
                            <span class="status-badge ${statusClass}">${statusText}</span>
                        </div>
                        <p class="experience-location">
                            <i class="bi bi-geo-alt me-1"></i>${booking.location}
                        </p>
                        <p class="text-muted mb-3">
                            <i class="bi bi-calendar me-1"></i>${booking.dates}
                        </p>
                        <div class="experience-meta">
                            <div class="experience-price">$${booking.price}/night</div>
                            <div class="experience-rating">
                                ${generateStars(booking.rating)}
                                <small class="text-muted ms-1">${booking.rating}</small>
                            </div>
                        </div>
                        <div class="mt-3">
                            <button class="btn btn-outline-primary-custom btn-sm me-2" onclick="viewBooking(${booking.id})">
                                <i class="bi bi-eye me-1"></i>View Details
                            </button>
                            ${booking.status === 'completed' ? 
                                '<button class="btn btn-primary-custom btn-sm" onclick="writeReview(' + booking.id + ')"><i class="bi bi-star me-1"></i>Write Review</button>' : 
                                '<button class="btn btn-outline-danger btn-sm" onclick="cancelBooking(' + booking.id + ')"><i class="bi bi-x-circle me-1"></i>Cancel</button>'
                            }
                        </div>
                    </div>
                </div>
            `;
            
            return col;
        }

        // Create favorite card
        function createFavoriteCard(favorite) {
            const col = document.createElement('div');
            col.className = 'col-lg-4 col-md-6';
            
            col.innerHTML = `
                <div class="experience-card">
                    <div class="experience-image">
                        <i class="bi bi-house-door"></i>
                        <button class="btn btn-link position-absolute top-0 end-0 m-2 text-danger" onclick="removeFavorite(${favorite.id})">
                            <i class="bi bi-heart-fill"></i>
                        </button>
                    </div>
                    <div class="experience-content">
                        <h3 class="experience-title">${favorite.title}</h3>
                        <p class="experience-location">
                            <i class="bi bi-geo-alt me-1"></i>${favorite.location}
                        </p>
                        <div class="experience-meta">
                            <div class="experience-price">$${favorite.price}/night</div>
                            <div class="experience-rating">
                                ${generateStars(favorite.rating)}
                                <small class="text-muted ms-1">${favorite.rating}</small>
                            </div>
                        </div>
                        <div class="mt-3">
                            <button class="btn btn-primary-custom btn-sm w-100" onclick="bookExperience(${favorite.id})">
                                <i class="bi bi-calendar-plus me-1"></i>Book Now
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            return col;
        }

        // Create review card
        function createReviewCard(review) {
            const reviewDiv = document.createElement('div');
            reviewDiv.className = 'review-card';
            
            reviewDiv.innerHTML = `
                <div class="review-header">
                    <div class="reviewer-info">
                        <div class="reviewer-avatar">
                            ${review.hostName.charAt(0)}
                        </div>
                        <div>
                            <h5 class="mb-0">${review.experienceTitle}</h5>
                            <small class="text-muted">Host: ${review.hostName} • ${review.date}</small>
                        </div>
                    </div>
                    <div class="review-rating">
                        ${generateStars(review.rating)}
                    </div>
                </div>
                <p class="review-text">${review.text}</p>
                ${review.hostReply ? `
                    <div class="mt-3 p-3 bg-light rounded">
                        <strong>Host Reply:</strong>
                        <p class="mb-0 mt-1">${review.hostReply}</p>
                    </div>
                ` : ''}
            `;
            
            return reviewDiv;
        }

        // Create empty state
        function createEmptyState(icon, title, text, buttonText) {
            return `
                <div class="col-12">
                    <div class="empty-state">
                        <div class="empty-state-icon">
                            <i class="bi bi-${icon}"></i>
                        </div>
                        <h3 class="empty-state-title">${title}</h3>
                        <p class="empty-state-text">${text}</p>
                        <button class="btn btn-primary-custom" onclick="redirectToSearch()">
                            <i class="bi bi-search me-2"></i>${buttonText}
                        </button>
                    </div>
                </div>
            `;
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

        // Animate statistics counters
        function animateStats() {
            const stats = document.querySelectorAll('.stat-number');
            
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
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current);
            }, 30);
        }

        // Initialize scroll animations
        function initializeScrollAnimations() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            });
            
            document.querySelectorAll('.fade-in').forEach(el => {
                observer.observe(el);
            });
        }

        // Animate tab content
        function animateTabContent(tabId) {
            const tabContent = document.getElementById(tabId);
            const cards = tabContent.querySelectorAll('.experience-card, .review-card');
            
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.4s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }

        // Event handlers
        function viewBooking(id) {
            showNotification(`Opening booking details for ID: ${id}`, 'info');
        }

        function cancelBooking(id) {
            if (confirm('Are you sure you want to cancel this booking?')) {
                showNotification('Booking cancelled successfully', 'success');
            }
        }

        function writeReview(id) {
            showNotification('Opening review form...', 'info');
        }

        function removeFavorite(id) {
            showNotification('Removed from favorites', 'success');
        }

        function bookExperience(id) {
            showNotification('Redirecting to booking page...', 'info');
        }

        function redirectToSearch() {
            showNotification('Redirecting to search page...', 'info');
        }

        function showHostDashboard() {
            showNotification('Redirecting to Host Dashboard...', 'info');
        }

        function logout() {
            if (confirm('Are you sure you want to sign out?')) {
                showNotification('Signing out...', 'info');
            }
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

        // Handle settings form submission
        document.querySelector('.settings-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="bi bi-arrow-clockwise spin me-2"></i>Saving...';
            submitBtn.disabled = true;
            
            // Simulate save delay
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                showNotification('Settings saved successfully!', 'success');
            }, 2000);
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

        // Add spinning animation for loading
        const style = document.createElement('style');
        style.textContent = `
            .spin {
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);