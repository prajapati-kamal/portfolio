/**
 * ============================================================================
 * KAMAL PRAJAPATI PORTFOLIO - MAIN INTERACTION CONTROLLER
 * Typing effect, Audio synthesis, 3D card tilt, Modals, Filters, Clipboard
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. SYNTHESIZED WEB AUDIO SOUND EFFECTS
  // --------------------------------------------------------------------------
  let audioEnabled = true;
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
  }

  function playSynthSound(frequency = 520, type = 'sine', duration = 0.08) {
    if (!audioEnabled) return;
    try {
      initAudio();
      if (!audioCtx || audioCtx.state === 'suspended') {
        audioCtx && audioCtx.resume();
      }
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(frequency * 1.5, audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy catch
    }
  }

  const sfxToggleBtn = document.getElementById('sfx-toggle');
  const sfxIcon = document.getElementById('sfx-icon');

  if (sfxToggleBtn && sfxIcon) {
    sfxToggleBtn.addEventListener('click', () => {
      audioEnabled = !audioEnabled;
      if (audioEnabled) {
        sfxIcon.className = 'fa-solid fa-volume-high';
        playSynthSound(680, 'sine', 0.1);
        showToast('Sound Effects Enabled 🔊');
      } else {
        sfxIcon.className = 'fa-solid fa-volume-xmark';
        showToast('Sound Effects Muted 🔇');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 2. DYNAMIC HERO TYPING EFFECT
  // --------------------------------------------------------------------------
  const typingElement = document.getElementById('typing-text');
  const roles = [
    'Python Developer',
    'Machine Learning Aspirant',
    'Data Analyst',
    'CS Engineering Student',
    'Problem Solver'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;

  function typeRole() {
    if (!typingElement) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 50;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 110;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingDelay = 2200; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingDelay = 400; // Pause before typing next
    }

    setTimeout(typeRole, typingDelay);
  }

  typeRole();

  // --------------------------------------------------------------------------
  // 3. CURSOR GLOW EFFECT
  // --------------------------------------------------------------------------
  const cursorGlow = document.getElementById('cursor-glow');
  if (cursorGlow && window.innerWidth > 768) {
    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function updateCursor() {
      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;
      cursorGlow.style.left = `${glowX}px`;
      cursorGlow.style.top = `${glowY}px`;
      requestAnimationFrame(updateCursor);
    }
    updateCursor();
  }

  // --------------------------------------------------------------------------
  // 4. MOBILE NAVIGATION TOGGLE
  // --------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-active');
      const isOpen = navLinks.classList.contains('mobile-active');
      mobileToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
      playSynthSound(440, 'triangle', 0.05);
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-active');
        mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  // --------------------------------------------------------------------------
  // 5. PROJECT CATEGORY FILTERS
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      playSynthSound(580, 'sine', 0.06);

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hide');
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 40);
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 6. PROJECT DETAILS MODAL DATA & HANDLERS
  // --------------------------------------------------------------------------
  const projectData = {
    titanic: {
      title: 'Titanic Survival Prediction Model',
      tag: 'Machine Learning • Classification',
      date: 'July 2026 – August 2026',
      badgeClass: 'ml-badge',
      accuracy: '81% Accuracy',
      description: `
        <div class="modal-detail-section">
          <h4><i class="fa-solid fa-crosshairs text-cyan"></i> Problem Statement & Objective</h4>
          <p>
            The sinking of the Titanic is one of the most infamous shipwrecks in history. 
            The goal of this machine learning project was to build a predictive binary classification 
            model that determines which passengers were more likely to survive based on demographic, 
            socio-economic, and travel features.
          </p>
        </div>

        <div class="modal-detail-section">
          <h4><i class="fa-solid fa-gears text-cyan"></i> Methodology & Feature Engineering</h4>
          <ul>
            <li><strong>Data Cleaning & Imputation:</strong> Handled missing values in <code>Age</code> using median imputation grouped by <code>Pclass</code> and <code>Sex</code>; imputed missing <code>Embarked</code> values with the mode.</li>
            <li><strong>Feature Engineering:</strong> Created composite features like <code>FamilySize = SibSp + Parch + 1</code>, extracted honorary titles from passenger names (Mr, Mrs, Miss, Master) to capture social standing, and binned continuous <code>Fare</code> metrics.</li>
            <li><strong>Model Training & Evaluation:</strong> Evaluated multiple classifiers including Logistic Regression, Random Forest, and Decision Trees using Scikit-Learn.</li>
            <li><strong>Final Metric:</strong> Achieved <strong>81% prediction accuracy</strong> on test validation splits with robust precision and recall scores.</li>
          </ul>
        </div>

        <div class="modal-detail-section">
          <h4><i class="fa-solid fa-code text-cyan"></i> Tech Stack & Libraries</h4>
          <div class="project-tags">
            <span class="tech-pill">Python</span>
            <span class="tech-pill">Scikit-Learn</span>
            <span class="tech-pill">Pandas</span>
            <span class="tech-pill">NumPy</span>
            <span class="tech-pill">Matplotlib</span>
            <span class="tech-pill">Jupyter Notebook</span>
          </div>
        </div>
      `
    },
    netflix: {
      title: 'Netflix Global Content Analytics',
      tag: 'Data Analysis • Visualization',
      date: 'July 2026 – August 2026',
      badgeClass: 'data-badge',
      accuracy: '8,800+ Titles Analyzed',
      description: `
        <div class="modal-detail-section">
          <h4><i class="fa-solid fa-crosshairs text-cyan"></i> Analytical Objectives</h4>
          <p>
            An in-depth exploratory data analysis (EDA) conducted on thousands of Netflix movies and TV shows 
            to identify strategic patterns in content acquisition, release timelines, genre shifts, and 
            geographical distribution over the last two decades.
          </p>
        </div>

        <div class="modal-detail-section">
          <h4><i class="fa-solid fa-magnifying-glass-chart text-cyan"></i> Key Data Findings & Insights</h4>
          <ul>
            <li><strong>Content Composition:</strong> Movies account for approximately 69% of the catalog, while TV shows comprise 31% with rapid multi-season growth.</li>
            <li><strong>Production Peak:</strong> Identified exponential content addition peaking between 2018–2021, mirroring Netflix's aggressive international expansion strategy.</li>
            <li><strong>Geographical Concentration:</strong> United States, India, and the United Kingdom lead total title contributions, with International Movies & Dramas dominating genres.</li>
            <li><strong>Rating Breakdown:</strong> TV-MA and TV-14 represent over 60% of all listed content, highlighting target demographic preferences.</li>
          </ul>
        </div>

        <div class="modal-detail-section">
          <h4><i class="fa-solid fa-code text-cyan"></i> Tech Stack & Tools</h4>
          <div class="project-tags">
            <span class="tech-pill">Python</span>
            <span class="tech-pill">Pandas</span>
            <span class="tech-pill">NumPy</span>
            <span class="tech-pill">Matplotlib</span>
            <span class="tech-pill">Data Cleansing</span>
          </div>
        </div>
      `
    },
    carepulse: {
      title: 'CarePulse - 3D AI Health Companion',
      tag: 'Full Stack • WebGL 3D • AI',
      date: 'Featured Production Project',
      badgeClass: 'systems-badge',
      accuracy: '60 FPS 3D WebGL',
      description: `
        <div class="modal-detail-section">
          <h4><i class="fa-solid fa-crosshairs text-cyan"></i> System Overview</h4>
          <p>
            A modern, responsive Health & Wellness web application featuring an interactive 
            <strong>AI Health Advisor ("CareBot")</strong>, <strong>hardware-accelerated 3D graphics (Three.js)</strong>, 
            daily vitality trackers, and AHA-standard clinical health calculators.
          </p>
        </div>

        <div class="modal-detail-section">
          <h4><i class="fa-solid fa-microchip text-cyan"></i> Core Features & Architecture</h4>
          <ul>
            <li><strong>Interactive 3D Anatomical Heart:</strong> Hardware-accelerated WebGL rendering with specular shading, dual-point lighting, and real-time dual-pulse rhythmic pulsation controlled by a dynamic BPM slider.</li>
            <li><strong>CareBot AI Health Advisor:</strong> Evidence-backed symptom discussion with emergency red-flag detection (stroke, cardiac distress) prompting instant emergency hotline guidance.</li>
            <li><strong>Daily Vitality Tracker:</strong> Interactive hydration counter with animated liquid wave visuals, step logging, and restfulness sleep tracking.</li>
            <li><strong>Clinical Calculators:</strong> BMI evaluator, daily water/caloric intake estimator (BMR & TDEE), and Blood Pressure Evaluator based on American Heart Association standards.</li>
          </ul>
        </div>

        <div class="modal-detail-section">
          <h4><i class="fa-solid fa-code text-cyan"></i> Tech Stack</h4>
          <div class="project-tags">
            <span class="tech-pill">Python Flask</span>
            <span class="tech-pill">Three.js</span>
            <span class="tech-pill">WebGL</span>
            <span class="tech-pill">SQLite</span>
            <span class="tech-pill">Tailwind CSS</span>
            <span class="tech-pill">JavaScript (ES6+)</span>
          </div>
        </div>
      `
    },
    inventory: {
      title: 'Mall Inventory Management System',
      tag: 'Python Systems • CRUD Engine',
      date: 'January 2026 – February 2026',
      badgeClass: 'systems-badge',
      accuracy: 'Real-time Stock Tracking',
      description: `
        <div class="modal-detail-section">
          <h4><i class="fa-solid fa-crosshairs text-cyan"></i> Project Purpose</h4>
          <p>
            Developed a comprehensive inventory management system designed to handle cataloging, 
            stock level updates, inventory auditing, and sales transaction logging for retail operations.
          </p>
        </div>

        <div class="modal-detail-section">
          <h4><i class="fa-solid fa-cubes text-cyan"></i> Key Implementations</h4>
          <ul>
            <li><strong>CRUD Architecture:</strong> Implemented modular functions to add new products, update existing pricing and quantities, search by category or SKU, and safely delete records.</li>
            <li><strong>Stock Threshold Alerts:</strong> Programmed automated notifications when stock numbers drop below safe buffer limits to prevent inventory stockouts.</li>
            <li><strong>Input Validation & Error Handling:</strong> Enforced robust data sanitization preventing negative counts, invalid price formats, and duplicate SKUs.</li>
          </ul>
        </div>

        <div class="modal-detail-section">
          <h4><i class="fa-solid fa-code text-cyan"></i> Core Concepts</h4>
          <div class="project-tags">
            <span class="tech-pill">Python</span>
            <span class="tech-pill">OOP</span>
            <span class="tech-pill">File I/O</span>
            <span class="tech-pill">Data Structures</span>
            <span class="tech-pill">Algorithmic Logic</span>
          </div>
        </div>
      `
    },
    miniprojects: {
      title: 'Python Mini-Projects & Networking Suite',
      tag: 'Core Python • Socket API • Cryptography',
      date: 'August 2026',
      badgeClass: 'systems-badge',
      accuracy: 'Multi-Utility Toolkit',
      description: `
        <div class="modal-detail-section">
          <h4><i class="fa-solid fa-crosshairs text-cyan"></i> Modules Overview</h4>
          <p>
            A suite of hands-on utility programs built to deepen mastery of Python fundamentals, 
            standard library modules, cryptographic randomization, and asynchronous network programming.
          </p>
        </div>

        <div class="modal-detail-section">
          <h4><i class="fa-solid fa-terminal text-cyan"></i> Sub-Project Details</h4>
          <ul>
            <li><strong>Client-Server Socket Communication:</strong> Developed TCP client and server scripts using Python's <code>socket</code> library to transmit byte packets, handle handshakes, and manage multi-client connections.</li>
            <li><strong>Cryptographic Password Generator:</strong> Built a tool utilizing <code>secrets</code> and <code>string</code> modules to generate cryptographically robust passwords with customizable complexity criteria (entropy calculation, symbols, uppercase, digits).</li>
            <li><strong>Randomized MAC Address Generator:</strong> Implemented a network utility to construct valid hexadecimal MAC address strings with custom OUI vendor prefixes.</li>
          </ul>
        </div>

        <div class="modal-detail-section">
          <h4><i class="fa-solid fa-code text-cyan"></i> Tech Stack</h4>
          <div class="project-tags">
            <span class="tech-pill">Python 3</span>
            <span class="tech-pill">Socket Library</span>
            <span class="tech-pill">Secrets Module</span>
            <span class="tech-pill">TCP/IP</span>
            <span class="tech-pill">CLI Design</span>
          </div>
        </div>
      `
    }
  };

  const projectModal = document.getElementById('project-modal');
  const modalContentArea = document.getElementById('modal-content-area');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  document.querySelectorAll('.open-modal-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const key = btn.getAttribute('data-project');
      const data = projectData[key];
      if (!data || !modalContentArea || !projectModal) return;

      playSynthSound(620, 'sine', 0.08);

      modalContentArea.innerHTML = `
        <div class="modal-header-section">
          <span class="project-badge ${data.badgeClass}">${data.tag}</span>
          <span class="modal-date-tag">${data.date}</span>
          <h2 class="modal-title">${data.title}</h2>
        </div>
        <div class="modal-body-content">
          ${data.description}
        </div>
        <div class="modal-footer-actions">
          <a href="https://github.com/prajapati-kamal" target="_blank" rel="noopener noreferrer" class="btn btn-neon">
            <i class="fa-brands fa-github"></i>
            <span>View on GitHub</span>
          </a>
          <button class="btn btn-glass close-modal-action">
            <span>Close</span>
          </button>
        </div>
      `;

      projectModal.classList.add('active');
      projectModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      // Bind inner close button
      const innerClose = modalContentArea.querySelector('.close-modal-action');
      if (innerClose) {
        innerClose.addEventListener('click', closeModal);
      }
    });
  });

  function closeModal() {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    playSynthSound(380, 'sine', 0.05);
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeModal();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 7. INTERACTIVE RESUME MODAL & PRINT HANDLERS
  // --------------------------------------------------------------------------
  const resumeModal = document.getElementById('resume-modal');
  const openResumeBtn = document.getElementById('open-resume-modal-btn');
  const viewResumeHeroBtn = document.getElementById('view-resume-btn');
  const resumeCloseBtn = document.getElementById('resume-modal-close-btn');
  const printResumeBtn = document.getElementById('print-resume-btn');
  const modalPrintBtn = document.getElementById('modal-print-btn');

  function openResume() {
    if (!resumeModal) return;
    playSynthSound(550, 'sine', 0.08);
    resumeModal.classList.add('active');
    resumeModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeResume() {
    if (!resumeModal) return;
    resumeModal.classList.remove('active');
    resumeModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    playSynthSound(380, 'sine', 0.05);
  }

  if (openResumeBtn) openResumeBtn.addEventListener('click', openResume);
  if (viewResumeHeroBtn) viewResumeHeroBtn.addEventListener('click', openResume);
  if (resumeCloseBtn) resumeCloseBtn.addEventListener('click', closeResume);

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        closeResume();
      }
    });
  }

  function handlePrintResume() {
    playSynthSound(700, 'sine', 0.1);
    // Ensure resume modal is active so print styles render it
    if (resumeModal && !resumeModal.classList.contains('active')) {
      resumeModal.classList.add('active');
    }
    setTimeout(() => {
      window.print();
    }, 150);
  }

  if (printResumeBtn) printResumeBtn.addEventListener('click', handlePrintResume);
  if (modalPrintBtn) modalPrintBtn.addEventListener('click', handlePrintResume);

  // Close modals on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeResume();
    }
  });

  // --------------------------------------------------------------------------
  // 8. 1-CLICK COPY TO CLIPBOARD WITH TOAST
  // --------------------------------------------------------------------------
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer = null;

  function showToast(message) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        playSynthSound(800, 'triangle', 0.1);
        showToast(`Copied "${textToCopy}" to clipboard! 📋`);
      }).catch(() => {
        // Fallback
        const tempInput = document.createElement('input');
        tempInput.value = textToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast(`Copied "${textToCopy}"!`);
      });
    });
  });

  // --------------------------------------------------------------------------
  // 9. CONTACT FORM DISPATCH (DIRECT EMAIL TO GMAIL)
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill in all required fields.');
        return;
      }

      playSynthSound(660, 'sine', 0.15);

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-circle-notch fa-spin"></i>';
      submitBtn.disabled = true;

      // Send directly to FormSubmit API
      fetch('https://formsubmit.co/ajax/kamal.prajapati1@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          subject: subject,
          message: message,
          _subject: `[Portfolio] ${subject || 'New Message'} from ${name}`
        })
      })
      .then((res) => res.json())
      .then((data) => {
        submitBtn.innerHTML = originalBtnHTML;
        submitBtn.disabled = false;
        contactForm.reset();
        playSynthSound(880, 'sine', 0.2);
        showToast('Message sent directly to Kamal\'s inbox! ✉️');
      })
      .catch((err) => {
        submitBtn.innerHTML = originalBtnHTML;
        submitBtn.disabled = false;
        // Fallback to mailto link
        const mailtoUrl = `mailto:kamal.prajapati1@gmail.com?subject=${encodeURIComponent(
          `[Portfolio Contact] ${subject || 'New Message from ' + name}`
        )}&body=${encodeURIComponent(
          `Hi Kamal,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`
        )}`;
        window.location.href = mailtoUrl;
        showToast('Opening email client... ✉️');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 10. SCROLL SPY FOR NAVIGATION
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navAnchorLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentSection = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = section.getAttribute('id');
      }
    });

    navAnchorLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // --------------------------------------------------------------------------
  // 11. BUTTON HOVER AUDIO FEEDBACK
  // --------------------------------------------------------------------------
  document.querySelectorAll('.btn, .icon-btn, .social-chip, .filter-btn').forEach((elem) => {
    elem.addEventListener('mouseenter', () => {
      playSynthSound(320, 'sine', 0.03);
    });
  });
});
