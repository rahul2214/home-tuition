
  gsap.registerPlugin(ScrollTrigger);
        gsap.utils.toArray(".revealUp").forEach(function (elem) {
            ScrollTrigger.create({
                trigger: elem,
                start: "top 80%",
                end: "bottom 20%",
                onEnter: function () {
                    gsap.fromTo(elem, { y: 100, autoAlpha: 0 }, { duration: 1.25, y: 0, autoAlpha: 1, ease: "back", overwrite: "auto" });
                },
                onLeave: function () {
                    gsap.fromTo(elem, { autoAlpha: 1 }, { autoAlpha: 0, overwrite: "auto" });
                },
                onEnterBack: function () {
                    gsap.fromTo(elem, { y: -100, autoAlpha: 0 }, { duration: 1.25, y: 0, autoAlpha: 1, ease: "back", overwrite: "auto" });
                },
                onLeaveBack: function () {
                    gsap.fromTo(elem, { autoAlpha: 1 }, { autoAlpha: 0, overwrite: "auto" });
                }
            });
        });

        // Testimonials carousel script
        const testimonials = [
            "The personalized attention my son received from Home Tuitions in Bangalore was incredible! His understanding of subjects improved, and he's now more confident in school. I highly recommend them!<br><br>- Meera",
            "Home Tuitions in Delhi provided us with an experienced tutor who helped my daughter excel in math. Her grades have improved drastically, and she enjoys learning now. Great service!<br><br>- Arjun",
            "After enrolling my daughter in Home Tuitions in Mumbai, her performance skyrocketed. The tutors are professional, and the one-on-one attention is unbeatable. Worth every penny!<br><br>- Kavya",
            "Home Tuitions in Kolkata has been amazing for my son. The tutors are well-versed in the curriculum and connect with students effectively. I couldn’t ask for better support!<br><br>- Ananya",
            "The quality of teaching from Home Tuitions in Jaipur exceeded our expectations. The tutors are dedicated and engaging, making complex topics easy to understand. My son's grades have never been better!<br><br>- Ishaan",
            "Home Tuitions in Ahmedabad transformed my daughter’s approach to studies. She used to struggle with science, but now it's her favorite subject, thanks to her amazing tutor!<br><br>- Priya",
            "Enrolling in Home Tuitions in Lucknow was the best decision we made for our son. The personalized approach and dedicated tutors have significantly boosted his academic performance.<br><br>- Raj",
            "The tutors at Home Tuitions in Noida are not just teachers but mentors. My daughter's improvement in studies and her confidence in class are proof of their excellent tutoring.<br><br>- Aisha",
            "Home Tuitions in Chandigarh has been a blessing. The tutors are well-qualified, punctual, and always ready to help. My child’s grades and enthusiasm for learning have improved so much.<br><br>- Sameer",
            "Home Tuitions in Surat helped my son prepare for his board exams with ease. The tutors are knowledgeable and patient, making learning enjoyable and stress-free.<br><br>- Divya"
        ];


        let currentTestimonial = 0;

        function showTestimonial(index) {
            currentTestimonial = index;
            document.getElementById('testimonialText').innerHTML = testimonials[currentTestimonial];
            updateIndicators();
        }

        function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }

        function prevTestimonial() {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentTestimonial);
        }

        function updateIndicators() {
            const indicators = document.querySelectorAll('.indicator');
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentTestimonial);
            });
        }

        // Automatically change content every 3 seconds
        setInterval(nextTestimonial, 3000);

        // Prevent scrolling to the section on page reload
        if (window.location.hash) {
            window.scrollTo(0, 0);
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 1);
        }

        // Smooth scroll behavior for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });

        const menuBtn = document.getElementById('menu-btn');
        const closeBtn = document.getElementById('close-btn');
        const sideNav = document.getElementById('side-nav');

        menuBtn.addEventListener('click', () => {
            sideNav.style.left = '0';
        });

        closeBtn.addEventListener('click', () => {
            sideNav.style.left = '-100%';
        });
