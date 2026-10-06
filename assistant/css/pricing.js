/* ========================================================
       ⚠️ غيّر رقم الواتساب ده لرقمك (بدون + وبدون مسافات)
       مثال: "201012345678"
       ======================================================== */
const WHATSAPP_NUMBER = "201227632985";

function sendToWhatsApp(lines) {
    const msg = lines.join("\n");
    const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg);
    window.open(url, "_blank");
}

// Header scroll
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 40));

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// ----- Custom package calculator -----
const PRICES = { design: 250, thumb: 350, identity: 800 };
const LABELS = { design: "تصميم سوشيال ميديا", thumb: "YouTube Thumbnail", identity: "هوية بصرية" };
const qty = { design: 0, thumb: 0, identity: 0 };

function updateSummary() {
    const totalCount = qty.design + qty.thumb + qty.identity;
    const baseTotal = (qty.design * PRICES.design) + (qty.thumb * PRICES.thumb) + (qty.identity * PRICES.identity);
    const eligible = totalCount > 5;
    const discount = eligible ? Math.round(baseTotal * 0.2) : 0;
    const finalTotal = baseTotal - discount;

    document.getElementById('sum-count').textContent = totalCount;
    document.getElementById('sum-base').textContent = baseTotal.toLocaleString('ar-EG') + ' ج';
    document.getElementById('sum-total').textContent = finalTotal.toLocaleString('ar-EG');

    const discRow = document.getElementById('sum-discount-row');
    if (eligible) {
        discRow.style.display = 'flex';
        document.getElementById('sum-discount').textContent = '-' + discount.toLocaleString('ar-EG') + ' ج';
    } else {
        discRow.style.display = 'none';
    }
}

document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.dataset.item;
        const action = btn.dataset.action;
        if (action === 'inc') qty[item]++;
        if (action === 'dec') qty[item] = Math.max(0, qty[item] - 1);
        document.getElementById('qty-' + item).textContent = qty[item];
        updateSummary();
    });
});

// ----- زر "اطلب باقتك" (الباقة المخصصة) → واتساب -----
document.getElementById('orderCustomBtn').addEventListener('click', () => {
    const totalCount = qty.design + qty.thumb + qty.identity;

    if (totalCount === 0) {
        alert("من فضلك اختر على الأقل قطعة واحدة قبل الطلب 🙏");
        return;
    }

    const lines = [];
    lines.push("🟢 *طلب باقة مخصصة — نَسَق*");
    lines.push("─────────────────");

    if (qty.design > 0) {
        lines.push(`🎨 تصميم سوشيال ميديا: ${qty.design} × ${PRICES.design} ج = ${qty.design * PRICES.design} ج`);
    }
    if (qty.thumb > 0) {
        lines.push(`🖼️ YouTube Thumbnails: ${qty.thumb} × ${PRICES.thumb} ج = ${qty.thumb * PRICES.thumb} ج`);
    }
    if (qty.identity > 0) {
        lines.push(`✨ هوية بصرية: ${qty.identity} × ${PRICES.identity} ج = ${qty.identity * PRICES.identity} ج`);
    }

    lines.push("─────────────────");
    lines.push(`📦 إجمالي القطع: ${totalCount}`);

    const baseTotal = (qty.design * PRICES.design) + (qty.thumb * PRICES.thumb) + (qty.identity * PRICES.identity);
    lines.push(`💵 السعر قبل الخصم: ${baseTotal} ج`);

    if (totalCount > 5) {
        const discount = Math.round(baseTotal * 0.2);
        lines.push(`🎁 خصم 20% (أكثر من 5 قطع): -${discount} ج`);
    }

    const finalTotal = totalCount > 5 ? baseTotal - Math.round(baseTotal * 0.2) : baseTotal;
    lines.push(`💰 *الإجمالي النهائي: ${finalTotal} ج*`);
    lines.push("─────────────────");
    lines.push("برجاء تأكيد الطلب وبدء التنفيذ 🙏");

    sendToWhatsApp(lines);
});

// ----- زراير الباقات الثابتة → واتساب -----
document.querySelectorAll('.pkg-card .btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const name = btn.dataset.pkgName || "-";
        const price = btn.dataset.pkgPrice || "-";
        const old = btn.dataset.pkgOld || "";
        const save = btn.dataset.pkgSave || "";
        const items = btn.dataset.pkgItems || "-";

        const lines = [];
        lines.push("🟢 *طلب شراء باقة — نَسَق*");
        lines.push("─────────────────");
        lines.push(`📦 الباقة: ${name}`);
        lines.push(`✨ تشمل: ${items}`);
        if (old) lines.push(`❌ السعر الأصلي: ${old}`);
        lines.push(`💰 السعر بعد الخصم: ${price}`);
        if (save) lines.push(`🎁 التوفير: ${save}`);
        lines.push("─────────────────");
        lines.push("برجاء تأكيد الطلب وبدء التنفيذ 🙏");

        sendToWhatsApp(lines);
    });
});

// ----- Policies accordion -----
document.querySelectorAll('.acc-item').forEach(item => {
    const head = item.querySelector('.acc-head');
    const body = item.querySelector('.acc-body');
    head.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.acc-item.open').forEach(o => {
            if (o !== item) {
                o.classList.remove('open');
                o.querySelector('.acc-body').style.maxHeight = null;
            }
        });
        if (isOpen) {
            item.classList.remove('open');
            body.style.maxHeight = null;
        } else {
            item.classList.add('open');
            body.style.maxHeight = body.scrollHeight + 40 + 'px';
        }
    });
});