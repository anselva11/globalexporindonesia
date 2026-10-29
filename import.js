// ==========================================================================
// GLOBAL EXPOR INDONESIA - JASA IMPORT BARANG JAVASCRIPT
// Interactive Import Calculator, Lead Generator & Inquiry Handler
// ==========================================================================

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
    handleScroll();

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

        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuOpen = false;
                mobileNav.classList.remove('open');
                if (menuIconOpen) menuIconOpen.style.display = 'block';
                if (menuIconClose) menuIconClose.style.display = 'none';
            });
        });
    }

    // ===== INTERSECTION OBSERVER ANIMATIONS =====
    const animatedElements = document.querySelectorAll('.fade-in-left, .fade-in-right, .fade-in-up');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => observer.observe(el));

    // ===== INTERACTIVE IMPORT COST CALCULATOR =====
    const freightMode = document.getElementById('calcFreightMode');
    const originCountry = document.getElementById('calcOriginCountry');
    const serviceType = document.getElementById('calcServiceType');
    const quantityInput = document.getElementById('calcQuantity');
    const goodsCategory = document.getElementById('calcGoodsCategory');
    const qtyUnitLabel = document.getElementById('calcQtyUnitLabel');

    // Result elements
    const resFreightMode = document.getElementById('resFreightMode');
    const resOrigin = document.getElementById('resOrigin');
    const resService = document.getElementById('resService');
    const resLeadTime = document.getElementById('resLeadTime');
    const resEstCost = document.getElementById('resEstCost');
    const resCustomsStatus = document.getElementById('resCustomsStatus');
    const btnCalcWa = document.getElementById('btnCalcWa');

    // Update quantity unit based on mode
    function updateQtyUnit() {
        if (!freightMode || !qtyUnitLabel) return;
        const mode = freightMode.value;
        if (mode === 'sea-lcl') {
            qtyUnitLabel.textContent = 'Volume Muatan (CBM / m³)';
            if (quantityInput && quantityInput.value > 100) quantityInput.value = 2;
        } else if (mode === 'air-cargo') {
            qtyUnitLabel.textContent = 'Estimasi Berat (Kilogram / Kg)';
            if (quantityInput && quantityInput.value < 5) quantityInput.value = 45;
        } else if (mode === 'sea-fcl') {
            qtyUnitLabel.textContent = 'Jumlah Kontainer (Unit / Box)';
            if (quantityInput && quantityInput.value > 10) quantityInput.value = 1;
        }
    }

    // Calculate rates and estimates
    function calculateImportEstimate() {
        if (!freightMode || !originCountry || !serviceType || !quantityInput) return;

        const mode = freightMode.value;
        const country = originCountry.options[originCountry.selectedIndex]?.text || 'China';
        const service = serviceType.options[serviceType.selectedIndex]?.text || 'Door to Door All-In';
        const qty = parseFloat(quantityInput.value) || 1;
        const category = goodsCategory?.options[goodsCategory.selectedIndex]?.text || 'Umum / General Cargo';

        let leadTime = '18 - 25 Hari Kerja';
        let estTotalFormatted = 'Hubungi Tim Konsultan';
        let estMinRupiah = 0;

        // Base calculations
        if (mode === 'sea-lcl') {
            // CBM based: ~ Rp 5.500.000 - Rp 7.500.000 / CBM All In China
            let ratePerCbm = 6200000;
            if (originCountry.value === 'usa' || originCountry.value === 'europe') ratePerCbm = 11500000;
            else if (originCountry.value === 'japan' || originCountry.value === 'korea') ratePerCbm = 8500000;
            else if (originCountry.value === 'singapore') ratePerCbm = 4800000;

            if (serviceType.value === 'undername') ratePerCbm = ratePerCbm * 0.65; // undername handling fee differs

            estMinRupiah = ratePerCbm * qty;
            leadTime = (originCountry.value === 'singapore') ? '7 - 12 Hari Kerja' : '18 - 25 Hari Kerja';
            estTotalFormatted = '± Rp ' + estMinRupiah.toLocaleString('id-ID');
        } 
        else if (mode === 'air-cargo') {
            // Per KG based: ~ Rp 165.000 - Rp 230.000 / Kg
            let ratePerKg = 185000;
            if (originCountry.value === 'usa' || originCountry.value === 'europe') ratePerKg = 280000;
            else if (originCountry.value === 'singapore') ratePerKg = 120000;

            if (serviceType.value === 'undername') ratePerKg = ratePerKg * 0.7;

            estMinRupiah = ratePerKg * qty;
            leadTime = (originCountry.value === 'singapore') ? '2 - 4 Hari Kerja' : '4 - 7 Hari Kerja';
            estTotalFormatted = '± Rp ' + estMinRupiah.toLocaleString('id-ID');
        }
        else if (mode === 'sea-fcl') {
            // Container 20ft/40ft
            leadTime = '20 - 28 Hari Kerja';
            let containerBase = 42000000; // 20ft estimated handling & ocean freight
            if (originCountry.value === 'usa' || originCountry.value === 'europe') containerBase = 75000000;
            estMinRupiah = containerBase * qty;
            estTotalFormatted = 'Mulai Rp ' + estMinRupiah.toLocaleString('id-ID');
        }

        // Update UI
        if (resFreightMode) resFreightMode.textContent = freightMode.options[freightMode.selectedIndex].text;
        if (resOrigin) resOrigin.textContent = country;
        if (resService) resService.textContent = serviceType.options[serviceType.selectedIndex].text;
        if (resLeadTime) resLeadTime.textContent = leadTime;
        if (resEstCost) resEstCost.textContent = estTotalFormatted;
        if (resCustomsStatus) resCustomsStatus.textContent = 'Jalur Hijau Prioritas (Resmi)';

        // Update WhatsApp CTA URL
        if (btnCalcWa) {
            let msg = `Halo Tim Import Global Expor Indonesia,\n\n`;
            msg += `Saya ingin konsultasi simulasi import barang dengan spesifikasi:\n`;
            msg += `• *Moda Pengiriman:* ${freightMode.options[freightMode.selectedIndex].text}\n`;
            msg += `• *Negara Asal:* ${country}\n`;
            msg += `• *Jenis Layanan:* ${service}\n`;
            msg += `• *Kategori Barang:* ${category}\n`;
            msg += `• *Volume/Kuantitas:* ${qty} (${qtyUnitLabel ? qtyUnitLabel.textContent : ''})\n`;
            msg += `• *Estimasi Awal:* ${estTotalFormatted} (${leadTime})\n\n`;
            msg += `Mohon dibantu verifikasi ketersediaan jadwal kapal/pesawat dan penawaran resminya. Terima kasih!`;

            const encoded = encodeURIComponent(msg);
            btnCalcWa.href = `https://wa.me/6281805886644?text=${encoded}`;
        }
    }

    if (freightMode) {
        freightMode.addEventListener('change', () => {
            updateQtyUnit();
            calculateImportEstimate();
        });
    }
    if (originCountry) originCountry.addEventListener('change', calculateImportEstimate);
    if (serviceType) serviceType.addEventListener('change', calculateImportEstimate);
    if (goodsCategory) goodsCategory.addEventListener('change', calculateImportEstimate);
    if (quantityInput) quantityInput.addEventListener('input', calculateImportEstimate);

    // Initial calc trigger
    updateQtyUnit();
    calculateImportEstimate();

    // ===== IMPORT INQUIRY FORM TO WHATSAPP =====
    const importForm = document.getElementById('importInquiryForm');
    if (importForm) {
        importForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('inqName')?.value || '-';
            const company = document.getElementById('inqCompany')?.value || '-';
            const phone = document.getElementById('inqPhone')?.value || '-';
            const service = document.getElementById('inqService')?.value || '-';
            const origin = document.getElementById('inqOrigin')?.value || '-';
            const goods = document.getElementById('inqGoods')?.value || '-';
            const volume = document.getElementById('inqVolume')?.value || '-';
            const notes = document.getElementById('inqNotes')?.value || '-';

            let msg = `Halo Global Expor Indonesia - Divisi Import,\n\n`;
            msg += `Saya mengajukan permohonan penawaran resmi (Inquiry Impor Barang):\n\n`;
            msg += `*Data Pemohon:*\n`;
            msg += `• Nama: ${name}\n`;
            msg += `• Perusahaan/Brand: ${company}\n`;
            msg += `• No. Kontak/WA: ${phone}\n\n`;
            msg += `*Detail Kargo Impor:*\n`;
            msg += `• Layanan: ${service}\n`;
            msg += `• Negara / Port Asal: ${origin}\n`;
            msg += `• Jenis Barang / Komoditas: ${goods}\n`;
            msg += `• Estimasi Volume/Berat: ${volume}\n`;
            if (notes && notes.trim() !== '') {
                msg += `• Catatan / Kebutuhan Khusus:\n  ${notes}\n`;
            }
            msg += `\nMohon dikirimkan draft penawaran harga dan prosedur pengirimannya. Terima kasih!`;

            const encoded = encodeURIComponent(msg);
            const waURL = `https://wa.me/6281805886644?text=${encoded}`;
            window.open(waURL, '_blank');
        });
    }
});

// ===== FAQ ACCORDION TOGGLE =====
function toggleFAQ(button) {
    const faqItem = button.closest('.faq-item');
    if (!faqItem) return;
    const isActive = faqItem.classList.contains('active');

    // Close all other items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        const icon = item.querySelector('.faq-icon');
        if (icon) {
            icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>`;
        }
    });

    if (!isActive) {
        faqItem.classList.add('active');
        const icon = faqItem.querySelector('.faq-icon');
        if (icon) {
            icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;
        }
    }
}
