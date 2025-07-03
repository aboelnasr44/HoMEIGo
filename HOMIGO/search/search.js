 // Enhanced Search Page JavaScript with Modal Functionality
        document.addEventListener("DOMContentLoaded", function() {
            // Experience data
            const experienceData = {
                "Mountain Hiking Adventure": {
                    title: "Mountain Hiking Adventure",
                    subtitle: "Guided mountain trek with stunning views",
                    description: "Experience the breathtaking beauty of mountain landscapes on this guided hiking adventure. Our expert guides will take you through scenic trails, sharing local knowledge about flora, fauna, and geological formations. Perfect for adventure seekers and nature lovers.",
                    price: 150,
                    rating: 4.8,
                    reviews: 124,
                    duration: "6 hours",
                    maxPeople: 8,
                    location: "Rocky Mountains, Colorado",
                    host: "Alex Mountain Guide",
                    includes: [
                        "Professional mountain guide",
                        "Safety equipment and gear",
                        "Light refreshments and water",
                        "Transportation to trailhead",
                        "Photography assistance"
                    ],
                    highlights: [
                        "Stunning panoramic mountain views",
                        "Wildlife spotting opportunities",
                        "Professional photography tips",
                        "Local geological insights",
                        "Small group experience"
                    ]
                },
                "Local Food Walking Tour": {
                    title: "Local Food Walking Tour",
                    subtitle: "Taste authentic local cuisine and hidden gems",
                    description: "Embark on a culinary journey through the heart of the city. Discover hidden food gems, taste authentic local dishes, and learn about the cultural significance of traditional recipes from local food experts.",
                    price: 85,
                    rating: 4.9,
                    reviews: 89,
                    duration: "3 hours",
                    maxPeople: 12,
                    location: "Historic Downtown",
                    host: "Maria Food Expert",
                    includes: [
                        "Food tastings at 6 locations",
                        "Local culinary guide",
                        "Cultural insights and stories",
                        "Recipe cards to take home",
                        "Dietary accommodations available"
                    ],
                    highlights: [
                        "Authentic local cuisine",
                        "Hidden neighborhood gems",
                        "Cultural food stories",
                        "Recipe sharing session",
                        "Meet local vendors"
                    ]
                },
                "Historical City Tour": {
                    title: "Historical City Tour",
                    subtitle: "Explore ancient landmarks and cultural sites",
                    description: "Step back in time and explore the rich history of our city. Visit ancient landmarks, learn about historical events, and discover the stories that shaped our cultural heritage with an expert historian guide.",
                    price: 120,
                    rating: 4.7,
                    reviews: 156,
                    duration: "4 hours",
                    maxPeople: 15,
                    location: "Old Town District",
                    host: "Dr. Sarah Historian",
                    includes: [
                        "Expert historian guide",
                        "Museum entry tickets",
                        "Historical documents viewing",
                        "Walking tour map",
                        "Audio headsets"
                    ],
                    highlights: [
                        "Ancient landmark visits",
                        "Historical insights and stories",
                        "Cultural heritage exploration",
                        "Expert commentary",
                        "Photo opportunities"
                    ]
                },
                "Wildlife Safari Experience": {
                    title: "Wildlife Safari Experience",
                    subtitle: "Discover local wildlife in their natural habitat",
                    description: "Join us for an unforgettable wildlife safari experience. Observe animals in their natural habitat, learn about conservation efforts, and capture amazing photos of local wildlife with professional photography guidance.",
                    price: 95,
                    rating: 4.6,
                    reviews: 78,
                    duration: "5 hours",
                    maxPeople: 10,
                    location: "Nature Reserve",
                    host: "Jake Wildlife Expert",
                    includes: [
                        "Wildlife expert guide",
                        "Binoculars provided",
                        "Photography tips and guidance",
                        "Conservation education talk",
                        "Light snacks and drinks"
                    ],
                    highlights: [
                        "Wildlife observation",
                        "Photography opportunities",
                        "Conservation insights",
                        "Natural habitat exploration",
                        "Educational experience"
                    ]
                },
                "Water Sports Adventure": {
                    title: "Water Sports Adventure",
                    subtitle: "Kayaking, snorkeling, and beach activities",
                    description: "Dive into an action-packed day of water sports! Experience kayaking through crystal clear waters, snorkeling among colorful marine life, and enjoy various beach activities with professional instructors.",
                    price: 200,
                    rating: 4.9,
                    reviews: 203,
                    duration: "8 hours",
                    maxPeople: 6,
                    location: "Crystal Bay",
                    host: "Captain Mike",
                    includes: [
                        "All water sports equipment",
                        "Professional instruction",
                        "Lunch and refreshments",
                        "Safety briefing and gear",
                        "Underwater camera rental"
                    ],
                    highlights: [
                        "Kayaking adventure",
                        "Snorkeling experience",
                        "Marine life observation",
                        "Beach activities",
                        "Professional instruction"
                    ]
                },
                "Evening City Lights Tour": {
                    title: "Evening City Lights Tour",
                    subtitle: "Experience the city's vibrant nightlife",
                    description: "Discover the city that never sleeps! Experience vibrant nightlife, visit popular entertainment districts, enjoy rooftop views, and learn about the city's evening culture from a local nightlife expert.",
                    price: 75,
                    rating: 4.5,
                    reviews: 92,
                    duration: "4 hours",
                    maxPeople: 20,
                    location: "Entertainment District",
                    host: "Emma Night Guide",
                    includes: [
                        "Local nightlife guide",
                        "Rooftop bar access",
                        "Welcome drink included",
                        "Transportation between venues",
                        "VIP club entry"
                    ],
                    highlights: [
                        "City lights panoramic views",
                        "Nightlife hotspot visits",
                        "Rooftop bar experiences",
                        "Local culture immersion",
                        "Photography opportunities"
                    ]
                }
            };

            // Get elements
            const searchForm = document.getElementById("searchForm");
            const searchInput = document.getElementById("searchInput");
            const locationInput = document.getElementById("locationInput");
            const dateInput = document.getElementById("dateInput");
            const searchSuggestions = document.getElementById("searchSuggestions");
            const filterTags = document.querySelectorAll(".filter-tag");
            const sortSelect = document.getElementById("sortSelect");
            const viewBtns = document.querySelectorAll(".view-btn");
            const experiencesGrid = document.getElementById("experiencesGrid");
            const loadMoreBtn = document.getElementById("loadMoreBtn");
            const loadingOverlay = document.getElementById("loadingOverlay");
            const resultsCount = document.getElementById("resultsCount");

            // Sample search suggestions
            const suggestions = [
                "Mountain hiking", "Food tours", "Cultural experiences", "Adventure sports",
                "Nature walks", "City tours", "Water activities", "Photography tours",
                "Wine tasting", "Cooking classes"
            ];

            // Modal functionality
            function openExperienceModal(experienceTitle) {
                const data = experienceData[experienceTitle];
                if (!data) return;

                // Populate modal content
                document.getElementById('experienceModalLabel').textContent = data.title;
                document.getElementById('modalSubtitle').textContent = data.subtitle;
                document.getElementById('modalDescription').textContent = data.description;
                document.getElementById('modalPrice').textContent = `$${data.price}`;
                document.getElementById('modalRating').textContent = data.rating;
                document.getElementById('modalReviews').textContent = data.reviews;
                document.getElementById('modalDuration').textContent = data.duration;
                document.getElementById('modalMaxPeople').textContent = data.maxPeople;
                document.getElementById('modalLocation').textContent = data.location;
                document.getElementById('modalHost').textContent = data.host;

                // Populate includes
                const includesList = document.getElementById('modalIncludes');
                includesList.innerHTML = data.includes.map(item => `<li>${item}</li>`).join('');

                // Populate highlights
                const highlightsList = document.getElementById('modalHighlights');
                highlightsList.innerHTML = data.highlights.map(item => `<li>${item}</li>`).join('');

                // Set up book now button
                const bookNowBtn = document.getElementById('bookNowBtn');
                bookNowBtn.onclick = function() { bookExperience(data); };

                // Show modal
                const modal = new bootstrap.Modal(document.getElementById('experienceModal'));
                modal.show();
            }

            function bookExperience(data) {
                // Create URL parameters with experience data
                const params = new URLSearchParams({
                    experience: data.title,
                    host: data.host,
                    price: data.price,
                    duration: data.duration,
                    location: data.location,
                    maxPeople: data.maxPeople,
                    rating: data.rating,
                    reviews: data.reviews
                });

                // Redirect to payment page with pre-filled data
                window.location.href = `../payment/payment.html?${params.toString()}`;
            }

            // Add click handlers to experience cards
            document.addEventListener('click', function(e) {
                if (e.target.closest('.experience-card')) {
                    const card = e.target.closest('.experience-card');
                    const title = card.querySelector('.experience-title').textContent;
                    
                    // If clicked on View Details button, open modal
                    if (e.target.classList.contains('btn-primary-custom') || e.target.closest('.btn-primary-custom')) {
                        e.preventDefault();
                        openExperienceModal(title);
                    }
                    // If clicked anywhere else on the card, open modal
                    else {
                        openExperienceModal(title);
                    }
                }
            });

            // Search suggestions functionality
            searchInput.addEventListener("input", function() {
                const query = this.value.toLowerCase().trim();
                if (query.length > 0) {
                    const filteredSuggestions = suggestions.filter(suggestion => 
                        suggestion.toLowerCase().includes(query));
                    if (filteredSuggestions.length > 0) {
                        showSuggestions(filteredSuggestions);
                    } else {
                        hideSuggestions();
                    }
                } else {
                    hideSuggestions();
                }
            });

            function showSuggestions(suggestions) {
                searchSuggestions.innerHTML = suggestions
                    .map(suggestion => `<div class="suggestion-item">${suggestion}</div>`)
                    .join("");
                searchSuggestions.style.display = "block";

                searchSuggestions.querySelectorAll(".suggestion-item").forEach(item => {
                    item.addEventListener("click", function() {
                        searchInput.value = item.textContent;
                        hideSuggestions();
                        performSearch();
                    });
                });
            }

            function hideSuggestions() {
                searchSuggestions.style.display = "none";
            }

            // Hide suggestions when clicking outside
            document.addEventListener("click", function(e) {
                if (!e.target.closest(".search-field")) {
                    hideSuggestions();
                }
            });

            // Filter tags functionality
            filterTags.forEach(tag => {
                tag.addEventListener("click", function() {
                    filterTags.forEach(t => t.classList.remove("active"));
                    tag.classList.add("active");
                    const filterValue = tag.dataset.filter;
                    searchInput.value = filterValue;
                    performSearch();
                });
            });

            // Search form submission
            searchForm.addEventListener("submit", function(e) {
                e.preventDefault();
                performSearch();
            });

            // Sort functionality
            sortSelect.addEventListener("change", function() {
                sortExperiences(sortSelect.value);
            });

            // View toggle functionality
            viewBtns.forEach(btn => {
                btn.addEventListener("click", function() {
                    viewBtns.forEach(b => b.classList.remove("active"));
                    btn.classList.add("active");
                    const view = btn.dataset.view;
                    if (view === "list") {
                        experiencesGrid.classList.add("list-view");
                    } else {
                        experiencesGrid.classList.remove("list-view");
                    }
                });
            });

            // Load more functionality
            loadMoreBtn.addEventListener("click", function() {
                loadMoreExperiences();
            });

            // Search functionality
            function performSearch() {
                const query = searchInput.value.trim();
                const location = locationInput.value.trim();
                const date = dateInput.value;

                showLoading();
                setTimeout(function() {
                    hideLoading();
                    filterExperiences(query, location, date);
                    updateResultsCount();
                }, 1000);
            }

            function filterExperiences(query, location, date) {
                const cards = document.querySelectorAll(".experience-card");
                let visibleCount = 0;

                cards.forEach(card => {
                    const title = card.querySelector(".experience-title").textContent.toLowerCase();
                    const category = card.dataset.category.toLowerCase();

                    const matchesQuery = !query || title.includes(query.toLowerCase()) || 
                                       category.includes(query.toLowerCase());
                    const matchesLocation = !location;
                    const matchesDate = !date;

                    if (matchesQuery && matchesLocation && matchesDate) {
                        card.style.display = "block";
                        visibleCount++;
                    } else {
                        card.style.display = "none";
                    }
                });

                resultsCount.textContent = `Showing ${visibleCount} experiences`;
            }

            function sortExperiences(sortBy) {
                const cards = Array.from(document.querySelectorAll(".experience-card"));
                cards.sort((a, b) => {
                    switch (sortBy) {
                        case "price-low":
                            return parseInt(a.dataset.price) - parseInt(b.dataset.price);
                        case "price-high":
                            return parseInt(b.dataset.price) - parseInt(a.dataset.price);
                        case "rating":
                            return parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating);
                        case "newest":
                            return cards.indexOf(b) - cards.indexOf(a);
                        default:
                            return 0;
                    }
                });
                cards.forEach(card => experiencesGrid.appendChild(card));
            }

            function loadMoreExperiences() {
                showLoading();
                setTimeout(function() {
                    hideLoading();
                    const alertDiv = document.createElement("div");
                    alertDiv.className = "alert alert-info text-center";
                    alertDiv.innerHTML = '<i class="fas fa-info-circle me-2"></i>All experiences loaded!';
                    loadMoreBtn.parentNode.insertBefore(alertDiv, loadMoreBtn);
                    loadMoreBtn.style.display = "none";
                    setTimeout(() => alertDiv.remove(), 3000);
                }, 1500);
            }

            function showLoading() {
                loadingOverlay.style.display = "flex";
            }

            function hideLoading() {
                loadingOverlay.style.display = "none";
            }

            function updateResultsCount() {
                const visibleCards = document.querySelectorAll(
                    ".experience-card[style*='block'], .experience-card:not([style*='none'])"
                );
                resultsCount.textContent = `Showing ${visibleCards.length} experiences`;
            }

            // Initialize page
            updateResultsCount();
            const today = new Date().toISOString().split("T")[0];
            dateInput.setAttribute("min", today);

            // Keyboard shortcuts
            document.addEventListener("keydown", function(e) {
                if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                    e.preventDefault();
                    searchInput.focus();
                }
                if (e.key === "Escape") {
                    searchInput.value = "";
                    locationInput.value = "";
                    dateInput.value = "";
                    hideSuggestions();
                    filterTags.forEach(tag => tag.classList.remove("active"));
                    const cards = document.querySelectorAll(".experience-card");
                    cards.forEach(card => card.style.display = "block");
                    updateResultsCount();
                }
            });

            // Placeholder function for host dashboard
            window.showHostDashboard = function() {
                alert("Host dashboard feature coming soon!");
            };
        });