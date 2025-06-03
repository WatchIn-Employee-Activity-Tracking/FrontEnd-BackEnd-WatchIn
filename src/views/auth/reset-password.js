export function renderResetPassword() {
    return `
        <div class="bg-white min-h-screen w-full flex flex-col md:flex-row">
            <div class="flex-1 flex items-center justify-center min-h-[200px] md:min-h-screen bg-slate-500">
                <img src="" alt="" class="w-80 h-80 object-contain" />
            </div>

            <div class="flex-1 flex flex-col justify-center px-6 py-10 md:px-16 md:py-10 min-h-[400px] md:min-h-screen">
                <h2 class="text-3xl font-bold mb-8">Reset Password</h2>
                <p class="text-gray-600 mb-6">Please enter your new password below.</p>
                
                <form id="resetPasswordForm" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium mb-1">New Password</label>
                        <input type="password" placeholder="Enter new password" id="newPassword"
                            class="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <p class="text-xs text-gray-400 mt-1">It must be a combination of minimum 8 letters, numbers, and symbols.</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Confirm New Password</label>
                        <input type="password" placeholder="Confirm new password" id="confirmPassword"
                            class="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div id="passwordError" class="text-red-500 text-sm hidden"></div>
                    <button type="submit"
                        class="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition">Reset Password</button>
                </form>
                
                <div class="mt-6 text-sm text-gray-500">
                    Remember your password? <a href="#/login" class="text-blue-600 hover:underline">Back to Login</a>
                </div>
            </div>
        </div>
    `;
}

export function initResetPassword() {
    const form = document.getElementById('resetPasswordForm');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordError = document.getElementById('passwordError');

    if (!form || !newPasswordInput || !confirmPasswordInput || !passwordError) {
        console.error('Reset password form elements not found');
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Form submitted!');
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        // Reset error message
        passwordError.classList.add('hidden');
        
        // Validate passwords match
        if (newPassword !== confirmPassword) {
            passwordError.textContent = 'Passwords do not match';
            passwordError.classList.remove('hidden');
            return;
        }

        // Validate password strength
        if (newPassword.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters long';
            passwordError.classList.remove('hidden');
            return;
        }

        console.log('Sending fetch to backend...');
        try {
            // Get token from hash (not from search)
            const hash = window.location.hash;
            const tokenMatch = hash.match(/token=([^&]+)/);
            const token = tokenMatch ? tokenMatch[1] : null;

            if (!token) {
                passwordError.textContent = 'Invalid reset token';
                passwordError.classList.remove('hidden');
                return;
            }

            // Make API call to reset password
            const response = await fetch('http://localhost:5000/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Password has been reset successfully!');
                window.location.hash = '#/login';
            } else {
                passwordError.textContent = data.message || 'Failed to reset password';
                passwordError.classList.remove('hidden');
            }
        } catch (error) {
            console.error('Reset password error:', error);
            passwordError.textContent = 'An error occurred. Please try again later.';
            passwordError.classList.remove('hidden');
        }
    });
} 