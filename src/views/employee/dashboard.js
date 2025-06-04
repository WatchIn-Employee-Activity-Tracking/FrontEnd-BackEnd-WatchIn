export function renderEmployeeDashboard() {
    return `
        <div class="min-h-screen bg-gray-100">
            <!-- Employee Navigation -->
            <nav class="bg-white shadow-lg">
                <div class="max-w-7xl mx-auto px-4">
                    <div class="flex justify-between h-16">
                        <div class="flex items-center">
                            <h1 class="text-xl font-bold text-gray-800">Employee Dashboard</h1>
                        </div>
                        <div class="flex items-center space-x-4">
                            <span class="text-gray-600">Welcome, Employee</span>
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
            </div>
        </div>
    `;
} 