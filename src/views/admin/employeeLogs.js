export function renderEmployeeLogs(employee) {
    return `
        <div class="min-h-screen bg-gray-100">
            <nav class="bg-white shadow-lg">
                <div class="max-w-7xl mx-auto px-4">
                    <div class="flex justify-between h-16">
                        <div class="flex items-center">
                            <h1 class="text-xl font-bold text-gray-800">WatchIn</h1>
                        </div>
                        <div class="flex items-center space-x-4">
                            <button id="backToDashboard" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <h2 class="text-2xl font-bold mb-4">Log Aktivitas: ${employee.first_name} ${employee.last_name}</h2>
                <div class="bg-white shadow rounded-lg p-4">
                    <div id="employeeLogsTable">
                        <p class="text-gray-500">Loading logs...</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export async function updateEmployeeLogs(userId) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/admin/capture-logs/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const result = await response.json();
        const logs = result.data || [];
        const tableContainer = document.getElementById('employeeLogsTable');
        if (tableContainer) {
            if (logs.length === 0) {
                tableContainer.innerHTML = '<p class="text-gray-500">No logs found.</p>';
            } else {
                tableContainer.innerHTML = `
                    <div class="overflow-x-auto">
                        <table class="w-full min-w-max divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th class="px-6 py-3 text-center">Waktu</th>
                                    <th class="px-6 py-3 text-center">Warning</th>
                                    <th class="px-6 py-3 text-center">Status Mata</th>
                                    <th class="px-6 py-3 text-center">Durasi Mata Tertutup</th>
                                    <th class="px-6 py-3 text-center">Durasi Mata Terbuka</th>
                                    <th class="px-6 py-3 text-center">Gambar</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${logs.map(log => `
                                    <tr>
                                        <td class="px-6 py-2 text-center">${formatDateIndo(log.capture_time)}</td>
                                        <td class="px-6 py-2 text-center">${log.warning_count}</td>
                                        <td class="px-6 py-2 text-center">${log.eye_status}</td>
                                        <td class="px-6 py-2 text-center">${log.closed_duration ? Math.round(log.closed_duration) : '-'}</td>
                                        <td class="px-6 py-2 text-center">${log.open_duration ? Math.round(log.open_duration) : '-'}</td>
                                        <td class="px-6 py-2 text-center">
                                            <button class="show-image-btn bg-blue-500 text-white px-2 py-1 rounded" data-logid="${log.id}">Lihat Gambar</button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                    <div id="imageOverlay" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.7); z-index:1000; align-items:center; justify-content:center;">
                        <div style="background:#fff; padding:20px; border-radius:8px; max-width:90vw; max-height:90vh; display:flex; flex-direction:column; align-items:center;">
                            <img id="overlayImage" src="" alt="Log Image" style="max-width:80vw; max-height:70vh; margin-bottom:16px;" />
                            <button id="closeOverlayBtn" class="bg-red-500 text-white px-4 py-2 rounded">Tutup</button>
                        </div>
                    </div>
                `;
                // Add event listeners for image buttons
                const imageBtns = document.querySelectorAll('.show-image-btn');
                imageBtns.forEach(btn => {
                    btn.addEventListener('click', async (e) => {
                        const logId = btn.getAttribute('data-logid');
                        const overlay = document.getElementById('imageOverlay');
                        const overlayImg = document.getElementById('overlayImage');
                        overlay.style.display = 'flex';
                        overlayImg.src = '';
                        overlayImg.alt = 'Loading...';
                        try {
                            const token = localStorage.getItem('token');
                            const res = await fetch(`http://localhost:5000/api/capture-logs/${logId}/image`, {
                                headers: { 'Authorization': `Bearer ${token}` }
                            });
                            const data = await res.json();
                            if (data.status === 'success' && data.data && data.data.image_data) {
                                // Convert binary to base64 if needed
                                let imgSrc;
                                if (typeof data.data.image_data === 'string' && data.data.image_data.startsWith('data:image')) {
                                    imgSrc = data.data.image_data;
                                } else {
                                    // Fallback: try to convert binary to base64
                                    imgSrc = `data:image/jpeg;base64,${data.data.image_data}`;
                                }
                                overlayImg.src = imgSrc;
                                overlayImg.alt = 'Log Image';
                            } else {
                                overlayImg.alt = 'Gambar tidak ditemukan';
                            }
                        } catch (err) {
                            overlayImg.alt = 'Gagal memuat gambar';
                        }
                    });
                });
                // Close overlay
                const closeBtn = document.getElementById('closeOverlayBtn');
                if (closeBtn) {
                    closeBtn.addEventListener('click', () => {
                        document.getElementById('imageOverlay').style.display = 'none';
                    });
                }
            }
        }
    } catch (error) {
        const tableContainer = document.getElementById('employeeLogsTable');
        if (tableContainer) {
            tableContainer.innerHTML = '<p class="text-red-500">Error loading logs.</p>';
        }
    }
}

function formatDateIndo(isoString) {
    if (!isoString) return '-';
    const date = new Date(isoString);
    // Konversi ke waktu lokal (WIB = UTC+7)
    const options = {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    // Format: 06/06/2025 12:15:24 WIB
    const parts = new Intl.DateTimeFormat('id-ID', options).formatToParts(date);
    const get = type => parts.find(p => p.type === type)?.value || '';
    return `${get('day')}/${get('month')}/${get('year')} ${get('hour')}:${get('minute')}:${get('second')} WIB`;
} 