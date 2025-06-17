  const menu = document.getElementById('menu');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  let lastScrollTop = 0;

  function onScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Ocultar/mostrar navbar al bajar/subir
    if (scrollTop > lastScrollTop) {
      menu.classList.add('hidden');
    } else {
      menu.classList.remove('hidden');
    }

    // Cambiar estilo al hacer scroll
    if (scrollTop > 50) {
      menu.classList.add('scrolled');
    } else {
      menu.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  window.addEventListener('scroll', onScroll);

  // Menú responsive toggle
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });