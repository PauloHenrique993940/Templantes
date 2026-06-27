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

const saveVolunteers = (volunteers) => {
    localStorage.setItem('cdr-voluntarios', JSON.stringify(volunteers));
};

const initRegister = () => {
    const form = document.getElementById('form-cadastro');
    const status = document.getElementById('cadastro-status');
    if (!form || !status) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const data = new FormData(form);
        const nome = String(data.get('nome') || '').trim();
        const email = String(data.get('email') || '')
            .trim()
            .toLowerCase();
        const senha = String(data.get('senha') || '');
        const area = String(data.get('area') || '');

        if (!nome || !email || !senha || !area) {
            status.textContent = 'Preencha todos os campos do cadastro.';
            return;
        }

        const volunteers = getVolunteers();
        const exists = volunteers.some((item) => item.email === email);

        if (exists) {
            status.textContent = 'Este e-mail já está cadastrado. Faça login.';
            return;
        }

        volunteers.push({
            nome,
            email,
            senha,
            area,
            criadoEm: new Date().toISOString(),
        });

        saveVolunteers(volunteers);
        status.textContent =
            'Cadastro realizado com sucesso. Você já pode fazer login.';
        form.reset();
    });
};

const initLogin = () => {
    const form = document.getElementById('form-login');
    const status = document.getElementById('login-status');
    if (!form || !status) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const data = new FormData(form);
        const email = String(data.get('email') || '')
            .trim()
            .toLowerCase();
        const senha = String(data.get('senha') || '');

        const volunteers = getVolunteers();
        const volunteer = volunteers.find(
            (item) => item.email === email && item.senha === senha
        );

        if (!volunteer) {
            status.textContent =
                'Login inválido. Verifique e-mail e senha ou cadastre-se.';
            return;
        }

        localStorage.setItem(
            'cdr-admin-session',
            JSON.stringify({
                nome: volunteer.nome,
                email: volunteer.email,
                area: volunteer.area,
                loginAt: new Date().toISOString(),
            })
        );

        status.textContent =
            'Login realizado. Redirecionando para a área administrativa...';
        setTimeout(() => {
            window.location.href = 'admin.html';
        }, 700);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    initRegister();
    initLogin();
});
