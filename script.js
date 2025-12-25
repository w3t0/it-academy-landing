function scrollToForm() {
    const enrollmentSection = document.getElementById('enrollment');
    if (enrollmentSection) {
        enrollmentSection.scrollIntoView({ behavior: 'smooth' });
        
        if (typeof ym !== 'undefined') {
            ym(106027104, 'reachGoal', 'scroll_to_form');
        }
    } else {
        window.location.href = 'index.html#enrollment';
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        course: document.getElementById('course').value
    };
    
    console.log('Данные формы:', formData);
    
    if (typeof ym !== 'undefined') {
        ym(106027104, 'reachGoal', 'submit_enrollment_form', {
            course: formData.course
        });
    }
    
    alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
    
    event.target.reset();
}

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
    
    if (typeof ym !== 'undefined') {
        ym(106027104, 'reachGoal', 'submit_contact_form', {
            subject: formData.subject
        });
    }
    
    alert('Ваше сообщение отправлено! Мы ответим вам в ближайшее время.');
    
    event.target.reset();
}

function enrollCourse(courseName) {
    if (typeof ym !== 'undefined') {
        ym(106027104, 'reachGoal', 'click_enroll_button', {
            course: courseName
        });
    }
    
    const confirmed = confirm(`Записаться на курс "${courseName}"?\nВы будете перенаправлены на форму записи.`);
    
    if (confirmed) {
        window.location.href = 'index.html#enrollment';
    }
}

function filterCourses(category) {
    const courses = document.querySelectorAll('.course-detailed');
    const buttons = document.querySelectorAll('.filter-btn');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
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
    
    if (typeof ym !== 'undefined') {
        ym(106027104, 'reachGoal', 'filter_courses', {
            category: category
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const courseLinks = document.querySelectorAll('.btn-course');
    courseLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const courseName = this.closest('.course-card').querySelector('h3').textContent;
            
            if (typeof ym !== 'undefined') {
                ym(106027104, 'reachGoal', 'view_course_details', {
                    course: courseName
                });
            }
        });
    });
    
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const network = this.textContent;
            
            if (typeof ym !== 'undefined') {
                ym(106027104, 'reachGoal', 'click_social', {
                    network: network
                });
            }
        });
    });
    
    let timeOnPage = 0;
    const trackingInterval = setInterval(() => {
        timeOnPage += 10;
        
        if (timeOnPage === 30 && typeof ym !== 'undefined') {
            ym(106027104, 'reachGoal', 'time_on_page_30s');
        }
        if (timeOnPage === 60 && typeof ym !== 'undefined') {
            ym(106027104, 'reachGoal', 'time_on_page_60s');
            clearInterval(trackingInterval);
        }
    }, 10000);
    
    let scrollDepth = 0;
    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        const currentScrollDepth = Math.round((scrollTop + windowHeight) / documentHeight * 100);
        
        if (currentScrollDepth >= 25 && scrollDepth < 25 && typeof ym !== 'undefined') {
            ym(106027104, 'reachGoal', 'scroll_depth_25');
            scrollDepth = 25;
        }
        if (currentScrollDepth >= 50 && scrollDepth < 50 && typeof ym !== 'undefined') {
            ym(106027104, 'reachGoal', 'scroll_depth_50');
            scrollDepth = 50;
        }
        if (currentScrollDepth >= 75 && scrollDepth < 75 && typeof ym !== 'undefined') {
            ym(106027104, 'reachGoal', 'scroll_depth_75');
            scrollDepth = 75;
        }
        if (currentScrollDepth >= 90 && scrollDepth < 90 && typeof ym !== 'undefined') {
            ym(106027104, 'reachGoal', 'scroll_depth_100');
            scrollDepth = 100;
        }
    });
});

document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
        const href = e.target.getAttribute('href');
        
        if (href && href.startsWith('tel:') && typeof ym !== 'undefined') {
            ym(106027104, 'reachGoal', 'click_phone');
        }
        
        if (href && href.startsWith('mailto:') && typeof ym !== 'undefined') {
            ym(106027104, 'reachGoal', 'click_email');
        }
    }
});

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isValidPhone(phone) {
    const re = /^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{4,6}$/;
    return re.test(phone.replace(/\s/g, ''));
}

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
