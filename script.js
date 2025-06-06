document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav-links');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    console.log('Mobile Menu JS Loaded. Button:', menuBtn, 'Nav:', mobileNav); // Debug log

    if (menuBtn && mobileNav) {
        console.log('Adding click listener to button'); // Debug log
        menuBtn.addEventListener('click', () => {
            console.log('Hamburger clicked!'); // Debug log
            try {
                mobileNav.classList.toggle('mobile-nav-active');
                console.log('Toggled mobile-nav-active. Current classes:', mobileNav.className); // Debug log
                menuBtn.classList.toggle('active');
                console.log('Toggled active on button. Current classes:', menuBtn.className); // Debug log
            } catch (error) {
                console.error('Error toggling classes:', error); // Log errors
            }
        });
    } else {
        console.warn('Mobile menu button or nav container not found!'); // Warning if elements missing
    }

    // Close mobile menu when a link is clicked
    if (mobileLinks.length > 0 && mobileNav) {
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Add slight delay to allow scroll animation to start before closing menu
                setTimeout(() => {
                    if (mobileNav.classList.contains('mobile-nav-active')) {
                        mobileNav.classList.remove('mobile-nav-active');
                        menuBtn.classList.remove('active');
                    }
                }, 150);
            });
        });
    }

    /* --- Testimonial Slider Code (Currently Inactive in HTML) --- 
    // You previously asked to remove the slider functionality.
    // If you restore the HTML (multiple cards, nav buttons, dots) and the 
    // `.testimonials-slider` class, uncomment the relevant parts below.
    const testimonialContainer = document.querySelector('.testimonials-container'); // Using updated class
    const testimonialCards = testimonialContainer ? testimonialContainer.querySelectorAll('.testimonial-card') : [];
    const dots = document.querySelectorAll('.dot'); // Dots might be removed from HTML
    const prevBtn = document.querySelector('.prev-btn'); // Button might be removed from HTML
    const nextBtn = document.querySelector('.next-btn'); // Button might be removed from HTML
    let currentIndex = 0;
    let slideInterval = null; // For auto-slide

    function updateTestimonialSlider() {
        if (!testimonialContainer || testimonialCards.length <= 1) return; // Exit if not needed
        
        // Example: Simple show/hide for single testimonial view (adjust if slider restored)
        testimonialCards.forEach((card, index) => {
            card.style.display = index === currentIndex ? 'block' : 'none';
        });

        // Update dots if they exist
        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                 dot.classList.toggle('active', index === currentIndex);
             });
        }
    }

    // Example event listeners (only add if buttons/dots exist)
    // if (dots.length > 0) {
    //     dots.forEach((dot, index) => {
    //         dot.addEventListener('click', () => {
    //             currentIndex = index;
    //             updateTestimonialSlider();
    //             if (slideInterval) clearInterval(slideInterval); // Stop auto slide on manual interaction
    //         });
    //     });
    // }
    // if (prevBtn) {
    //     prevBtn.addEventListener('click', () => {
    //         currentIndex = (currentIndex === 0) ? testimonialCards.length - 1 : currentIndex - 1;
    //         updateTestimonialSlider();
    //         if (slideInterval) clearInterval(slideInterval); // Stop auto slide
    //     });
    // }
    // if (nextBtn) {
    //     nextBtn.addEventListener('click', () => {
    //         currentIndex = (currentIndex === testimonialCards.length - 1) ? 0 : currentIndex + 1;
    //         updateTestimonialSlider();
    //         if (slideInterval) clearInterval(slideInterval); // Stop auto slide
    //     });
    // }

    // // Example Auto slide (uncomment if slider is restored)
    // function autoSlide() {
    //     currentIndex = (currentIndex === testimonialCards.length - 1) ? 0 : currentIndex + 1;
    //     updateTestimonialSlider();
    // }
    // if (testimonialCards.length > 1) {
    //     slideInterval = setInterval(autoSlide, 5000);
    //     // Optional: Pause on hover
    //     testimonialContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
    //     testimonialContainer.addEventListener('mouseleave', () => slideInterval = setInterval(autoSlide, 5000));
    // }
    
    // Initialize slider view if needed
    // updateTestimonialSlider();
    */

    // --- Sticky Header on Scroll ---
    const header = document.querySelector('header');
    if (header) {
        let scrollStartPos = 0;
        window.addEventListener('scroll', () => {
            const currentScrollPos = window.pageYOffset;
            if (currentScrollPos > 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
            // Note: scrollStartPos doesn't seem used here, potentially part of hide/show logic?
            scrollStartPos = currentScrollPos; 
        });
    }

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#' || targetId.startsWith('#!') || targetId.length < 2) return; // Basic check for valid ID selector

            try {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault(); // Prevent default only if target exists
                    const header = document.querySelector('header.sticky'); // Check if header is sticky
                    const headerHeight = header ? header.offsetHeight : 0;
                    
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerHeight - 10; // Adjust for sticky header height and buffer

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            } catch (error) {
                console.error("Error scrolling to element:", error); // Catch invalid selector errors
            }
        });
    });

    // --- Animation on Scroll ---
    const animatedElements = document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // --- Active Navigation Highlighting ---
    function highlightActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.desktop-nav-links a, .mobile-nav-links a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.offsetHeight;
            
            if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Handle homepage highlighting
        if (currentSection === '' || window.pageYOffset < 100) {
            currentSection = 'home';
        }
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (href === `#${currentSection}` || 
                (currentSection === 'home' && (href === '#' || href === '/' || href === '#home'))) {
                link.classList.add('active');
            }
        });
    }

    // Initial active nav highlighting
    highlightActiveNav();
    
    // Add active nav highlighting to scroll listener
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(highlightActiveNav, 10);
    });

    // Path-based active link highlighting for feature pages
    const path = window.location.pathname;
    document.querySelectorAll('nav a').forEach(a => {
        if (a.getAttribute('href') === path) a.classList.add('active');
    });

}); 

