function nextMenuState(isOpen, action) {
  if (action === 'toggle') {
    return !isOpen;
  }
  return false;
}

if (typeof module !== 'undefined') {
  module.exports = { nextMenuState };
}

if (typeof document !== 'undefined') {
  const burger = document.getElementById('burger');
  const mainNav = document.getElementById('mainNav');

  function updateMenu(action) {
    const isOpen = nextMenuState(burger.getAttribute('aria-expanded') === 'true', action);
    burger.classList.toggle('open', isOpen);
    mainNav.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    burger.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  }

  burger.addEventListener('click', () => updateMenu('toggle'));
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => updateMenu('close'));
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
      updateMenu('close');
      burger.focus();
    }
  });

  const revealElements = document.querySelectorAll('.reveal');

  // IntersectionObserver — «наблюдатель», который следит,
  // появился ли элемент на экране (на 15% и больше)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Если элемент попал в видимую область экрана
      if (entry.isIntersecting) {
        entry.target.classList.add('visible'); // показать
        observer.unobserve(entry.target);      // больше не наблюдать (анимация разовая)
      }
    });
  }, { threshold: 0.15 }); // срабатывать, когда видно 15% блока

  // Подключаем наблюдателя ко всем элементам .reveal
  revealElements.forEach(el => observer.observe(el));
}
