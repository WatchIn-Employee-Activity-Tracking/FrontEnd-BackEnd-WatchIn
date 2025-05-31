import './styles/main.css';
import { initLanding } from './scripts/auth/landingController';
import { initAuth } from './scripts/auth/authController';

// Import your modules here
// Example:
// import { initApp } from './scripts/app';
// import { renderHome } from './views/home';

function renderByHash() {
    const hash = window.location.hash;
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