const webcamVideo = document.getElementById('webcamVideo');
const eyeCanvas = document.getElementById('eyeCanvas');
const detectionStatus = document.getElementById('detectionStatus');
const ctx = eyeCanvas.getContext('2d');

// ukuran input model di backend (224x224)
const MODEL_INPUT_SIZE = 224;
eyeCanvas.width = MODEL_INPUT_SIZE;
eyeCanvas.height = MODEL_INPUT_SIZE;


const API_URL = 'https://watchin-be-model-314371797274.asia-southeast2.run.app/predict';

let faceMesh; // Objek FaceMesh dari MediaPipe
let camera;   // Objek Camera dari MediaPipe Camera Utils
let lastSentTime = 0;
const SEND_INTERVAL = 200; // Kirim frame setiap 200ms

// Indeks landmark untuk mata kiri dan kanan dari MediaPipe Face Mesh
// Ini adalah subset dari 468 landmark yang mewakili kontur mata.
// Anda bisa menambahkan atau mengurangi indeks sesuai kebutuhan presisi cropping.
const LEFT_EYE_LANDMARKS = [
    33, 7, 163, 144, 145, 153, 154, 155, // Outer contour
    133, 173, 157, 158, 159, 160, 161, 246 // Inner contour
];
const RIGHT_EYE_LANDMARKS = [
    362, 382, 381, 380, 374, 373, 390, 249, // Outer contour
    386, 398, 384, 385, 387, 388, 466, 263 // Inner contour
];

// Fungsi untuk mendapatkan bounding box dari sekumpulan landmark
function getEyeBoundingBox(landmarks, videoWidth, videoHeight) {
    if (landmarks.length === 0) return null;

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const landmark of landmarks) {
        // Landmark dinormalisasi (0-1), konversi ke piksel
        const x = landmark.x * videoWidth;
        const y = landmark.y * videoHeight;

        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
    }

    // Tambahkan sedikit padding untuk memastikan seluruh mata tercakup
    const padding = 20; // Sesuaikan padding sesuai kebutuhan, bisa lebih besar jika cropping terlalu ketat
    minX = Math.max(0, minX - padding);
    minY = Math.max(0, minY - padding);
    maxX = Math.min(videoWidth, maxX + padding);
    maxY = Math.min(videoHeight, maxY + padding);

    return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY
    };
}


// Inisialisasi MediaPipe Face Mesh
async function initializeFaceMesh() {
    faceMesh = new FaceMesh({
        locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
        }
    });

    faceMesh.setOptions({
        maxNumFaces: 1, // Hanya deteksi satu wajah untuk efisiensi
        refineLandmarks: true, // Meningkatkan kualitas landmark untuk area sensitif seperti mata
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    });

    // Callback saat hasil deteksi tersedia
    faceMesh.onResults(onResults);

    detectionStatus.textContent = 'Initializing webcam and face mesh...';
    await startWebcam();
}

async function startWebcam() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        webcamVideo.srcObject = stream;
        detectionStatus.textContent = 'Webcam active. Waiting for face detection...';

        // Gunakan Camera dari MediaPipe untuk mengirim frame ke FaceMesh
        camera = new Camera(webcamVideo, {
            onFrame: async () => {
                await faceMesh.send({ image: webcamVideo });
            },
            width: 640,
            height: 480
        });
        await camera.start(); // Mulai stream kamera dan proses frame
        console.log('Camera started, sending frames to FaceMesh.');

    } catch (err) {
        console.error('Error accessing webcam:', err);
        detectionStatus.textContent = `Error: ${err.message}. Please allow webcam access.`;
    }
}

// Fungsi callback saat MediaPipe Face Mesh menghasilkan hasil
async function onResults(results) {
    ctx.clearRect(0, 0, eyeCanvas.width, eyeCanvas.height); // Bersihkan canvas

    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
        const landmarks = results.multiFaceLandmarks[0]; // Ambil landmark wajah pertama
        const videoWidth = webcamVideo.videoWidth;
        const videoHeight = webcamVideo.videoHeight;

        // Kumpulkan landmark mata kiri dan kanan
        const leftEyePoints = LEFT_EYE_LANDMARKS.map(index => landmarks[index]);
        const rightEyePoints = RIGHT_EYE_LANDMARKS.map(index => landmarks[index]);

        // Gabungkan semua landmark mata untuk mendapatkan satu bounding box yang mencakup kedua mata
        const allEyePoints = [...leftEyePoints, ...rightEyePoints];
        const eyeBoundingBox = getEyeBoundingBox(allEyePoints, videoWidth, videoHeight);

        if (eyeBoundingBox) {
            const { x, y, width, height } = eyeBoundingBox;

            // Pastikan koordinat tidak melebihi batas video
            const sourceX = Math.max(0, x);
            const sourceY = Math.max(0, y);
            const sourceWidth = Math.min(videoWidth - sourceX, width);
            const sourceHeight = Math.min(videoHeight - sourceY, height);

            // Gambar hanya area mata yang dipotong ke eyeCanvas
            // eyeCanvas.width dan eyeCanvas.height sudah diatur ke MODEL_INPUT_SIZE (224x224)
            ctx.drawImage(
                webcamVideo,
                sourceX, sourceY, sourceWidth, sourceHeight, // Sumber: area mata dari video
                0, 0, eyeCanvas.width, eyeCanvas.height      // Tujuan: seluruh canvas (akan discale ke 224x224)
            );

            // Kirim frame ke backend dengan throttling
            const currentTime = Date.now();
            if (currentTime - lastSentTime > SEND_INTERVAL) {
                lastSentTime = currentTime;
                const imageDataUrl = eyeCanvas.toDataURL('image/jpeg', 0.8); // Kualitas 80%

                try {
                    const response = await fetch(API_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ imageData: imageDataUrl })
                    });

                    const result = await response.json();

                    if (result.status === 'success') {
                        // Asumsi backend mengirim:
                        // result.prediction: 'Opened' atau 'Closed'
                        // result.confidence: confidence score untuk kelas yang diprediksi
                        // Jika backend mengembalikan array, Anda perlu menyesuaikan pengambilan confidence di sini
                        // Contoh: jika backend mengirim { predictionArray: [0.9, 0.1] } untuk Opened: 0, Closed: 1
                        // const openedConfidence = result.predictionArray[0];
                        // const closedConfidence = result.predictionArray[1];

                        const predictedClassFromBackend = result.prediction;
                        const confidenceFromBackend = result.confidence; // Ini adalah confidence dari kelas yang diprediksi

                        let displayPredictedClass;
                        let displayConfidence;
                        const OPENED_THRESHOLD = 0.5; // Ambang batas kepercayaan untuk kelas 'Opened'

                        // Sesuaikan ini jika Anda ingin menggunakan logika ambang batas di frontend
                        // dan backend hanya mengirim array confidence.
                        // Namun, jika backend sudah memproses ambang batas dan mengirim 'Opened' atau 'Closed'
                        // berdasarkan logika tersebut, maka langsung gunakan saja hasilnya.
                        
                        // Dalam kasus ini, kita asumsikan backend sudah memproses ambang batas
                        // dan mengirimkan predictedClass serta confidence yang relevan.
                        displayPredictedClass = predictedClassFromBackend;
                        displayConfidence = confidenceFromBackend;

                        // detectionStatus.textContent = `Eye Status: ${displayPredictedClass} (Confidence: ${displayConfidence.toFixed(2)})`;
                        detectionStatus.textContent = `${displayPredictedClass}`;                        
                        detectionStatus.className = ''; // Hapus kelas sebelumnya
                        if (displayPredictedClass === 'Opened') {
                            detectionStatus.classList.add('green');
                        } else {
                            detectionStatus.classList.add('red');
                        }

                    } else {
                        detectionStatus.textContent = `Detection Error: ${result.error}`;
                        detectionStatus.classList.add('orange');
                    }
                } catch (error) {
                    console.error('Error sending frame to backend:', error);
                    detectionStatus.textContent = `Network Error: ${error.message}`;
                    detectionStatus.classList.add('red');
                }
            }
        }
    } else {
        detectionStatus.textContent = 'No face detected.';
        detectionStatus.classList.add('gray');
    }
}

// Mulai inisialisasi saat halaman dimuat
initializeFaceMesh();