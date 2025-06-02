import './styles/main.css';
import { initLanding } from './scripts/auth/landingController';
import { initAuth } from './scripts/auth/authController';
import { renderAdminDashboard } from './views/admin/dashboard';
import { renderEmployeeDashboard } from './views/employee/dashboard';

// Import your modules here
// Example:
// import { initApp } from './scripts/app';
// import { renderHome } from './views/home';

function renderByHash() {
    const hash = window.location.hash;
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    // Proteksi akses dashboard
    if (
        (hash === '#/admin-dashboard' || hash === '#/employee-dashboard') &&
        (!token || !user)
    ) {
        window.location.hash = '#/login';
        return;
    }

    if (token && user) {
        // Jika sudah login, panggil initAuth agar event listener terpasang
        initAuth();
        return;
    }

    if (hash === '#/login') {
        initAuth();
    } else {
        initLanding();
    }
}

// Initialize your application
window.addEventListener('DOMContentLoaded', () => {
    console.log('Application started');
    renderByHash();
});

window.addEventListener('hashchange', () => {
    renderByHash();
}); 