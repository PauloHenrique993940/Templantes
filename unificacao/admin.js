const getSession = () => {
    const raw = localStorage.getItem('cdr-admin-session');
    if (!raw) return null;

    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
};

const getVolunteers = () => {
    const raw = localStorage.getItem('cdr-voluntarios');
    if (!raw) return [];

    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

const formatDate = (value) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '-';
    return date.toLocaleString('pt-BR');
};

const renderAdmin = () => {
    const session = getSession();
    const status = document.getElementById('admin-status');
    const tbody = document.getElementById('voluntarios-body');
    const greeting = document.getElementById('admin-greeting');
    const logout = document.getElementById('logout-btn');

    if (!status || !tbody || !greeting || !logout) return;

    if (!session) {
        status.textContent =
            'Sem sessão ativa. Faça login na página de voluntários.';
        greeting.textContent = 'Área administrativa bloqueada';
        logout.hidden = true;
        return;
    }

    status.textContent = `Sessão ativa para ${session.nome} (${session.area}).`;
    greeting.textContent = `Bem-vindo, ${session.nome}`;

    const volunteers = getVolunteers();
    tbody.innerHTML = '';

    volunteers.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.nome}</td><td>${item.email}</td><td>${item.area}</td><td>${formatDate(item.criadoEm)}</td>`;
        tbody.appendChild(row);
    });

    logout.addEventListener('click', () => {
        localStorage.removeItem('cdr-admin-session');
        window.location.href = 'voluntario.html';
    });
};

document.addEventListener('DOMContentLoaded', renderAdmin);
