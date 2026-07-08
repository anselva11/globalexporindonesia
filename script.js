// ==========================================
// Global Expor Indonesia - Complete JavaScript
// Pure JS (no React/framer-motion) - GitHub Pages Ready
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');

    const handleScroll = () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once on load

    // ===== MOBILE MENU TOGGLE =====
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const menuIconOpen = document.getElementById('menuIconOpen');
    const menuIconClose = document.getElementById('menuIconClose');
    let mobileMenuOpen = false;

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuOpen = !mobileMenuOpen;

        if (mobileMenuOpen) {
            mobileNav.classList.add('open');
            menuIconOpen.style.display = 'none';
            menuIconClose.style.display = 'block';
        } else {
            mobileNav.classList.remove('open');
            menuIconOpen.style.display = 'block';
            menuIconClose.style.display = 'none';
        }
    });

    // Close mobile menu when clicking a link
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuOpen = false;
            mobileNav.classList.remove('open');
            menuIconOpen.style.display = 'block';
            menuIconClose.style.display = 'none';
        });
    });

    // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
    const animatedElements = document.querySelectorAll('.fade-in-left, .fade-in-right, .fade-in-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== CONTACT FORM - WHATSAPP REDIRECT =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const fullName = document.getElementById('fullName').value;
            const company = document.getElementById('company').value;
            const country = document.getElementById('country').value;
            const email = document.getElementById('email').value;
            const product = document.getElementById('product').value;
            const details = document.getElementById('details').value;

            // Build WhatsApp message
            let message = `Hello Global Expor Indonesia!\n\n`;
            message += `*Name:* ${fullName}\n`;
            if (company) message += `*Company:* ${company}\n`;
            if (country) message += `*Country:* ${country}\n`;
            if (email) message += `*Email:* ${email}\n`;
            if (product) message += `*Product:* ${product}\n`;
            if (details) message += `\n*Details:*\n${details}\n`;

            const encodedMessage = encodeURIComponent(message);
            const waURL = `https://wa.me/6285150956644?text=${encodedMessage}`;

            window.open(waURL, '_blank');
        });
    }
});

// ===== FAQ ACCORDION =====
function toggleFAQ(button) {
    const faqItem = button.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');

    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        // Reset icon to plus
        const icon = item.querySelector('.faq-icon');
        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>`;
    });

    // If it was not active, open it
    if (!isActive) {
        faqItem.classList.add('active');
        // Change icon to X
        const icon = faqItem.querySelector('.faq-icon');
        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;
    }
}
