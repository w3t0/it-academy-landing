// Плавный скролл к форме записи
function scrollToForm() {
    const enrollmentSection = document.getElementById('enrollment');
    if (enrollmentSection) {
        enrollmentSection.scrollIntoView({ behavior: 'smooth' });
        
        // Отправляем событие в Яндекс.Метрику
        if (typeof ym !== 'undefined') {
            ym(YOUR_COUNTER_ID, 'reachGoal', 'scroll_to_form');
        }
    } else {
        // Если мы не на главной странице, переходим на главную к форме
        window.location.href = 'index.html#enrollment';
    }
}

// Обработка формы записи на главной
function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        course: document.getElementById('course').value
    };
    
    console.log('Данные формы:', formData);
    
    // Отправляем цель в Яндекс.Метрику
    if (typeof ym !== 'undefined') {
        ym(YOUR_COUNTER_ID, 'reachGoal', 'submit_enrollment_form', {
            course: formData.course
        });
    }
    
    // Показываем сообщение об успехе
    alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
    
    // Очищаем форму
    event.target.reset();
    
    // В реальном проекте здесь был бы AJAX запрос на сервер
    // fetch('/api/enrollment', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData)
    // });
}

// Обработка формы на странице контактов
function handleContactForm(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('contact-name').value,
        email: document.getElementById('contact-email').value,
        phone: document.getElementById('contact-phone').value,
        subject: document.getElementById('contact-subject').value,
        message: document.getElementById('contact-message').value
    };
    
    console.log('Данные формы контактов:', formData);
    
    // Отправляем цель в Яндекс.Метрику
    if (typeof ym !== 'undefined') {
        ym(YOUR_COUNTER_ID, 'reachGoal', 'submit_contact_form', {
            subject: formData.subject
        });
    }
    
    // Показываем сообщение об успехе
    alert('Ваше сообщение отправлено! Мы ответим вам в ближайшее время.');
    
    // Очищаем форму
    event.target.reset();
}

// Запись на конкретный курс
function enrollCourse(courseName) {
    // Отправляем событие в Яндекс.Метрику
    if (typeof ym !== 'undefined') {
        ym(YOUR_COUNTER_ID, 'reachGoal', 'click_enroll_button', {
            course: courseName
        });
    }
    
    // Переходим на главную к форме или показываем модальное окно
    const confirmed = confirm(`Записаться на курс "${courseName}"?\nВы будете перенаправлены на форму записи.`);
    
    if (confirmed) {
        window.location.href = 'index.html#enrollment';
    }
}

// Фильтрация курсов
function filterCourses(category) {
    const courses = document.querySelectorAll('.course-detailed');
    const buttons = document.querySelectorAll('.filter-btn');
    
    // Обновляем активную кнопку
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Фильтруем курсы
    courses.forEach(course => {
        if (category === 'all') {
            course.style.display = 'block';
        } else {
            if (course.classList.contains(category)) {
                course.style.display = 'block';
            } else {
                course.style.display = 'none';
            }
        }
    });
    
    // Отправляем событие в Яндекс.Метрику
    if (typeof ym !== 'undefined') {
        ym(YOUR_COUNTER_ID, 'reachGoal', 'filter_courses', {
            category: category
        });
    }
}

// Отслеживание внешних ссылок
document.addEventListener('DOMContentLoaded', function() {
    // Отслеживание кликов по ссылкам на курсы
    const courseLinks = document.querySelectorAll('.btn-course');
    courseLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const courseName = this.closest('.course-card').querySelector('h3').textContent;
            
            if (typeof ym !== 'undefined') {
                ym(YOUR_COUNTER_ID, 'reachGoal', 'view_course_details', {
                    course: courseName
                });
            }
        });
    });
    
    // Отслеживание кликов по социальным сетям
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const network = this.textContent;
            
            if (typeof ym !== 'undefined') {
                ym(YOUR_COUNTER_ID, 'reachGoal', 'click_social', {
                    network: network
                });
            }
        });
    });
    
    // Отслеживание времени на странице (для bounce rate)
    let timeOnPage = 0;
    const trackingInterval = setInterval(() => {
        timeOnPage += 10;
        
        // Отправляем события на 30 секунд и 60 секунд
        if (timeOnPage === 30 && typeof ym !== 'undefined') {
            ym(YOUR_COUNTER_ID, 'reachGoal', 'time_on_page_30s');
        }
        if (timeOnPage === 60 && typeof ym !== 'undefined') {
            ym(YOUR_COUNTER_ID, 'reachGoal', 'time_on_page_60s');
            clearInterval(trackingInterval);
        }
    }, 10000); // каждые 10 секунд
    
    // Отслеживание скролла
    let scrollDepth = 0;
    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        const currentScrollDepth = Math.round((scrollTop + windowHeight) / documentHeight * 100);
        
        // Отправляем события при достижении 25%, 50%, 75%, 100%
        if (currentScrollDepth >= 25 && scrollDepth < 25 && typeof ym !== 'undefined') {
            ym(YOUR_COUNTER_ID, 'reachGoal', 'scroll_depth_25');
            scrollDepth = 25;
        }
        if (currentScrollDepth >= 50 && scrollDepth < 50 && typeof ym !== 'undefined') {
            ym(YOUR_COUNTER_ID, 'reachGoal', 'scroll_depth_50');
            scrollDepth = 50;
        }
        if (currentScrollDepth >= 75 && scrollDepth < 75 && typeof ym !== 'undefined') {
            ym(YOUR_COUNTER_ID, 'reachGoal', 'scroll_depth_75');
            scrollDepth = 75;
        }
        if (currentScrollDepth >= 90 && scrollDepth < 90 && typeof ym !== 'undefined') {
            ym(YOUR_COUNTER_ID, 'reachGoal', 'scroll_depth_100');
            scrollDepth = 100;
        }
    });
});

// Отслеживание кликов по телефону и email
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
        const href = e.target.getAttribute('href');
        
        if (href && href.startsWith('tel:') && typeof ym !== 'undefined') {
            ym(YOUR_COUNTER_ID, 'reachGoal', 'click_phone');
        }
        
        if (href && href.startsWith('mailto:') && typeof ym !== 'undefined') {
            ym(YOUR_COUNTER_ID, 'reachGoal', 'click_email');
        }
    }
});

// Дополнительные утилиты

// Валидация email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Валидация телефона (польский формат)
function isValidPhone(phone) {
    const re = /^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{4,6}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Плавная анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Применяем анимацию к карточкам
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.benefit-card, .course-card, .faq-item');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});

console.log('IT Academy - Лендинг загружен успешно! 🚀');
