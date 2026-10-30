// ==========================================
// Global Expor Indonesia - Complete JavaScript
// Pure JS (no React/framer-motion) - GitHub Pages Ready
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');

    const handleScroll = () => {
        if (!navbar) return;
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

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuOpen = !mobileMenuOpen;

            if (mobileMenuOpen) {
                mobileNav.classList.add('open');
                if (menuIconOpen) menuIconOpen.style.display = 'none';
                if (menuIconClose) menuIconClose.style.display = 'block';
            } else {
                mobileNav.classList.remove('open');
                if (menuIconOpen) menuIconOpen.style.display = 'block';
                if (menuIconClose) menuIconClose.style.display = 'none';
            }
        });

        // Close mobile menu when clicking a link
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuOpen = false;
                mobileNav.classList.remove('open');
                if (menuIconOpen) menuIconOpen.style.display = 'block';
                if (menuIconClose) menuIconClose.style.display = 'none';
            });
        });
    }

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

    // ===== SMOOTH SCROLLING FOR SAME-PAGE ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== CONTACT FORM - WHATSAPP REDIRECT (EXPORT / GENERAL) =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const fullName = document.getElementById('fullName')?.value || '';
            const company = document.getElementById('company')?.value || '';
            const country = document.getElementById('country')?.value || '';
            const email = document.getElementById('email')?.value || '';
            const product = document.getElementById('product')?.value || '';
            const details = document.getElementById('details')?.value || '';

            // Build WhatsApp message
            let message = `Hello Global Expor Indonesia!\n\n`;
            message += `*Name:* ${fullName}\n`;
            if (company) message += `*Company:* ${company}\n`;
            if (country) message += `*Country:* ${country}\n`;
            if (email) message += `*Email:* ${email}\n`;
            if (product) message += `*Product:* ${product}\n`;
            if (details) message += `\n*Details:*\n${details}\n`;

            const encodedMessage = encodeURIComponent(message);
            const waURL = `https://wa.me/6281805886644?text=${encodedMessage}`;

            window.open(waURL, '_blank');
        });
    }

    // ===== IMPORT FORM - WHATSAPP REDIRECT (JASA IMPORT) =====
    const importForm = document.getElementById('importForm');
    if (importForm) {
        importForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('importName')?.value || '';
            const company = document.getElementById('importCompany')?.value || '';
            const phone = document.getElementById('importPhone')?.value || '';
            const service = document.getElementById('importService')?.value || '';
            const origin = document.getElementById('importOrigin')?.value || '';
            const mode = document.getElementById('importMode')?.value || '';
            const goods = document.getElementById('importGoods')?.value || '';
            const volume = document.getElementById('importVolume')?.value || '';
            const destination = document.getElementById('importDestination')?.value || '';
            const notes = document.getElementById('importNotes')?.value || '';

            let msg = `*KONSULTASI JASA IMPORT - PT GLOBAL EXPOR INDONESIA*\n\n`;
            msg += `Halo Tim Impor Global Expor Indonesia, saya ingin konsultasi & estimasi biaya pengiriman kargo impor:\n\n`;
            msg += `👤 *Nama:* ${name}\n`;
            if (company) msg += `🏢 *Perusahaan / Toko:* ${company}\n`;
            if (phone) msg += `📱 *WhatsApp:* ${phone}\n`;
            if (service) msg += `📌 *Layanan:* ${service}\n`;
            if (origin) msg += `🌍 *Negara / Pelabuhan Asal:* ${origin}\n`;
            if (mode) msg += `🚢 *Jalur Pengiriman:* ${mode}\n`;
            if (goods) msg += `📦 *Nama & Deskripsi Barang:* ${goods}\n`;
            if (volume) msg += `⚖️ *Estimasi Berat / Volume:* ${volume}\n`;
            if (destination) msg += `📍 *Kota Tujuan di Indonesia:* ${destination}\n`;
            if (notes) msg += `📝 *Catatan Tambahan:* ${notes}\n`;
            msg += `\nMohon informasi perhitungan tarif terbaik, alur pengiriman, dan jadwal pelayaran terdekat. Terima kasih!`;

            const encoded = encodeURIComponent(msg);
            const waURL = `https://wa.me/6281805886644?text=${encoded}`;

            window.open(waURL, '_blank');
        });
    }

    // ===== CBM CALCULATOR HELPER =====
    const calcCbmBtn = document.getElementById('calcCbmBtn');
    if (calcCbmBtn) {
        calcCbmBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const length = parseFloat(document.getElementById('cbmLength')?.value) || 0;
            const width = parseFloat(document.getElementById('cbmWidth')?.value) || 0;
            const height = parseFloat(document.getElementById('cbmHeight')?.value) || 0;
            const qty = parseInt(document.getElementById('cbmQty')?.value) || 1;

            if (length > 0 && width > 0 && height > 0) {
                const totalCbm = ((length * width * height * qty) / 1000000).toFixed(3);
                const cbmResultEl = document.getElementById('cbmResult');
                if (cbmResultEl) {
                    cbmResultEl.textContent = `${totalCbm} CBM (${qty} karton @ ${length}x${width}x${height} cm)`;
                    cbmResultEl.style.display = 'inline-block';
                }
                const volumeInput = document.getElementById('importVolume');
                if (volumeInput) {
                    volumeInput.value = `${totalCbm} CBM (${qty} karton, ${length}x${width}x${height} cm)`;
                }
            } else {
                alert('Silakan masukkan dimensi panjang, lebar, dan tinggi (cm) yang valid.');
            }
        });
    }
});

// ===== FAQ ACCORDION =====
function toggleFAQ(button) {
    const faqItem = button.closest('.faq-item');
    if (!faqItem) return;
    const isActive = faqItem.classList.contains('active');

    // Close all FAQ items within the same accordion container or page
    const container = faqItem.closest('.faq-list') || document;
    container.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        // Reset icon to plus
        const icon = item.querySelector('.faq-icon');
        if (icon) {
            icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>`;
        }
    });

    // If it was not active, open it
    if (!isActive) {
        faqItem.classList.add('active');
        // Change icon to X
        const icon = faqItem.querySelector('.faq-icon');
        if (icon) {
            icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;
        }
    }
}
