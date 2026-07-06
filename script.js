document.addEventListener('DOMContentLoaded', () => {
    
    // ================= MOBILE NAVIGATION =================
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-xmark');
        });
    });

    // ================= DARK / LIGHT THEME TOGGLE =================
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check saved theme or system preference
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        body.classList.add('dark-theme');
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const isDark = body.classList.contains('dark-theme');
        
        // Switch icon dynamically
        const icon = themeToggle.querySelector('i');
        if (isDark) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // ================= SCROLL PROGRESS BAR & BACK TO TOP =================
    const progressBar = document.getElementById('progress-bar');
    const topBtn = document.getElementById('topBtn');

    window.addEventListener('scroll', () => {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (totalScroll > 0) {
            const percentage = (window.scrollY / totalScroll) * 100;
            progressBar.style.width = `${percentage}%`;
        }

        // Back to top button visibility trigger
        if (window.scrollY > 400) {
            topBtn.classList.add('show');
        } else {
            topBtn.classList.remove('show');
        }
    });

    topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ================= HERO AUTO-TYPING EFFECT =================
    const typingSpan = document.getElementById('typing');
    const phrases = [
    "Global Pharma Market Access Strategy",
    "CTD Dossier & Regulatory Affairs Expertise",
    "ROW & Regulated Market Expansion",
    "AI-Driven Pharmaceutical Insights",
    "Bridging Innovation with Global Healthcare Markets",
    "International Pharma Business Development",
    "Data-Driven Market Access Solutions"
];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingSpan.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingSpan.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 30 : 60;

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000; // Delay before starting to backspace
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before typing the next phrase
        }

        setTimeout(type, typeSpeed);
    }
    
    if (typingSpan) type();

    // ================= DYNAMIC SCROLL ACTIVE NAV LINK =================
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });
});


// ================= COPYRIGHT YEAR =================
document.getElementById("copyright").innerHTML =
    `© ${new Date().getFullYear()} Samit Islam Rudra. All Rights Reserved.`;