/**
 * NULLSANZ PORTFOLIO - NEO-BRUTALISM ENGINE
 * Author: Lukmanul Hakim (Nullsanz)
 */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initTyping();
  initProcessTabs();
  initProjectFilters();
  initMediaFilters();
  initLightbox();
  initTerminal();
  initMetricsCounter();
});

/* 1. Navigation */
function initNav() {
  const burgerBtn = document.getElementById('menuBurgerBtn');
  const drawer = document.getElementById('mobileDrawer');
  const navLinks = document.querySelectorAll('.mobile-drawer a, .nav-item-link');

  if (burgerBtn && drawer) {
    burgerBtn.addEventListener('click', () => {
      drawer.classList.toggle('open');
      burgerBtn.textContent = drawer.classList.contains('open') ? '✕' : '☰';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
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

/* 5. Multimedia Filters */
function initMediaFilters() {
  const filterBtns = document.querySelectorAll('.media-filter-btn');
  const mediaItems = document.querySelectorAll('.media-gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('nb-btn-pink', 'active');
        b.classList.add('nb-btn-white');
      });
      btn.classList.add('nb-btn-pink', 'active');
      btn.classList.remove('nb-btn-white');

      const filterVal = btn.getAttribute('data-filter');

      mediaItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filterVal === 'all' || cat === filterVal) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* 6. Lightbox Modal */
function initLightbox() {
  const lightbox = document.getElementById('nbLightbox');
  const lbImg = document.getElementById('nbLightboxImg');
  const lbCap = document.getElementById('nbLightboxCap');
  const lbClose = document.getElementById('nbLightboxClose');
  const triggerElements = document.querySelectorAll('[data-lightbox-src]');

  triggerElements.forEach(el => {
    el.addEventListener('click', () => {
      const src = el.getAttribute('data-lightbox-src');
      const title = el.getAttribute('data-lightbox-title') || 'Karya Multimedia';
      if (lightbox && lbImg && lbCap) {
        lbImg.src = src;
        lbCap.textContent = title;
        lightbox.classList.add('active');
      }
    });
  });

  if (lbClose && lightbox) {
    lbClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });
  }
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
  - <span style="color:#FFE66D">projects</span> : Ekosistem 17+ software & bot WhatsApp
  - <span style="color:#FFE66D">media</span>    : Koleksi 43 karya multimedia & video
  - <span style="color:#FFE66D">vps</span>      : Status server VPS 103.169.207.132
  - <span style="color:#FFE66D">contact</span>  : Hubungi langsung via WhatsApp / Email
  - <span style="color:#FFE66D">clear</span>    : Bersihkan layar terminal`,

    about: `👤 <b>Lukmanul Hakim (Nullsanz)</b>
• Fullstack Developer & AI Systems Engineer berbasis di Karawang.
• Spesialis Baileys WebSocket, Google Gemini AI, Video Pipeline FFmpeg 60fps & Modern Web.`,

    skills: `⚡ <b>Technical Stack:</b>
• Frontend : React, Vite, Next.js, TailwindCSS, HTML5/CSS3, pdf-lib.
• Backend  : Node.js, Express, Baileys, Puppeteer, FFmpeg Ultra HD.
• Cloud/DB : Linux VPS (PM2), Firebase RTDB, Vercel, Cloudinary CDN.
• AI/Intel : Google Gemini 1.5 Pro, Truecaller + GetContact Scraping.`,

    projects: `🚀 <b>Top 6 Production Projects:</b>
1. [Bot WA] Loker Bray v2.0 (Gemini AI + Dual Phone Intelligence)
2. [Platform] Shortlink Studio link.anull.cloud (Custom Slug & Cute Redirect)
3. [SaaS] CV Builder ATS (14 Templates + AI Auto-Fill)
4. [App] Anull Streaming Smart TV (Expo TV APK & D-Pad Remote)
5. [Video] Bot Status WA HD (FFmpeg 60 FPS BT.709 Color Space)
6. [Utility] Document Merger PDF (100% Client-Side pdf-lib)`,

    media: `🎬 <b>Multimedia Portfolio:</b>
• 16 Videografi (2 YouTube Landscape + 14 Google Drive Shorts)
• 9 Desain Banner Kuliner & Promosi
• 6 Desain Name Tag & Kalender
• 12 Fotografi Studio & Outdoor Portrait`,

    vps: `🖥️ <b>Linux VPS Infrastructure:</b>
• Host: 103.169.207.132 (Ubuntu Server)
• PM2 Services: bot-loker-bray (ID 0), bot-saluran (ID 1), bot-status-wa (ID 5)
• Status: 🟢 Online 24/7 (Zero Memory Leak)`,

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
