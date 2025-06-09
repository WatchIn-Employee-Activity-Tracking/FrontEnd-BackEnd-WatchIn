import logo from '../../img/WatchIn32white-01.png';

export function renderLanding() {
    return `
        <div class="text-gray-900">
            
            <!--
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">

            <style>
                body {
                    background-color: #fff8f8;
                    font-family: 'Roboto', sans-serif; /* Mengubah font menjadi Roboto */
                }
                *{
                    scroll-behavior: smooth;
                }
                header{
                    /* background-color: #fff8f8; */ /* Kelas Tailwind bg-[#EE3A24] sudah menggantikan ini */
                }
                /* Menghapus style untuk .barMenu */
                /*
                .barMenu{
                    background-color: #f82929;
                    border-radius: 10px;
                    padding: 15px;
                }
                */
                .primaryColor{
                    color: #f82929;
                }
            </style>
            -->

            <header class="flex items-center justify-between px-6 py-4 fixed top-0 left-0 right-0 z-10 bg-[#EE3A24] font-montserrat"> <!-- Menambahkan font-montserrat -->
                <div class="flex items-center space-x-2 font-semibold text-sm">
                    <img src="${logo}" alt="WatchIn Logo" class="w-8 h-8 object-contain" />
                    <span class="text-white">WatchIn</span>
                </div>
                <nav class="hidden md:flex text-sm font-normal text-white space-x-6">   <!-- Memindahkan flex space-x-6 ke sini dan menghapus div barMenu -->
                    <a href="#hero" class="hover:underline">Home</a>   
                    <a href="#fitur" class="hover:underline">Features</a>
                    <a href="#keunggulan" class="hover:underline">Benefits</a>
                    <a href="#kontak" class="hover:underline">Contact Us</a>
                </nav>
                <button class="rounded text-sm font-medium text-white bg-[#EE3A24] border border-white hover:bg-white hover:text-[#EE3A24] transition px-4 py-2" type="button" id="loginButton">
                    Log In
                </button>
            </header>

            <main class="max-w-7xl mx-auto px-6 mt-8 md:mt-0">
                <!-- Hero Section -->
                <section class="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 py-16 md:py-24" id="hero">
                    <div class="max-w-md md:max-w-lg opacity-0 -translate-x-10 transition duration-700 md:ml-8" data-hero-text>
                        <h1 class="text-3xl md:text-4xl font-extrabold leading-tight mb-3 font-montserrat">
                            Bekerja lebih fokus, dimulai dari WatchIn
                        </h1>
                        <p class="text-gray-700 mb-6 text-sm md:text-base">
                            WatchIn memanfaatkan teknologi deteksi mata untuk merekam momen kantuk karyawan secara real-time. Sistem ini mendukung HR dalam meningkatkan produktivitas dan keselamatan kerja.
                        </p>
                        <div class="flex space-x-3">
                            <button class="bg-[#EE3A24] text-white px-6 py-4 rounded-full text-sm font-semibold flex items-center space-x-2 hover:bg-[#8c271b] transition" type="button" id="getStartedButton">
                                <span>Get Started</span>
                                <svg aria-hidden="true" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="flex-shrink-0 w-full max-w-lg opacity-0 translate-x-10 transition duration-700 md:mr-8" data-hero-img>
                        <img alt="Illustration of a video player interface" class="w-full rounded-lg" draggable="false" height="400" src="https://storage.googleapis.com/a1aa/image/a45e34ca-6162-4f1f-cbde-ef6d8955af60.jpg" width="600"/>
                    </div>
                </section>

                <!-- Fitur Section -->
                <section class="rounded-lg h-screen flex items-center" id="fitur">
                    <div class="max-w-5xl mx-auto text-center">
                        <h2 class="font-extrabold text-3xl md:text-4xl mb-14 font-montserrat">
                            Smart Features Built for Real Needs
                        </h2>
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-gray-700 text-xs md:text-sm">
                            <div class="flex flex-col items-center space-y-2 border border-[#EE3A24] rounded-xl p-4 bg-white shadow-lg transition duration-500 hover:scale-105 opacity-0 translate-y-10" data-feature-card data-index="0">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-8 h-8 mx-auto" fill="#EE3A24"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
                                <p class="text-center font-bold text-lg text-[#EE3A24]">Real-Time Eye Detection</p>
                                <p class="text-center">
                                    Pantau pergerakan mata secara real-time untuk meningkatkan keamanan dan interaksi cerdas. Cocok untuk sistem monitoring.
                                </p>
                            </div>

                            <div class="flex flex-col items-center space-y-2 border border-[#EE3A24] rounded-xl p-4 bg-white shadow-lg transition duration-500 hover:scale-105 opacity-0 translate-y-10" data-feature-card data-index="1">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-8 h-8 mx-auto" fill="#EE3A24"><path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l224 0 0-112c0-26.5 21.5-48 48-48l112 0 0-224c0-35.3-28.7-64-64-64L64 32zM448 352l-45.3 0L336 352c-8.8 0-16 7.2-16 16l0 66.7 0 45.3 32-32 64-64 32-32z"/></svg>
                                <p class="text-center font-bold text-lg text-[#EE3A24]">Accurate Logging Capture</p>
                                <p class="text-center">
                                    Merekam momen kantuk karyawan secara real-time untuk meningkatkan konsentrasi pada saat bekerja.
                                </p>
                            </div>

                            <div class="flex flex-col items-center space-y-2 border border-[#EE3A24] rounded-xl p-4 bg-white shadow-lg transition duration-500 hover:scale-105 opacity-0 translate-y-10" data-feature-card data-index="2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-8 h-8 mx-auto" fill="#EE3A24"><path d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416l384 0c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8l0-18.8c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/></svg>
                                <p class="text-center font-bold text-lg text-[#EE3A24]">Smart Break Reminder</p>
                                <p class="text-center">
                                    Berikan pengingat istirahat otomatis berbasis analisis aktivitas untuk mencegah kelelahan.
                            </div>

                            <div class="flex flex-col items-center space-y-2 border border-[#EE3A24] rounded-xl p-4 bg-white shadow-lg transition duration-500 hover:scale-105 opacity-0 translate-y-10" data-feature-card data-index="3">
                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-8 h-8 mx-auto" fill="#EE3A24"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg>
                                <p class="text-center font-bold text-lg text-[#EE3A24]">Employee Activity Monitoring</p>
                                <p class="text-center">
                                    Pantau aktivitas kerja karyawan secara real-time untuk membantu HR dalam menilai produktivitas dan kehadiran virtual.
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Keunggulan Section -->
                <section class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 py-16 md:py-24" id="keunggulan">
                    <div class="flex-shrink-0 w-full max-w-lg opacity-0 translate-x-10 transition duration-700 md:mr-8 md:order-0" data-hero-img>
                        <img alt="Illustration of a video player interface" class="w-full rounded-lg" draggable="false" height="400" src="https://storage.googleapis.com/a1aa/image/a45e34ca-6162-4f1f-cbde-ef6d8955af60.jpg" width="600"/>
                    </div>
                    <div class="max-w-md md:max-w-lg opacity-0 -translate-x-10 transition duration-700 md:ml-8 md:order-1" data-hero-text>
                        <h1 class="text-3xl md:text-4xl font-extrabold leading-tight mb-3 font-montserrat">
                           Keunggulan WatchIn untuk Produktivitas
                        </h1>
                        <p class="text-gray-700 mb-6 text-sm md:text-base">
                           WatchIn menawarkan solusi monitoring cerdas berbasis deteksi mata untuk memastikan karyawan tetap fokus dan aman selama bekerja. Dengan fitur real-time alert, logging otomatis, dan pengingat istirahat, WatchIn membantu perusahaan meningkatkan produktivitas sekaligus menjaga kesehatan karyawan.                        </p>
                    </div>
                </section>

                <!-- Contact Section -->
                <section class="max-w-3xl mx-auto px-6 pb-16 min-h-screen flex flex-col justify-center py-24" id="kontak">
                    <h2 class="font-extrabold text-lg md:text-3xl mb-8 text-center font-montserrat opacity-0 translate-y-10 transition duration-700" data-contact-parallax>
                        Support us with your feedback
                    </h2>
                    <form id="contactForm" class="space-y-4 opacity-0 translate-y-10 transition duration-700" data-contact-parallax>
                        <div>
                            <label class="block text-xs font-normal mb-1" for="inputEmail">Email</label>
                            <input class="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" id="inputEmail" placeholder="youremail@email.com" type="email" required/>
                        </div>
                        <div>
                            <label class="block text-xs font-normal mb-1" for="inputMessage">Pesan</label>
                            <textarea class="w-full border border-gray-300 rounded px-3 py-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent min-h-[150px]" id="inputMessage" placeholder="Tulis pesan Anda di sini..." required></textarea>
                        </div>
                        <div class="text-center">
                            <button class="bg-[#EE3A24] text-white px-6 py-4 rounded-full text-xs font-semibold hover:bg-blue-700 transition" type="submit">
                                Send Message
                            </button>
                        </div>
                    </form>
                </section>
            </main>

            <footer class="bg-gray-700 text-gray-300 text-sm">
                <div class="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between">
                    <div class="flex items-center space-x-2 mb-6 md:mb-0">
                    <img src="${logo}" alt="WatchIn Logo" class="w-8 h-8 object-contain" />
                        <span>WatchIn</span>
                    </div>
                    <div class="flex flex-col md:flex-row md:items-center md:space-x-6 text-xs md:text-sm">
                        <p class="mb-4 md:mb-0">WatchIn © 2025. All rights reserved.</p>
                        <div class="flex space-x-4 mb-4 md:mb-0">
                            <a aria-label="YouTube" class="hover:text-white" href="#"><i class="fab fa-youtube fa-lg"></i></a>
                            <a aria-label="Facebook" class="hover:text-white" href="#"><i class="fab fa-facebook-f fa-lg"></i></a>
                            <a aria-label="Twitter" class="hover:text-white" href="#"><i class="fab fa-twitter fa-lg"></i></a>
                            <a aria-label="Instagram" class="hover:text-white" href="#"><i class="fab fa-instagram fa-lg"></i></a>
                            <a aria-label="LinkedIn" class="hover:text-white" href="#"><i class="fab fa-linkedin-in fa-lg"></i></a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    `;
} 