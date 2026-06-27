const initMenu = () => {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    if (!toggle || !nav) return;

    const closeMenu = () => {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
    };

    toggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });
};

const initLibrarySearch = () => {
    const input = document.getElementById('book-search');
    if (!input) return;

    const books = document.querySelectorAll('.book-card');

    input.addEventListener('input', () => {
        const query = input.value.trim().toLowerCase();

        books.forEach((book) => {
            const text =
                `${book.dataset.title || ''} ${book.dataset.author || ''}`.toLowerCase();
            const matches = !query || text.includes(query);
            book.hidden = !matches;
        });
    });
};

const init = () => {
    initMenu();
    initLibrarySearch();
};

document.addEventListener('DOMContentLoaded', init);
