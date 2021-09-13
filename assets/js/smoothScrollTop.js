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

    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    };

    requestAnimationFrame(step);
}

let scrollUpBtn = document.getElementById('scroll-up');
let allSections = document.querySelectorAll('.nav__item');
let navlogo = document.querySelector('.nav__logo');

scrollUpBtn.addEventListener('click', smoothScroll);

navlogo.addEventListener('click', smoothScroll);

allSections.forEach(section => {
    let some = section.querySelector('.nav__link');
    some.addEventListener('click', smoothScroll);
});function smoothScroll(event) {
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

    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    };

    requestAnimationFrame(step);
}

let scrollUpBtn = document.getElementById('scroll-up');
let allSections = document.querySelectorAll('.nav__item');
let navlogo = document.querySelector('.nav__logo');

scrollUpBtn.addEventListener('click', smoothScroll);

navlogo.addEventListener('click', smoothScroll);

allSections.forEach(section => {
    let some = section.querySelector('.nav__link');
    some.addEventListener('click', smoothScroll);
});
