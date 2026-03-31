document.addEventListener('DOMContentLoaded', () => {
    // Slider Logic
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        setInterval(nextSlide, 3500);
    }

    // Dark/Light Mode Toggle Logic
    const themeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;

    function setDarkMode(isDark) {
        if (isDark) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            // Remove all possible classes then set sun icon
            themeToggle.className = 'fas fa-sun dark-mode-toggle';
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            // Remove all possible classes then set moon icon
            themeToggle.className = 'far fa-moon dark-mode-toggle';
        }
    }

    // Apply saved theme on page load (default: light)
    const savedTheme = localStorage.getItem('theme');
    setDarkMode(savedTheme === 'dark');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = body.classList.contains('dark-mode');
            setDarkMode(!isDark);
        });
    }

    // Sticky Header Scroll Logic — turns orange on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 80) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    // Mobile Menu Toggle logic
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active'); // for hamburger animation if needed
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // Rotating subtitle words (cycles one word after another)
    const rotatingEl = document.querySelector('.rotating .highlight');
    if (rotatingEl) {
        const words = ['Creators', 'Innovators', 'Manufacturers', 'Entrepreneurs', 'Investors'];
        let ri = 0;
        // ensure initial word
        rotatingEl.textContent = words[0];
        setInterval(() => {
            // fade out
            rotatingEl.style.opacity = '0';
            setTimeout(() => {
                ri = (ri + 1) % words.length;
                rotatingEl.textContent = words[ri];
                rotatingEl.style.opacity = '1';
            }, 300);
        }, 2200);
    }

    // Carousel Logic for Key Sectors
    const carousel = document.querySelector('.sectors-carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (carousel && prevBtn && nextBtn) {
        let currentIndex = 0;
        const cardWidth = 313.2; // 280px card + 33.2px for gap
        const visibleCards = 3; // Show 3 cards at a time
        const totalCards = carousel.children.length;
        const maxIndex = totalCards - visibleCards;
        let autoPlayInterval;
        
        function updateCarousel() {
            const translateX = -currentIndex * cardWidth;
            carousel.style.transform = `translateX(${translateX}px)`;
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) > maxIndex ? 0 : currentIndex + 1;
            updateCarousel();
        }
        
        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
        }
        
        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }
        
        nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });
        
        prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            } else {
                currentIndex = maxIndex;
                updateCarousel();
            }
            startAutoPlay();
        });
        
        // Pause auto-play on hover
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
        
        // Start auto-play initially
        startAutoPlay();
    }

    // Countdown Timer Logic
    function initializeCountdown() {
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
            console.log('Countdown elements not found');
            return;
        }

        // Get the parent countdown item of the seconds element for flip animation
        const secondsCard = secondsEl.closest('.countdown-item');

        function updateCountdown() {
            // Target date: May 8, 2026 at 00:00:00
            const targetDate = new Date('2026-05-08T00:00:00').getTime();
            const now = new Date().getTime();
            const timeLeft = targetDate - now;

            if (timeLeft > 0) {
                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                // Update DOM elements with leading zeros
                daysEl.textContent = String(days).padStart(2, '0');
                hoursEl.textContent = String(hours).padStart(2, '0');
                minutesEl.textContent = String(minutes).padStart(2, '0');
                secondsEl.textContent = String(seconds).padStart(2, '0');
            } else {
                // Event has started
                daysEl.textContent = '00';
                hoursEl.textContent = '00';
                minutesEl.textContent = '00';
                secondsEl.textContent = '00';
            }

            // Trigger flip animation only on seconds card
            if (secondsCard) {
                secondsCard.classList.remove('flip');
                // Trigger reflow to restart animation
                void secondsCard.offsetWidth;
                secondsCard.classList.add('flip');
            }
        }

        // Initial update
        updateCountdown();

        // Update every second
        setInterval(updateCountdown, 1000);
    }

    // Initialize countdown timer once all elements are loaded
    initializeCountdown();
});
