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
});
