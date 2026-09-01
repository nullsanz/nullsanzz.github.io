/**
 * NULLSANZ PORTFOLIO - NEO-BRUTALISM ENGINE
 * Author: Lukmanul Hakim (Nullsanz)
 */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initTyping();
  initProcessTabs();
  initProjectFilters();
  initCategoryOverlay();
  initVideoFacades();
  initLightbox();
  initTerminal();
  initMetricsCounter();
  initFloatingNav();
});

/* 1. Navigation */
function initNav() {
  const burgerBtn = document.getElementById('menuBurgerBtn');
  const drawer = document.getElementById('mobileDrawer');
  const navLinks = document.querySelectorAll('#mobileDrawer a, .nav-item-link');

  if (burgerBtn && drawer) {
    burgerBtn.addEventListener('click', () => {
      const isHidden = drawer.classList.contains('hidden');
      if (isHidden) {
        drawer.classList.remove('hidden');
        drawer.classList.add('flex');
        burgerBtn.textContent = '✕';
      } else {
        drawer.classList.add('hidden');
        drawer.classList.remove('flex');
        burgerBtn.textContent = '☰';
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.add('hidden');
        drawer.classList.remove('flex');
        if (burgerBtn) burgerBtn.textContent = '☰';
      });
    });
  }
}

/* 2. Role Typing */
function initTyping() {
  const el = document.getElementById('heroRoleTyping');
  if (!el) return;

  const roles = [
    'FULLSTACK WEB DEVELOPER',
    'WHATSAPP BOT ARCHITECT',
    'AI SYSTEMS & GEMINI ENGINEER',
    'LINUX VPS & DEVOPS MASTER',
    'MULTIMEDIA & VIDEOGRAPHER'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let speed = 90;

  function type() {
    const cur = roles[roleIdx];
    if (isDeleting) {
      el.textContent = cur.substring(0, charIdx - 1);
      charIdx--;
      speed = 40;
    } else {
      el.textContent = cur.substring(0, charIdx + 1);
      charIdx++;
      speed = 85;
    }

    if (!isDeleting && charIdx === cur.length) {
      isDeleting = true;
      speed = 1800;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  type();
}

/* 3. Process Tabs */
function initProcessTabs() {
  const tabBtns = document.querySelectorAll('.process-tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      tabPanes.forEach(pane => {
        if (pane.id === `tabPane-${targetTab}`) {
          pane.style.display = 'flex';
        } else {
          pane.style.display = 'none';
        }
      });
    });
  });
}

/* 4. Project Filters */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-box');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('nb-btn-yellow', 'active');
        b.classList.add('nb-btn-white');
      });
      btn.classList.add('nb-btn-yellow', 'active');
      btn.classList.remove('nb-btn-white');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filterVal === 'all' || cat.includes(filterVal)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* 5. Category Sub-Page / Overlay Modal */
function initCategoryOverlay() {
  const overlay = document.getElementById('categoryOverlayModal');
  const closeBtn = document.getElementById('closeCategoryOverlayBtn');
  const badgeEl = document.getElementById('catOverlayBadge');
  const titleEl = document.getElementById('catOverlayTitle');
  const descEl = document.getElementById('catOverlayDesc');
  const subfiltersEl = document.getElementById('catSubfilters');

  if (!overlay) return;

  const categoryConfigs = {
    video: {
      title: '🎬 Galeri Videografi & Reels',
      badge: '16 KARYA',
      badgeClass: 'nb-badge-pink',
      desc: '2 Film Pendek YouTube HD, 14 Video Vertikal Shorts & Reels Instagram.',
      groupId: 'catGroup-video',
      subfilters: [
        { label: 'SEMUA (16)', filter: 'all' },
        { label: 'YOUTUBE HD (2)', filter: 'landscape' },
        { label: 'VERTICAL SHORTS (14)', filter: 'portrait' }
      ]
    },
    design: {
      title: '🎨 Galeri Desain Grafis & Branding',
      badge: '15 KARYA',
      badgeClass: 'nb-badge-yellow',
      desc: '9 Banner Promosi Komersial, 6 Desain Name Tag Identitas & Kalender Dinding Presisi Cetak.',
      groupId: 'catGroup-design',
      subfilters: [
        { label: 'SEMUA (15)', filter: 'all' },
        { label: 'DESAIN BANNER (9)', filter: 'banner' },
        { label: 'NAME TAG & KALENDER (6)', filter: 'branding' }
      ]
    },
    photo: {
      title: '📷 Galeri Fotografi & Retouching',
      badge: '12 KARYA',
      badgeClass: 'nb-badge-teal',
      desc: '12 Fotografi Profesional: Seni Tari Tradisional Jaipong, Wisuda, Model Fashion & HDR Retouching.',
      groupId: 'catGroup-photo',
      subfilters: [
        { label: 'SEMUA KARYA (12)', filter: 'all' }
      ]
    }
  };

  function openCategory(catId) {
    const config = categoryConfigs[catId];
    if (!config) return;

    // Set Header
    if (titleEl) titleEl.textContent = config.title;
    if (badgeEl) {
      badgeEl.textContent = config.badge;
      badgeEl.className = 'nb-badge ' + config.badgeClass;
    }
    if (descEl) descEl.textContent = config.desc;

    // Render Subfilters
    if (subfiltersEl) {
      subfiltersEl.innerHTML = '';
      if (config.subfilters && config.subfilters.length > 1) {
        config.subfilters.forEach((sub, idx) => {
          const btn = document.createElement('button');
          btn.className = 'nb-cat-subfilter-btn' + (idx === 0 ? ' active' : '');
          btn.textContent = sub.label;
          btn.setAttribute('data-subfilter', sub.filter);

          btn.addEventListener('click', () => {
            subfiltersEl.querySelectorAll('.nb-cat-subfilter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applySubfilter(config.groupId, sub.filter);
          });

          subfiltersEl.appendChild(btn);
        });
      }
    }

    // Toggle Content Groups
    document.querySelectorAll('.nb-cat-content-group').forEach(grp => {
      grp.classList.remove('active');
      // Reset items visibility
      grp.querySelectorAll('.media-gallery-item').forEach(item => item.style.display = 'block');
    });

    const activeGroup = document.getElementById(config.groupId);
    if (activeGroup) activeGroup.classList.add('active');

    // Show Overlay
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Reset scroll to top
    const overlayBody = document.getElementById('catOverlayBody');
    if (overlayBody) overlayBody.scrollTop = 0;
  }

  function applySubfilter(groupId, filterVal) {
    const activeGroup = document.getElementById(groupId);
    if (!activeGroup) return;

    const items = activeGroup.querySelectorAll('.media-gallery-item');
    items.forEach(item => {
      if (filterVal === 'all') {
        item.style.display = 'block';
      } else if (filterVal === 'landscape') {
        item.style.display = item.classList.contains('video-item-box-landscape') ? 'block' : 'none';
      } else if (filterVal === 'portrait') {
        item.style.display = item.classList.contains('video-item-box-portrait') ? 'block' : 'none';
      } else {
        const cat = item.getAttribute('data-category');
        item.style.display = (cat === filterVal) ? 'block' : 'none';
      }
    });
  }

  function closeCategory() {
    overlay.classList.remove('active');
    // Check if Lightbox is not active before restoring scroll
    const lightbox = document.getElementById('nbLightbox');
    if (!lightbox || !lightbox.classList.contains('active')) {
      document.body.style.overflow = '';
    }
  }

  // Trigger buttons in 3 Pillar Cards
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.open-cat-btn');
    if (trigger) {
      const catId = trigger.getAttribute('data-cat-id');
      if (catId) openCategory(catId);
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeCategory);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeCategory();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const lightbox = document.getElementById('nbLightbox');
      if (!lightbox || !lightbox.classList.contains('active')) {
        if (overlay.classList.contains('active')) {
          closeCategory();
        }
      }
    }
  });
}

/* 6. Lazy Video Facades (Zero Initial Iframes, Ultra Fast & Zero Errors) */
function initVideoFacades() {
  const facades = document.querySelectorAll('.video-facade-wrap');
  facades.forEach(facade => {
    facade.addEventListener('click', (e) => {
      e.stopPropagation();
      if (facade.classList.contains('video-active')) return;

      const videoUrl = facade.getAttribute('data-video-url');
      if (!videoUrl) return;

      facade.innerHTML = `
        <iframe 
          src="${videoUrl}" 
          style="width: 100%; height: 100%; border: none; display: block;" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      `;
      facade.classList.add('video-active');
    });
  });
}

/* 7. Lightbox Modal (Ultra Responsive + Prev/Next + Keyboard) */
function initLightbox() {
  const lightbox = document.getElementById('nbLightbox');
  const lbImg = document.getElementById('nbLightboxImg');
  const lbCap = document.getElementById('nbLightboxCap');
  const lbClose = document.getElementById('nbLightboxClose');
  const lbPrev = document.getElementById('nbLightboxPrev');
  const lbNext = document.getElementById('nbLightboxNext');

  let currentGallery = [];
  let currentIndex = 0;

  function updateGalleryItems() {
    currentGallery = Array.from(document.querySelectorAll('[data-lightbox-src]')).filter(el => {
      return el.offsetParent !== null || window.getComputedStyle(el).display !== 'none';
    });
  }

  function openLightbox(index) {
    if (index < 0 || index >= currentGallery.length) return;
    currentIndex = index;
    const target = currentGallery[currentIndex];
    const src = target.getAttribute('data-lightbox-src');
    const title = target.getAttribute('data-lightbox-title') || 'Karya Multimedia';

    if (lightbox && lbImg && lbCap) {
      lbImg.src = src;
      lbCap.textContent = title;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-lightbox-src]');
    if (trigger) {
      updateGalleryItems();
      const idx = currentGallery.indexOf(trigger);
      if (idx !== -1) {
        openLightbox(idx);
      } else {
        const src = trigger.getAttribute('data-lightbox-src');
        const title = trigger.getAttribute('data-lightbox-title') || 'Karya Multimedia';
        if (lightbox && lbImg && lbCap) {
          lbImg.src = src;
          lbCap.textContent = title;
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      }
    }
  });

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      const catOverlay = document.getElementById('categoryOverlayModal');
      if (!catOverlay || !catOverlay.classList.contains('active')) {
        document.body.style.overflow = '';
      }
      if (lbImg) lbImg.src = '';
    }
  }

  if (lbClose) lbClose.addEventListener('click', closeLightbox);

  if (lbPrev) {
    lbPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentGallery.length > 0) {
        currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
        openLightbox(currentIndex);
      }
    });
  }

  if (lbNext) {
    lbNext.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentGallery.length > 0) {
        currentIndex = (currentIndex + 1) % currentGallery.length;
        openLightbox(currentIndex);
      }
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft' && currentGallery.length > 0) {
      currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
      openLightbox(currentIndex);
    } else if (e.key === 'ArrowRight' && currentGallery.length > 0) {
      currentIndex = (currentIndex + 1) % currentGallery.length;
      openLightbox(currentIndex);
    }
  });
}

/* 7. Neo-Brutalism Terminal */
function initTerminal() {
  const input = document.getElementById('terminalCliInput');
  const body = document.getElementById('terminalScreenBody');
  if (!input || !body) return;

  const commands = {
    help: `Daftar perintah yang tersedia:
  - <span style="color:#FFE66D">about</span>    : Ringkasan profil Lukmanul Hakim
  - <span style="color:#FFE66D">skills</span>   : Matriks keahlian & stack teknologi
  - <span style="color:#FFE66D">projects</span> : Ekosistem 8 software & bot WhatsApp unggulan
  - <span style="color:#FFE66D">media</span>    : Koleksi 43 karya multimedia & video
  - <span style="color:#FFE66D">vps</span>      : Status server cloud Linux VPS (PM2 Cluster)
  - <span style="color:#FFE66D">contact</span>  : Hubungi langsung via WhatsApp / Email
  - <span style="color:#FFE66D">clear</span>    : Bersihkan layar terminal`,

    about: `👤 <b>Lukmanul Hakim (Nullsanz)</b>
• Fullstack Developer & AI Systems Engineer berbasis di Karawang.
• Spesialis Baileys WebSocket, Google GenAI (Gemini 3.5 Flash), Video Pipeline FFmpeg 60fps & Modern Web.`,

    skills: `⚡ <b>Technical Stack:</b>
• Frontend : React, Vite, Next.js, TailwindCSS, HTML5/CSS3, pdf-lib.
• Backend  : Node.js, Express, Baileys, Puppeteer, FFmpeg Ultra HD.
• Cloud/DB : Linux VPS (PM2), Firebase RTDB, Vercel, Cloudinary CDN.
• AI/Intel : Google GenAI (Gemini 3.5 Flash), Truecaller + GetContact Scraping.`,

    projects: `🚀 <b>8 Unggulan Production Projects:</b>
1. [Bot WA & Saluran] Loker Bray v2.0 (Google GenAI Gemini 3.5 + Dual Phone Intelligence + Saluran Forwarder)
2. [Platform] Shortlink Studio link.anull.cloud (Custom Slug & Cute Redirect)
3. [SaaS] CV Builder ATS-Friendly (14 Templates + AI Auto-Fill)
4. [App] Anull Streaming Smart TV (Expo TV APK & D-Pad Remote)
5. [Video Suite] Video Compressor (VPS Bot + Windows EXE + Android APK)
6. [Utility] Document Merger PDF (100% Client-Side pdf-lib)
7. [Studio] QR Code Generator (4000px Ultra HD, Custom Pattern, Logo Branding)
8. [Testing] Test Brayy (Simulasi Psikotes Kraepelin, PAPI Kostick & Matematika)`,

    media: `🎬 <b>Multimedia Portfolio:</b>
• 16 Videografi (2 YouTube Landscape + 14 Google Drive Shorts)
• 9 Desain Banner Kuliner & Promosi
• 6 Desain Name Tag & Kalender
• 12 Fotografi Studio & Outdoor Portrait`,

    vps: `🖥️ <b>Linux Cloud VPS Infrastructure:</b>
• Node: Enterprise Ubuntu Server (Singapore Region)
• PM2 Services: bot-loker-bray (ID 0), bot-saluran (ID 1), bot-status-wa (ID 5)
• Security: Firewalled & Protected Gateway
• Status: 🟢 Online 24/7 (Zero Memory Leak, Auto-Restart)`,

    contact: `📬 <b>Kontak Resmi:</b>
• WhatsApp : <a href="https://wa.me/6285718532060" target="_blank" style="color:#6EE7B7">+62 857-1853-2060</a>
• Email    : <a href="mailto:tsanlikar701@gmail.com" style="color:#93C5FD">tsanlikar701@gmail.com</a>
• GitHub   : <a href="https://github.com/nullsanz" target="_blank" style="color:#FFE66D">github.com/nullsanz</a>
• LinkedIn : <a href="https://www.linkedin.com/in/lukmanul-hakim-586658309" target="_blank" style="color:#C4B5FD">linkedin.com/in/lukmanul-hakim</a>`
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = input.value.trim().toLowerCase();
      input.value = '';
      if (!val) return;

      const userLine = document.createElement('div');
      userLine.innerHTML = `<span style="color:#4ECDC4">visitor@nullsanz:~$</span> ${escapeHtml(val)}`;
      body.appendChild(userLine);

      if (val === 'clear') {
        body.innerHTML = '';
      } else if (commands[val]) {
        const resLine = document.createElement('div');
        resLine.innerHTML = commands[val];
        body.appendChild(resLine);
      } else {
        const errLine = document.createElement('div');
        errLine.style.color = '#FF6B6B';
        errLine.innerHTML = `Perintah tidak dikenal: "${escapeHtml(val)}". Ketik <span style="color:#FFE66D">'help'</span>.`;
        body.appendChild(errLine);
      }

      body.scrollTop = body.scrollHeight;
    }
  });

  function escapeHtml(t) {
    return t.replace(/[&<>"']/g, function(m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
    });
  }
}

/* 8. Metrics Counter */
function initMetricsCounter() {
  const numbers = document.querySelectorAll('.metric-val');
  let started = false;

  function count() {
    numbers.forEach(n => {
      const target = parseInt(n.getAttribute('data-target') || '0', 10);
      const suffix = n.getAttribute('data-suffix') || '';
      let c = 0;
      const step = target / 30;

      const update = () => {
        c += step;
        if (c < target) {
          n.textContent = Math.ceil(c) + suffix;
          requestAnimationFrame(update);
        } else {
          n.textContent = target + suffix;
        }
      };

      update();
    });
  }

  window.addEventListener('scroll', () => {
    const hero = document.getElementById('hero');
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    if (rect.top < window.innerHeight && !started) {
      started = true;
      count();
    }
  });
}

/* 9. Floating Action Dock (Back to Top & Quick WA) */
function initFloatingNav() {
  const floatingNav = document.getElementById('nbFloatingNav');
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!floatingNav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 280) {
      floatingNav.classList.add('visible');
    } else {
      floatingNav.classList.remove('visible');
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
