(function () {
  'use strict';

  const toggle = document.getElementById('darkModeToggle');
  const body = document.body;
  let lastFocusedElement = null;

  function updateTheme(isDark) {
    body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    const icon = toggle?.querySelector('i');
    if (icon && window.lucide) {
      icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
      lucide.createIcons();
    }
  }

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    updateTheme(savedTheme === 'dark');
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    updateTheme(true);
  }

  toggle?.addEventListener('click', () => {
    updateTheme(!body.classList.contains('dark-mode'));
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      updateTheme(e.matches);
    }
  });

  document.getElementById('footerYear').textContent = new Date().getFullYear();

  if (window.lucide) {
    lucide.createIcons();
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (window.ScrollReveal && !prefersReducedMotion) {
    const slideUp = {
      distance: '40px',
      origin: 'bottom',
      duration: 800,
      easing: 'cubic-bezier(0.5, 0, 0, 1)',
      interval: 100
    };

    ScrollReveal().reveal('.resume-header', { ...slideUp, delay: 100 });
    ScrollReveal().reveal('.resume-nav a', { ...slideUp, delay: 200, interval: 80 });
    ScrollReveal().reveal('.resume-section', { ...slideUp, delay: 300, interval: 120 });
  } else {
    document.querySelectorAll('.reveal').forEach((el) => {
      el.style.visibility = 'visible';
    });
  }

  if (window.VanillaTilt && window.matchMedia('(min-width: 768px) and (hover: hover)').matches) {
    VanillaTilt.init(document.querySelectorAll('.tilt'), {
      max: 8,
      speed: 400,
      glare: true,
      'max-glare': 0.15
    });
  }

  const navLinks = document.querySelectorAll('.resume-nav a');
  const sections = [...navLinks].map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);

  function updateActiveNav() {
    const scrollPos = window.scrollY + 120;
    let current = sections[0];

    sections.forEach((section) => {
      if (section.offsetTop <= scrollPos) {
        current = section;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current.id}`);
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  const projectImages = {
    tvr: [
      { src: 'images/GSC.tvr.png', alt: 'Google Search Console — organic growth' },
      { src: 'images/GBP.TVR.png', alt: 'Google Business Profile optimization' },
      { src: 'images/speed.desktop.TVR.png', alt: 'Desktop PageSpeed score 98/100' },
      { src: 'images/speed.mobile.TVR.png', alt: 'Mobile PageSpeed score' },
      { src: 'images/tags.tagmanager.png', alt: 'Google Tag Manager tags setup' },
      { src: 'images/triggers.tagmanager.png', alt: 'Google Tag Manager triggers configuration' }
    ],
    tbr: [
      { src: 'images/GSC.tbr.png', alt: 'Google Search Console — organic growth' },
      { src: 'images/GBP.TBR.png', alt: 'Google Business Profile optimization' },
      { src: 'images/speed.desktop.tbr.png', alt: 'Desktop PageSpeed score' },
      { src: 'images/speed.mobile.tbr.png', alt: 'Mobile PageSpeed score' }
    ],
    instacravings: [
      { src: 'images/instacravings1.png', alt: 'Instacravings menu homepage' },
      { src: 'images/instacravings2.png', alt: 'Instacravings ordering interface' },
      { src: 'images/instacravings3.png', alt: 'Instacravings mobile menu view' },
      { src: 'images/instacravings4.png', alt: 'Instacravings cart and checkout' },
      { src: 'images/instacravings5.png', alt: 'Instacravings order tracking' }
    ],
    resource: [
      { src: 'images/resource1.png', alt: 'Resource Sharing app dashboard' },
      { src: 'images/resource2.png', alt: 'Resource Sharing borrow interface' },
      { src: 'images/resource3.png', alt: 'Resource Sharing search and filter' }
    ],
    cemetery: [
      { src: 'images/cemetarymanagement1.png', alt: 'Cemetery Management grid view' },
      { src: 'images/cemetarymanagement2.png', alt: 'Cemetery Management records panel' },
      { src: 'images/cemetarymanagement3.png', alt: 'Cemetery Management search feature' },
      { src: 'images/cemetarymanagement4.png', alt: 'Cemetery Management CRUD operations' },
      { src: 'images/cemetarymanagement5.png', alt: 'Cemetery Management data view' }
    ],
    dental: [
      { src: 'images/dental1.png', alt: 'Mr. Tooth Dental Clinic homepage' },
      { src: 'images/dental2.png', alt: 'Mr. Tooth Dental Clinic services section' },
      { src: 'images/dental3.png', alt: 'Mr. Tooth Dental Clinic mobile layout' },
      { src: 'images/dental4.png', alt: 'Mr. Tooth Dental Clinic testimonials' },
      { src: 'images/dental5.png', alt: 'Mr. Tooth Dental Clinic contact section' }
    ]
  };

  const galleryTitles = {
    tvr: 'The Velvet Rose — All Proof',
    tbr: 'The Blooming Rose — All Proof',
    instacravings: 'Instacravings — Full Gallery',
    resource: 'Resource Sharing — App Screenshots',
    cemetery: 'Cemetery Management — App Screenshots',
    dental: 'Mr. Tooth Dental Clinic — Screenshots'
  };

  function lockScroll() {
    document.body.style.overflow = 'hidden';
  }

  function unlockScrollIfNoModals() {
    const anyOpen = document.querySelector('.modal-overlay.is-open, #lightboxModal.is-open');
    if (!anyOpen) {
      document.body.style.overflow = '';
    }
  }

  function trapFocus(modal) {
    const focusable = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    modal.addEventListener('keydown', function onKeydown(e) {
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  window.openGallery = function openGallery(project) {
    const modal = document.getElementById('galleryModal');
    const gallery = document.getElementById('galleryImages');
    const title = document.getElementById('galleryTitle');
    gallery.innerHTML = '';

    if (title) {
      title.textContent = galleryTitles[project] || 'All Proof & Screenshots';
    }

    (projectImages[project] || []).forEach((item) => {
      const src = typeof item === 'string' ? item : item.src;
      const alt = typeof item === 'string' ? 'Project screenshot' : item.alt;
      const img = document.createElement('img');
      img.src = src;
      img.className = 'gallery-item-img';
      img.alt = alt;
      img.loading = 'lazy';
      img.onclick = () => openLightbox(src, alt);
      gallery.appendChild(img);
    });

    lastFocusedElement = document.activeElement;
    modal.classList.add('is-open');
    lockScroll();
    modal.querySelector('.modal-close')?.focus();
    trapFocus(modal);
  };

  window.closeGallery = function closeGallery() {
    document.getElementById('galleryModal').classList.remove('is-open');
    unlockScrollIfNoModals();
    lastFocusedElement?.focus();
  };

  window.openLightbox = function openLightbox(src, alt) {
    const lb = document.getElementById('lightboxModal');
    const lbImg = document.getElementById('lightboxImg');
    lbImg.src = src;
    lbImg.alt = alt || 'Enlarged project screenshot';
    lb.classList.add('is-open');
    lockScroll();
    lb.querySelector('.lightbox-close')?.focus();
  };

  window.closeLightbox = function closeLightbox() {
    document.getElementById('lightboxModal').classList.remove('is-open');
    unlockScrollIfNoModals();
  };

  window.openBlogModal = function openBlogModal(id) {
    const modal = document.getElementById(`blogModal-${id}`);
    if (!modal) return;

    lastFocusedElement = document.activeElement;
    modal.classList.add('is-open');
    lockScroll();
    modal.querySelector('.modal-close')?.focus();
    trapFocus(modal);
  };

  window.closeBlogModal = function closeBlogModal(id) {
    const modal = document.getElementById(`blogModal-${id}`);
    if (!modal) return;

    modal.classList.remove('is-open');
    unlockScrollIfNoModals();
    lastFocusedElement?.focus();
  };

  document.getElementById('galleryModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'galleryModal') closeGallery();
  });

  document.querySelectorAll('.blogModal').forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('is-open');
        unlockScrollIfNoModals();
        lastFocusedElement?.focus();
      }
    });
  });

  document.getElementById('lightboxModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'lightboxModal') closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;

    const openBlog = document.querySelector('.blogModal.is-open');
    if (openBlog) {
      openBlog.classList.remove('is-open');
      unlockScrollIfNoModals();
      lastFocusedElement?.focus();
      return;
    }

    if (document.getElementById('lightboxModal').classList.contains('is-open')) {
      closeLightbox();
      return;
    }

    if (document.getElementById('galleryModal').classList.contains('is-open')) {
      closeGallery();
    }
  });
})();
