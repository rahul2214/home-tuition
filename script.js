/* ==========================================================================
   BHARAT HOME TUITIONS - INTERACTIVE JAVASCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------------------------
       1. GSAP SCROLL ANIMATIONS (REVEAL ON SCROLL WITHOUT GLITCHES)
       -------------------------------------------------------------------------- */
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Reveal section headers & cards smoothly
        const revealElements = document.querySelectorAll('.revealUp');
        revealElements.forEach((elem) => {
            gsap.fromTo(elem, 
                { opacity: 0, y: 40 },
                {
                    duration: 0.8,
                    opacity: 1,
                    y: 0,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 88%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        // Hero items staggered entrance
        const heroItems = document.querySelectorAll('.reveal-item');
        if (heroItems.length > 0) {
            gsap.fromTo(heroItems,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.15,
                    ease: "power2.out"
                }
            );
        }
    }

    /* --------------------------------------------------------------------------
       2. ANIMATED STATS COUNTER
       -------------------------------------------------------------------------- */
    const statCards = document.querySelectorAll('.stat-card');
    let animatedStats = false;

    function animateCounters() {
        const numbers = document.querySelectorAll('.stat-number');
        numbers.forEach(num => {
            const target = parseInt(num.getAttribute('data-target'));
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                num.innerText = Math.floor(current) + '+';
            }, 30);
        });
    }

    // Trigger stats counter when visible
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        window.addEventListener('scroll', () => {
            if (!animatedStats && isElementInViewport(statsSection)) {
                animatedStats = true;
                animateCounters();
            }
        });
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    /* --------------------------------------------------------------------------
       3. TESTIMONIALS CAROUSEL
       -------------------------------------------------------------------------- */
    const testimonialsData = [
        {
            text: "Home Tuitions in Hyderabad has been outstanding! The tutors are incredibly knowledgeable and patient. My daughter's grades in Math & Physics have improved remarkably. Thank you for your excellent service!",
            name: "Aarav Sharma",
            location: "📍 Hyderabad, Telangana"
        },
        {
            text: "The personalized attention my son received from Bharat Home Tuitions in Bangalore was incredible! His understanding of Chemistry concepts improved greatly, and he is now confident in class.",
            name: "Meera Nair",
            location: "📍 Bangalore, Karnataka"
        },
        {
            text: "Bharat Home Tuitions in Delhi provided us with an experienced tutor who helped my daughter excel in CBSE Board exams. Her score went from 72% to 94%! Truly remarkable.",
            name: "Arjun Verma",
            location: "📍 Delhi NCR"
        },
        {
            text: "After enrolling my son for home tuitions in Mumbai, his performance skyrocketed. The tutors are punctual, professional, and clear all doubt step-by-step.",
            name: "Kavya Deshmukh",
            location: "📍 Mumbai, Maharashtra"
        },
        {
            text: "The quality of teaching from Bharat Home Tuitions in Jaipur exceeded our expectations. The tutors make complex topics easy to digest. Best decision for our child!",
            name: "Ishaan Rathore",
            location: "📍 Jaipur, Rajasthan"
        }
    ];

    let currentTestimonialIdx = 0;
    let testimonialInterval;

    window.showTestimonial = function(index) {
        currentTestimonialIdx = index;
        const textElem = document.getElementById('testimonialText');
        const nameElem = document.getElementById('testimonialAuthorName');
        const locElem = document.getElementById('testimonialLocation');
        const avatarElem = document.getElementById('testimonialAvatar');

        if (textElem && nameElem && locElem) {
            // Fade effect
            textElem.style.opacity = 0;
            setTimeout(() => {
                const item = testimonialsData[currentTestimonialIdx];
                textElem.innerText = item.text;
                nameElem.innerText = item.name;
                locElem.innerText = item.location;
                if (avatarElem) avatarElem.innerText = item.name.charAt(0);
                textElem.style.opacity = 1;
            }, 180);
        }

        updateIndicators();
    };

    window.nextTestimonial = function() {
        currentTestimonialIdx = (currentTestimonialIdx + 1) % testimonialsData.length;
        window.showTestimonial(currentTestimonialIdx);
    };

    window.prevTestimonial = function() {
        currentTestimonialIdx = (currentTestimonialIdx - 1 + testimonialsData.length) % testimonialsData.length;
        window.showTestimonial(currentTestimonialIdx);
    };

    function updateIndicators() {
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((ind, i) => {
            ind.classList.toggle('active', i === currentTestimonialIdx);
        });
    }

    // Auto rotate testimonials every 5 seconds
    testimonialInterval = setInterval(window.nextTestimonial, 5000);

    // Pause auto rotate on hover
    const testimonialCard = document.querySelector('.testimonial-card-wrapper');
    if (testimonialCard) {
        testimonialCard.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
        testimonialCard.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(window.nextTestimonial, 5000);
        });
    }

    /* --------------------------------------------------------------------------
       4. DUAL FORM TAB SWITCHER LOGIC
       -------------------------------------------------------------------------- */
    window.switchFormTab = function(type) {
        const studentBtn = document.getElementById('tab-student-btn');
        const tutorBtn = document.getElementById('tab-tutor-btn');
        const studentForm = document.getElementById('form-student-content');
        const tutorForm = document.getElementById('form-tutor-content');

        if (type === 'student') {
            studentBtn.classList.add('active');
            tutorBtn.classList.remove('active');
            studentForm.classList.add('active');
            tutorForm.classList.remove('active');
        } else {
            tutorBtn.classList.add('active');
            studentBtn.classList.remove('active');
            tutorForm.classList.add('active');
            studentForm.classList.remove('active');
        }
    };

    /* --------------------------------------------------------------------------
       5. MOBILE NAVIGATION DRAWER
       -------------------------------------------------------------------------- */
    const menuBtn = document.getElementById('menu-btn');
    const closeDrawerBtn = document.getElementById('close-drawer');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    if (menuBtn && mobileDrawer) {
        menuBtn.addEventListener('click', () => {
            mobileDrawer.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeDrawerBtn && mobileDrawer) {
        closeDrawerBtn.addEventListener('click', () => {
            mobileDrawer.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileDrawer) {
                mobileDrawer.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    /* --------------------------------------------------------------------------
       6. SMOOTH SCROLLING FOR ANCHOR LINKS
       -------------------------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElem = document.querySelector(targetId);
            if (targetElem) {
                e.preventDefault();
                targetElem.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});
