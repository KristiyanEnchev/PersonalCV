/**
 * Implements smooth scrolling functionality for navigation links
 * Uses easing functions for a natural animation effect
 * 
 * @param {Event} event - The click event object
 */
function smoothScroll(event) {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href') === '#' ? '.header' : event.currentTarget.getAttribute('href');
    const targetPosition = document.querySelector(targetId).offsetTop;
    // const targetPosition = 0;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 750;
    let startTime = null;

    function step(timestamp) {
        if (!startTime) {
            startTime = timestamp;
        }

        const progress = timestamp - startTime;

        let run = easeInOutCubic(progress, startPosition, distance, duration);
        window.scrollTo(0, run);

        if (progress < duration) {
            requestAnimationFrame(step);
        }
    }

    /**
     * Cubic easing in/out function for smooth animation
     * Accelerates in the first half and decelerates in the second half
     * 
     * @param {number} t - Current time
     * @param {number} b - Start value
     * @param {number} c - Change in value
     * @param {number} d - Duration
     * @returns {number} - Calculated position
     */
    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    requestAnimationFrame(step);
}

/**
 * Initialize smooth scrolling for navigation elements
 * Attaches event listeners to navigation links and scroll button
 */

// Get all required elements for smooth scrolling
let scrollUpBtn = document.getElementById('scroll-up');
let allSections = document.querySelectorAll('.nav__item');
let navlogo = document.querySelector('.nav__logo');

// Attach event listeners to the elements
scrollUpBtn.addEventListener('click', smoothScroll);
navlogo.addEventListener('click', smoothScroll);

// Add smooth scrolling to each navigation link
allSections.forEach(section => {
    let navLink = section.querySelector('.nav__link');
    navLink.addEventListener('click', smoothScroll);
});