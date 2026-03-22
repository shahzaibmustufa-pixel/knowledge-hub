/**
 * Knowledge-hud - Main JavaScript
 * Handles Theme Toggle, Mobile Menu, Search Filter, and Form Validation
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileMenu();
    initSmoothScroll();
    initSearchFilter();
    initContactForm();
});

// --- Theme Toggle (Light / Dark Mode) ---
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');

    if (!themeToggleBtn) return;

    // Check saved theme in localStorage or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        htmlElement.setAttribute('data-theme', 'dark');
        updateThemeIcon(true);
    } else {
        htmlElement.setAttribute('data-theme', 'light');
        updateThemeIcon(false);
    }

    // Toggle click event
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            htmlElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            updateThemeIcon(false);
        } else {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateThemeIcon(true);
        }
    });

    function updateThemeIcon(isDark) {
        if (!themeIcon) return;
        const themeText = document.getElementById('theme-text');
        if (isDark) {
            // Sun icon for dark mode (to toggle back to light)
            themeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />';
            if (themeText) themeText.textContent = 'Light Mode';
        } else {
            // Moon icon for light mode (to toggle to dark)
            themeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />';
            if (themeText) themeText.textContent = 'Dark Mode';
        }
    }
}

// --- Mobile Menu Toggle ---
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    const menuIcon = document.getElementById('menu-icon');

    if (!mobileToggle || !navLinks) return;

    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const isActive = navLinks.classList.contains('active');
        
        if (isActive) {
            // Close (X) icon
            menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
        } else {
            // Hamburger icon
            menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
        }
    });

    // Close menu when clicking a link
    const links = navLinks.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
        });
    });
}

// --- Smooth Scrolling ---
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// --- Simple Search Filter (Frontend Only) ---
function initSearchFilter() {
    const searchInput = document.getElementById('blog-search');
    const blogCards = document.querySelectorAll('.blog-card');
    const noResults = document.getElementById('no-results');

    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        let visibleCount = 0;

        blogCards.forEach(card => {
            const title = card.querySelector('.blog-title').textContent.toLowerCase();
            const category = card.querySelector('.blog-category').textContent.toLowerCase();
            const excerpt = card.querySelector('.blog-excerpt').textContent.toLowerCase();

            if (title.includes(searchTerm) || category.includes(searchTerm) || excerpt.includes(searchTerm)) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Show "no results" message if applicable
        if (noResults) {
            if (visibleCount === 0 && searchTerm !== '') {
                noResults.style.display = 'block';
            } else {
                noResults.style.display = 'none';
            }
        }
    });
}

// --- Contact Form Validation ---
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent actual submission (no backend)
        
        let isValid = true;
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const successMessage = document.getElementById('form-success');

        // Reset errors
        document.querySelectorAll('.form-error').forEach(el => el.style.display = 'none');
        successMessage.style.display = 'none';

        // Validate Name
        if (nameInput.value.trim() === '') {
            nameInput.nextElementSibling.style.display = 'block';
            isValid = false;
        }

        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailInput.nextElementSibling.style.display = 'block';
            isValid = false;
        }

        // Validate Message
        if (messageInput.value.trim() === '') {
            messageInput.nextElementSibling.style.display = 'block';
            isValid = false;
        }

        // Success Simulation
        if (isValid) {
            successMessage.style.display = 'block';
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    });
}
