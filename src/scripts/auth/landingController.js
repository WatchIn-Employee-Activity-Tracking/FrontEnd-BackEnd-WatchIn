import { renderLanding } from '../../views/auth/landing';
// import { initAuth } from './authController';

export function initLanding() {
    const app = document.getElementById('app');
    
    // Render landing page
    app.innerHTML = renderLanding();
    
    // Setup event listeners
    setupLandingListeners();

    // Hero parallax animation on load (hanya untuk hero section)
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        const heroText = heroSection.querySelector('[data-hero-text]');
        const heroImg = heroSection.querySelector('[data-hero-img]');
        if (heroText && heroImg) {
            setTimeout(() => {
                heroText.classList.remove('opacity-0', '-translate-x-10');
                heroText.classList.add('opacity-100', 'translate-x-0');
            }, 200);
            setTimeout(() => {
                heroImg.classList.remove('opacity-0', 'translate-x-10');
                heroImg.classList.add('opacity-100', 'translate-x-0');
            }, 600);
        }
    }

    // Parallax/reveal untuk section keunggulan saat discroll ke viewport
    const keunggulanSection = document.getElementById('keunggulan');
    if (keunggulanSection) {
        const keunggulanText = keunggulanSection.querySelector('[data-hero-text]');
        const keunggulanImg = keunggulanSection.querySelector('[data-hero-img]');
        if (keunggulanText && keunggulanImg) {
            const observer = new window.IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            keunggulanImg.classList.remove('opacity-0', 'translate-x-10');
                            keunggulanImg.classList.add('opacity-100', 'translate-x-0');
                        }, 200);
                        setTimeout(() => {
                            keunggulanText.classList.remove('opacity-0', '-translate-x-10');
                            keunggulanText.classList.add('opacity-100', 'translate-x-0');
                        }, 600);
                        obs.disconnect();
                    }
                });
            }, { threshold: 0.2 });
            observer.observe(keunggulanSection);
        }
    }

    // Parallax/reveal untuk section contact us saat discroll ke viewport
    const kontakSection = document.getElementById('kontak');
    if (kontakSection) {
        const contactParallaxEls = kontakSection.querySelectorAll('[data-contact-parallax]');
        if (contactParallaxEls.length) {
            const observer = new window.IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        contactParallaxEls.forEach((el, idx) => {
                            setTimeout(() => {
                                el.classList.remove('opacity-0', 'translate-y-10');
                                el.classList.add('opacity-100', 'translate-y-0');
                            }, idx * 200);
                        });
                        obs.disconnect();
                    }
                });
            }, { threshold: 0.2 });
            observer.observe(kontakSection);
        }
    }
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

    // Get Started button click handler
    const getStartedButton = document.getElementById('getStartedButton');
    if (getStartedButton) {
        getStartedButton.addEventListener('click', (e) => {
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

    // Parallax/Reveal animation for feature cards
    const featureCards = document.querySelectorAll('[data-feature-card]');
    if (featureCards.length) {
        const observer = new window.IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cards = Array.from(featureCards);
                    cards.forEach((card, idx) => {
                        setTimeout(() => {
                            card.classList.remove('opacity-0', 'translate-y-10');
                            card.classList.add('opacity-100', 'translate-y-0');
                        }, idx * 350); // delay antar card lebih lama
                    });
                    observer.disconnect();
                }
            });
        }, { threshold: 0.2 });
        observer.observe(featureCards[0]);
    }
}

function handleContactSubmit(e) {
    e.preventDefault();
    // Add your contact form submission logic here
    console.log('Contact form submitted');
} 