/**
 * MATRIX TRACKX - Custom Script
 * Version: 1.0.0
 * Year: 2026
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ИНИЦИАЛИЗАЦИЯ АНИМАЦИЙ (AOS) ---
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            disable: 'mobile' // Опционально: можно отключить на слабых устройствах
        });
    }

    // --- 2. МОБИЛЬНОЕ МЕНЮ (BURGER) ---
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu__link');

    if (burger && mobileMenu) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Закрытие меню при клике на ссылку
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // --- 3. СКРОЛЛ ЭФФЕКТЫ ДЛЯ ХЕДЕРА ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '12px 0';
            header.style.background = 'rgba(15, 17, 21, 0.95)';
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
        } else {
            header.style.padding = '20px 0';
            header.style.background = 'transparent';
            header.style.boxShadow = 'none';
        }
    });

    // --- 4. ИНТЕРАКТИВНЫЙ ФОН HERO (CANVAS PARTICLES) ---
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 80;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.init();
            }
            init() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 0.8 - 0.4;
                this.speedY = Math.random() * 0.8 - 0.4;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
                if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
            }
            draw() {
                ctx.fillStyle = '#5d51ff';
                ctx.globalAlpha = 0.5;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateParticles);
        };

        initParticles();
        animateParticles();
    }

    // --- 5. ВАЛИДАЦИЯ ФОРМЫ И КАПЧА ---
    const contactForm = document.getElementById('main-form');
    const phoneInput = document.getElementById('phone-input');
    const captchaLabel = document.getElementById('captcha-label');
    const statusBox = document.getElementById('form-status');

    if (contactForm) {
        // Генерация капчи
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const correctAnswer = num1 + num2;
        
        if (captchaLabel) {
            captchaLabel.innerText = `Сколько будет ${num1} + ${num2}?`;
        }

        // Ограничение: только цифры в поле телефона
        phoneInput?.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });

        // Отправка формы (AJAX имитация)
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const captchaInput = document.getElementById('captcha-input');

            if (parseInt(captchaInput.value) !== correctAnswer) {
                showStatus("Ошибка капчи. Попробуйте снова.", "error");
                return;
            }

            showStatus("Отправка данных...", "");

            // Имитируем задержку сети
            setTimeout(() => {
                showStatus("Заявка успешно отправлена! Наш эксперт свяжется с вами.", "success");
                contactForm.reset();
                
                setTimeout(() => {
                    statusBox.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }

    function showStatus(text, type) {
        if (!statusBox) return;
        statusBox.innerText = text;
        statusBox.style.display = 'block';
        statusBox.className = `form__status ${type}`;
    }

    // --- 6. COOKIE POPUP ---
    const cookiePopup = document.getElementById('cookie-popup');
    const cookieAccept = document.getElementById('cookie-accept');

    if (cookiePopup && !localStorage.getItem('matrix_cookies_accepted')) {
        setTimeout(() => {
            cookiePopup.classList.add('active');
        }, 3000);
    }

    cookieAccept?.addEventListener('click', () => {
        localStorage.setItem('matrix_cookies_accepted', 'true');
        cookiePopup.classList.remove('active');
    });

    // --- 7. ПЛАВНЫЙ СКРОЛЛ К ЯКОРЯМ ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});