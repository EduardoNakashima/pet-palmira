/* =========================================================
   PET SHOP PALMIRA — SCRIPTS
   Header com sombra ao rolar, menu mobile, entrada suave
   de seções e rolagem interna suave.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* Header ganha sombra após rolar a página */
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  /* Menu mobile (hambúrguer) */
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Entrada suave dos elementos ao aparecerem na tela */
  const revealTargets = document.querySelectorAll('.fade-in');
  if (revealTargets.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealTargets.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 0.1}s`;
      observer.observe(el);
    });
  } else {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }

  /* Rolagem suave para links internos (#âncoras), considerando o header fixo */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      const target = targetId.length > 1 ? document.querySelector(targetId) : null;
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - 84;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
