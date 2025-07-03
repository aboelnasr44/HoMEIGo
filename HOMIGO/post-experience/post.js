       // Experience types data
        const experienceTypes = [
            {
                id: 'accommodation',
                icon: 'bi-house-door',
                title: 'Accommodation',
                description: 'Share your home, apartment, or unique space'
            },
            {
                id: 'cooking',
                icon: 'bi-cup-hot',
                title: 'Cooking Experience',
                description: 'Teach traditional recipes and cooking techniques'
            },
            {
                id: 'cultural',
                icon: 'bi-palette',
                title: 'Cultural Activity',
                description: 'Share local customs, arts, or traditions'
            },
            {
                id: 'adventure',
                icon: '🏔️ ',
                title: 'Adventure Tour',
                description: 'Guide outdoor activities and adventures'
            },
            {
                id: 'workshop',
                icon: 'bi-tools',
                title: 'Workshop/Class',
                description: 'Teach skills, crafts, or specialized knowledge'
            },
            {
                id: 'tour',
                icon: 'bi-compass',
                title: 'Local Tour',
                description: 'Show hidden gems and local attractions'
            }
        ];

        // Amenities data
        const amenitiesData = [
            { id: 'wifi', icon: 'bi-wifi', label: 'WiFi' },
            { id: 'parking', icon: 'bi-car-front', label: 'Free Parking' },
            { id: 'kitchen', icon: 'bi-cup-hot', label: 'Kitchen Access' },
            { id: 'ac', icon: 'bi-snow', label: 'Air Conditioning' },
            { id: 'heating', icon: 'bi-thermometer-sun', label: 'Heating' },
            { id: 'tv', icon: 'bi-tv', label: 'TV' },
            { id: 'washer', icon: 'bi-arrow-repeat', label: 'Washer' },
            { id: 'dryer', icon: 'bi-wind', label: 'Dryer' },
            { id: 'pool', icon: 'bi-water', label: 'Pool' },
            { id: 'gym', icon: 'bi-heart-pulse', label: 'Gym' },
            { id: 'breakfast', icon: 'bi-cup-straw', label: 'Breakfast Included' },
            { id: 'pickup', icon: 'bi-car-front-fill', label: 'Airport Pickup' },
            { id: 'materials', icon: 'bi-box', label: 'Materials Provided' },
            { id: 'certificate', icon: 'bi-award', label: 'Certificate' },
            { id: 'photos', icon: 'bi-camera', label: 'Photos Included' },
            { id: 'guide', icon: 'bi-person-badge', label: 'Professional Guide' }
        ];

        let currentStep = 1;
        let selectedExperienceType = '';
        let selectedAmenities = [];
        let uploadedImages = [];

        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            loadExperienceTypes();
            loadAmenities();
            setupImageUpload();
            setupFormValidation();
            updateProgress();
        });

        // Load experience types
        function loadExperienceTypes() {
            const container = document.getElementById('experienceTypeGrid');
            
            experienceTypes.forEach(type => {
                const typeCard = document.createElement('div');
                typeCard.className = 'experience-type-card';
                typeCard.onclick = () => selectExperienceType(type.id);
                
                typeCard.innerHTML = `
                    <i class="bi ${type.icon} experience-type-icon"></i>
                    <h4 class="experience-type-title">${type.title}</h4>
                    <p class="experience-type-description">${type.description}</p>
                `;
                
                container.appendChild(typeCard);
            });
        }

        // Load amenities
        function loadAmenities() {
            const container = document.getElementById('amenitiesGrid');
            
            amenitiesData.forEach(amenity => {
                const amenityItem = document.createElement('div');
                amenityItem.className = 'amenity-item';
                amenityItem.onclick = () => toggleAmenity(amenity.id);
                
                amenityItem.innerHTML = `
                    <i class="bi ${amenity.icon} amenity-icon"></i>
                    <span class="amenity-label">${amenity.label}</span>
                `;
                
                container.appendChild(amenityItem);
            });
        }

        // Select experience type
        function selectExperienceType(typeId) {
            // Remove previous selection
            document.querySelectorAll('.experience-type-card').forEach(card => {
                card.classList.remove('selected');
            });
            
            // Add selection to clicked card
            event.currentTarget.classList.add('selected');
            selectedExperienceType = typeId;
            
            // Enable next button
            document.getElementById('nextBtn').disabled = false;
        }

        // Toggle amenity selection
        function toggleAmenity(amenityId) {
            const amenityElement = event.currentTarget;
            
            if (selectedAmenities.includes(amenityId)) {
                selectedAmenities = selectedAmenities.filter(id => id !== amenityId);
                amenityElement.classList.remove('selected');
            } else {
                selectedAmenities.push(amenityId);
                amenityElement.classList.add('selected');
            }
        }

        // Setup image upload
        function setupImageUpload() {
            const uploadArea = document.getElementById('imageUploadArea');
            const imageInput = document.getElementById('imageInput');
            
            uploadArea.addEventListener('click', () => imageInput.click());
            
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('dragover');
            });
            
            uploadArea.addEventListener('dragleave', () => {
                uploadArea.classList.remove('dragover');
            });
            
            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('dragover');
                handleFiles(e.dataTransfer.files);
            });
            
            imageInput.addEventListener('change', (e) => {
                handleFiles(e.target.files);
            });
        }

        // Handle file uploads
        function handleFiles(files) {
            Array.from(files).forEach(file => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        addImagePreview(e.target.result, file.name);
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        // Add image preview
        function addImagePreview(src, name) {
            const previewGrid = document.getElementById('imagePreviewGrid');
            const imageId = 'img_' + Date.now();
            
            const imagePreview = document.createElement('div');
            imagePreview.className = 'image-preview';
            imagePreview.id = imageId;
            
            imagePreview.innerHTML = `
                <img src="${src}" alt="${name}">
                <button type="button" class="image-remove" onclick="removeImage('${imageId}')">
                    <i class="bi bi-x"></i>
                </button>
            `;
            
            previewGrid.appendChild(imagePreview);
            uploadedImages.push({ id: imageId, src: src, name: name });
        }

        // Remove image
        function removeImage(imageId) {
            const imageElement = document.getElementById(imageId);
            if (imageElement) {
                imageElement.remove();
                uploadedImages = uploadedImages.filter(img => img.id !== imageId);
            }
        }

        // Change step
        function changeStep(direction) {
            if (direction === 1 && !validateCurrentStep()) {
                return;
            }
            
            const newStep = currentStep + direction;
            
            if (newStep >= 1 && newStep <= 6) {
                // Hide current step
                document.getElementById(`step${currentStep}`).style.display = 'none';
                
                // Show new step
                currentStep = newStep;
                document.getElementById(`step${currentStep}`).style.display = 'block';
                
                // Update navigation buttons
                updateNavigationButtons();
                
                // Update progress
                updateProgress();
                
                // Update preview if on last step
                if (currentStep === 6) {
                    updatePreview();
                }
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }

        // Validate current step
        function validateCurrentStep() {
            switch (currentStep) {
                case 1:
                    if (!selectedExperienceType) {
                        showNotification('Please select an experience type', 'warning');
                        return false;
                    }
                    break;
                case 2:
                    const requiredFields = ['experienceTitle', 'experienceLocation', 'maxGuests', 'duration', 'language', 'experienceDescription'];
                    for (let field of requiredFields) {
                        if (!document.getElementById(field).value.trim()) {
                            showNotification('Please fill in all required fields', 'warning');
                            return false;
                        }
                    }
                    break;
                case 3:
                    if (uploadedImages.length === 0) {
                        showNotification('Please upload at least one photo', 'warning');
                        return false;
                    }
                    break;
                case 5:
                    const basePrice = document.getElementById('basePrice').value;
                    const pricingType = document.getElementById('pricingType').value;
                    const cancellationPolicy = document.getElementById('cancellationPolicy').value;
                    const instantBook = document.getElementById('instantBook').value;
                    
                    if (!basePrice || !pricingType || !cancellationPolicy || !instantBook) {
                        showNotification('Please complete all pricing information', 'warning');
                        return false;
                    }
                    break;
            }
            return true;
        }

        // Update navigation buttons
        function updateNavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            
            prevBtn.style.display = currentStep > 1 ? 'block' : 'none';
            
            if (currentStep === 6) {
                nextBtn.style.display = 'none';
            } else {
                nextBtn.style.display = 'block';
                nextBtn.innerHTML = currentStep === 5 ? 'Preview <i class="bi bi-eye ms-2"></i>' : 'Next <i class="bi bi-arrow-right ms-2"></i>';
            }
        }

        // Update progress
        function updateProgress() {
            const progress = (currentStep / 6) * 100;
            document.getElementById('progressBar').style.width = progress + '%';
            
            const stepTitles = [
                'Choose Experience Type',
                'Basic Information',
                'Add Photos',
                'Select Amenities',
                'Set Pricing',
                'Preview & Publish'
            ];
            
            document.getElementById('progressText').textContent = `Step ${currentStep} of 6: ${stepTitles[currentStep - 1]}`;
        }

        // Update preview
        function updatePreview() {
            const title = document.getElementById('experienceTitle').value || 'Your Experience Title';
            const location = document.getElementById('experienceLocation').value || 'Your Location';
            const basePrice = document.getElementById('basePrice').value || '0';
            const pricingType = document.getElementById('pricingType').value || 'per-person';
            
            document.getElementById('previewTitle').textContent = title;
            document.getElementById('previewLocation').innerHTML = `<i class="bi bi-geo-alt me-1"></i>${location}`;
            document.getElementById('previewPrice').textContent = `$${basePrice}`;
            
            // Update preview image
            const previewImage = document.getElementById('previewImage');
            if (uploadedImages.length > 0) {
                previewImage.innerHTML = `<img src="${uploadedImages[0].src}" alt="Experience" style="width: 100%; height: 100%; object-fit: cover;">`;
            }
        }

        // Setup form validation
        function setupFormValidation() {
            // Real-time price update
            document.getElementById('basePrice').addEventListener('input', updatePriceDisplay);
            document.getElementById('pricingType').addEventListener('change', updatePriceDisplay);
        }

        // Update price display
        function updatePriceDisplay() {
            const basePrice = document.getElementById('basePrice').value || '0';
            const pricingType = document.getElementById('pricingType').value || 'per-person';
            
            document.getElementById('displayPrice').textContent = `$${basePrice}`;
            
            const periodMap = {
                'per-person': 'per person',
                'per-group': 'per group',
                'per-night': 'per night',
                'per-day': 'per day'
            };
            
            document.getElementById('displayPeriod').textContent = periodMap[pricingType] || 'per person';
        }

        // Save draft
        function saveDraft() {
            const button = event.target;
            const originalText = button.innerHTML;
            
            button.innerHTML = '<i class="bi bi-arrow-clockwise spin me-2"></i>Saving...';
            button.disabled = true;
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
                showNotification('Draft saved successfully!', 'success');
            }, 2000);
        }

        // Publish experience
        function publishExperience() {
            const button = event.target;
            const originalText = button.innerHTML;
            
            button.innerHTML = '<i class="bi bi-arrow-clockwise spin me-2"></i>Publishing...';
            button.disabled = true;
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
                showNotification('Experience published successfully! It will be reviewed and go live within 24 hours.', 'success');
                
                // Redirect to host dashboard after 3 seconds
                setTimeout(() => {
                    showNotification('Redirecting to your host dashboard...', 'info');
                }, 3000);
            }, 3000);
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

        // Initialize navigation buttons
        updateNavigationButtons();