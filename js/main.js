  // ===== MOBILE: HIDE HEADER ON SCROLL =====
  (function () {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (!isMobile) return;

    const header = document.querySelector('.header');
    window.addEventListener('scroll', function () {
      if (window.scrollY > 5) {
        header.classList.add('header--hidden');
      } else {
        header.classList.remove('header--hidden');
      }
    }, { passive: true });
  })();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // Mobile nav toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileNav = document.getElementById('mobileNav');

  function closeMobileNav() {
    mobileToggle.classList.remove('active');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  }

  mobileToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.contains('open');
    if (isOpen) {
      closeMobileNav();
    } else {
      mobileToggle.classList.add('active');
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });

  // Close mobile nav when a link is clicked
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => closeMobileNav());
  });

  // ===== CONTACT FORM =====
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('formSubmitBtn');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate required fields
    let valid = true;
    const required = contactForm.querySelectorAll('[required]');
    required.forEach(field => {
      const group = field.closest('.form-group');
      if (!field.value.trim() || (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value))) {
        group.classList.add('has-error');
        field.classList.add('invalid');
        valid = false;
      } else {
        group.classList.remove('has-error');
        field.classList.remove('invalid');
      }
    });

    if (!valid) return;

    // Loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      const data = new FormData(contactForm);
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        contactForm.reset();
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
      } else {
        throw new Error('Form submission failed');
      }
    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
      alert('Something went wrong. Please try emailing us directly at info@strategospartners.co.uk');
    }
  });

  // Clear validation on input
  contactForm.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', () => {
      const group = field.closest('.form-group');
      group.classList.remove('has-error');
      field.classList.remove('invalid');
    });
  });

  // ===== COOKIE CONSENT =====
  const cookieBanner = document.getElementById('cookieBanner');
  const cookieAccept = document.getElementById('cookieAccept');
  const cookieDecline = document.getElementById('cookieDecline');

  if (!localStorage.getItem('cookie_consent')) {
    cookieBanner.classList.add('visible');
  }

  cookieAccept.addEventListener('click', () => {
    localStorage.setItem('cookie_consent', 'accepted');
    cookieBanner.classList.remove('visible');
  });

  cookieDecline.addEventListener('click', () => {
    localStorage.setItem('cookie_consent', 'declined');
    cookieBanner.classList.remove('visible');
  });
