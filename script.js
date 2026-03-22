/* ═══════════════════════════════════════════════════════════
   GUD FISIOTERAPIA — script.js
   Funcionalidades: animaciones scroll · menú móvil ·
   selector de idioma · header scroll · formulario
   ═══════════════════════════════════════════════════════════ */

'use strict';

// ─── HEADER SCROLL ─────────────────────────────────────────
(function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Estado inicial
})();

// ─── MENÚ MÓVIL ────────────────────────────────────────────
(function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  const toggle = (open) => {
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    mobileMenu.classList.toggle('open', open);
    mobileMenu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  };

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.contains('open');
    toggle(!isOpen);
  });

  // Cerrar al hacer click en un enlace
  mobileMenu.querySelectorAll('.mobile-nav__link').forEach(link => {
    link.addEventListener('click', () => toggle(false));
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburger.classList.contains('open')) {
      toggle(false);
      hamburger.focus();
    }
  });
})();

// ─── ANIMACIONES DE ENTRADA — IntersectionObserver ─────────
(function initAnimations() {
  // No animar si el usuario prefiere movimiento reducido
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const elements = document.querySelectorAll('[data-animate]');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Dejar de observar una vez animado
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  elements.forEach(el => observer.observe(el));
})();

// ─── SMOOTH SCROLL para anclas internas ────────────────────
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const headerHeight = document.getElementById('header')?.offsetHeight || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

// ─── SELECTOR DE IDIOMA ─────────────────────────────────────
// Mapa de redirecciones por idioma
const LANG_URLS = {
  es: '/',
  en: '/en/',
  fr: '/fr/',
  de: '/de/'
};

function setLang(lang) {
  // Actualizar botones activos (todos los selectores en la página)
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const btnLang = btn.getAttribute('onclick')?.match(/setLang\('(\w+)'\)/)?.[1];
    btn.classList.toggle('active', btnLang === lang);
  });

  // Guardar preferencia
  try { localStorage.setItem('gud-lang', lang); } catch (_) {}

  // Redirigir (en producción)
  const url = LANG_URLS[lang];
  if (url && window.location.pathname !== url) {
    window.location.href = url;
  }
}

// Exponer globalmente para los onclick del HTML
window.setLang = setLang;

// Restaurar idioma guardado
(function restoreLang() {
  try {
    const saved = localStorage.getItem('gud-lang');
    if (saved && LANG_URLS[saved]) {
      document.querySelectorAll('.lang-btn').forEach(btn => {
        const btnLang = btn.getAttribute('onclick')?.match(/setLang\('(\w+)'\)/)?.[1];
        btn.classList.toggle('active', btnLang === saved);
      });
    }
  } catch (_) {}
})();

// ─── FORMULARIO DE CONTACTO ─────────────────────────────────
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    // Validación básica
    const nombre = form.querySelector('#nombre')?.value?.trim();
    const telefono = form.querySelector('#telefono')?.value?.trim();
    const privacidad = form.querySelector('#privacidad')?.checked;

    if (!nombre) {
      showFieldError('nombre', 'Por favor, introduce tu nombre.');
      return;
    }

    if (!telefono) {
      showFieldError('telefono', 'Por favor, introduce tu teléfono.');
      return;
    }

    if (!privacidad) {
      alert('Debes aceptar la política de privacidad para continuar.');
      return;
    }

    // Estado de carga
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    submitBtn.style.opacity = '0.7';

    try {
      // ── INTEGRACIÓN FORMULARIO ──────────────────────────
      // Opciones recomendadas para HTML estático (sin servidor):
      //
      // OPCIÓN A — Netlify Forms (gratis si hosting en Netlify):
      //   Añadir data-netlify="true" al <form> y name="contact" al form.
      //   Netlify lo intercepta automáticamente.
      //
      // OPCIÓN B — Formspree (https://formspree.io):
      //   const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(Object.fromEntries(new FormData(form)))
      //   });
      //
      // OPCIÓN C — EmailJS (sin backend):
      //   emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', form);
      //
      // Por ahora simulamos éxito:
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Éxito
      showFormSuccess(form, submitBtn);

    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      submitBtn.style.opacity = '1';
      alert('Ha habido un error al enviar el formulario. Por favor, llámanos al 642 490 167 o escríbenos por WhatsApp.');
      console.error('[GUD] Form error:', err);
    }
  });

  function showFieldError(fieldId, message) {
    const field = form.querySelector(`#${fieldId}`);
    if (!field) return;

    field.style.borderColor = '#FF4444';
    field.focus();

    // Quitar error al escribir
    field.addEventListener('input', () => {
      field.style.borderColor = '';
    }, { once: true });
  }

  function showFormSuccess(form, btn) {
    const successHTML = `
      <div style="text-align: center; padding: 2rem 1rem; color: white;">
        <div style="font-size: 3rem; margin-bottom: 1rem;">✓</div>
        <h3 style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 0.75rem; color: white;">
          ¡Mensaje recibido!
        </h3>
        <p style="color: rgba(255,255,255,0.7); margin-bottom: 1.5rem;">
          Pablo te contactará en menos de 24 horas.<br>
          También puedes llamar directamente al <a href="tel:+34642490167" style="color: #0F7DC2;">642 490 167</a>.
        </p>
        <a href="https://wa.me/34642490167?text=Hola%20Pablo%2C%20acabo%20de%20enviar%20un%20formulario"
           target="_blank" rel="noopener"
           style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.875rem 2rem;
                  background: #25D366; color: white; border-radius: 9999px; font-weight: 500;
                  text-decoration: none; transition: all 0.2s ease;">
          También por WhatsApp →
        </a>
      </div>
    `;
    form.innerHTML = successHTML;
  }
})();

// ─── ACTIVE NAV — resaltar sección actual ──────────────────
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  if (!sections.length || !navLinks.length) return;

  const headerHeight = document.getElementById('header')?.offsetHeight || 72;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === `#${id}`);
          });
        }
      });
    },
    {
      rootMargin: `-${headerHeight + 20}px 0px -50% 0px`,
      threshold: 0
    }
  );

  sections.forEach(section => observer.observe(section));
})();
