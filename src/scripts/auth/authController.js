import { renderLogin, initRememberMe, handleRememberMe } from '../../views/auth/login';
import { renderRegister } from '../../views/auth/register';
import { renderAdminDashboard, updateTotalEmployees, updateUserList } from '../../views/admin/dashboard';
import { renderEmployeeDashboard } from '../../views/employee/dashboard';
import { renderForgotPassword, initForgotPassword } from '../../views/auth/forgot-password';
import { renderResetPassword, initResetPassword } from '../../views/auth/reset-password';
import { startCameraDetection } from '../cameraDetection';
import { renderEmployeeLogs, updateEmployeeLogs } from '../../views/admin/employeeLogs';
import swal from 'sweetalert';

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
            swal('Warning', 'Password must be at least 8 characters and contain a number and a symbol!', 'warning');
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
                swal('Success', 'Login berhasil!', 'success');

                // Redirect based on user role (ubah hash saja)
                if (data.user.role === 'admin') {
                    window.location.hash = '#/admin-dashboard';
                } else {
                    window.location.hash = '#/employee-dashboard';
                }
            } else {
                swal('Error', data.message || 'Login failed', 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            swal('Error', 'An error occurred during login', 'error');
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
            swal('Warning', 'Password must be at least 8 characters and contain a number and a symbol!', 'warning');
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
                swal('Success', 'Registration successful! Please login.', 'success');
                navigateToLogin();
            } else {
                swal('Error', data.message || 'Registration failed', 'error');
            }
        } catch (error) {
            console.error('Registration error:', error);
            swal('Error', 'An error occurred during registration', 'error');
        }
    }

    // Setup admin dashboard listeners
    function setupAdminDashboardListeners() {
        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', function(e) {
                e.preventDefault();
                swal({
                    title: 'Konfirmasi Logout',
                    text: 'Apakah Anda yakin ingin logout?',
                    icon: 'warning',
                    buttons: true,
                    dangerMode: true
                }).then((willLogout) => {
                    if (willLogout) {
                        localStorage.removeItem('user');
                        localStorage.removeItem('token');
                        window.location.hash = '/';
                    }
                });
            });
        }
        updateTotalEmployees();
        updateUserList();
        // Event listener untuk tombol Detail
        setTimeout(() => {
            const detailButtons = document.querySelectorAll('.detail-btn');
            detailButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const userId = btn.getAttribute('data-id');
                    window.location.hash = `#/admin-employee-logs/${userId}`;
                });
            });
            // Event listener untuk tombol Delete
            const deleteButtons = document.querySelectorAll('.delete-btn');
            deleteButtons.forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const userId = btn.getAttribute('data-id');
                    if (!userId) {
                        swal('Warning', 'ID user tidak ditemukan. Tidak dapat menghapus.', 'warning');
                        console.error('Data tombol:', btn);
                        return;
                    }
                    swal({
                        title: 'Konfirmasi',
                        text: 'Apakah anda yakin ingin menghapus akun ini?',
                        icon: 'warning',
                        buttons: true,
                        dangerMode: true
                    }).then(async (willDelete) => {
                        if (willDelete) {
                            try {
                                const response = await fetch(`http://localhost:5000/api/auth/users/${userId}`, {
                                    method: 'DELETE',
                                });
                                const data = await response.json();
                                if (response.ok) {
                                    swal('Success', 'Akun berhasil dihapus', 'success').then(() => {
                                        location.reload();
                                    });
                                } else {
                                    swal('Error', data.message || 'Gagal menghapus akun', 'error');
                                }
                            } catch (error) {
                                swal('Error', 'Terjadi kesalahan saat menghapus akun', 'error');
                            }
                        }
                    });
                });
            });
        }, 500); // Tunggu render selesai
    }

    // Setup employee dashboard listeners
    function setupEmployeeDashboardListeners() {
        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', (e) => {
                // Cek status kamera sebelum logout
                if (window.cameraActive) {
                    swal('Warning', 'Matikan kamera terlebih dahulu sebelum logout.', 'warning');
                    e.preventDefault();
                    return;
                }
                e.preventDefault();
                swal({
                    title: 'Konfirmasi Logout',
                    text: 'Apakah Anda yakin ingin logout?',
                    icon: 'warning',
                    buttons: true,
                    dangerMode: true
                }).then((willLogout) => {
                    if (willLogout) {
                        localStorage.removeItem('user');
                        localStorage.removeItem('token');
                        window.location.hash = '/';
                    }
                });
            });
        }
        // Mulai deteksi kamera dan model setelah dashboard employee dirender
        startCameraDetection();
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
        } else if (user.role === 'admin' && hash.startsWith('#/admin-employee-logs/')) {
            // Ambil userId dari hash
            const userId = hash.split('/')[2];
            // Fetch data user (nama, dsb) dari API user list
            fetch(`http://localhost:5000/api/auth/users`)
                .then(res => res.json())
                .then(users => {
                    const employee = users.find(u => String(u.id) === String(userId));
                    if (!employee) {
                        app.innerHTML = '<div class="p-8">Employee not found.</div>';
                        return;
                    }
                    app.innerHTML = renderEmployeeLogs(employee);
                    updateEmployeeLogs(userId);
                    // Tombol back
                    const backBtn = document.getElementById('backToDashboard');
                    if (backBtn) {
                        backBtn.addEventListener('click', () => {
                            window.location.hash = '#/admin-dashboard';
                        });
                    }
                });
            return;
        } else if (user.role !== 'admin' && hash === '#/employee-dashboard') {
            const rawName = user.firstName || user.name || 'Employee';
            const employeeName = capitalizeFirstLetter(rawName);
            app.innerHTML = renderEmployeeDashboard(employeeName);
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

function capitalizeFirstLetter(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
} 