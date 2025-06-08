export function renderEmployeeDashboard(employeeName = "Employee") {
    return `
        <div class="min-h-screen bg-gray-100">
            <!-- Employee Navigation -->
            <nav class="bg-white shadow-lg">
                <div class="max-w-7xl mx-auto px-4">
                    <div class="flex justify-between h-16">
                        <div class="flex items-center">
                            <h1 class="text-xl font-bold text-gray-800">WatchIn</h1>
                        </div>
                        <div class="flex items-center space-x-4">
                            <span class="text-gray-600">Welcome, ${employeeName}</span>
                            <button id="logoutButton" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <!-- Main Content -->
            <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <!-- Dashboard Cards -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <!-- Kamera di border kiri -->
                    <div class="bg-white overflow-hidden shadow rounded-lg min-h-[400px] flex items-center justify-center">
                        <video id="webcamVideo" width="640" height="480" autoplay muted class="rounded" style="display:none;"></video>
                        <canvas id="eyeCanvas" width="224" height="224" style="display: none;"></canvas>
                    </div>
                    <!-- Status model di border kanan -->
                    <div class="bg-white overflow-hidden shadow rounded-lg min-h-[400px] flex flex-col items-center justify-center">
                        <div class="mb-4">
                            <span class="font-semibold">Status: </span>
                            <span id="detectionStatus">-</span>
                        </div>
                        <div class="mb-2">
                            <span class="font-semibold">Durasi Mata Terbuka: </span>
                            <span id="openDuration">0</span> detik
                        </div>
                        <div>
                            <span class="font-semibold">Durasi Mata Tertutup: </span>
                            <span id="closedDuration">0</span> detik
                        </div>
                    </div>
                </div>
                <!-- Tombol kontrol kamera di bawah border -->
                <div class="flex gap-4 justify-center mt-4">
                    <button id="startCameraBtn" class="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition">Start Camera</button>
                    <button id="stopCameraBtn" class="bg-red-500 text-white px-4 py-2 rounded font-semibold hover:bg-red-600 transition" style="display:none;">Matikan Kamera</button>
                </div>

                <!-- Notification Component -->
                <div id="drowsinessNotification" class="max-w-4xl w-full mx-auto mt-4 hidden">
                    <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded shadow-md flex justify-between items-center">
                        <div class="flex items-center">
                            <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                            </svg>
                            <p class="font-medium">Anda terdeteksi mengantuk, silahkan istirahat sejenak.</p>
                        </div>
                        <button id="closeNotification" class="text-yellow-700 hover:text-yellow-900">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Kotak log deteksi mata -->
                <div class="max-w-4xl w-full mx-auto mt-6">
                    <div class="bg-white shadow rounded-lg p-4 min-h-[120px]">
                        <h3 class="font-semibold mb-2">Log Deteksi Mata</h3>
                        <ul id="eyeDetectionLog" class="text-sm text-gray-700 space-y-1">
                            <!-- Log akan muncul di sini -->
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
} 