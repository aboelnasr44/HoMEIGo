        // Travel experiences data
        const travelExperiences = [
            {
                id: 1,
                title: "Traditional Balinese Cooking Class",
                location: "Ubud, Indonesia",
                date: "January 2024",
                rating: 5,
                host: "Made Sutrisna",
                type: "cooking",
                image: "bali-cooking"
            },
            {
                id: 2,
                title: "Moroccan Desert Adventure",
                location: "Merzouga, Morocco",
                date: "December 2023",
                rating: 5,
                host: "Hassan Al-Rashid",
                type: "adventure",
                image: "morocco-desert"
            },
            {
                id: 3,
                title: "Japanese Tea Ceremony Experience",
                location: "Kyoto, Japan",
                date: "November 2023",
                rating: 4,
                host: "Yuki Tanaka",
                type: "culture",
                image: "japan-tea"
            },
            {
                id: 4,
                title: "Peruvian Mountain Trek",
                location: "Cusco, Peru",
                date: "October 2023",
                rating: 5,
                host: "Carlos Mendoza",
                type: "adventure",
                image: "peru-trek"
            },
            {
                id: 5,
                title: "Greek Island Sailing",
                location: "Santorini, Greece",
                date: "September 2023",
                rating: 4,
                host: "Nikos Papadopoulos",
                type: "sailing",
                image: "greece-sailing"
            },
            {
                id: 6,
                title: "Vietnamese Street Food Tour",
                location: "Ho Chi Minh City, Vietnam",
                date: "August 2023",
                rating: 5,
                host: "Linh Nguyen",
                type: "food",
                image: "vietnam-food"
            }
        ];

        // Reviews data
        const userReviews = [
            {
                id: 1,
                experience: "Traditional Balinese Cooking Class",
                host: "Made Sutrisna",
                location: "Ubud, Indonesia",
                rating: 5,
                date: "January 2024",
                text: "What an incredible experience! Made welcomed me into his family home and taught me authentic Balinese recipes that have been passed down for generations. We started with a trip to the local market to select fresh ingredients, then spent the afternoon cooking together. The food was absolutely delicious, and I loved learning about the cultural significance of each dish. Made is a wonderful teacher and host - I felt like part of the family!"
            },
            {
                id: 2,
                experience: "Moroccan Desert Adventure",
                host: "Hassan Al-Rashid",
                location: "Merzouga, Morocco",
                rating: 5,
                date: "December 2023",
                text: "Hassan organized the most amazing desert adventure! The camel trek at sunset was magical, and sleeping under the stars in the Sahara was a once-in-a-lifetime experience. Hassan shared fascinating stories about Berber culture and desert life. The traditional dinner around the campfire was delicious, and the hospitality was incredible. This experience exceeded all my expectations!"
            },
            {
                id: 3,
                experience: "Japanese Tea Ceremony Experience",
                host: "Yuki Tanaka",
                location: "Kyoto, Japan",
                rating: 4,
                date: "November 2023",
                text: "Yuki provided a beautiful introduction to the Japanese tea ceremony. Her knowledge of the traditions and philosophy behind the ceremony was impressive. The setting in her traditional home was perfect, and I appreciated learning about the mindfulness aspects of the practice. The only minor issue was the language barrier at times, but Yuki was patient and made sure I understood everything."
            },
            {
                id: 4,
                experience: "Peruvian Mountain Trek",
                host: "Carlos Mendoza",
                location: "Cusco, Peru",
                rating: 5,
                date: "October 2023",
                text: "Carlos is an exceptional guide! His knowledge of the Andes mountains and Incan history made this trek educational as well as adventurous. The views were breathtaking, and Carlos ensured our safety while pushing us to achieve our goals. The traditional meals prepared by his team were surprisingly delicious at high altitude. This was definitely a challenging but rewarding experience!"
            }
        ];

        // Wishlist data
        const wishlistItems = [
            {
                id: 1,
                title: "Traditional Mongolian Nomad Experience",
                location: "Ulaanbaatar, Mongolia",
                price: 180,
                host: "Batbayar Erdene",
                rating: 4.9,
                type: "culture"
            },
            {
                id: 2,
                title: "Norwegian Fjord Kayaking",
                location: "Bergen, Norway",
                price: 220,
                host: "Erik Andersen",
                rating: 4.8,
                type: "adventure"
            },
            {
                id: 3,
                title: "Ethiopian Coffee Ceremony",
                location: "Addis Ababa, Ethiopia",
                price: 65,
                host: "Almaz Tadesse",
                rating: 5.0,
                type: "culture"
            },
            {
                id: 4,
                title: "Icelandic Northern Lights Hunt",
                location: "Reykjavik, Iceland",
                price: 150,
                host: "Sigrid Olafsdottir",
                rating: 4.7,
                type: "nature"
            }
        ];

        let reviewsLoaded = 2; // Initially show 2 reviews

        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            loadTravelHistory();
            loadReviews();
            loadWishlist();
            animateStats();
            initializeAnimations();
        });

        // Load travel history
        function loadTravelHistory() {
            const container = document.getElementById('travelHistoryContainer');
            const loading = document.getElementById('loadingTravelHistory');
            
            loading.style.display = 'block';
            
            setTimeout(() => {
                loading.style.display = 'none';
                
                travelExperiences.forEach(experience => {
                    const experienceCard = createTravelExperienceCard(experience);
                    container.appendChild(experienceCard);
                });
            }, 1000);
        }

        // Create travel experience card
        function createTravelExperienceCard(experience) {
            const col = document.createElement('div');
            col.className = 'col-lg-4 col-md-6';
            
            const iconMap = {
                'cooking': 'bi-cup-hot',
                'adventure': 'bi-mountain',
                'culture': 'bi-palette',
                'sailing': 'bi-water',
                'food': 'bi-cup-hot',
                'nature': 'bi-tree'
            };
            
            col.innerHTML = `
                <div class="experience-card" onclick="viewExperience(${experience.id})">
                    <div class="experience-image">
                        <i class="bi ${iconMap[experience.type]}" style="font-size: 2.5rem;"></i>
                        <div class="experience-overlay">
                            <button class="btn btn-primary-custom btn-sm">
                                <i class="bi bi-eye me-1"></i>View Details
                            </button>
                        </div>
                    </div>
                    <div class="experience-content">
                        <h3 class="experience-title">${experience.title}</h3>
                        <p class="experience-location">
                            <i class="bi bi-geo-alt me-1"></i>${experience.location}
                        </p>
                        <p class="experience-date">
                            <i class="bi bi-calendar me-1"></i>${experience.date}
                        </p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-muted">Host: ${experience.host}</small>
                            <div class="experience-rating">
                                ${generateStars(experience.rating)}
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            return col;
        }

        // Load reviews
        function loadReviews() {
            const container = document.getElementById('reviewsContainer');
            container.innerHTML = '';
            
            for (let i = 0; i < Math.min(reviewsLoaded, userReviews.length); i++) {
                const review = userReviews[i];
                const reviewCard = createReviewCard(review);
                container.appendChild(reviewCard);
            }
        }

        // Create review card
        function createReviewCard(review) {
            const reviewDiv = document.createElement('div');
            reviewDiv.className = 'review-card';
            
            reviewDiv.innerHTML = `
                <div class="review-header">
                    <div>
                        <div class="review-experience">${review.experience}</div>
                        <div class="review-host">Host: ${review.host} • ${review.location}</div>
                    </div>
                    <div class="review-rating">
                        ${generateStars(review.rating)}
                    </div>
                </div>
                <p class="review-text">${review.text}</p>
                <div class="review-date">${review.date}</div>
            `;
            
            return reviewDiv;
        }

        // Load wishlist
        function loadWishlist() {
            const container = document.getElementById('wishlistContainer');
            
            wishlistItems.forEach(item => {
                const wishlistCard = createWishlistCard(item);
                container.appendChild(wishlistCard);
            });
        }

        // Create wishlist card
        function createWishlistCard(item) {
            const col = document.createElement('div');
            col.className = 'col-lg-6 col-md-6';
            
            const iconMap = {
                'culture': 'bi-palette',
                'adventure': 'bi-mountain',
                'nature': 'bi-tree',
                'food': 'bi-cup-hot'
            };
            
            col.innerHTML = `
                <div class="experience-card wishlist-card" onclick="viewWishlistItem(${item.id})">
                    <button class="wishlist-heart" onclick="event.stopPropagation(); removeFromWishlist(${item.id})">
                        <i class="bi bi-heart-fill"></i>
                    </button>
                    <div class="experience-image">
                        <i class="bi ${iconMap[item.type]}" style="font-size: 2.5rem;"></i>
                        <div class="experience-overlay">
                            <button class="btn btn-primary-custom btn-sm">
                                <i class="bi bi-calendar-check me-1"></i>Book Now
                            </button>
                        </div>
                    </div>
                    <div class="experience-content">
                        <h3 class="experience-title">${item.title}</h3>
                        <p class="experience-location">
                            <i class="bi bi-geo-alt me-1"></i>${item.location}
                        </p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="experience-price">$${item.price}/night</div>
                            <div class="experience-rating">
                                ${generateStars(item.rating)}
                                <small class="text-muted ms-1">${item.host}</small>
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

        // Load more reviews
        function loadMoreReviews() {
            reviewsLoaded += 2;
            loadReviews();
            
            if (reviewsLoaded >= userReviews.length) {
                document.querySelector('.text-center button').style.display = 'none';
            }
        }

        // View experience details
        function viewExperience(id) {
            const experience = travelExperiences.find(exp => exp.id === id);
            if (experience) {
                showNotification(`Opening details for "${experience.title}"`, 'info');
            }
        }

        // View wishlist item
        function viewWishlistItem(id) {
            const item = wishlistItems.find(item => item.id === id);
            if (item) {
                showNotification(`Opening "${item.title}" - Ready to book?`, 'info');
            }
        }

        // Remove from wishlist
        function removeFromWishlist(id) {
            showNotification('Removed from wishlist', 'success');
            // In a real app, this would remove the item from the wishlist
        }

        // Send message
        function sendMessage() {
            showNotification('Message composer opened!', 'info');
        }

        // Follow user
        function followUser() {
            const button = event.target;
            const originalText = button.innerHTML;
            
            button.innerHTML = '<i class="bi bi-arrow-clockwise spin me-2"></i>Following...';
            button.disabled = true;
            
            setTimeout(() => {
                button.innerHTML = '<i class="bi bi-person-check me-2"></i>Following';
                button.classList.remove('btn-outline-primary-custom');
                button.classList.add('btn-primary-custom');
                button.disabled = false;
                showNotification('You are now following Emma!', 'success');
            }, 1500);
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
        function initializeAnimations() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            });
            
            document.querySelectorAll('.experience-card, .review-card, .about-card').forEach(el => {
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