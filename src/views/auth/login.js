export function renderLogin() {
    return `
        <div class="bg-white min-h-screen w-full flex flex-col md:flex-row">
            <div class="flex-1 flex items-center justify-center min-h-[200px] md:min-h-screen bg-slate-500">
                <img src="" alt="" class="w-80 h-80 object-contain" />
            </div>

            <div class="flex-1 flex flex-col justify-center px-6 py-10 md:px-16 md:py-10 min-h-[400px] md:min-h-screen">
                <h2 class="text-3xl font-bold mb-8">Log In</h2>
                <form id="loginForm" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium mb-1">Email Address</label>
                        <input type="email" placeholder="Enter your email" id="email"
                            class="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Password</label>
                        <input type="password" placeholder="Enter your password" id="password"
                            class="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <p class="text-xs text-gray-400 mt-1">It must be a combination of minimum 8 letters, numbers, and
                            symbols.</p>
                    </div>
                    <div class="flex items-center justify-between text-sm">
                        <label class="flex items-center">
                            <input type="checkbox" id="rememberMe" class="mr-2" /> Remember me
                        </label>
                        <a href="#/forgot-password" class="text-blue-600 hover:underline">Forgot Password?</a>
                    </div>
                    <button type="submit"
                        class="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition">Log
                        In</button>
                </form>
                <div class="mt-10 text-sm text-gray-500">
                    No account yet? <a href="#" class="text-blue-600 hover:underline" id="registerLink">Sign Up</a>
                </div>
                <button id="backToHome" class="mt-6 w-full bg-gray-200 text-gray-700 py-2 rounded font-semibold hover:bg-gray-300 transition">Kembali ke Beranda</button>
            </div>
        </div>
    `;
}

// Function to initialize remember me functionality
export function initRememberMe() {
    const emailInput = document.getElementById('email');
    const rememberMeCheckbox = document.getElementById('rememberMe');

    if (!emailInput || !rememberMeCheckbox) {
        return;
    }

    // Check if there's a saved email
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberMeCheckbox.checked = true;
    }
}

// Function to handle remember me on login
export function handleRememberMe(email) {
    const rememberMeCheckbox = document.getElementById('rememberMe');
    if (rememberMeCheckbox && rememberMeCheckbox.checked) {
        localStorage.setItem('rememberedEmail', email);
    } else {
        localStorage.removeItem('rememberedEmail');
    }
}

// Initialize login functionality
export function initLogin() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const rememberMeCheckbox = document.getElementById('rememberMe');

    if (!loginForm || !emailInput || !rememberMeCheckbox) {
        console.error('Login form elements not found');
        return;
    }

    // Check if there's a saved email
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberMeCheckbox.checked = true;
    }

    // Handle form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailInput.value;
        const password = document.getElementById('password').value;

        // If remember me is checked, save the email
        if (rememberMeCheckbox.checked) {
            localStorage.setItem('rememberedEmail', email);
        } else {
            localStorage.removeItem('rememberedEmail');
        }

        // Here you would typically handle the login logic
        // For example, making an API call to your backend
    });
} 