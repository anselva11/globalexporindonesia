// ==========================================================================
// GLOBAL EXPOR INDONESIA - JASA EKSPOR BARANG JAVASCRIPT
// Interactive Export Estimator, Lead WhatsApp Formatter & Inquiry Handler
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

    // ===== EXPORT FEASIBILITY & RATE ESTIMATOR =====
    const expCommodity = document.getElementById('expCommodity');
    const expDestination = document.getElementById('expDestination');
    const expFreightMode = document.getElementById('expFreightMode');
    const expLegalStatus = document.getElementById('expLegalStatus');
    const expQuantity = document.getElementById('expQuantity');
    const expQtyLabel = document.getElementById('expQtyLabel');

    // Result elements
    const resExpMode = document.getElementById('resExpMode');
    const resExpDest = document.getElementById('resExpDest');
    const resExpDocs = document.getElementById('resExpDocs');
    const resExpTransit = document.getElementById('resExpTransit');
    const resExpEstFee = document.getElementById('resExpEstFee');
    const resExpCustoms = document.getElementById('resExpCustoms');
    const btnExpCalcWa = document.getElementById('btnExpCalcWa');

    function updateExportQtyLabel() {
        if (!expFreightMode || !expQtyLabel) return;
        const mode = expFreightMode.value;
        if (mode === 'sea-fcl') {
            expQtyLabel.textContent = 'Jumlah Kontainer (FCL 20ft / 40ft)';
            if (expQuantity && expQuantity.value > 15) expQuantity.value = 1;
        } else if (mode === 'sea-lcl') {
            expQtyLabel.textContent = 'Volume Kargo (CBM / m³)';
            if (expQuantity && expQuantity.value > 100) expQuantity.value = 3;
        } else if (mode === 'air-cargo') {
            expQtyLabel.textContent = 'Berat Kargo Ekspor (Kg)';
            if (expQuantity && expQuantity.value < 10) expQuantity.value = 50;
        }
    }

    function calculateExportEstimate() {
        if (!expCommodity || !expDestination || !expFreightMode || !expLegalStatus) return;

        const commodityText = expCommodity.options[expCommodity.selectedIndex]?.text || 'Hasil Perkebunan / Pertanian';
        const destValue = expDestination.value;
        const destText = expDestination.options[expDestination.selectedIndex]?.text || 'Asia Timur (China / Jepang / Korea)';
        const modeValue = expFreightMode.value;
        const modeText = expFreightMode.options[expFreightMode.selectedIndex]?.text || 'Sea Freight FCL (Kontainer 20ft/40ft)';
        const legalValue = expLegalStatus.value;
        const qty = parseFloat(expQuantity?.value) || 1;

        // Determine required documents based on commodity & destination
        let docs = ['PEB', 'NPE', 'B/L / AWB', 'Commercial Invoice & Packing List'];

        if (expCommodity.value === 'agriculture' || expCommodity.value === 'food') {
            docs.push('Phytosanitary / Health Cert');
        }
        if (expCommodity.value === 'wood-craft') {
            docs.push('V-Legal / SVLK', 'Fumigasi ISPM 15');
        }
        if (destValue === 'china') {
            docs.push('SKA Form E (Tarif 0%)');
        } else if (destValue === 'asean') {
            docs.push('SKA Form D (ATIGA)');
        } else if (destValue === 'korea-japan') {
            docs.push('SKA Form AK / IJEPPA');
        } else if (destValue === 'europe') {
            docs.push('REX / COO Form A');
        } else {
            docs.push('Certificate of Origin (COO)');
        }

        if (legalValue === 'undername') {
            docs.push('Undername Ekspor (QQ)');
        }

        // Determine Transit Time
        let transitTime = '12 - 18 Hari Pelayaran';
        if (modeValue === 'air-cargo') {
            transitTime = (destValue === 'asean') ? '1 - 2 Hari Kargo Udara' : '3 - 6 Hari Kargo Udara';
        } else {
            if (destValue === 'asean') transitTime = '4 - 8 Hari Pelayaran';
            else if (destValue === 'middle-east') transitTime = '18 - 24 Hari Pelayaran';
            else if (destValue === 'europe') transitTime = '25 - 32 Hari Pelayaran (Rotterdam)';
            else if (destValue === 'usa') transitTime = '28 - 36 Hari Pelayaran (LA / NY)';
            else if (destValue === 'australia') transitTime = '10 - 15 Hari Pelayaran';
        }

        // Determine Estimated Base Handling Fee
        let estCostString = 'Hubungi Tim Ekspor';
        if (modeValue === 'sea-fcl') {
            let base = (legalValue === 'undername') ? 3500000 : 2000000; // Handling & PEB
            let total = base * qty;
            estCostString = `Mulai Rp ${total.toLocaleString('id-ID')} (Handling PEB/Kontainer)`;
        } else if (modeValue === 'sea-lcl') {
            let baseCbm = (legalValue === 'undername') ? 850000 : 550000;
            let total = baseCbm * qty;
            estCostString = `± Rp ${total.toLocaleString('id-ID')} (Dokumen & LCL Handling)`;
        } else if (modeValue === 'air-cargo') {
            let baseAir = 45000 * qty;
            estCostString = `± Rp ${baseAir.toLocaleString('id-ID')} + Air Freight Rate`;
        }

        // Update UI
        if (resExpMode) resExpMode.textContent = modeText;
        if (resExpDest) resExpDest.textContent = destText;
        if (resExpDocs) resExpDocs.textContent = docs.slice(0, 4).join(', ') + (docs.length > 4 ? ` + ${docs.length - 4} dokumen` : '');
        if (resExpTransit) resExpTransit.textContent = transitTime;
        if (resExpEstFee) resExpEstFee.textContent = estCostString;
        if (resExpCustoms) {
            resExpCustoms.textContent = (legalValue === 'undername') ? 'Undername Legal (Jalur Hijau NPE)' : 'Jalur Hijau Resmi NPE';
        }

        // Update WhatsApp CTA link
        if (btnExpCalcWa) {
            let msg = `Halo Tim Ekspor Global Expor Indonesia,\n\n`;
            msg += `Saya ingin konsultasi menggunakan *Jasa Ekspor Barang* kami:\n`;
            msg += `• *Komoditas Barang:* ${commodityText}\n`;
            msg += `• *Negara Tujuan:* ${destText}\n`;
            msg += `• *Moda Pengiriman:* ${modeText}\n`;
            msg += `• *Volume/Kuantitas:* ${qty} (${expQtyLabel ? expQtyLabel.textContent : ''})\n`;
            msg += `• *Status Legalitas:* ${expLegalStatus.options[expLegalStatus.selectedIndex].text}\n`;
            msg += `• *Kebutuhan Dokumen:* ${docs.join(', ')}\n`;
            msg += `• *Estimasi Waktu Tiba:* ${transitTime}\n\n`;
            msg += `Mohon dibantu verifikasi jadwal kapal dan permohonan penawaran biaya jasa ekspornya. Terima kasih!`;

            const encoded = encodeURIComponent(msg);
            btnExpCalcWa.href = `https://wa.me/6281805886644?text=${encoded}`;
        }
    }

    if (expCommodity) expCommodity.addEventListener('change', calculateExportEstimate);
    if (expDestination) expDestination.addEventListener('change', calculateExportEstimate);
    if (expFreightMode) {
        expFreightMode.addEventListener('change', () => {
            updateExportQtyLabel();
            calculateExportEstimate();
        });
    }
    if (expLegalStatus) expLegalStatus.addEventListener('change', calculateExportEstimate);
    if (expQuantity) expQuantity.addEventListener('input', calculateExportEstimate);

    updateExportQtyLabel();
    calculateExportEstimate();

    // ===== EXPORT INQUIRY FORM =====
    const exportForm = document.getElementById('exportInquiryForm');
    if (exportForm) {
        exportForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('expInqName')?.value || '-';
            const company = document.getElementById('expInqCompany')?.value || '-';
            const phone = document.getElementById('expInqPhone')?.value || '-';
            const commodity = document.getElementById('expInqCommodity')?.value || '-';
            const destination = document.getElementById('expInqDestination')?.value || '-';
            const incoterm = document.getElementById('expInqIncoterm')?.value || 'FOB / CIF';
            const volume = document.getElementById('expInqVolume')?.value || '-';
            const legal = document.getElementById('expInqLegal')?.value || 'Butuh Jasa Undername';
            const notes = document.getElementById('expInqNotes')?.value || '-';

            let msg = `Halo Global Expor Indonesia - Divisi Jasa Ekspor,\n\n`;
            msg += `Saya mengajukan permohonan penawaran Jasa Pengurusan Ekspor Barang:\n\n`;
            msg += `*Data Eksportir / Klien:*\n`;
            msg += `• Nama: ${name}\n`;
            msg += `• Perusahaan/Brand: ${company}\n`;
            msg += `• WhatsApp/HP: ${phone}\n\n`;
            msg += `*Detail Rencana Ekspor:*\n`;
            msg += `• Komoditas / Barang: ${commodity}\n`;
            msg += `• Negara / Pelabuhan Tujuan: ${destination}\n`;
            msg += `• Skema Legalitas: ${legal}\n`;
            msg += `• Skema Incoterms: ${incoterm}\n`;
            msg += `• Estimasi Volume: ${volume}\n`;
            if (notes && notes.trim() !== '') {
                msg += `• Catatan Kebutuhan Dokumen (COO, Karantina, Fumigasi, dsb):\n  ${notes}\n`;
            }
            msg += `\nMohon dikirimkan proposal penawaran jasa dan panduan prosedur ekspornya. Terima kasih!`;

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
