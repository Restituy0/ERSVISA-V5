const secciones = document.querySelectorAll('.section');
const contenedorDots = document.getElementById('dot-container');

// Crear dots automáticamente
secciones.forEach((sec, index) => {
    sec.dataset.index = index;

    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.dataset.index = index;
    dot.addEventListener('click', () => {
        sec.scrollIntoView({ behavior: 'smooth' });
    });

    contenedorDots.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

// Actualiza el dot activo al hacer scroll
function updateDots(index) {
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
}

// Observador de intersección
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const idx = entry.target.dataset.index;
            updateDots(idx);
        }
    });
}, {
    threshold: 0.6,
});

secciones.forEach(sec => observer.observe(sec));

// Scroll automático con la rueda del mouse
let scrollTimeout;
let currentIndex = 0;

function scrollToSection(index) {
    if (index >= 0 && index < secciones.length) {
        secciones[index].scrollIntoView({ behavior: 'smooth' });
        currentIndex = index;
    }
}

window.addEventListener('wheel', (e) => {
    e.preventDefault();

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const delta = e.deltaY;
        if (delta > 50) scrollToSection(currentIndex + 1);
        else if (delta < -50) scrollToSection(currentIndex - 1);
    }, 100);
}, { passive: false });

// Para detectar también teclado ↓ ↑ (opcional)
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') scrollToSection(currentIndex + 1);
    if (e.key === 'ArrowUp') scrollToSection(currentIndex - 1);
});

// --- Swipe para pantallas táctiles ---
let touchStartY = 0;
let touchEndY = 0;

window.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].clientY;
});

window.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].clientY;
    handleSwipe();
});

function handleSwipe() {
    const deltaY = touchStartY - touchEndY;

    if (Math.abs(deltaY) > 50) {
        if (deltaY > 0) {
            // swipe hacia arriba
            scrollToSection(currentIndex + 1);
        } else {
            // swipe hacia abajo
            scrollToSection(currentIndex - 1);
        }
    }
}
