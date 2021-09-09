/*==================== MAIN JAVASCRIPT ====================*/

/*==================== SHOW MENU ====================*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show-menu');
        })
    }
}
showMenu('nav-toggle', 'nav-menu');

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        let sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        };
    });
}
window.addEventListener('scroll', scrollActive);

/*==================== REDUCE THE SIZE AND PRINT ON AN A4 SHEET ====================*/
function scaleCv() {
    document.body.classList.add('scale-cv');
}

/*==================== REMOVE THE SIZE WHEN THE CV IS DOWNLOADED ====================*/
function removeScale() {
    document.body.classList.remove('scale-cv');
}

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'bx-sun';

const downloadBtnDark = document.querySelectorAll('.home__button-movi');
const lightBtn = document.getElementById('light-resume');
const darkBtn = document.getElementById('dark-resume');

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun';

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark theme
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme);
}

// Toggle download buttons based on theme
function toggleDownloadButtons() {
    if (document.body.classList.contains('dark-theme')) {
        downloadBtnDark[0].classList.remove('active-btn');
        downloadBtnDark[1].classList.add('active-btn');
    } else {
        downloadBtnDark[0].classList.add('active-btn');
        downloadBtnDark[1].classList.remove('active-btn');
    }
}

// Initialize button state
toggleDownloadButtons();

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    
    // Toggle download buttons
    toggleDownloadButtons();
    
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});

/*==================== GENERATE PDF ====================*/
let areaCv = document.getElementById('area-cv');
let resumeButton = document.getElementById('resume-button');
let lightResumeBtn = document.getElementById('light-resume');
let darkResumeBtn = document.getElementById('dark-resume');

let opt = {
    margin: 1,
    filename: 'myResume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 4 },
    jsPDF: { format: 'a4', orientation: 'portrait' }
};

function generateLightResume() {
    document.body.classList.remove('dark-theme');
    opt.filename = 'myResumeLight.pdf';
    html2pdf(areaCv, opt);
}

function generateDarkResume() {
    document.body.classList.add('dark-theme');
    opt.filename = 'myResumeDark.pdf';
    html2pdf(areaCv, opt);
}

function generateResume() {
    // Default (for the resume button)
    opt.filename = 'myResume.pdf';
    html2pdf(areaCv, opt);
}

// Main download button
resumeButton.addEventListener('click', () => {
    scaleCv();
    generateResume();
    setTimeout(removeScale, 5000);
});

// Light theme download button
lightResumeBtn.addEventListener('click', () => {
    scaleCv();
    generateLightResume();
    setTimeout(() => {
        removeScale();
        toggleDownloadButtons(); // Reset button states after download
    }, 5000);
});

// Dark theme download button
darkResumeBtn.addEventListener('click', () => {
    scaleCv();
    generateDarkResume();
    setTimeout(() => {
        removeScale();
        toggleDownloadButtons(); // Reset button states after download
    }, 5000);
});

/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '30px',
    duration: 800,
    reset: true
});

sr.reveal(`.home__data, .home__address,
          .section-title,
          .profile__description,
          .social__container,
          .skills__content,
          .education__content,
          .experience__content,
          .certificates__content,
          .languages__content,
          .interests__content`, {
    interval: 100
});
