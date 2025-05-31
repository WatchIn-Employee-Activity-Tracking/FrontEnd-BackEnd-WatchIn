import { renderLanding } from '../../views/auth/landing';
// import { initAuth } from './authController';

export function initLanding() {
    const app = document.getElementById('app');
    
    // Render landing page
    app.innerHTML = renderLanding();
    
    // Setup event listeners
    setupLandingListeners();
}

function setupLandingListeners() {
    // Login button click handler
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        loginButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.hash = '#/login';
        });
    }

    // Contact form submission handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

function handleContactSubmit(e) {
    e.preventDefault();
    // Add your contact form submission logic here
    console.log('Contact form submitted');
} 