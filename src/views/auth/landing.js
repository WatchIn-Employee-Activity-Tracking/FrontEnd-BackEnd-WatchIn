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
                    <svg aria-hidden="true" class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="1.5" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 7.5V6a3 3 0 013-3h3m12 3v1.5m-6 0v12m0 0H6a3 3 0 01-3-3v-3m15-6h3a3 3 0 013 3v3m-6-6h.008v.008H15V9z" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
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

            <main class="max-w-7xl mx-auto px-6">
                <!-- Hero Section -->
                <section class="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 py-16 md:py-24" id="hero">
                    <div class="max-w-md md:max-w-lg">
                        <h1 class="text-2xl md:text-3xl font-extrabold leading-tight mb-3 font-montserrat">
                            WatchIn
                        </h1>
                        <p class="text-gray-700 mb-6 text-sm md:text-base">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ornare ullamcorper diam. Ut sit amet risus viverra, pharetra lacus quis.
                        </p>
                        <div class="flex space-x-3">
                            <button class="bg-blue-600 text-white px-5 py-2 rounded text-sm font-semibold flex items-center space-x-2 hover:bg-blue-700 transition" type="button">
                                <span>Primary Action</span>
                                <svg aria-hidden="true" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </button>
                            <button class="border border-blue-600 text-blue-600 px-5 py-2 rounded text-sm font-semibold hover:bg-blue-50 transition" type="button">
                                Secondary Action
                            </button>
                        </div>
                    </div>
                    <div class="flex-shrink-0 w-full max-w-lg">
                        <img alt="Illustration of a video player interface" class="w-full rounded-lg" draggable="false" height="400" src="https://storage.googleapis.com/a1aa/image/a45e34ca-6162-4f1f-cbde-ef6d8955af60.jpg" width="600"/>
                    </div>
                </section>

                <!-- Fitur Section -->
                <section class="rounded-lg h-screen flex items-center" id="fitur">
                    <div class="max-w-5xl mx-auto text-center">
                        <p class="text-xs font-semibold text-blue-900 mb-2 tracking-widest font-montserrat">THE TOOLS YOU NEED</p>
                        <h2 class="font-extrabold text-lg md:text-xl mb-10 font-montserrat">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </h2>
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-gray-700 text-xs md:text-sm">
                            <div class="flex flex-col items-center space-y-2">
                                <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 7.5V6a3 3 0 013-3h3m12 3v1.5m-6 0v12m0 0H6a3 3 0 01-3-3v-3m15-6h3a3 3 0 013 3v3m-6-6h.008v.008H15V9z" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                                <p class="text-center">Egestas elit dui scelerisque ut eu purus aliquam vitae habitasse.</p>
                            </div>
                            <!-- Repeat for other features -->
                        </div>
                        <button class="mt-10 bg-blue-600 text-white px-6 py-2 rounded text-sm font-semibold hover:bg-blue-700 transition" type="button">
                            Primary Action
                        </button>
                    </div>
                </section>

                <!-- Keunggulan Section -->
                <section class="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 py-16 md:py-24" id="keunggulan">
                    <div class="flex-shrink-0 w-full max-w-lg order-1 md:order-0">
                        <img alt="Illustration of a video player interface" class="w-full rounded-lg" draggable="false" height="400" src="https://storage.googleapis.com/a1aa/image/a45e34ca-6162-4f1f-cbde-ef6d8955af60.jpg" width="600"/>
                    </div>
                    <div class="max-w-md md:max-w-lg">
                        <h2 class="text-xl md:text-2xl font-extrabold leading-tight mb-3 font-montserrat">
                            Bibendum amet at molestie mattis.
                        </h2>
                        <p class="text-gray-700 text-sm md:text-base">
                            Rhoncus morbi et augue nec, in id ullamcorper at sit. Condimentum sit nunc in eros scelerisque sed. Commodo in viverra nunc, ullamcorper ut. Non, amet, aliquet scelerisque nullam sagittis, pulvinar.
                        </p>
                    </div>
                </section>

                <!-- Contact Section -->
                <section class="max-w-3xl mx-auto px-6 pb-16" id="kontak">
                    <p class="text-xs font-semibold text-blue-900 mb-2 tracking-widest font-montserrat">CONTACT ME</p>
                    <h2 class="font-extrabold text-lg md:text-xl mb-8 text-center font-montserrat">
                        Bibendum amet at molestie mattis.
                    </h2>
                    <form id="contactForm" class="space-y-4">
                        <div>
                            <label class="block text-xs font-normal mb-1" for="input1">Label Name</label>
                            <input class="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" id="input1" placeholder="Placeholder" type="text"/>
                        </div>
                        <!-- Add other form fields -->
                        <div class="text-center">
                            <button class="bg-blue-600 text-white px-6 py-1 rounded text-xs font-semibold hover:bg-blue-700 transition" type="submit">
                                Send Message
                            </button>
                        </div>
                    </form>
                </section>
            </main>

            <footer class="bg-gray-700 text-gray-300 text-sm">
                <div class="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between">
                    <div class="flex items-center space-x-2 mb-6 md:mb-0">
                        <svg aria-hidden="true" class="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" stroke-width="1.5" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 7.5V6a3 3 0 013-3h3m12 3v1.5m-6 0v12m0 0H6a3 3 0 01-3-3v-3m15-6h3a3 3 0 013 3v3m-6-6h.008v.008H15V9z" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                        <span>WatchIn</span>
                    </div>
                    <div class="flex flex-col md:flex-row md:items-center md:space-x-6 text-xs md:text-sm">
                        <p class="mb-4 md:mb-0">CompanyName © 2023. All rights reserved.</p>
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