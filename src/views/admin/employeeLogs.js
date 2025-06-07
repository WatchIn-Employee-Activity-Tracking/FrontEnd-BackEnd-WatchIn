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
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `;
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