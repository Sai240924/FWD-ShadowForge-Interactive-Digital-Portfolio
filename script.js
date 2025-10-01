document.addEventListener('DOMContentLoaded', () => {
  const NAV_HEIGHT = 64;
  document.querySelectorAll('.nav-links a, .brand a, .hero .btn').forEach(el => {
    el.addEventListener('click', (e) => {
      const href = el.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT + 8;
      window.scrollTo({top, behavior:'smooth'});
    });
  });

  // Mobile toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navLinksAnchors = navLinks.querySelectorAll('a');

  mobileToggle.addEventListener('click', () => {
    const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('active');
    mobileToggle.classList.toggle('active');
    document.body.style.overflow = expanded ? '' : 'hidden';
    if (!expanded) {
      navLinks.scrollTop = 0;
    }
  });

  // Close mobile menu when clicking links
  navLinksAnchors.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 980) {
        navLinks.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  });

  // Optional: Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
      mobileToggle.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });

  // Reset nav state on resize
  const resetNavState = () => {
    const isMobile = window.innerWidth <= 980;
    if (isMobile) {
      navLinks.classList.remove('active');
      mobileToggle.style.display = 'block';
    } else {
      navLinks.classList.add('active');
      mobileToggle.style.display = 'none';
    }
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  window.addEventListener('resize', resetNavState);

  // Intersection Observer for reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, {threshold: 0.12});

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // tiny accessibility: focus states
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('focus', () => el.style.outline = '2px solid rgba(31,111,235,0.18)');
    el.addEventListener('blur', () => el.style.outline = 'none');
  });

});