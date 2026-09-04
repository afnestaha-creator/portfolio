document.addEventListener("DOMContentLoaded", () => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const translations = {
    en: {
      "nav.home": "Home",
      "nav.work": "Work",
      "nav.about": "About",
      "nav.contact": "Contact",
      "hero.status": "Available for freelance work",
      "hero.titleLine1": "Full-stack development",
      "hero.titleLine2": "that ships and holds up.",
      "hero.copy": "I'm Afnes Taha, a full-stack developer based in Jijel, Algeria. I design and build MERN-stack web applications and business websites — from the first wireframe to a production deploy that stays fast and reliable.",
      "hero.ctaPrimary": "Start a project",
      "hero.ctaSecondary": "See my work",
      "work.tag": "// selected-work",
      "work.title": "Recent projects",
      "work.subtitle": "A few of the applications and sites I've built for clients and my own agency, T/A Company.",
      "work.project1.title": "Retail Storefront",
      "work.project1.copy": "Customer-facing e-commerce site with cart and checkout flow.",
      "work.project2.title": "Client Dashboard",
      "work.project2.copy": "Internal admin panel for managing orders and reporting.",
      "work.project3.title": "Booking Platform",
      "work.project3.copy": "Reservation system with real-time availability.",
      "work.project4.title": "Corporate Website",
      "work.project4.copy": "Marketing site with CMS-driven content sections.",
      "about.tag": "// experience",
      "about.title": "About me",
      "about.subtitle": "My professional path as a web developer, from internship to running my own agency.",
      "about.badge.current": "Current",
      "about.badge.experience": "Experience",
      "about.date1": "Dec. 2025 — Present",
      "about.date2": "— Jan. 2026",
      "about.date3": "Freelance",
      "about.role1": "CEO & Web Developer",
      "about.role2": "Web Developer Intern",
      "about.role3": "Full Stack Developer",
      "about.org1": "T/A Company — Jijel, Algeria",
      "about.org2": "Softwear — Jijel, Algeria",
      "about.org3": "T/A Company — Jijel, Algeria",
      "about.point1a": "Founded and directed a full-service digital agency",
      "about.point1b": "Developed custom web applications for corporate and retail clients",
      "about.point1c": "Managed projects, client relations, and growth strategy",
      "about.point2": "Developed a web platform in a professional development environment",
      "about.point3a": "Developed and maintained scalable web applications using the MERN stack",
      "about.point3b": "Contributed to various client projects as a freelance developer",
      "contact.tag": "// get-in-touch",
      "contact.title": "Let's build something",
      "contact.subtitle": "Have a project in mind or want to collaborate? Reach out and let's talk through it.",
      "contact.emailLabel": "Email",
      "contact.phoneLabel": "Phone",
      "contact.socialLabel": "Elsewhere",
      "contact.form.nameLabel": "Full name",
      "contact.form.namePlaceholder": "Your name",
      "contact.form.emailLabel": "Email address",
      "contact.form.emailPlaceholder": "you@example.com",
      "contact.form.messageLabel": "Message",
      "contact.form.messagePlaceholder": "Tell me about your project...",
      "contact.form.submit": "Send message",
      "footer.text": "© 2026 Afnes Taha. All rights reserved.",
    },
    ar: {
      "nav.home": "الرئيسية",
      "nav.work": "الأعمال",
      "nav.about": "من أنا",
      "nav.contact": "تواصل",
      "hero.status": "متاح للعمل المستقل",
      "hero.titleLine1": "تطوير Full-Stack",
      "hero.titleLine2": "يُنجز ويستمر.",
      "hero.copy": "أنا أفناس طه، مطور Full-Stack من جيجل، الجزائر. أصمم وأطور تطبيقات ويب باستخدام MERN Stack ومواقع إلكترونية للأعمال، بدءًا من التخطيط الأولي وحتى النشر في بيئة إنتاجية مع سرعة واستقرار عاليين.",
      "hero.ctaPrimary": "ابدأ مشروعك",
      "hero.ctaSecondary": "مشاريعي",
      "work.tag": "// أعمال مختارة",
      "work.title": "مشاريعي الأخيرة",
      "work.subtitle": "أمثلة قليلة من التطبيقات والمواقع التي أنشأتها للعملاء ولـ T/A Company، وكالة أعمالي.",
      "work.project1.title": "متجر تجزئة",
      "work.project1.copy": "موقع تجارة إلكترونية يقدّم تجربة موجهة للعميل مع سلة مشتريات وسير شراء كامل.",
      "work.project2.title": "لوحة تحكم العميل",
      "work.project2.copy": "لوحة إدارة داخلية لإدارة الطلبات والتقارير.",
      "work.project3.title": "منصة الحجز",
      "work.project3.copy": "نظام حجز مع توفر مباشر ومحدث في الوقت الحقيقي.",
      "work.project4.title": "موقع شركة",
      "work.project4.copy": "موقع تسويقي يحتوي على أقسام محتوى مدارة عبر CMS.",
      "about.tag": "// الخبرة",
      "about.title": "من أنا",
      "about.subtitle": "مساري المهني كـ مطور ويب، من التدريب إلى إدارة وكالتي الخاصة.",
      "about.badge.current": "حالياً",
      "about.badge.experience": "خبرة",
      "about.date1": "ديسمبر 2025 — حتى الآن",
      "about.date2": "— يناير 2026",
      "about.date3": "مستقل",
      "about.role1": "الرئيس التنفيذي ومطور الويب",
      "about.role2": "مطور ويب متدرب",
      "about.role3": "مطور Full Stack",
      "about.org1": "T/A Company — جيجل، الجزائر",
      "about.org2": "Softwear — جيجل، الجزائر",
      "about.org3": "T/A Company — جيجل، الجزائر",
      "about.point1a": "أسست وأدرت وكالة رقمية متكاملة الخدمات",
      "about.point1b": "طوّرت تطبيقات ويب مخصصة لعملاء الشركات والمتاجر",
      "about.point1c": "أدرت المشاريع وعلاقات العملاء واستراتيجية النمو",
      "about.point2": "طوّرت منصة ويب في بيئة تطوير احترافية",
      "about.point3a": "طوّرت وصحّحت تطبيقات ويب قابلة للتوسع باستخدام MERN Stack",
      "about.point3b": "ساهمت في مشاريع متعددة للعميل كـ مطور مستقل",
      "contact.tag": "// تواصل",
      "contact.title": "لنُنشئ شيئًا معًا",
      "contact.subtitle": "هل لديك مشروع في ذهنك أو ترغب في التعاون؟ تواصل معنا، وسنناقش الفكرة معًا.",
      "contact.emailLabel": "البريد الإلكتروني",
      "contact.phoneLabel": "الهاتف",
      "contact.socialLabel": "حسابات أخرى",
      "contact.form.nameLabel": "الاسم الكامل",
      "contact.form.namePlaceholder": "اسمك",
      "contact.form.emailLabel": "البريد الإلكتروني",
      "contact.form.emailPlaceholder": "you@example.com",
      "contact.form.messageLabel": "الرسالة",
      "contact.form.messagePlaceholder": "أخبرني عن مشروعك...",
      "contact.form.submit": "إرسال الرسالة",
      "footer.text": "© 2026 أفناس طه. جميع الحقوق محفوظة.",
    },
  };

  const html = document.documentElement;
  const langButtons = Array.from(document.querySelectorAll(".lang-btn"));
  const translatedEls = [...document.querySelectorAll("[data-i18n]")];
  const translatedPlaceholders = [...document.querySelectorAll("[data-i18n-placeholder]")];
  const typedEl = document.getElementById("typed-line");

  const typedLines = {
    en: 'const dev = { name: "Afnes Taha", stack: ["React","Node","MongoDB"], base: "Jijel, DZ" };',
    ar: 'const dev = { name: "أفناس طه", stack: ["React","Node","MongoDB"], base: "جيجل، DZ" };',
  };

  const startTyping = (lang) => {
    if (!typedEl) return;
    const line = typedLines[lang] || typedLines.en;
    let i = 0;
    const type = () => {
      if (i <= line.length) {
        typedEl.textContent = line.slice(0, i);
        i++;
        setTimeout(type, 22);
      }
    };
    if (reducedMotion) {
      typedEl.textContent = line;
      return;
    }
    typedEl.textContent = "";
    type();
  };

  const setLanguage = (lang) => {
    const selected = translations[lang] ? lang : "en";
    const dict = translations[selected];

    translatedEls.forEach((el) => {
      const key = el.dataset.i18n;
      const value = dict[key];
      if (value) {
        el.textContent = value;
      }
    });

    translatedPlaceholders.forEach((el) => {
      const key = el.dataset.i18nPlaceholder;
      const value = dict[key];
      if (value) {
        el.setAttribute("placeholder", value);
      }
    });

    html.lang = selected;
    html.dir = selected === "ar" ? "rtl" : "ltr";

    document.body.classList.toggle("rtl", selected === "ar");
    document.body.classList.toggle("ltr", selected !== "ar");

    langButtons.forEach((btn) => {
      const isActive = btn.dataset.lang === selected;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });

    if (typedEl) {
      startTyping(selected);
    }

    localStorage.setItem("portfolio-lang", selected);
  };

  const savedLang = localStorage.getItem("portfolio-lang") || "en";
  setLanguage(savedLang);

  langButtons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.lang));
  });

  /* ---------- Mobile menu ---------- */
  const menuBtn = document.getElementById("menubtn");
  const menu = document.getElementById("menu");

  if (menuBtn && menu) {
    menuBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const isOpen = menu.classList.toggle("show");
      menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      const icon = menuBtn.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-times");
      }
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("show");
        menuBtn.setAttribute("aria-expanded", "false");
        const icon = menuBtn.querySelector("i");
        if (icon) {
          icon.classList.add("fa-bars");
          icon.classList.remove("fa-times");
        }
      });
    });
  }

  /* ---------- Nav background on scroll ---------- */
  const nav = document.getElementById("navbar");
  const onNavScroll = () => {
    if (!nav) return;
    nav.classList.toggle("scrolled", window.scrollY > 20);
  };
  onNavScroll();
  window.addEventListener("scroll", onNavScroll, { passive: true });

  /* ---------- Scroll-spy active link ---------- */
  const navLinks = Array.from(document.querySelectorAll("#menu a"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((l) => l.classList.remove("active"));
            const active = navLinks.find(
              (l) => l.getAttribute("href") === `#${entry.target.id}`
            );
            if (active) active.classList.add("active");
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((s) => spyObserver.observe(s));
  }

  /* ---------- Scroll reveal ---------- */
  // Disable Hero entrance animation on Mobile & Tablet
  if (window.innerWidth < 1200) {
    const heroReveals = document.querySelectorAll("#home .reveal");
    heroReveals.forEach(el => {
      el.classList.remove("reveal");
      el.classList.add("active");
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.animation = "none";
      el.style.transition = "none";
      
      const svgPath = el.querySelector(".portrait-frame svg path");
      if (svgPath) {
        svgPath.style.animation = "none";
        svgPath.style.strokeDashoffset = "0";
      }
    });
  }

  const revealEls = document.querySelectorAll(".reveal");

  if (reducedMotion) {
    revealEls.forEach((el) => el.classList.add("active"));
  } else if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("active"));
  }

  /* ---------- Timeline scroll progress ---------- */
  const timeline = document.querySelector(".timeline");
  const progress = document.getElementById("timeline-progress");

  const updateTimelineProgress = () => {
    if (!timeline || !progress) return;
    const rect = timeline.getBoundingClientRect();
    const viewportH = window.innerHeight;
    const total = rect.height;
    const visible = Math.min(Math.max(viewportH * 0.5 - rect.top, 0), total);
    progress.style.height = `${(visible / total) * 100}%`;
  };
  updateTimelineProgress();
  window.addEventListener("scroll", updateTimelineProgress, { passive: true });
  window.addEventListener("resize", updateTimelineProgress);

  /* ---------- Contact form (mailto fallback) ---------- */
  const form = document.getElementById("contact-form");
  const note = document.getElementById("form-note");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = encodeURIComponent(form.name.value);
      const email = encodeURIComponent(form.email.value);
      const message = encodeURIComponent(form.message.value);
      const subject = encodeURIComponent("Portfolio contact from " + form.name.value);
      const body = `Name: ${form.name.value}%0AEmail: ${form.email.value}%0A%0A${message}`;

      window.location.href = `mailto:afnesuniv@gmail.com?subject=${subject}&body=${body}`;

      if (note) {
        const currentLang = document.documentElement.lang;
        note.textContent = currentLang === "ar" ? "يتم فتح بريدك الإلكتروني…" : "Opening your email client…";
      }
    });
  }
});
