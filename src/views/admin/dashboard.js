import swal from 'sweetalert';

export function renderAdminDashboard() {
    return `
        <div class="min-h-screen bg-[#FFF9F9]">
            <!-- Admin Navigation -->
            <nav class="bg-white shadow-lg border-b-2 border-[#EE3A24]">
                <div class="max-w-7xl mx-auto px-4">
                    <div class="flex justify-between h-16">
                        <div class="flex items-center">
                            <h1 class="text-2xl font-extrabold text-[#EE3A24] tracking-wide">WatchIn</h1>
                        </div>
                        <div class="flex items-center space-x-4">
                            <span class="text-gray-700 font-medium">Welcome, Admin</span>
                            <button id="logoutButton" class="bg-[#EE3A24] text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-[#d32f2f] transition-all duration-200">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <!-- Main Content -->
            <div class="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
                <!-- Dashboard Cards -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 bg-[#EE3A24] rounded-md p-3">
                                    <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Total Employees</dt>
                                        <dd id="totalEmployees" class="text-lg font-semibold text-gray-900">Loading...</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Activity -->
                <div class="bg-white shadow rounded-lg">
                    <div class="px-4 py-5 sm:px-6">
                        <h3 class="text-lg leading-6 font-bold text-[#EE3A24]">Employee List</h3>
                    </div>
                    <div class="border-t border-red-200">
                        <div id="employeeList" class="px-4 py-5 sm:p-6">
                            <p class="text-gray-500">No recent activity</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Function to fetch and update total employees count
export async function updateTotalEmployees() {
    try {
        const response = await fetch('http://localhost:5000/api/auth/total-employees');
        const data = await response.json();
        const totalEmployeesElement = document.getElementById('totalEmployees');
        if (totalEmployeesElement) {
            totalEmployeesElement.textContent = data.total;
        }
    } catch (error) {
        console.error('Error fetching total employees:', error);
        const totalEmployeesElement = document.getElementById('totalEmployees');
        if (totalEmployeesElement) {
            totalEmployeesElement.textContent = 'Error';
        }
    }
}

export async function updateUserList() {
    try {
        const response = await fetch('http://localhost:5000/api/auth/users');
        const users = await response.json();
        console.log('Data users dari backend:', users);
        const listContainer = document.querySelector('#employeeList');
        if (listContainer) {
            if (users.length === 0) {
                listContainer.innerHTML = '<p class="text-gray-500">No recent activity</p>';
            } else {
                listContainer.innerHTML = `
                    <div class="flex font-semibold border-b pb-2 mb-2">
                        <div class="w-1/3">Nama Lengkap</div>
                        <div class="w-1/3">Email</div>
                        <div class="w-1/6">Role</div>
                        <div class="w-1/6 text-right"></div>
                    </div>
                    ${users.map(user => `
                        <div class="flex items-center py-2 border-b">
                            <div class="w-1/3 font-semibold">${user.first_name} ${user.last_name}</div>
                            <div class="w-1/3 text-gray-500 text-sm">${user.email}</div>
                            <div class="w-1/6 text-red-600 text-xs uppercase">${user.role}</div>
                            <div class="w-1/6 text-right flex gap-2 justify-end">
                                <button class="bg-[#EE3A24] text-white px-3 py-1 rounded hover:bg-[#d32f2f] transition detail-btn" data-id="${user.id}">
                                    Detail
                                </button>
                                ${
                                    user.id && !isNaN(user.id)
                                    ? `<button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition delete-btn" data-id="${user.id}">
                                        Delete
                                    </button>`
                                    : `<span class="text-xs text-gray-400">ID tidak valid</span>`
                                }
                            </div>
                        </div>
                    `).join('')}
                `;
            }
        }
    } catch (error) {
        console.error('Error fetching user list:', error);
        const listContainer = document.querySelector('#employeeList');
        if (listContainer) {
            listContainer.innerHTML = '<p class="text-red-500">Error loading user list</p>';
        }
    }
}

// Add this new function to handle delete button click
export function handleDeleteButtonClick(event) {
    const btn = event.target;
    const userId = btn.getAttribute('data-id');

    if (!userId || isNaN(userId)) {
        swal('ID user tidak valid', 'Tidak dapat menghapus.', 'error');
        console.error('Data tombol:', btn);
        return;
    }

    // Proceed with the delete operation
    // ... (rest of the function code remains unchanged)
} 