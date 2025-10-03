const EMAILJS_CONFIG = {
    publicKey: 'vPXgcU7PhwtFQSww9',    
    serviceId: 'service_0jn2mov',    
    templateId: 'template_uhbff2b'   
};
 
document.addEventListener("DOMContentLoaded", function() {
    initializeApp();
});

function initializeApp() {
    hideLoadingScreen();
    initializeTheme();
    updateThemeIcon();
    initializeNavigation();
    initializeTypingEffect();
    initializeScrollAnimations();
    initializeBackToTop();
    initializeStats();
    initializeMobileMenu();
    initializeEmailJS();
    initializeContactForm();
}

// Tela de Carregamento
function hideLoadingScreen() {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1000);    
}

// Tema Claro/Escuro
function initializeTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
    updateFloatingElements(theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('theme-icon');
    
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        
        // ADICIONAR: Trocar imagens dos floating elements
        updateFloatingElements('dark');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        
        // ADICIONAR: Trocar imagens dos floating elements
        updateFloatingElements('light');
    }
}

function updateFloatingElements(theme) {
    const floatingElements = {
        '.java-icon img': {
            light: './assets/images/Icon - Java.png',
            dark: './assets/images/Icon - Java-dark.png'
        },
        '.database-icon img': {
            light: './assets/images/Icon - Banco de dados.png',
            dark: './assets/images/Icon - Banco de dados-dark.png'
        },
        '.springboot-icon img': {
            light: './assets/images/Icon - Spring Boot.png',
            dark: './assets/images/Icon - Spring Boot-dark.png'
        }
    };
    
    // Trocar cada imagem baseado no tema
    Object.keys(floatingElements).forEach(selector => {
        const img = document.querySelector(selector);
        if (img) {
            img.src = floatingElements[selector][theme];
        }
    });
}

// Navegação e Scroll Suave
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Smooth scroll para links de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Fechar menu mobile se estiver aberto
            const navMenu = document.getElementById('nav-menu');
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Highlight da seção ativa
    window.addEventListener('scroll', () => {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    });
}

// Menu Mobile
function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }
}

function toggleMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}


// Efeito de Digitação
function initializeTypingEffect() {
    const typedTextElement = document.querySelector('.typed-text');
    if (!typedTextElement) return;
    
    const phrases = [
        'Engenharia da Computação',
        'Ciência de Dados',
        'Desenvolvimento Back-end',
        'Java & Spring Boot',
        'SQL & NoSQL',
        'APIs REST',
        'Power BI'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000; // Pausa no final
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pausa antes de começar nova frase
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    typeEffect();
}

// Animações ao Scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animações específicas para diferentes elementos
                if (entry.target.classList.contains('stat-item')) {
                    animateStatNumber(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const animatedElements = document.querySelectorAll(`
        .about-content,
        .timeline-item,
        .project-card,
        .contact-card,
        .stat-item
    `);
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Estatísticas Animadas
function initializeStats() {
    // A animação será disparada pelo observer de scroll
}

function animateStatNumber(statElement) {
    const numberElement = statElement.querySelector('.stat-number');
    if (!numberElement || numberElement.dataset.animated) return;
    
    const target = parseInt(numberElement.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        numberElement.textContent = Math.floor(current) + (target === 100 ? '' : '');
    }, 16);
    
    numberElement.dataset.animated = 'true';
}

// Botão Voltar ao Topo
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Inicializar EmailJS
function initializeEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
        console.log('EmailJS inicializado com sucesso!');
    } else {
        console.error('EmailJS não foi carregado. Verifique se o script está no HTML.');
    }
}

// Inicializar formulário de contato
function initializeContactForm() {
    const contactForm = document.getElementById('contatoForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
        console.log('Event listener do formulário adicionado!');
    } else {
        console.error('Formulário de contato não encontrado!');
    }
}

// Função para enviar email via EmailJS
async function handleContactForm(e) {
    e.preventDefault();
    console.log('Formulário submetido!'); // Debug
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Mostrar estado de carregamento
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    try {
        // Verificar se EmailJS está disponível
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS não está disponível');
        }
        
        // Preparar dados do formulário
        const formData = new FormData(e.target);
        const templateParams = {
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            to_name: 'Vivian Gomes'
        };
        
        console.log('Dados do formulário:', templateParams); // Debug
        
        // Enviar email
        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            templateParams
        );
        
        console.log('Email enviado com sucesso:', response);
        
        // Sucesso
        showNotification('Mensagem enviada com sucesso! Entrarei em contato com você em breve. ;)', 'success');
        e.target.reset();
        
    } catch (error) {
        console.error('Erro ao enviar email:', error);
        
        // Erro
        showNotification('Erro ao enviar mensagem. Tente novamente ou entre em contato pelas redes sociais.', 'error');
    } finally {
        // Restaurar botão
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Função de notificação melhorada
function showNotification(message, type = 'info') {
    // Remover notificação existente se houver
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#6366f1'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-weight: 500;
        font-size: 14px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Efeitos Visuais
document.addEventListener('DOMContentLoaded', function() {
    // Paralaxe suave para elementos de fundo
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Efeito de hover nos cards de projeto
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Utilitário
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance
// Lazy loading para imagens
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Acessibilidade
document.addEventListener('DOMContentLoaded', function() {
    // Navegação por teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Fechar menu mobile se estiver aberto
            const navMenu = document.getElementById('nav-menu');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
    
    // Focus visible para elementos interativos
    const focusableElements = document.querySelectorAll('a, button, input, textarea, [tabindex]');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});

// Easter Egg: Konami Code
document.addEventListener('DOMContentLoaded', function() {
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        console.log('Tecla pressionada:', e.code); // Debug para ver as teclas
        
        if (e.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            console.log(`Progresso Konami: ${konamiIndex}/${konamiCode.length}`); // Debug
            
            if (konamiIndex === konamiCode.length) {
                // Easter egg ativado!
                showNotification('Parabéns, encontrou o easter egg! Você é um verdadeiro gamer! ✨', 'success');
                
                // Efeito visual especial
                document.body.style.animation = 'rainbow 2s ease-in-out';
                
                // Adicionar CSS da animação rainbow se não existir
                if (!document.querySelector('#rainbow-style')) {
                    const style = document.createElement('style');
                    style.id = 'rainbow-style';
                    style.textContent = `
                        @keyframes rainbow {
                            0% { filter: hue-rotate(0deg); }
                            25% { filter: hue-rotate(90deg); }
                            50% { filter: hue-rotate(180deg); }
                            75% { filter: hue-rotate(270deg); }
                            100% { filter: hue-rotate(360deg); }
                        }
                    `;
                    document.head.appendChild(style);
                }
                
                // Remover efeito após 2 segundos
                setTimeout(() => {
                    document.body.style.animation = '';
                }, 2000);
                
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
});

// Expor funções globais necessárias
window.toggleTheme = toggleTheme;
window.toggleMobileMenu = toggleMobileMenu;