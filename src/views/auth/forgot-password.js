export function renderForgotPassword() {
    return `
        <div class="bg-white min-h-screen w-full flex flex-col md:flex-row">
            <div class="flex-1 flex items-center justify-center min-h-[200px] md:min-h-screen bg-slate-500">
                <img src="" alt="" class="w-80 h-80 object-contain" />
            </div>

            <div class="flex-1 flex flex-col justify-center px-6 py-10 md:px-16 md:py-10 min-h-[400px] md:min-h-screen">
                <h2 class="text-3xl font-bold mb-8">Forgot Password</h2>
                <p class="text-gray-600 mb-6">Enter your email address and we'll send you instructions to reset your password.</p>
                
                <form id="forgotPasswordForm" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium mb-1">Email Address</label>
                        <input type="email" placeholder="Enter your email" id="email"
                            class="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <div id="emailError" class="text-red-500 text-sm mt-1 hidden"></div>
                    </div>
                    <button type="submit"
                        class="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition">Send Reset Link</button>
                </form>
                
                <div class="mt-6 text-sm text-gray-500">
                    Remember your password? <a href="#/login" class="text-blue-600 hover:underline">Back to Login</a>
                </div>
            </div>
        </div>
    `;
}

export function initForgotPassword() {
    const form = document.getElementById('forgotPasswordForm');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');

    if (!form || !emailInput || !emailError) {
        console.error('Forgot password form elements not found');
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        
        // Reset error message
        emailError.classList.add('hidden');
        
        try {
            // Here you would make an API call to your backend to check if email exists
            const response = await fetch('http://localhost:5000/api/auth/check-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (response.ok) {
                // Email exists, redirect to reset password page with token
                window.location.hash = `#/reset-password?token=${encodeURIComponent(data.resetToken)}`;
            } else {
                // Email doesn't exist
                emailError.textContent = 'Email address not found. Please check and try again.';
                emailError.classList.remove('hidden');
            }
        } catch (error) {
            console.error('Error checking email:', error);
            emailError.textContent = 'An error occurred. Please try again later.';
            emailError.classList.remove('hidden');
        }
    });
} 