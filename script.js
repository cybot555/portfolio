const body = document.body;
body.classList.add('js-enabled');

const toggleButton = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

const setTheme = (theme) => {
  body.dataset.theme = theme;
  if (toggleButton) {
    const isDark = theme === 'dark';
    toggleButton.textContent = isDark ? '☀' : '☾';
    toggleButton.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }
};

const stored = localStorage.getItem('theme');
const initial = stored || (prefersDark.matches ? 'dark' : 'light');
setTheme(initial);

if (toggleButton) {
  toggleButton.addEventListener('click', () => {
    const next = body.dataset.theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
  });
}

prefersDark.addEventListener('change', (event) => {
  if (!localStorage.getItem('theme')) {
    setTheme(event.matches ? 'dark' : 'light');
  }
});

const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('visible'));
}
