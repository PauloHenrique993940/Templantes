const initMobileMenu = () => {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');

    if (!toggle || !nav) return;

    const closeMenu = () => {
        toggle.classList.remove('is-open');
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('is-open');
        toggle.classList.toggle('is-open', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => closeMenu());
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });
};

const initFaq = () => {
    const items = document.querySelectorAll('.faq-item');

    items.forEach((item) => {
        const button = item.querySelector('button');
        const content = item.querySelector('.faq-content');
        if (!button || !content) return;

        button.addEventListener('click', () => {
            const willOpen = button.getAttribute('aria-expanded') !== 'true';

            items.forEach((otherItem) => {
                const otherBtn = otherItem.querySelector('button');
                const otherContent = otherItem.querySelector('.faq-content');
                if (!otherBtn || !otherContent) return;
                otherBtn.setAttribute('aria-expanded', 'false');
                otherContent.style.maxHeight = '0px';
            });

            if (willOpen) {
                button.setAttribute('aria-expanded', 'true');
                content.style.maxHeight = `${content.scrollHeight}px`;
            }
        });
    });
};

const initReveal = () => {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.18, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((element, index) => {
        element.style.transitionDelay = `${Math.min(index * 30, 220)}ms`;
        observer.observe(element);
    });
};

const initFooterYear = () => {
    const year = document.getElementById('year');
    if (!year) return;
    year.textContent = String(new Date().getFullYear());
};

const initVolunteerFormShortcut = () => {
    const form = document.getElementById('form-voluntario');
    const nameInput = document.getElementById('voluntario-nome');
    if (!form || !nameInput) return;

    const focusNameField = () => {
        requestAnimationFrame(() => {
            nameInput.focus({ preventScroll: true });
        });
    };

    document.querySelectorAll('a[href="#form-voluntario"]').forEach((link) => {
        link.addEventListener('click', () => {
            focusNameField();
        });
    });

    if (window.location.hash === '#form-voluntario') {
        focusNameField();
    }
};

const init = () => {
    initMobileMenu();
    initFaq();
    initReveal();
    initFooterYear();
    initVolunteerFormShortcut();
};

document.addEventListener('DOMContentLoaded', init);
