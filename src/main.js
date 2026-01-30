document.addEventListener('DOMContentLoaded', () => {
    // Инициализация AOS анимаций
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Скролл для хедера
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '12px 0';
            header.style.background = 'rgba(15, 17, 21, 0.95)';
        } else {
            header.style.padding = '20px 0';
            header.style.background = 'transparent';
        }
    });

    // Бургер-меню (заготовка)
    const burger = id => document.getElementById(id);
    // Тут можно добавить логику открытия мобильного меню
});