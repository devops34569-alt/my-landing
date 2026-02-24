// ===================================
// Initialize on DOM Content Loaded
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollAnimations();
    initCounterAnimation();
    initReferences();
    initReviews();
    initContactForm();
    initReviewForm();
    initAOS();
});

// ===================================
// Navigation
// ===================================

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect on navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const icon = mobileMenuToggle?.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Smooth scrolling for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ===================================
// Scroll Animations
// ===================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    const animatedElements = document.querySelectorAll('.timeline-item, .reference-card, .review-card');
    animatedElements.forEach(el => observer.observe(el));
}

// ===================================
// Counter Animation
// ===================================

function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const animateCounter = (counter) => {
        const text = counter.textContent;
        const hasPlus = text.includes('+');
        const value = parseInt(text.replace(/\D/g, ''));
        const suffix = hasPlus ? '+' : '';
        
        // 1k+ 같은 경우 처리
        let displayValue = value;
        let multiplier = 1;
        if (text.includes('k')) {
            multiplier = 1000;
            displayValue = value;
        }

        const duration = 2000; // 2초
        const steps = 60;
        const stepValue = value / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            current = Math.min(Math.ceil(stepValue * step), value);
            
            if (text.includes('k')) {
                counter.textContent = current + 'k' + suffix;
            } else {
                counter.textContent = current + suffix;
            }

            if (step >= steps) {
                clearInterval(timer);
                // 최종 값 설정
                counter.textContent = text;
            }
        }, duration / steps);
    };

    const checkScroll = () => {
        if (hasAnimated) return;

        const heroStats = document.querySelector('.hero-stats');
        if (!heroStats) return;

        const rect = heroStats.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

        if (isVisible) {
            hasAnimated = true;
            counters.forEach((counter, index) => {
                setTimeout(() => {
                    animateCounter(counter);
                }, index * 100); // 각 카운터를 0.1초 간격으로 시작
            });
            window.removeEventListener('scroll', checkScroll);
        }
    };

    // 페이지 로드 시 체크
    checkScroll();
    
    // 스크롤 시 체크
    window.addEventListener('scroll', checkScroll);
}

// ===================================
// AOS (Animate On Scroll)
// ===================================

function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
}

// ===================================
// References Section
// ===================================

async function initReferences() {
    const referencesGrid = document.getElementById('referencesGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    try {
        // Fetch references from API
        const response = await fetch('tables/references?limit=100&sort=order');
        const data = await response.json();
        
        if (data && data.data) {
            const references = data.data;
            displayReferences(references);

            // Setup filter functionality
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const filter = this.getAttribute('data-filter');
                    
                    // Update active button
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');

                    // Filter references
                    let filteredReferences = references;
                    if (filter !== 'all') {
                        filteredReferences = references.filter(ref => ref.category === filter);
                    }
                    displayReferences(filteredReferences);
                });
            });
        }
    } catch (error) {
        console.error('Error loading references:', error);
        referencesGrid.innerHTML = '<p style="text-align:center; color: var(--text-light);">레퍼런스를 불러올 수 없습니다.</p>';
    }
}

function displayReferences(references) {
    const referencesGrid = document.getElementById('referencesGrid');
    
    if (!references || references.length === 0) {
        referencesGrid.innerHTML = '<p style="text-align:center; color: var(--text-light); grid-column: 1/-1;">레퍼런스가 없습니다.</p>';
        return;
    }

    referencesGrid.innerHTML = references.map(ref => `
        <div class="reference-card" data-category="${ref.category}">
            <div class="reference-image">
                ${ref.image_url ? `<img src="${ref.image_url}" alt="${ref.title}">` : '<i class="fas fa-briefcase"></i>'}
            </div>
            <div class="reference-content">
                <span class="reference-category">${ref.category || '기타'}</span>
                <h3 class="reference-title">${ref.title}</h3>
                <p class="reference-company">${ref.company}</p>
                <p class="reference-description">${ref.description}</p>
                <div class="reference-meta">
                    <i class="fas fa-calendar"></i>
                    <span>${ref.date}</span>
                </div>
                ${ref.tags && ref.tags.length > 0 ? `
                    <div class="reference-tags">
                        ${ref.tags.map(tag => `<span class="reference-tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');
}

// ===================================
// Reviews Section
// ===================================

async function initReviews() {
    const reviewsContainer = document.getElementById('reviewsContainer');
    const showReviewFormBtn = document.getElementById('showReviewFormBtn');

    try {
        // Fetch approved reviews from API
        const response = await fetch('tables/reviews?limit=100&sort=-created_date');
        const data = await response.json();
        
        if (data && data.data) {
            // Filter only approved reviews
            const approvedReviews = data.data.filter(review => review.is_approved === true);
            displayReviews(approvedReviews);
        }
    } catch (error) {
        console.error('Error loading reviews:', error);
        reviewsContainer.innerHTML = '<p style="text-align:center; color: var(--text-light);">리뷰를 불러올 수 없습니다.</p>';
    }

    // Show review form modal
    if (showReviewFormBtn) {
        showReviewFormBtn.addEventListener('click', function() {
            const modal = document.getElementById('reviewModal');
            modal.classList.add('active');
        });
    }
}

function displayReviews(reviews) {
    const reviewsContainer = document.getElementById('reviewsContainer');
    
    if (!reviews || reviews.length === 0) {
        reviewsContainer.innerHTML = '<p style="text-align:center; color: var(--text-light); grid-column: 1/-1;">아직 리뷰가 없습니다. 첫 번째 리뷰를 작성해보세요!</p>';
        return;
    }

    reviewsContainer.innerHTML = reviews.map(review => {
        const date = new Date(review.created_date);
        const formattedDate = date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
        
        return `
            <div class="review-card">
                <div class="review-header">
                    <div class="review-author">
                        <h4 class="review-author-name">${review.author_name}</h4>
                        <p class="review-author-title">${review.author_title}</p>
                    </div>
                    <div class="review-rating">
                        ${generateStarRating(review.rating)}
                    </div>
                </div>
                <p class="review-content">${review.content}</p>
                <div class="review-course">${review.course_name}</div>
                <div class="review-date">${formattedDate}</div>
            </div>
        `;
    }).join('');
}

function generateStarRating(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars += '<i class="fas fa-star"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// ===================================
// Review Form
// ===================================

function initReviewForm() {
    const reviewModal = document.getElementById('reviewModal');
    const reviewForm = document.getElementById('reviewForm');
    const closeReviewModal = document.getElementById('closeReviewModal');
    const modalOverlay = reviewModal?.querySelector('.modal-overlay');
    const ratingInput = document.getElementById('ratingInput');
    const reviewRatingInput = document.getElementById('reviewRating');

    // Rating selection
    if (ratingInput) {
        const stars = ratingInput.querySelectorAll('i');
        stars.forEach((star, index) => {
            star.addEventListener('click', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                reviewRatingInput.value = rating;
                
                // Update star display
                stars.forEach((s, i) => {
                    if (i < rating) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
            });
        });

        // Initialize with 5 stars
        stars.forEach(star => star.classList.add('active'));
    }

    // Close modal
    if (closeReviewModal) {
        closeReviewModal.addEventListener('click', function() {
            reviewModal.classList.remove('active');
        });
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', function() {
            reviewModal.classList.remove('active');
        });
    }

    // Submit review form
    if (reviewForm) {
        reviewForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = {
                author_name: document.getElementById('reviewAuthor').value,
                author_title: document.getElementById('reviewTitle').value,
                course_name: document.getElementById('reviewCourse').value,
                rating: parseInt(document.getElementById('reviewRating').value),
                content: document.getElementById('reviewContent').value,
                is_approved: false, // Requires approval
                created_date: new Date().toISOString()
            };

            try {
                const response = await fetch('tables/reviews', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    showToast('리뷰가 성공적으로 제출되었습니다! 검토 후 게시됩니다.');
                    reviewModal.classList.remove('active');
                    reviewForm.reset();
                    
                    // Reset rating to 5 stars
                    const stars = ratingInput.querySelectorAll('i');
                    stars.forEach(star => star.classList.add('active'));
                    reviewRatingInput.value = 5;
                } else {
                    showToast('리뷰 제출 중 오류가 발생했습니다.', 'error');
                }
            } catch (error) {
                console.error('Error submitting review:', error);
                showToast('리뷰 제출 중 오류가 발생했습니다.', 'error');
            }
        });
    }
}

// ===================================
// Contact Form
// ===================================

function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                status: 'pending',
                created_date: new Date().toISOString()
            };

            try {
                const response = await fetch('tables/inquiries', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    showToast('문의가 성공적으로 접수되었습니다! 빠른 시일 내에 답변드리겠습니다.');
                    contactForm.reset();
                } else {
                    showToast('문의 접수 중 오류가 발생했습니다.', 'error');
                }
            } catch (error) {
                console.error('Error submitting inquiry:', error);
                showToast('문의 접수 중 오류가 발생했습니다.', 'error');
            }
        });
    }
}

// ===================================
// Toast Notification
// ===================================

function showToast(message, type = 'success') {
    const toast = document.getElementById('successToast');
    const toastMessage = document.getElementById('toastMessage');

    if (toast && toastMessage) {
        toastMessage.textContent = message;
        
        // Change color based on type
        if (type === 'error') {
            toast.style.background = '#ef4444';
        } else {
            toast.style.background = '#10b981';
        }

        toast.classList.add('show');

        setTimeout(function() {
            toast.classList.remove('show');
        }, 4000);
    }
}

// ===================================
// Utility Functions
// ===================================

// Format date to Korean format
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===================================
// Additional Interactive Features
// ===================================

// Add parallax effect to hero section (optional enhancement)
window.addEventListener('scroll', debounce(function() {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
}, 10));

// Scroll indicator click handler
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}