let notificationShown = false;

export function showDrowsinessNotification() {
    if (!notificationShown) {
        const notification = document.getElementById('drowsinessNotification');
        if (notification) {
            notification.classList.remove('hidden');
            notificationShown = true;
        }
    }
}

export function hideDrowsinessNotification() {
    const notification = document.getElementById('drowsinessNotification');
    if (notification) {
        notification.classList.add('hidden');
        notificationShown = false;
    }
}

export function initializeNotificationHandlers() {
    const closeButton = document.getElementById('closeNotification');
    if (closeButton) {
        closeButton.addEventListener('click', hideDrowsinessNotification);
    }
} 