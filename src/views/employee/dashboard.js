export function renderEmployeeDashboard(employeeName = "Employee") {
    return `
        <div class="min-h-screen" style="background-color: #FFF9F9;">
            <!-- Employee Navigation -->
            <nav class="bg-white shadow-lg border-b-2 border-red-500">
                <div class="max-w-7xl mx-auto px-4">
                    <div class="flex justify-between h-16">
                        <div class="flex items-center">
                            <h1 class="text-2xl font-extrabold text-red-600 tracking-wide">WatchIn</h1>
                        </div>
                        <div class="flex items-center space-x-4">
                            <span class="text-gray-700 font-medium">Welcome, ${employeeName}</span>
                            <button id="logoutButton" class="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-red-600 transition-all duration-200">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <!-- Main Content -->
            <div class="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 items-start">
                    <!-- Kamera di kiri -->
                    <div class="bg-white border-2 border-red-200 overflow-hidden shadow-lg rounded-xl min-h-[400px] flex items-center justify-center relative" style="aspect-ratio: 4/3; max-height: 400px;">
                        <div id="cameraHint" class="absolute inset-0 flex items-center justify-center w-full h-full z-10 text-center font-bold text-gray-400 bg-white/80 rounded pointer-events-none">Aktifkan Kamera</div>
                        <video id="webcamVideo" autoplay muted class="rounded-lg w-full h-full object-contain" style="display:none; aspect-ratio: 4/3; max-height: 400px;"></video>
                        <canvas id="eyeCanvas" width="224" height="224" style="display: none;"></canvas>
                    </div>
                    <!-- Kolom kanan: 3 kotak vertikal -->
                    <div class="flex flex-col gap-4 w-full">
                        <!-- Kotak 1: Status -->
                        <div class="bg-white border-2 border-red-200 shadow-lg rounded-xl px-6 py-4 flex flex-col items-center justify-center min-h-[80px]">
                            <div class="mb-1">
                                <span class="font-semibold text-gray-700">Status: </span>
                                <span id="detectionStatus" class="text-red-600 font-bold">-</span>
                            </div>
                            <div class="mb-1">
                                <span class="font-semibold text-gray-700">Durasi Mata Terbuka: </span>
                                <span id="openDuration" class="text-red-600 font-bold">0</span> detik
                            </div>
                            <div>
                                <span class="font-semibold text-gray-700">Durasi Mata Tertutup: </span>
                                <span id="closedDuration" class="text-red-600 font-bold">0</span> detik
                            </div>
                        </div>
                        <!-- Kotak 2: Notifikasi -->
                        <div id="drowsinessNotification" class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg shadow-md flex justify-between items-center min-h-[60px] hidden">
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
                        <!-- Kotak 3: Log -->
                        <div class="bg-white border-2 border-red-100 shadow-lg rounded-xl p-4 min-h-[80px]">
                            <h3 class="font-bold text-red-600 mb-2 text-lg">Log Deteksi Mata</h3>
                            <ul id="eyeDetectionLog" class="text-sm text-gray-700 space-y-1">
                                <!-- Log akan muncul di sini -->
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- Tombol kontrol kamera di bawah -->
                <div class="flex gap-4 justify-center mt-4">
                    <button id="startCameraBtn" class="bg-red-500 text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-red-600 transition-all duration-200">Start Camera</button>
                    <button id="stopCameraBtn" class="bg-gray-200 text-red-600 px-6 py-2 rounded-lg font-bold shadow hover:bg-red-100 border border-red-300 transition-all duration-200" style="display:none;">Matikan Kamera</button>
                </div>
            </div>
        </div>
    `;
} 