import { renderLogin, initRememberMe, handleRememberMe } from '../../views/auth/login';
import { renderRegister } from '../../views/auth/register';
import { renderAdminDashboard } from '../../views/admin/dashboard';
import { renderEmployeeDashboard } from '../../views/employee/dashboard';
import { renderForgotPassword, initForgotPassword } from '../../views/auth/forgot-password';
import { renderResetPassword, initResetPassword } from '../../views/auth/reset-password';
import { startCameraDetection } from '../cameraDetection';

export function initAuth() {
    const app = document.getElementById('app');
    
    // Handle navigation
    function navigateToLogin() {
        app.innerHTML = renderLogin();
        setupLoginListeners();
        initRememberMe(); // Initialize remember me functionality
    }

    function navigateToRegister() {
        app.innerHTML = renderRegister();
        setupRegisterListeners();
    }

    function navigateToForgotPassword() {
        app.innerHTML = renderForgotPassword();
        initForgotPassword();
        // Tambahkan event listener untuk Back to Login
        const backToLoginLink = document.querySelector('a[href="#/login"]');
        if (backToLoginLink) {
            backToLoginLink.addEventListener('click', function(e) {
                e.preventDefault();
                navigateToLogin();
            });
        }
    }

    function navigateToResetPassword() {
        app.innerHTML = renderResetPassword();
        initResetPassword();
    }

    // Setup event listeners for login page
    function setupLoginListeners() {
        const loginForm = document.getElementById('loginForm');
        const registerLink = document.getElementById('registerLink');
        const backToHome = document.getElementById('backToHome');
        const forgotPasswordLink = document.querySelector('a[href="#/forgot-password"]');

        if (loginForm) {
            loginForm.addEventListener('submit', handleLogin);
        }

        if (registerLink) {
            registerLink.addEventListener('click', (e) => {
                e.preventDefault();
                navigateToRegister();
            });
        }

        if (forgotPasswordLink) {
            forgotPasswordLink.addEventListener('click', (e) => {
                e.preventDefault();
                navigateToForgotPassword();
            });
        }

        if (backToHome) {
            backToHome.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.hash = '/';
            });
        }
    }

    // Setup event listeners for register page
    function setupRegisterListeners() {
        const registerForm = document.getElementById('registerForm');
        const loginLink = document.getElementById('loginLink');
        const backToHome = document.getElementById('backToHome');

        if (registerForm) {
            registerForm.addEventListener('submit', handleRegister);
        }

        if (loginLink) {
            loginLink.addEventListener('click', (e) => {
                e.preventDefault();
                navigateToLogin();
            });
        }

        if (backToHome) {
            backToHome.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.hash = '/';
            });
        }
    }

    // Helper function for password validation
    function isPasswordValid(password, email) {
        if (email === 'admin@gmail.com' && password === 'admin') return true;
        const minLength = 8;
        const hasNumber = /[0-9]/.test(password);
        const hasSymbol = /[^A-Za-z0-9]/.test(password);
        return password.length >= minLength && hasNumber && hasSymbol;
    }

    // Handle login form submission
    async function handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Password validation (kecuali admin)
        if (!isPasswordValid(password, email)) {
            alert('Password must be at least 8 characters and contain a number and a symbol!');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Handle remember me
                handleRememberMe(email);

                // Store user data in localStorage
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('token', data.token);

                // Tampilkan alert login berhasil
                alert('Login berhasil!');

                // Redirect based on user role (ubah hash saja)
                if (data.user.role === 'admin') {
                    window.location.hash = '#/admin-dashboard';
                } else {
                    window.location.hash = '#/employee-dashboard';
                }
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login');
        }
    }

    // Handle register form submission
    async function handleRegister(e) {
        e.preventDefault();
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Password validation (kecuali admin)
        if (!isPasswordValid(password, email)) {
            alert('Password must be at least 8 characters and contain a number and a symbol!');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Registration successful! Please login.');
                navigateToLogin();
            } else {
                alert(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('An error occurred during registration');
        }
    }

    // Setup admin dashboard listeners
    function setupAdminDashboardListeners() {
        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', handleLogout);
        }
    }

    // Setup employee dashboard listeners
    function setupEmployeeDashboardListeners() {
        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', (e) => {
                // Cek status kamera sebelum logout
                if (window.cameraActive) {
                    alert('Matikan kamera terlebih dahulu sebelum logout.');
                    e.preventDefault();
                    return;
                }
                handleLogout();
            });
        }
        // Mulai deteksi kamera dan model setelah dashboard employee dirender
        startCameraDetection();
    }

    // Handle logout
    function handleLogout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.hash = '/';
    }

    // Check login state and hash, render page accordingly
    const hash = window.location.hash;
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    if (token && user) {
        // Sudah login
        if (user.role === 'admin' && hash === '#/admin-dashboard') {
            app.innerHTML = renderAdminDashboard();
            setupAdminDashboardListeners();
            return;
        } else if (user.role !== 'admin' && hash === '#/employee-dashboard') {
            app.innerHTML = renderEmployeeDashboard();
            setupEmployeeDashboardListeners();
            return;
        } else {
            // Jika hash tidak sesuai, redirect ke dashboard yang benar
            if (user.role === 'admin') {
                window.location.hash = '#/admin-dashboard';
            } else {
                window.location.hash = '#/employee-dashboard';
            }
            return;
        }
    }

    // Belum login, handle halaman auth
    if (hash === '#/login') {
        navigateToLogin();
    } else if (hash === '#/register') {
        navigateToRegister();
    } else if (hash === '#/forgot-password') {
        navigateToForgotPassword();
    } else if (hash.startsWith('#/reset-password')) {
        navigateToResetPassword();
    } else {
        navigateToLogin();
    }
} 