/* ============================================================
   script.js — ВЕСЬ JAVASCRIPT САЙТА
   Здесь всего три задачи:
   1. Бургер-меню на телефоне
   2. Эффект появления блоков при прокрутке
   3. Плавная подсветка активного пункта меню
   ============================================================ */


/* ------------------------------------------------------------
   ЗАДАЧА 1. БУРГЕР-МЕНЮ (только на телефоне)
   По клику на «полоски» меню выезжает, по второму клику прячется.
   ------------------------------------------------------------ */
const burger = document.getElementById('burger');   // кнопка с полосками
const mainNav = document.getElementById('mainNav'); // выпадающая панель меню

burger.addEventListener('click', () => {
  // toggle = переключить: если класс есть — убрать, если нет — добавить
  burger.classList.toggle('open');
  mainNav.classList.toggle('open');
});

// Клик по любому пункту меню — закрыть меню (удобно на телефоне)
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    mainNav.classList.remove('open');
  });
});


/* ------------------------------------------------------------
   ЗАДАЧА 2. ЭФФЕКТ ПОЯВЛЕНИЯ БЛОКОВ ПРИ ПРОКРУТКЕ
   Каждый элемент с классом .reveal в HTML изначально прозрачный
   (см. css/style.css, раздел 6). Когда блок доезжает до экрана,
   мы добавляем ему класс .visible — и он плавно проявляется.
   ------------------------------------------------------------ */
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
