/**
 * NULLSANZ PORTFOLIO - CORE JAVASCRIPT ENGINE
 * Author: Lukmanul Hakim (Nullsanz)
 * High-performance, Zero-Dependency Vanilla ES6+
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTypingEffect();
  initProjectFilters();
  initGalleryFiltersAndModal();
  initCertificateModal();
  initTerminal();
  initStatsCounter();
});

/* ==========================================================================
   1. NAVBAR & MOBILE DRAWER
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.background = 'rgba(9, 13, 22, 0.94)';
      header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.6)';
    } else {
      header.style.background = 'rgba(9, 13, 22, 0.82)';
      header.style.boxShadow = 'none';
    }
  });

  // Mobile menu toggle
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const isOpen = mobileNav.classList.contains('open');
      menuToggle.innerHTML = isOpen ? '✕' : '☰';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        if (menuToggle) menuToggle.innerHTML = '☰';
      });
    });
  }

  // Scroll spy active link
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
      if (targetLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetLink.classList.add('active');
        } else {
          targetLink.classList.remove('active');
        }
      }
    });
  });
}

/* ==========================================================================
   2. DYNAMIC ROLE TYPING EFFECT
   ========================================================================== */
function initTypingEffect() {
  const target = document.querySelector('.hero-role-typing');
  if (!target) return;

  const roles = [
    'Fullstack Web Developer',
    'WhatsApp Bot Architect',
    'Google Gemini AI Integrator',
    'Linux VPS DevOps & PM2',
    'Creative Multimedia Specialist'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIdx];
    if (isDeleting) {
      target.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 40;
    } else {
      target.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 400; // Pause before new word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   3. PROJECT FILTER TABS
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   4. CREATIVE GALLERY FILTERS & LIGHTBOX MODAL
   ========================================================================== */
function initGalleryFiltersAndModal() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('gallery-lightbox');
  const modalImg = document.getElementById('lightbox-img');
  const modalCaption = document.getElementById('lightbox-caption');
  const modalClose = document.getElementById('lightbox-close');

  // Filter tabs
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Lightbox click
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const fullImgUrl = item.getAttribute('data-full-img');
      const title = item.getAttribute('data-title') || 'Karya Multimedia';
      const category = item.getAttribute('data-category') || '';

      if (modal && modalImg && modalCaption) {
        modalImg.src = fullImgUrl;
        modalCaption.textContent = `${title} (${category.toUpperCase()})`;
        modal.classList.add('active');
      }
    });
  });

  // Close modal
  if (modalClose && modal) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }
}

/* ==========================================================================
   5. CERTIFICATE MODAL VIEWER
   ========================================================================== */
function initCertificateModal() {
  const certCards = document.querySelectorAll('.cert-card');
  const modal = document.getElementById('gallery-lightbox');
  const modalImg = document.getElementById('lightbox-img');
  const modalCaption = document.getElementById('lightbox-caption');

  certCards.forEach(card => {
    card.addEventListener('click', () => {
      const certImgUrl = card.getAttribute('data-cert-img');
      const certTitle = card.querySelector('h4').textContent;
      const certRole = card.querySelector('.cert-role').textContent;

      if (modal && modalImg && modalCaption) {
        modalImg.src = certImgUrl;
        modalCaption.textContent = `Sertifikat: ${certTitle} - ${certRole}`;
        modal.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   6. INTERACTIVE TERMINAL PLAYGROUND (EASTER EGG)
   ========================================================================== */
function initTerminal() {
  const terminalInput = document.getElementById('terminal-cli-input');
  const terminalBody = document.getElementById('terminal-output-body');
  if (!terminalInput || !terminalBody) return;

  const commands = {
    help: `Daftar perintah yang tersedia:
  - <span style="color:#38BDF8">about</span>    : Ringkasan profil & latar belakang
  - <span style="color:#38BDF8">skills</span>   : Ringkasan keahlian teknis (Stack)
  - <span style="color:#38BDF8">projects</span> : Menampilkan ekosistem software unggulan
  - <span style="color:#38BDF8">vps</span>      : Status infrastruktur server live
  - <span style="color:#38BDF8">contact</span>  : Informasi kontak resmi & link japri
  - <span style="color:#38BDF8">clear</span>    : Bersihkan layar terminal`,
    
    about: `👤 <b>Lukmanul Hakim (Nullsanz)</b>
• Fullstack Web Developer & AI Systems Engineer.
• Membangun ekosistem otomasi WhatsApp, Cloud Architecture, Video Encoder & ATS CV Builder.
• Lokasi: Karawang, Jawa Barat, Indonesia.`,
    
    skills: `⚡ <b>Technical Stack Matrix:</b>
• Frontend : React, Next.js, Vite, TailwindCSS, HTML5/CSS3.
• Backend  : Node.js, Express, Baileys WebSocket, Puppeteer, FFmpeg.
• Cloud/DB : Linux VPS (PM2), Firebase RTDB, Vercel, Cloudinary CDN.
• AI/Intel : Google Gemini 1.5 Pro, Truecaller & GetContact Intelligence.`,
    
    projects: `🚀 <b>Top 6 Production Projects:</b>
1. [Bot WA] Loker Bray v2.0 (Baileys + Gemini AI + Dual Phone Intel)
2. [Platform] Shortlink Studio link.anull.cloud (Custom Slug & Cute Redirect)
3. [SaaS] CV Builder ATS-Friendly (14 Templates + AI Import)
4. [App] Anull Streaming Smart TV (Expo Android TV & D-Pad Remote)
5. [Encoder] Bot Status WA Ultra HD (FFmpeg 60fps BT.709 Color Space)
6. [Utility] Document Merger & PDF Compressor (100% Client-Side pdf-lib)`,
    
    vps: `🖥️ <b>Linux VPS Infrastructure:</b>
• Host: 103.169.207.132 (Ubuntu Server)
• PM2 Services: bot-loker-bray (ID 0), bot-saluran (ID 1), bot-status-wa (ID 5)
• Status: 🟢 Online 24/7 (Zero Buffer Leak)`,
    
    contact: `📬 <b>Get in Touch:</b>
• WhatsApp : <a href="https://wa.me/6285718532060" target="_blank" style="color:#34D399">+62 857-1853-2060</a>
• Email    : <a href="mailto:tsanlikar701@gmail.com" style="color:#60A5FA">tsanlikar701@gmail.com</a>
• LinkedIn : <a href="https://www.linkedin.com/in/lukmanul-hakim-586658309" target="_blank" style="color:#38BDF8">linkedin.com/in/lukmanul-hakim</a>
• GitHub   : <a href="https://github.com/nullsanz" target="_blank" style="color:#A78BFA">github.com/nullsanz</a>`,

    secret: `✨ <i>"Kualitas kode terbaik adalah perpaduan antara logika yang presisi, performa yang ringan, dan estetika visual yang memukau."</i> — Nullsanz`
  };

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const inputVal = terminalInput.value.trim().toLowerCase();
      terminalInput.value = '';

      if (!inputVal) return;

      // Add user line
      const userLine = document.createElement('div');
      userLine.className = 'terminal-line';
      userLine.innerHTML = `<span class="terminal-prompt">visitor@nullsanz:~$</span> ${escapeHtml(inputVal)}`;
      terminalBody.appendChild(userLine);

      // Process command
      if (inputVal === 'clear') {
        terminalBody.innerHTML = '';
      } else if (commands[inputVal]) {
        const responseLine = document.createElement('div');
        responseLine.className = 'terminal-line';
        responseLine.style.color = '#E2E8F0';
        responseLine.innerHTML = commands[inputVal];
        terminalBody.appendChild(responseLine);
      } else {
        const errorLine = document.createElement('div');
        errorLine.className = 'terminal-line';
        errorLine.style.color = '#F87171';
        errorLine.innerHTML = `Perintah tidak dikenali: "${escapeHtml(inputVal)}". Ketik <span style="color:#38BDF8">'help'</span> untuk daftar perintah.`;
        terminalBody.appendChild(errorLine);
      }

      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  });

  function escapeHtml(text) {
    return text.replace(/[&<>"']/g, function(m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
    });
  }
}

/* ==========================================================================
   7. STATS COUNTER ANIMATION
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let started = false;

  function countUp() {
    statNumbers.forEach(num => {
      const target = parseInt(num.getAttribute('data-target') || '0', 10);
      const suffix = num.getAttribute('data-suffix') || '';
      let count = 0;
      const speed = target / 35;

      const updateCount = () => {
        count += speed;
        if (count < target) {
          num.textContent = Math.ceil(count) + suffix;
          requestAnimationFrame(updateCount);
        } else {
          num.textContent = target + suffix;
        }
      };

      updateCount();
    });
  }

  window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    const pos = heroSection.getBoundingClientRect();
    if (pos.top < window.innerHeight && !started) {
      started = true;
      countUp();
    }
  });
}
