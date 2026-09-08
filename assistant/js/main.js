 // Header scroll state
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, {threshold:0.15});
  revealEls.forEach(el => io.observe(el));

  // Counting numbers
  function animateCount(el, target, suffix){
    let start = 0;
    const duration = 1400;
    const startTime = performance.now();
    function tick(now){
      const p = Math.min((now-startTime)/duration, 1);
      const eased = 1 - Math.pow(1-p, 3);
      const val = Math.floor(eased * target);
      el.textContent = val + suffix;
      if(p < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(tick);
  }
  const countEls = document.querySelectorAll('.service-num, .about-stat .num');
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        const el = e.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.classList.contains('service-num') ? '+' : '';
        animateCount(el, target, suffix);
        countIO.unobserve(el);
      }
    });
  }, {threshold:0.4});
  countEls.forEach(el => countIO.observe(el));

  // Clients news-ticker
  const clientBrands = [
    // {name:'UNI STEEL', ini:'US'},
    // {name:'GENTÉ', ini:'G'},
    // {name:'ASC', ini:'A'},
    // {name:'أحمد بسام', ini:'أب'},
    // {name:'EFEX', ini:'E'},
  ];
  function buildClientsTrack(){
    const track = document.getElementById('clientsTrack');
    let html = '';
    clientBrands.forEach(b => {
      html += `<div class="ticker-item"><div class="ticker-logo">${b.ini}</div><div class="t-name">${b.name}</div></div>`;
    });
    track.innerHTML = html + html + html; // triple for seamless long loop
  }
  buildClientsTrack();

  // Marquee chip generator
  const colors = ['#6e1e2e','#ece2cf','#8a3040','#d9cbae','#4d1522','#f4efe6'];
  function buildTrack(id, count){
    const track = document.getElementById(id);
    let html = '';
    for(let i=0;i<count;i++){
      const c = colors[i % colors.length];
      html += `<div class="m-chip" style="background:${c}"></div>`;
    }
    track.innerHTML = html + html; // duplicate for seamless loop
  }
  ['mt1','mt2','mt3','mt4'].forEach(id => buildTrack(id, 16));

  // Project filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      projectCards.forEach(card => {
        const show = f === 'all' || card.dataset.cat === f;
        card.style.transition = 'opacity .3s ease';
        card.style.opacity = show ? '1' : '0';
        setTimeout(()=>{ card.classList.toggle('hidden', !show); }, show ? 0 : 250);
        if(show) card.classList.remove('hidden');
      });
    });
  });


  document.addEventListener('DOMContentLoaded', function() {
            // مدة انتظار التحميل (بالمللي ثانية) – 3.5 ثانية مثالية
            const LOADING_DURATION = 3500; // 3.5 ثانية

            const loadingWrapper = document.getElementById('loadingWrapper');

            // بعد انتهاء مدة التحميل، نخفي الشاشة ونعرض المحتوى
            setTimeout(function() {
                // إضافة كلاس hide لاختفاء الشاشة بتأثير ناعم
                loadingWrapper.classList.add('hide');

                // بعد اختفاء الشاشة، نعرض المحتوى الرئيسي (اختياري)
                setTimeout(function() {
                    const main = document.getElementById('mainContent');
                    if (main) {
                        main.style.display = 'block';
                    }
                    // يمكنك هنا توجيه المستخدم للصفحة الرئيسية إذا كنت تستخدم عدة صفحات
                    // window.location.href = "index.html";
                }, 1200); // نفس مدة الانتقال في CSS
            }, LOADING_DURATION);
        });