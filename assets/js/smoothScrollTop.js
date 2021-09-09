/*==================== SMOOTH SCROLL TOP ====================*/

/*==================== SHOW SCROLL TOP ====================*/
function scrollTop() {
    const scrollTop = document.getElementById('scroll-up');
    if (this.scrollY >= 200) {
        scrollTop.classList.add('show-scroll');
    } else {
        scrollTop.classList.remove('show-scroll');
    }
}
window.addEventListener('scroll', scrollTop);

/*==================== SMOOTH SCROLL BEHAVIOR ====================*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Close mobile menu if open
            const navMenu = document.getElementById('nav-menu');
            if (navMenu.classList.contains('show-menu')) {
                navMenu.classList.remove('show-menu');
            }
            
            // Calculate scroll position with offset
            const headerHeight = document.querySelector('.l-header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            // Animate scroll with smooth easing
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update active nav link after scroll
            document.querySelectorAll('.nav__link').forEach(link => {
                link.classList.remove('active-link');
            });
            this.classList.add('active-link');
        }
    });
});

/*==================== SCROLL UP BUTTON FUNCTIONALITY ====================*/
const scrollUpButton = document.getElementById('scroll-up');
if (scrollUpButton) {
    scrollUpButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Smooth scroll to top with animation
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
