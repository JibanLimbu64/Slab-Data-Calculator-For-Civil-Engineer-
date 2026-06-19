
function renderNavbar(targetId) {
    const navbarHTML = `
    <nav class="navbar" id="navbar">
        <div class="container nav-container">
            <div class="logo">सिभिल इन्जिनियरिङ शाखा<span></span></div>
            <div class="nav-links">
                <a href="#home">गृह</a>
                <a href="#services">सेवाहरू</a>
                <a href="#technology">प्रविधि</a>
                <a href="#projects">परियोजनाहरू</a>
                <a href="#contact">सम्पर्क</a>
                <a href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSMTtQLDjlXDLcZWnqvBfQdFzMSqrBMNNXcPHJgpVKJNszSkXMMpjVZMGWsDlrSBdZWRKDfn"
                    class="nav-btn" target="_blank">कृपया मलाई इमेल गर्नुहोस्</a>
                <a href="login.html" class="nav-btn" target="_blank">लग इन</a>
                <a href="signup.html" class="nav-btn" target="_blank">दर्ता गर्नुहोस्</a>
                <a href="signup.html" class="nav-btn" target="_blank">AI</a>
            </div>
            <div class="menu-btn" id="menuBtn">
                <i class="fas fa-bars"></i>
            </div>
        </div>
    </nav>
    `;

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.innerHTML = navbarHTML;

        // Re-attach the mobile menu logic safely
        setupMenuToggle();
    } else {
        // Fixed: Removed the unnecessary backslashes
        console.error(`Element with id "${targetId}" not found.`);
    }
}

function setupMenuToggle() {
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        // Cleaning up any old listeners before adding a new one to prevent double-firing bugs
        menuBtn.removeEventListener('click', toggleMenu);
        menuBtn.addEventListener('click', toggleMenu);
    }
}

// Separate named function to handle the toggle cleanly
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}