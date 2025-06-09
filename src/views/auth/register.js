export function renderRegister() {
    return `
        <div class="bg-white min-h-screen w-full flex flex-col md:flex-row">
            <div class="flex-1 flex items-center justify-center min-h-[200px] md:min-h-screen bg-slate-500">
                <img src="" alt="" class="w-80 h-80 object-contain" />
            </div>

            <div class="flex-1 flex flex-col justify-center px-6 py-10 md:px-16 md:py-10 min-h-[400px] md:min-h-screen">
                <h2 class="text-3xl font-bold mb-8">Sign Up</h2>
                <form id="registerForm" class="space-y-4">
                    <div class="flex space-x-4">
                        <div class="flex-1">
                            <label class="block text-sm font-medium mb-1">First Name</label>
                            <input type="text" placeholder="First Name" id="firstName"
                                class="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div class="flex-1">
                            <label class="block text-sm font-medium mb-1">Last Name</label>
                            <input type="text" placeholder="Last Name" id="lastName"
                                class="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Email</label>
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
                    
                    <button type="submit"
                        class="w-full bg-[#EE3A24] text-white py-2 rounded font-semibold hover:bg-[#d32f2f] transition">Sign Up</button>
                </form>
                <div class="mt-10 text-sm text-gray-500">
                    Already have an account? <a href="#" class="text-blue-600 hover:underline" id="loginLink">Login</a>
                </div>
                <button id="backToHome" class="mt-6 w-full bg-gray-200 text-gray-700 py-2 rounded font-semibold hover:bg-gray-300 transition">Kembali ke Beranda</button>
            </div>
        </div>
    `;
} 