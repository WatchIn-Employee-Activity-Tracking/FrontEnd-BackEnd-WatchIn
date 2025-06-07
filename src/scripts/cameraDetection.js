// Import CDN script dependencies in index.html or dynamically if needed
// Logic for camera, face mesh, and model detection

const API_URL = 'https://watchin-be-model-314371797274.asia-southeast2.run.app/predict';

let webcamVideo, eyeCanvas, detectionStatus, openDurationSpan, closedDurationSpan, ctx;
let faceMesh = null;
let camera = null;
let lastSentTime = 0;
const SEND_INTERVAL = 200; // ms
const MODEL_INPUT_SIZE = 224;

const LEFT_EYE_LANDMARKS = [
    33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246
];
const RIGHT_EYE_LANDMARKS = [
    362, 382, 381, 380, 374, 373, 390, 249, 386, 398, 384, 385, 387, 388, 466, 263
];

let openDuration = 0;
let closedDuration = 0;
let lastEyeStatus = null;
let lastStatusChangeTime = null;
let durationInterval = null;
let mediaStream = null;
let cameraActive = false;
window.cameraActive = cameraActive;
let mediapipeLoaded = false;
let faceMeshInitialized = false;
// Warning system
let warningCount = 0;
let lastWarningTime = 0;
const WARNING_INTERVAL = 20000; // 20 seconds in milliseconds
// Logging
let eyeDetectionLog = [];
let warningCountSpan = null;

async function captureAndSaveImage() {
    if (!webcamVideo || !cameraActive) return;
    
    try {
        // Create a canvas to capture the full webcam frame
        const captureCanvas = document.createElement('canvas');
        captureCanvas.width = webcamVideo.videoWidth;
        captureCanvas.height = webcamVideo.videoHeight;
        const captureCtx = captureCanvas.getContext('2d');
        
        // Draw the current video frame
        captureCtx.drawImage(webcamVideo, 0, 0);
        
        // Convert to base64
        const imageData = captureCanvas.toDataURL('image/jpeg', 0.8);
        
        // Get current user data
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.id) {
            console.error('No user data found');
            return;
        }

        // Prepare data for saving
        const now = new Date();
        const offset = now.getTimezoneOffset() * 60000;
        const localISOTime = new Date(now - offset).toISOString().slice(0, 19).replace('T', ' ');
        const captureData = {
            user_id: user.id,
            image_data: imageData,
            capture_time: localISOTime,
            warning_count: warningCount,
            eye_status: lastEyeStatus,
            closed_duration: closedDuration,
            open_duration: openDuration
        };

        console.log('Sending capture data to backend:', captureData); // Log data being sent
        console.log('Sending capture request to URL:', '/api/capture-logs'); // Log the target URL

        // Send to backend
        const response = await fetch('http://localhost:5000/api/capture-logs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(captureData)
        });

        if (!response.ok) {
            throw new Error('Failed to save capture');
        }

        console.log('Image captured and saved successfully');
        
        // Reset warning count after successful capture and save
        warningCount = 0;
        if (warningCountSpan) {
            warningCountSpan.textContent = `Warning = ${warningCount}`;
        }
        
    } catch (error) {
        console.error('Error capturing image:', error);
    }
}

function addEyeLog(status, duration, warning = null) {
    const logList = document.getElementById('eyeDetectionLog');
    if (!logList) return;
    const now = new Date();
    const dateStr = now.toLocaleString('id-ID');
    const durasiStr = duration ? duration.toFixed(1) : '0';
    const li = document.createElement('li');
    if (warning) {
        li.textContent = `[${dateStr}] WARNING ${warning}: Mata tertutup selama ${durasiStr} detik`;
        li.classList.add('text-red-600', 'font-bold');
        
        // Capture image when warning count reaches 3
        if (warning === 3) {
            captureAndSaveImage();
        }
    } else {
        li.textContent = `[${dateStr}] Status: ${status}, Durasi: ${durasiStr} detik`;
    }
    logList.insertBefore(li, logList.firstChild);
    eyeDetectionLog.unshift({ date: dateStr, status, duration: durasiStr, warning });
    // Batasi maksimal 10 log
    while (logList.children.length > 10) {
        logList.removeChild(logList.lastChild);
    }
    while (eyeDetectionLog.length > 10) {
        eyeDetectionLog.pop();
    }
    logList.scrollTop = 0;
}

function resetEyeLog() {
    eyeDetectionLog = [];
    const logList = document.getElementById('eyeDetectionLog');
    if (logList) logList.innerHTML = '';
}

function getEyeBoundingBox(landmarks, videoWidth, videoHeight) {
    if (landmarks.length === 0) return null;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const landmark of landmarks) {
        const x = landmark.x * videoWidth;
        const y = landmark.y * videoHeight;
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
    }
    const padding = 20;
    minX = Math.max(0, minX - padding);
    minY = Math.max(0, minY - padding);
    maxX = Math.min(videoWidth, maxX + padding);
    maxY = Math.min(videoHeight, maxY + padding);
    return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
}

async function initializeFaceMesh() {
    webcamVideo = document.getElementById('webcamVideo');
    eyeCanvas = document.getElementById('eyeCanvas');
    detectionStatus = document.getElementById('detectionStatus');
    openDurationSpan = document.getElementById('openDuration');
    closedDurationSpan = document.getElementById('closedDuration');
    ctx = eyeCanvas.getContext('2d');
    eyeCanvas.width = MODEL_INPUT_SIZE;
    eyeCanvas.height = MODEL_INPUT_SIZE;
    faceMesh = new window.FaceMesh({
        locateFile: (file) => `https://unpkg.com/@mediapipe/face_mesh/${file}`
    });
    faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    });
    faceMesh.onResults(onResults);
    detectionStatus.textContent = 'Initializing webcam and face mesh...';
    await startWebcam();
}

async function startWebcam() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        webcamVideo.srcObject = stream;
        detectionStatus.textContent = 'Webcam active. Waiting for face detection...';
        camera = new window.Camera(webcamVideo, {
            onFrame: async () => {
                await faceMesh.send({ image: webcamVideo });
            },
            width: 640,
            height: 480
        });
        await camera.start();
    } catch (err) {
        detectionStatus.textContent = `Error: ${err.message}. Please allow webcam access.`;
    }
}

function updateDurations(predictedClass) {
    const now = Date.now();
    if (predictedClass === 'No face detected') {
        // Jangan lakukan perhitungan apapun jika tidak ada wajah terdeteksi
        openDurationSpan.textContent = '-';
        closedDurationSpan.textContent = '-';
        openDuration = 0;
        closedDuration = 0;
        lastStatusChangeTime = null;
        lastEyeStatus = 'No face detected';
        return;
    }
    if (lastEyeStatus === null || lastStatusChangeTime === null) {
        lastEyeStatus = predictedClass;
        lastStatusChangeTime = now;
        openDurationSpan.textContent = openDuration.toFixed(1);
        closedDurationSpan.textContent = closedDuration.toFixed(1);
        return;
    }
    const duration = (now - lastStatusChangeTime) / 1000;
    if (predictedClass === 'Closed') {
        closedDuration += duration;
        if (closedDuration >= 20) {
            warningCount = Math.min(warningCount + 1, 3);
            addEyeLog(predictedClass, 20, warningCount);
            closedDuration = 0;
            if (warningCountSpan) warningCountSpan.textContent = `Warning = ${warningCount}`;
        }
    } else if (predictedClass === 'Opened') {
        openDuration += duration;
        closedDuration = 0; // Reset closedDuration ke 0 saat berubah ke opened
    }
    lastEyeStatus = predictedClass;
    lastStatusChangeTime = now;
    // Update UI
    openDurationSpan.textContent = openDuration.toFixed(1);
    closedDurationSpan.textContent = closedDuration.toFixed(1);
}

function updateDurationOnInterval() {
    if (lastEyeStatus === 'No face detected' || lastStatusChangeTime === null) {
        openDurationSpan.textContent = '-';
        closedDurationSpan.textContent = '-';
        return;
    }
    if (lastEyeStatus && lastStatusChangeTime) {
        const now = Date.now();
        const duration = (now - lastStatusChangeTime) / 1000;
        if (lastEyeStatus === 'Opened') {
            openDurationSpan.textContent = (openDuration + duration).toFixed(1);
            closedDurationSpan.textContent = closedDuration.toFixed(1);
        } else if (lastEyeStatus === 'Closed') {
            closedDurationSpan.textContent = (closedDuration + duration).toFixed(1);
            openDurationSpan.textContent = openDuration.toFixed(1);
        }
    }
}

async function onResults(results) {
    ctx.clearRect(0, 0, eyeCanvas.width, eyeCanvas.height);
    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
        const landmarks = results.multiFaceLandmarks[0];
        const videoWidth = webcamVideo.videoWidth;
        const videoHeight = webcamVideo.videoHeight;
        const leftEyePoints = LEFT_EYE_LANDMARKS.map(index => landmarks[index]);
        const rightEyePoints = RIGHT_EYE_LANDMARKS.map(index => landmarks[index]);
        const allEyePoints = [...leftEyePoints, ...rightEyePoints];
        const eyeBoundingBox = getEyeBoundingBox(allEyePoints, videoWidth, videoHeight);
        if (eyeBoundingBox) {
            const { x, y, width, height } = eyeBoundingBox;
            const sourceX = Math.max(0, x);
            const sourceY = Math.max(0, y);
            const sourceWidth = Math.min(videoWidth - sourceX, width);
            const sourceHeight = Math.min(videoHeight - sourceY, height);
            ctx.drawImage(
                webcamVideo,
                sourceX, sourceY, sourceWidth, sourceHeight,
                0, 0, eyeCanvas.width, eyeCanvas.height
            );
            const currentTime = Date.now();
            if (currentTime - lastSentTime > SEND_INTERVAL) {
                lastSentTime = currentTime;
                const imageDataUrl = eyeCanvas.toDataURL('image/jpeg', 0.8);
                try {
                    const response = await fetch(API_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ imageData: imageDataUrl })
                    });
                    const result = await response.json();
                    if (result.status === 'success') {
                        const predictedClass = result.prediction;
                        detectionStatus.textContent = predictedClass;
                        detectionStatus.className = '';
                        if (predictedClass === 'Opened') {
                            detectionStatus.classList.add('green');
                        } else {
                            detectionStatus.classList.add('red');
                        }
                        updateDurations(predictedClass);
                    } else {
                        detectionStatus.textContent = `Detection Error: ${result.error}`;
                        detectionStatus.classList.add('orange');
                    }
                } catch (error) {
                    detectionStatus.textContent = `Network Error: ${error.message}`;
                    detectionStatus.classList.add('red');
                }
            }
        }
    } else {
        detectionStatus.textContent = 'No face detected.';
        detectionStatus.classList.add('gray');
        updateDurations('No face detected');
    }
}

export function startCameraDetection() {
    webcamVideo = document.getElementById('webcamVideo');
    eyeCanvas = document.getElementById('eyeCanvas');
    detectionStatus = document.getElementById('detectionStatus');
    openDurationSpan = document.getElementById('openDuration');
    closedDurationSpan = document.getElementById('closedDuration');
    const startBtn = document.getElementById('startCameraBtn');
    const stopBtn = document.getElementById('stopCameraBtn');
    // Logging
    resetEyeLog();
    if (!webcamVideo || !eyeCanvas || !detectionStatus || !openDurationSpan || !closedDurationSpan || !startBtn || !stopBtn) return;

    // Hide video at start
    webcamVideo.style.display = 'none';
    stopBtn.style.display = 'none';
    startBtn.style.display = '';

    // Reset status
    detectionStatus.textContent = '-';
    openDurationSpan.textContent = '0';
    closedDurationSpan.textContent = '0';

    // Remove previous listeners
    startBtn.onclick = null;
    stopBtn.onclick = null;

    startBtn.onclick = () => {
        if (cameraActive) return;
        cameraActive = true;
        window.cameraActive = cameraActive;
        startBtn.style.display = 'none';
        stopBtn.style.display = '';
        webcamVideo.style.display = '';
        if (!mediapipeLoaded && (!window.FaceMesh || !window.Camera)) {
            const faceMeshScript = document.createElement('script');
            faceMeshScript.src = 'https://unpkg.com/@mediapipe/face_mesh/face_mesh.js';
            document.head.appendChild(faceMeshScript);
            const cameraUtilsScript = document.createElement('script');
            cameraUtilsScript.src = 'https://unpkg.com/@mediapipe/camera_utils/camera_utils.js';
            document.head.appendChild(cameraUtilsScript);
            Promise.all([
                new Promise(resolve => { faceMeshScript.onload = resolve; }),
                new Promise(resolve => { cameraUtilsScript.onload = resolve; })
            ]).then(() => {
                mediapipeLoaded = true;
                if (!faceMeshInitialized) {
                    initializeFaceMesh();
                    faceMeshInitialized = true;
                } else {
                    startWebcam();
                }
                if (!durationInterval) {
                    durationInterval = setInterval(updateDurationOnInterval, 200);
                }
            });
        } else {
            if (!faceMeshInitialized) {
                initializeFaceMesh();
                faceMeshInitialized = true;
            } else {
                startWebcam();
            }
            if (!durationInterval) {
                durationInterval = setInterval(updateDurationOnInterval, 200);
            }
        }
    };

    stopBtn.onclick = () => {
        if (!cameraActive) return;
        cameraActive = false;
        window.cameraActive = cameraActive;
        stopBtn.style.display = 'none';
        startBtn.style.display = '';
        webcamVideo.style.display = 'none';
        if (webcamVideo.srcObject) {
            webcamVideo.srcObject.getTracks().forEach(track => track.stop());
            webcamVideo.srcObject = null;
        }
        if (typeof camera !== 'undefined' && camera && camera.stop) {
            camera.stop();
        }
        detectionStatus.textContent = '-';
        openDuration = 0;
        closedDuration = 0;
        lastEyeStatus = null;
        lastStatusChangeTime = null;
        openDurationSpan.textContent = '0';
        closedDurationSpan.textContent = '0';
        if (durationInterval) {
            clearInterval(durationInterval);
            durationInterval = null;
        }
        // Reset log saat kamera dimatikan
        resetEyeLog();
        // Reload halaman setelah kamera dimatikan
        window.location.reload();
    };

    warningCountSpan = document.getElementById('warningCount');
    if (!warningCountSpan) {
        // Jika elemen belum ada, buat dan sisipkan setelah closedDurationSpan
        warningCountSpan = document.createElement('span');
        warningCountSpan.id = 'warningCount';
        warningCountSpan.style.display = 'block';
        warningCountSpan.style.fontWeight = 'bold';
        warningCountSpan.style.color = '#e53e3e'; // merah
        closedDurationSpan.parentNode.appendChild(warningCountSpan);
    }
    warningCountSpan.textContent = 'Warning = 0';
} 