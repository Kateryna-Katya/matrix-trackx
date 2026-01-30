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

    // Интерактивный фон (Particles)
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 80;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = '#5d51ff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
    // Валидация телефона (только цифры)
const phoneInput = document.getElementById('phone-input');
phoneInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
});

// Капча
const captchaData = { a: Math.floor(Math.random() * 10), b: Math.floor(Math.random() * 10) };
document.getElementById('captcha-label').innerText = `Сколько будет ${captchaData.a} + ${captchaData.b}?`;

// Обработка формы
const form = document.getElementById('main-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userCaptcha = document.getElementById('captcha-input').value;
    
    // Проверка капчи
    if (parseInt(userCaptcha) !== (captchaData.a + captchaData.b)) {
        status.innerText = "Ошибка капчи. Попробуйте еще раз.";
        status.className = "form__status error";
        return;
    }

    // Имитация AJAX
    status.innerText = "Отправка...";
    status.className = "form__status";
    status.style.display = "block";

    setTimeout(() => {
        status.innerText = "Заявка успешно отправлена! Мы свяжемся с вами в течение 15 минут.";
        status.className = "form__status success";
        form.reset();
        
        // Скрыть сообщение через 5 сек
        setTimeout(() => { status.style.display = "none"; }, 5000);
    }, 1500);
});
});