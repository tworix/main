// TWORIX interactions
(function () {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ------------------------------------------------------------
     Arabic dictionary (English text lives in the HTML itself)
  ------------------------------------------------------------ */
  const AR = {
    nav_services: 'الخدمات', nav_process: 'طريقة العمل', nav_about: 'من نحن', nav_why: 'لماذا تورِكس',
    nav_faq: 'الأسئلة', nav_cta: 'لنتحدث',
    hero_eyebrow: 'فريق رقمي إبداعي',
    hero_title: 'نبني <span>تجارب</span> رقمية<br>تدفعك دائماً<br>إلى الأمام.',
    hero_text: 'من المواقع الحديثة إلى الحلول الرقمية المدروسة، تساعدك TWORIX على تحويل أفكارك إلى تجارب يحب الناس استخدامها.',
    hero_cta: 'ابدأ مشروعك', hero_link: 'اكتشف ما نقدمه',
    hero_note: 'أفكار جيدة. تُبنى بهدف.',
    m1: 'خدمات أساسية', m2: 'خطوات واضحة للعمل', m3: 'التزام بالجودة',
    s_eyebrow: 'ماذا نقدم',
    s_title: 'حلول رقمية،<br><span>ببساطة.</span>',
    s_text: 'نجمع بين الإبداع والتقنية لنقدم تجارب رقمية مفيدة ومصقولة تجعل مشروعك يتميز.',
    s1_tag: 'التطوير', s1_title: 'تطوير المواقع',
    s1_text: 'مواقع سريعة وحديثة ومتجاوبة، مصممة لتبدو رائعة وتعمل بسلاسة على كل الشاشات.',
    s1_l1: 'صفحات هبوط ومواقع شركات', s1_l2: 'تحسين السرعة والأداء', s1_l3: 'بنية صديقة لمحركات البحث',
    s2_tag: 'منتجات رقمية', s2_title: 'تطبيقات الويب',
    s2_text: 'تطبيقات وأدوات ويب عملية مبنية حول أهدافك ومستخدميك وطريقة عملك.',
    s2_l1: 'لوحات تحكم وأدوات داخلية', s2_l2: 'نماذج وحسابات وسير عمل', s2_l3: 'مبنية لتنمو معك',
    s3_tag: 'التجربة', s3_title: 'تصميم الواجهات والتجربة',
    s3_text: 'تخطيطات واضحة وواجهات مدروسة تجعل منتجك أسهل وأكثر متعة في الاستخدام.',
    s3_l1: 'هياكل أولية ونماذج تفاعلية', s3_l2: 'أنظمة بصرية ودلائل أسلوب', s3_l3: 'تحسين سهولة الاستخدام',
    discuss: 'ناقش مشروعك',
    p_eyebrow: 'كيف نعمل',
    p_title: 'من الفكرة<br><span>إلى الإطلاق.</span>',
    p_text: 'مسار بسيط من أربع خطوات، لتعرف دائماً أين وصل مشروعك وما الذي سيأتي بعده.',
    p1_title: 'الاكتشاف', p1_text: 'نستمع ونسأل ونحدد الأهداف والجمهور والنطاق معاً.',
    p2_title: 'التصميم', p2_text: 'تتشكل التخطيطات والهيكل والاتجاه البصري ويتم صقلها بملاحظاتك.',
    p3_title: 'البناء', p3_text: 'تطوير نظيف وسريع ومتجاوب، مع اختبار على مختلف الأجهزة أثناء العمل.',
    p4_title: 'الإطلاق', p4_text: 'ننشر المشروع ونراجع كل شيء مرتين ونبقى قريبين لإجراء التعديلات بعد الإطلاق.',
    a_eyebrow: 'نبذة صغيرة عنا',
    a_title: 'فريق صغير.<br><span>طموحات كبيرة.</span>',
    a_p1: 'TWORIX فريق رقمي متخصص يعشق بناء تجارب حديثة ومفيدة. نؤمن أن العمل العظيم يبدأ بالإصغاء، وينمو بالتعاون، وينجح بالاهتمام بالتفاصيل.',
    a_p2: 'سواء كنت تبدأ من فكرة أو تريد تحسين مشروع قائم، نحن جاهزون لمساعدتك على اتخاذ الخطوة التالية.',
    v1: 'الإصغاء', v2: 'الإتقان', v3: 'الصدق', v4: 'الوضوح',
    a_cta: 'تعرّف علينا',
    w_eyebrow: 'ما يميز TWORIX',
    w_title: 'لماذا تعمل<br><span>معنا؟</span>',
    w_text: 'تواصل جيد، وتنفيذ دقيق، وتركيز حقيقي على ما يحتاجه مشروعك.',
    w1_title: 'تركيز على أهدافك', w1_text: 'نبدأ بفهم ما تريد تحقيقه، ثم نشكّل العمل حوله.',
    w2_title: 'متجاوب بالتصميم', w2_text: 'يجب أن يبدو موقعك طبيعياً ويعمل بثبات على الهاتف والتابلت والحاسوب.',
    w3_title: 'تواصل واضح', w3_text: 'نبقيك على اطلاع، ونستمع لملاحظاتك، ونجعل العملية مباشرة.',
    w4_title: 'عناية بكل تفصيلة', w4_text: 'من الانطباع الأول إلى آخر تفاعل، نهتم بالتجربة كاملة.',
    f_eyebrow: 'أسئلة',
    f_title: 'من الجيد<br><span>أن تعرف.</span>',
    f_intro: 'لم تجد إجابتك؟ راسلنا على تيليجرام وسنساعدك بكل سرور.',
    q1: 'كيف نبدأ المشروع؟',
    a1: 'أرسل لنا رسالة قصيرة عن فكرتك عبر النموذج أدناه أو على تيليجرام. سنرد عليك ونطرح بعض الأسئلة ونتفق معاً على النطاق.',
    q2: 'هل تعملون على مواقع قائمة؟',
    a2: 'نعم. يمكننا إعادة تصميم مشروعك الحالي أو تسريعه أو توسيعه، وليس فقط بناء مشاريع جديدة من الصفر.',
    q3: 'هل سيعمل موقعي على الجوال؟',
    a3: 'دائماً. كل مشروع يُصمَّم ويُختبر للهواتف والأجهزة اللوحية والحواسيب منذ أول رسم.',
    q4: 'هل أستطيع طلب تعديلات أثناء العمل؟',
    a4: 'بالطبع. الملاحظات جزء من العملية، ونشارك التقدم مبكراً لتبقى التعديلات بسيطة.',
    c_eyebrow: 'لديك مشروع في بالك؟',
    c_title: 'لنصنع شيئاً<br><span>مميزاً.</span>',
    c_text: 'أخبرنا بما تعمل عليه. املأ النموذج القصير واختر عضو الفريق وستكون الرسالة جاهزة للإرسال على تيليجرام.',
    c_member: 'تواصل مع عضو الفريق',
    f_name: 'اسمك', f_name_ph: 'كيف نناديك؟',
    f_type: 'ماذا تحتاج؟',
    t1: 'موقع', t2: 'تطبيق ويب', t3: 'واجهات وتجربة', t4: 'لست متأكداً',
    f_msg: 'عن مشروعك', f_msg_ph: 'اكتب فكرتك أو ما تريد تحقيقه بإيجاز',
    f_to: 'أرسل إلى',
    f_send: 'جهّز الرسالة وافتح تيليجرام',
    f_hint: 'تُنسخ رسالتك تلقائياً، فقط الصقها في المحادثة.',
    foot_text: 'عمل رقمي مدروس. يُبنى معاً.',
    foot_rights: 'جميع الحقوق محفوظة.'
  };

  const MSG = {
    en: {
      need: 'Please add your name and a short message.',
      copied: 'Message copied. Paste it in Telegram.',
      manual: 'Telegram is opening. Please type your message there.',
      hello: 'Hello TWORIX team,',
      name: 'Name', type: 'Need', about: 'Project'
    },
    ar: {
      need: 'من فضلك اكتب اسمك ورسالة قصيرة.',
      copied: 'تم نسخ الرسالة. الصقها في تيليجرام.',
      manual: 'يتم فتح تيليجرام. اكتب رسالتك هناك.',
      hello: 'مرحباً فريق TWORIX،',
      name: 'الاسم', type: 'الطلب', about: 'المشروع'
    }
  };

  /* ------------------------------------------------------------
     Language
  ------------------------------------------------------------ */
  const i18nNodes = $$('[data-i18n],[data-i18n-html],[data-i18n-ph]');
  i18nNodes.forEach((el) => {
    if (el.hasAttribute('data-i18n')) el.dataset.en = el.textContent;
    if (el.hasAttribute('data-i18n-html')) el.dataset.en = el.innerHTML;
    if (el.hasAttribute('data-i18n-ph')) el.dataset.enPh = el.getAttribute('placeholder') || '';
  });
  // English placeholders
  const EN_PH = { f_name_ph: 'What should we call you?', f_msg_ph: 'Briefly describe your idea or what you want to achieve' };

  let lang = 'en';
  const langBtn = $('#langToggle');

  function applyLang(next) {
    lang = next;
    const isAr = next === 'ar';
    root.lang = next;
    root.dir = isAr ? 'rtl' : 'ltr';
    i18nNodes.forEach((el) => {
      if (el.hasAttribute('data-i18n')) {
        const k = el.getAttribute('data-i18n');
        el.textContent = isAr && AR[k] ? AR[k] : el.dataset.en;
      }
      if (el.hasAttribute('data-i18n-html')) {
        const k = el.getAttribute('data-i18n-html');
        el.innerHTML = isAr && AR[k] ? AR[k] : el.dataset.en;
      }
      if (el.hasAttribute('data-i18n-ph')) {
        const k = el.getAttribute('data-i18n-ph');
        el.setAttribute('placeholder', isAr ? AR[k] : EN_PH[k]);
      }
    });
    langBtn.textContent = isAr ? 'EN' : 'AR';
    document.title = isAr ? 'TWORIX — حلول رقمية' : 'TWORIX — Digital Solutions';
    store.set('tworix-lang', next);
    updateProgress();
  }

  langBtn.addEventListener('click', () => applyLang(lang === 'en' ? 'ar' : 'en'));

  /* ------------------------------------------------------------
     Theme
  ------------------------------------------------------------ */
  const themeBtn = $('#themeToggle');
  const meta = $('meta[name="theme-color"]');
  function syncMeta() {
    if (meta) meta.setAttribute('content', root.getAttribute('data-theme') === 'dark' ? '#0f0f0e' : '#f3f1ec');
  }
  themeBtn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    store.set('tworix-theme', next);
    syncMeta();
  });
  syncMeta();

  /* ------------------------------------------------------------
     Mobile menu
  ------------------------------------------------------------ */
  const menuToggle = $('#menuToggle');
  const navLinks = $('#navLinks');
  function closeMenu() {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  }
  menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  $$('a', navLinks).forEach((a) => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  /* ------------------------------------------------------------
     Scroll: header, progress, back-to-top, active link, steps fill
  ------------------------------------------------------------ */
  const header = $('#header');
  const progress = $('#progress');
  const toTop = $('#toTop');
  const sections = $$('main section[id]');
  const navAnchors = $$('.nav-links a[href^="#"]:not(.nav-cta)');
  const stepsEl = $('#steps');
  const stepsFill = $('#stepsFill');

  function updateProgress() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
    header.classList.toggle('scrolled', y > 20);
    toTop.classList.toggle('show', y > 700);

    // active nav link
    let current = '';
    sections.forEach((s) => { if (s.getBoundingClientRect().top <= 140) current = s.id; });
    navAnchors.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + current));

    // steps line
    if (stepsEl) {
      const r = stepsEl.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (window.innerHeight * 0.7 - r.top) / r.height));
      stepsFill.style.width = p * 100 + '%';
      stepsFill.parentElement.style.setProperty('--fill', p * 100 + '%');
    }
  }
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(() => { updateProgress(); ticking = false; }); ticking = true; }
  }, { passive: true });
  window.addEventListener('resize', updateProgress);

  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

  /* ------------------------------------------------------------
     Reveal on scroll
  ------------------------------------------------------------ */
  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  /* ------------------------------------------------------------
     Counters
  ------------------------------------------------------------ */
  function runCounter(el) {
    const to = parseInt(el.dataset.to, 10);
    const pad = parseInt(el.dataset.pad || '0', 10);
    const fmt = (n) => (pad ? String(n).padStart(pad, '0') : String(n));
    if (reduceMotion) { el.textContent = fmt(to); return; }
    const dur = 1400, t0 = performance.now();
    (function tick(t) {
      const p = Math.min((t - t0) / dur, 1);
      el.textContent = fmt(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }
  if ('IntersectionObserver' in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { runCounter(en.target); co.unobserve(en.target); } });
    }, { threshold: 0.6 });
    $$('.count').forEach((el) => co.observe(el));
  } else {
    $$('.count').forEach(runCounter);
  }

  /* ------------------------------------------------------------
     FAQ accordion
  ------------------------------------------------------------ */
  $$('.faq-item').forEach((item) => {
    const btn = $('.faq-q', item);
    btn.addEventListener('click', () => {
      const willOpen = !item.classList.contains('open');
      $$('.faq-item').forEach((i) => {
        i.classList.remove('open');
        $('.faq-q', i).setAttribute('aria-expanded', 'false');
      });
      if (willOpen) { item.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
    });
  });

  /* ------------------------------------------------------------
     Pointer effects (fine pointers only)
  ------------------------------------------------------------ */
  if (finePointer && !reduceMotion) {
    // custom cursor ring
    const cursor = $('#cursor');
    let cx = 0, cy = 0, tx = 0, ty = 0;
    window.addEventListener('mousemove', (e) => {
      tx = e.clientX; ty = e.clientY;
      cursor.classList.add('show');
    });
    document.addEventListener('mouseleave', () => cursor.classList.remove('show'));
    (function loop() {
      cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
      cursor.style.left = cx + 'px'; cursor.style.top = cy + 'px';
      requestAnimationFrame(loop);
    })();
    $$('a,button,.chip,.faq-q').forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // magnetic buttons
    $$('.magnetic').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.18;
        const y = (e.clientY - r.top - r.height / 2) * 0.3;
        el.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });

    // hero card tilt
    const art = $('#heroArt');
    if (art) {
      const front = $('.card-front', art);
      const back = $('.card-back', art);
      art.addEventListener('mousemove', (e) => {
        const r = art.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        front.style.transform = 'rotate(' + (-5 + px * 5) + 'deg) translate(' + px * 14 + 'px,' + py * 14 + 'px)';
        back.style.transform = 'rotate(' + (10 - px * 4) + 'deg) translate(' + (35 - px * 22) + 'px,' + (5 - py * 18) + 'px)';
      });
      art.addEventListener('mouseleave', () => { front.style.transform = ''; back.style.transform = ''; });
    }

    // about frame grid parallax
    const frame = $('#aboutFrame');
    if (frame) {
      const grid = $('.frame-grid', frame);
      frame.addEventListener('mousemove', (e) => {
        const r = frame.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        grid.style.transform = 'translate(' + px * -18 + 'px,' + py * -18 + 'px)';
      });
      frame.addEventListener('mouseleave', () => { grid.style.transform = ''; });
    }
  }

  /* ------------------------------------------------------------
     Toast
  ------------------------------------------------------------ */
  const toast = $('#toast');
  let toastTimer;
  function showToast(text) {
    toast.textContent = text;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3600);
  }

  /* ------------------------------------------------------------
     Contact form -> clipboard + Telegram
  ------------------------------------------------------------ */
  const form = $('#contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameEl = $('#fName');
    const msgEl = $('#fMsg');
    const name = nameEl.value.trim();
    const msg = msgEl.value.trim();

    nameEl.closest('.field').classList.toggle('invalid', !name);
    msgEl.closest('.field').classList.toggle('invalid', !msg);

    const t = MSG[lang];
    if (!name || !msg) { showToast(t.need); (name ? msgEl : nameEl).focus(); return; }

    const type = form.elements.type.value;
    const to = form.elements.to.value;
    const text = [t.hello, '', t.name + ': ' + name, t.type + ': ' + type, t.about + ': ' + msg].join('\n');

    // open first (needs the user gesture), then copy
    const win = window.open('https://t.me/' + to, '_blank', 'noopener');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => showToast(t.copied),
        () => showToast(t.manual)
      );
    } else {
      showToast(t.manual);
    }
    if (!win) window.location.href = 'https://t.me/' + to;
  });
  $$('input,textarea', form).forEach((el) => el.addEventListener('input', () => {
    const f = el.closest('.field'); if (f) f.classList.remove('invalid');
  }));

  /* ------------------------------------------------------------
     Year + preloader
  ------------------------------------------------------------ */
  const y = new Date().getFullYear();
  $('#year').textContent = y;
  $('#cardYear').textContent = y;

  const preloader = $('#preloader');
  const bar = $('#preloaderBar');
  const count = $('#preloaderCount');
  document.body.classList.add('is-loading');

  function finishLoading() {
    if (preloader.classList.contains('done')) return;
    bar.style.width = '100%'; count.textContent = '100';
    setTimeout(() => {
      preloader.classList.add('done');
      document.body.classList.remove('is-loading');
      updateProgress();
    }, 250);
  }

  let n = 0;
  const loadTimer = setInterval(() => {
    n = Math.min(n + Math.ceil(Math.random() * 9), 92);
    bar.style.width = n + '%'; count.textContent = n;
  }, 90);
  const done = () => { clearInterval(loadTimer); finishLoading(); };
  if (document.readyState === 'complete') setTimeout(done, 500);
  else window.addEventListener('load', () => setTimeout(done, 400));
  setTimeout(done, 3500); // safety net

  /* ------------------------------------------------------------
     Init language from storage
  ------------------------------------------------------------ */
  const saved = store.get('tworix-lang');
  if (saved === 'ar') applyLang('ar');
  updateProgress();
})();
