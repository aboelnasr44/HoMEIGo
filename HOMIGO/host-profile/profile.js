        // Sample experiences data
        const hostExperiences = [
            {
                id: 1,
                title: "Traditional Egyptian Home Stay",
                location: "Cairo, Egypt",
                price: 89,
                status: "active",
                rating: 4.9,
                reviews: 45,
                bookings: 120
            },
            {
                id: 2,
                title: "Egyptian Cooking Masterclass",
                location: "Cairo, Egypt",
                price: 65,
                status: "active",
                rating: 5.0,
                reviews: 32,
                bookings: 85
            },
            {
                id: 3,
                title: "Hidden Cairo Walking Tour",
                location: "Cairo, Egypt",
                price: 45,
                status: "paused",
                rating: 4.8,
                reviews: 28,
                bookings: 67
            },
            {
                id: 4,
                title: "Nile Sunset & Traditional Music",
                location: "Cairo, Egypt",
                price: 55,
                status: "active",
                rating: 4.9,
                reviews: 22,
                bookings: 43
            }
        ];

        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            loadExperiences();
            animateStats();
            setupFormHandlers();
        });

        // Show tab function
        function showTab(tabName) {
            // Hide all tabs
            document.querySelectorAll('.content-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Remove active class from all nav links
            document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            // Show selected tab
            document.getElementById(tabName).classList.add('active');
            
            // Add active class to clicked nav link
            event.target.classList.add('active');
        }

        // Load experiences
        function loadExperiences() {
            const container = document.getElementById('experiencesList');
            container.innerHTML = '';
            
            hostExperiences.forEach(experience => {
                const experienceCard = createExperienceCard(experience);
                container.appendChild(experienceCard);
            });
        }

        // Create experience card
        function createExperienceCard(experience) {
            const card = document.createElement('div');
            card.className = 'experience-card';
            
            const statusBadge = experience.status === 'active' 
                ? '<span class="badge bg-success">Active</span>'
                : '<span class="badge bg-warning">Paused</span>';
            
            card.innerHTML = `
                <div class="experience-actions">
                    <button class="action-btn edit" onclick="editExperience(${experience.id})" title="Edit">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="action-btn" onclick="toggleExperience(${experience.id})" title="${experience.status === 'active' ? 'Pause' : 'Activate'}">
                        <i class="bi bi-${experience.status === 'active' ? 'pause' : 'play'}"></i>
                    </button>
                    <button class="action-btn delete" onclick="deleteExperience(${experience.id})" title="Delete">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
                
                <div class="experience-header">
                    <div>
                        <h3 class="experience-title">${experience.title}</h3>
                        <p class="experience-location">
                            <i class="bi bi-geo-alt me-1"></i>${experience.location}
                        </p>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-3">
                        <strong>Price:</strong> $${experience.price}
                    </div>
                    <div class="col-md-3">
                        <strong>Status:</strong> ${statusBadge}
                    </div>
                    <div class="col-md-3">
                        <strong>Rating:</strong> ${generateStars(experience.rating)} (${experience.reviews})
                    </div>
                    <div class="col-md-3">
                        <strong>Bookings:</strong> ${experience.bookings}
                    </div>
                </div>
            `;
            
            return card;
        }

        // Generate star rating
        function generateStars(rating) {
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 !== 0;
            let stars = '';
            
            for (let i = 0; i < fullStars; i++) {
                stars += '<i class="bi bi-star-fill text-warning"></i>';
            }
            
            if (hasHalfStar) {
                stars += '<i class="bi bi-star-half text-warning"></i>';
            }
            
            return stars;
        }

        // Change avatar
        function changeAvatar() {
            document.getElementById('avatarInput').click();
        }

        // Handle avatar change
        document.getElementById('avatarInput').addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const avatar = document.querySelector('.profile-avatar');
                    avatar.innerHTML = `
                        <img src="${e.target.result}" alt="Profile" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
                        <div class="avatar-overlay">
                            <i class="bi bi-camera"></i>
                        </div>
                        <div class="verified-badge">
                            <i class="bi bi-patch-check-fill"></i>
                        </div>
                    `;
                    showNotification('Profile photo updated!', 'success');
                };
                reader.readAsDataURL(file);
            }
        });

        // Add language
        function addLanguage() {
            const input = document.getElementById('newLanguage');
            const language = input.value.trim();
            
            if (language) {
                const languageTags = document.getElementById('languageTags');
                const tag = document.createElement('div');
                tag.className = 'language-tag';
                tag.innerHTML = `
                    ${language}
                    <span class="remove-tag" onclick="removeLanguage(this)">×</span>
                `;
                languageTags.appendChild(tag);
                input.value = '';
                showNotification('Language added!', 'success');
            }
        }

        // Remove language
        function removeLanguage(element) {
            element.parentElement.remove();
            showNotification('Language removed!', 'info');
        }

        // Edit experience
        function editExperience(id) {
            const experience = hostExperiences.find(exp => exp.id === id);
            if (experience) {
                showNotification(`Opening editor for "${experience.title}"`, 'info');
                // In a real app, this would open an edit modal or redirect to edit page
            }
        }

        // Toggle experience status
        function toggleExperience(id) {
            const experience = hostExperiences.find(exp => exp.id === id);
            if (experience) {
                experience.status = experience.status === 'active' ? 'paused' : 'active';
                loadExperiences();
                showNotification(`Experience ${experience.status === 'active' ? 'activated' : 'paused'}!`, 'success');
            }
        }

        // Delete experience
        function deleteExperience(id) {
            if (confirm('Are you sure you want to delete this experience? This action cannot be undone.')) {
                const index = hostExperiences.findIndex(exp => exp.id === id);
                if (index > -1) {
                    hostExperiences.splice(index, 1);
                    loadExperiences();
                    showNotification('Experience deleted!', 'success');
                }
            }
        }

        // Add new experience
        function addNewExperience() {
            showNotification('Redirecting to create new experience...', 'info');
            // In a real app, this would redirect to the post experience page
        }

        // Setup form handlers
        function setupFormHandlers() {
            // Profile form
            document.getElementById('profileForm').addEventListener('submit', function(e) {
                e.preventDefault();
                saveProfile();
            });

            // Settings form
            document.getElementById('settingsForm').addEventListener('submit', function(e) {
                e.preventDefault();
                saveSettings();
            });

            // Add language on Enter key
            document.getElementById('newLanguage').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    addLanguage();
                }
            });
        }

        // Save profile
        function saveProfile() {
            const button = document.querySelector('#profileForm .btn-save');
            const originalText = button.innerHTML;
            
            button.innerHTML = '<i class="bi bi-arrow-clockwise spin me-2"></i>Saving...';
            button.disabled = true;
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
                showNotification('Profile updated successfully!', 'success');
            }, 2000);
        }

        // Save settings
        function saveSettings() {
            const button = document.querySelector('#settingsForm .btn-save');
            const originalText = button.innerHTML;
            
            button.innerHTML = '<i class="bi bi-arrow-clockwise spin me-2"></i>Saving...';
            button.disabled = true;
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
                showNotification('Settings saved successfully!', 'success');
            }, 2000);
        }

        // Cancel changes
        function cancelChanges() {
            if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
                location.reload();
            }
        }

        // Cancel settings
        function cancelSettings() {
            if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
                // Reset form to original values
                document.getElementById('settingsForm').reset();
                showNotification('Changes cancelled', 'info');
            }
        }

        // Animate statistics counters
        function animateStats() {
            const stats = document.querySelectorAll('.stat-number[data-count]');
            
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

        // Show notification
        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `alert alert-${type} position-fixed`;
            notification.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px; max-width: 400px;';
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