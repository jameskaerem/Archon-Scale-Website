document.addEventListener('DOMContentLoaded', () => {
  // --- Reveal on scroll ---
  const reveals = document.querySelectorAll('.hero-title, .hero-sub, .hero-buttons, .about > .container > *, .how > .container > *, .feature, .stage-card, .section-header > *, .faq-list details, .cta-card');
  reveals.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observer.observe(el));

  // --- Custom cursor glow ---
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);
  let mx = 0, my = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });
  function animate() {
    cx += (mx - cx) * 0.08;
    cy += (my - cy) * 0.08;
    glow.style.transform = `translate(${cx - 250}px, ${cy - 250}px)`;
    requestAnimationFrame(animate);
  }
  animate();

  // --- Navbar shadow on scroll ---
  const nav = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      nav.style.boxShadow = '0 6px 30px rgba(0,0,0,0.6)';
      nav.style.background = 'rgba(0,0,0,0.85)';
    } else {
      nav.style.boxShadow = 'none';
      nav.style.background = 'rgba(0,0,0,0.55)';
    }
  });

  // --- FAQ accordion (close others) ---
  document.querySelectorAll('.faq-list details').forEach(d => {
    d.addEventListener('toggle', () => {
      if (d.open) {
        document.querySelectorAll('.faq-list details').forEach(o => { if (o !== d) o.open = false; });
      }
    });
  });

  // --- Hero parallax ---
  const heroGlow = document.querySelector('.hero-glow');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (heroGlow) heroGlow.style.transform = `translateY(${y * 0.4}px)`;
  });

  // --- Particles ---
  const particles = document.querySelector('.particles');
  if (particles) {
    for (let i = 0; i < 30; i++) {
      const s = document.createElement('span');
      s.style.left = Math.random() * 100 + '%';
      s.style.animationDelay = Math.random() * 8 + 's';
      s.style.animationDuration = (6 + Math.random() * 6) + 's';
      particles.appendChild(s);
    }
  }

  // --- Smooth anchor scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const t = document.querySelector(id);
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      }
    });
  });

  // --- Tilt effect on feature cards ---
  document.querySelectorAll('.feature, .stage-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  // --- Custom dropdown ---
  document.querySelectorAll('.custom-select').forEach(sel => {
    const trigger = sel.querySelector('.custom-select-trigger');
    const valueEl = sel.querySelector('.custom-select-value');
    const hidden = sel.querySelector('input[type=hidden]');
    const options = sel.querySelectorAll('.custom-select-options li');

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('.custom-select.open').forEach(o => { if (o !== sel) o.classList.remove('open'); });
      sel.classList.toggle('open');
    });

    options.forEach(opt => {
      opt.addEventListener('click', () => {
        options.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        valueEl.textContent = opt.textContent;
        valueEl.classList.remove('placeholder');
        if (hidden) hidden.value = opt.dataset.value;
        sel.classList.remove('open');
      });
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.custom-select.open').forEach(o => o.classList.remove('open'));
  });
});
