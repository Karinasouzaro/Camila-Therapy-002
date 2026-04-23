/* ============================================================
   CAMILA THERAPY 02 — LÓGICA E INTERATIVIDADE
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavbar();
    initMobileMenu();
    initTabs();
    initAOS();
    initParticles();
    initSmoothScroll();
});

/* -------------------------------------------------------
   1. GERENCIAMENTO DE TEMA (CLARO/ESCURO)
------------------------------------------------------- */
function initTheme() {
    const themeBtn = document.getElementById('btn-theme');
    const html = document.documentElement;
    
    // Carregar tema salvo ou preferência do sistema
    const savedTheme = localStorage.getItem('ct-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    html.setAttribute('data-theme', initialTheme);
    
    themeBtn.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', nextTheme);
        localStorage.setItem('ct-theme', nextTheme);
        
        // Pequena animação no clique
        themeBtn.style.transform = 'scale(1.2) rotate(45deg)';
        setTimeout(() => themeBtn.style.transform = '', 300);
    });
}

/* -------------------------------------------------------
   2. NAVBAR SCROLL
------------------------------------------------------- */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const bottomLinks = document.querySelectorAll('.bottom-nav-item');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active link on scroll
        let current = '';
        const sections = document.querySelectorAll('section, footer');
        const scrollPos = window.scrollY + 150; // Ajuste para mobile
        
        sections.forEach(section => {
            if (scrollPos >= section.offsetTop) {
                current = section.getAttribute('id');
            }
        });
        
        // Desktop Links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Mobile Bottom Links
        bottomLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* -------------------------------------------------------
   3. MENU MOBILE
------------------------------------------------------- */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    function toggleMenu() {
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    }
    
    hamburger.addEventListener('click', toggleMenu);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
}

/* -------------------------------------------------------
   4. TABS (CONSULTAS / SOBRE)
------------------------------------------------------- */
function initTabs() {
    const consultasBtn = document.getElementById('tab-consultas-btn');
    const sobreBtn = document.getElementById('tab-sobre-btn');
    const consultasPanel = document.getElementById('tab-consultas-panel');
    const sobrePanel = document.getElementById('tab-sobre-panel');
    
    if (!consultasBtn || !sobreBtn) return;
    
    consultasBtn.addEventListener('click', () => {
        consultasBtn.classList.add('active');
        sobreBtn.classList.remove('active');
        consultasPanel.classList.add('active');
        sobrePanel.classList.remove('active');
    });
    
    sobreBtn.addEventListener('click', () => {
        sobreBtn.classList.add('active');
        consultasBtn.classList.remove('active');
        sobrePanel.classList.add('active');
        consultasPanel.classList.remove('active');
    });
}

/* -------------------------------------------------------
   5. ANIMATE ON SCROLL (AOS)
------------------------------------------------------- */
function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => observer.observe(el));
}

/* -------------------------------------------------------
   6. PARTÍCULAS DE FUNDO
------------------------------------------------------- */
function initParticles() {
    const wrap = document.getElementById('particles-wrap');
    if (!wrap) return;
    
    const count = 20;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        
        const size = Math.random() * 5 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 10;
        
        p.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: var(--accent);
            opacity: 0.2;
            border-radius: 50%;
            top: ${y}%;
            left: ${x}%;
            filter: blur(1px);
            animation: float ${duration}s linear infinite;
            animation-delay: -${delay}s;
        `;
        wrap.appendChild(p);
    }
    
    // Inserir keyframes via JS para manter o CSS limpo
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes float {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            50% { opacity: 0.3; }
            100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

/* -------------------------------------------------------
   7. SMOOTH SCROLL PARA LINKS INTERNOS
------------------------------------------------------- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
}
