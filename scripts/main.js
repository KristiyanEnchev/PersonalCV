/**
 * CV Project - Main JavaScript
 * Handles PDF generation and UI interactions
 */

class CVManager {
    constructor () {
        this.loadingOverlay = null;
        this.downloadBtn = null;
        this.init();
    }

    /**
     * Initialize the CV application
     */
    init() {
        this.bindElements();
        this.setupEventListeners();
    }

    /**
     * Bind DOM elements
     */
    bindElements() {
        this.loadingOverlay = document.getElementById('loadingOverlay');
        this.downloadBtn = document.getElementById('downloadBtn');
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        if (this.downloadBtn) {
            this.downloadBtn.addEventListener('click', () => this.generatePDF());
        }
    }

    /**
     * Show loading overlay
     */
    showLoading() {
        if (this.loadingOverlay) {
            this.loadingOverlay.classList.add('active');
        }
    }

    /**
     * Hide loading overlay
     */
    hideLoading() {
        if (this.loadingOverlay) {
            this.loadingOverlay.classList.remove('active');
        }
    }

    /**
     * Generate and download PDF
     */
    async generatePDF() {
        try {
            this.showLoading();

            const element = document.getElementById('cv-content');
            if (!element) {
                throw new Error('CV content element not found');
            }

            // Clone the element to avoid modifying the original
            const clonedElement = element.cloneNode(true);

            // Remove download button from cloned element
            const downloadBtnClone = clonedElement.querySelector('#downloadBtn');
            if (downloadBtnClone) {
                downloadBtnClone.remove();
            }

            // Apply print optimizations
            this.optimizeForPrint(clonedElement);

            // Configure PDF options
            const options = {
                margin: [-2, -2.5, 0, 0],
                filename: 'Kristiyan_Enchev_CV.pdf',
                image: {
                    type: 'jpeg',
                    quality: 0.98
                },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    letterRendering: true,
                    logging: false
                },
                jsPDF: {
                    unit: 'mm',
                    format: 'a4',
                    orientation: 'portrait',
                    compress: true
                },
                pagebreak: {
                    mode: 'avoid-all'
                }
            };

            // Generate PDF
            await html2pdf()
                .from(clonedElement)
                .set(options)
                .save();

            // Hide loading after successful generation
            setTimeout(() => {
                this.hideLoading();
            }, 500);

        } catch (error) {
            console.error('PDF generation error:', error);
            this.hideLoading();
            this.showError('There was an error generating the PDF. Please try again.');
        }
    }

    /**
     * Apply print optimizations to cloned element
     * @param {HTMLElement} element - Cloned CV content element
     */
    optimizeForPrint(element) {
        // Optimize experience section for compact PDF layout
        this.optimizeExperienceForPrint(element);

        // Add page break after experience section
        const experienceSection = element.querySelector('.experience-section');
        if (experienceSection) {
            experienceSection.style.pageBreakAfter = 'always';
        }

        // Optimize projects section layout for print
        const projectsSection = element.querySelector('.grid-section:not(:has(.main-section-title.extramcert))');
        if (projectsSection) {
            projectsSection.style.marginBottom = '0.8rem';
            projectsSection.style.marginTop = '1.5rem';

            const projectsGrid = projectsSection.querySelector('.projects-grid');
            if (projectsGrid) {
                projectsGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
                projectsGrid.style.gap = '1rem';
            }

            const projectCards = projectsSection.querySelectorAll('.project-card');
            projectCards.forEach(card => {
                card.style.padding = '0.15rem';
                card.style.marginBottom = '0.3rem';
            });
        }

        // Adjust sidebar spacing for print
        this.optimizeSidebarForPrint(element);

        // Optimize education section
        this.optimizeEducationForPrint(element);

        // Optimize certificates section
        this.optimizeCertificatesForPrint(element);
    }

    /**
     * Optimize experience section for compact PDF layout
     * @param {HTMLElement} element - Cloned CV content element
     */
    optimizeExperienceForPrint(element) {
        const experienceSection = element.querySelector('.experience-section');
        if (!experienceSection) return;

        // Moderate section spacing - not too compact
        experienceSection.style.marginBottom = '1.2rem';

        // Optimize timeline spacing
        const timeline = experienceSection.querySelector('.timeline');
        if (timeline) {
            timeline.style.paddingBottom = '0.3rem';
        }

        // Moderate timeline row spacing
        const timelineRows = experienceSection.querySelectorAll('.timeline-row');
        timelineRows.forEach(row => {
            row.style.marginBottom = '0.6rem';
        });

        // Optimize timeline content boxes - not too small
        const timelineContents = experienceSection.querySelectorAll('.timeline-content');
        timelineContents.forEach(content => {
            content.style.padding = '0.7rem';
            content.style.marginBottom = '0.2rem';
        });

        // Moderate spacing for timeline-right elements
        const timelineRights = experienceSection.querySelectorAll('.timeline-right');
        timelineRights.forEach(right => {
            right.style.marginTop = '1.2rem';
        });

        // Optimize text spacing - readable but compact
        const timelineTexts = experienceSection.querySelectorAll('.timeline-text');
        timelineTexts.forEach(text => {
            text.style.fontSize = '0.72rem';
            text.style.lineHeight = '1.35';
        });

        // Optimize titles and subtitles
        const timelineTitles = experienceSection.querySelectorAll('.timeline-title');
        timelineTitles.forEach(title => {
            title.style.marginBottom = '0.15rem';
            title.style.fontSize = '0.92rem';
        });

        const timelineSubtitles = experienceSection.querySelectorAll('.timeline-subtitle');
        timelineSubtitles.forEach(subtitle => {
            subtitle.style.marginBottom = '0.35rem';
            subtitle.style.fontSize = '0.77rem';
        });
    }

    /**
     * Optimize sidebar sections for print
     * @param {HTMLElement} element - Cloned CV content element
     */
    optimizeSidebarForPrint(element) {
        const skillsSection = element.querySelector('.sidebar-section:has(.section-title.extrams)');
        if (skillsSection) {
            skillsSection.style.marginTop = '4.8rem';
        }

        const languagesSection = element.querySelector('.sidebar-section:has(.section-title.extramlang)');
        if (languagesSection) {
            languagesSection.style.marginTop = '2.8rem';
        }

        const interestsSection = element.querySelector('.sidebar-section:has(.section-title.extramint)');
        if (interestsSection) {
            interestsSection.style.marginTop = '2.8rem';
        }

        // Optimize sidebar section spacing to fill page better
        const allSidebarSections = element.querySelectorAll('.sidebar-section');
        allSidebarSections.forEach(section => {
            section.style.marginBottom = '1.1rem';
        });
    }

    /**
     * Optimize education section for print
     * @param {HTMLElement} element - Cloned CV content element
     */
    optimizeEducationForPrint(element) {
        const educationSection = element.querySelector('.timeline-section:not(.experience-section)');
        if (educationSection) {
            educationSection.style.marginTop = '4.7rem';
            educationSection.style.marginBottom = '0.5rem';

            // Optimize timeline content in education section
            const timelineContents = educationSection.querySelectorAll('.timeline-content');
            timelineContents.forEach(content => {
                content.style.padding = '0.5rem';
            });

            // Timeline rows in education
            const timelineRows = educationSection.querySelectorAll('.timeline-row');
            timelineRows.forEach(row => {
                row.style.marginBottom = '0.5rem';
            });

            // Timeline-right spacing in education
            const timelineRights = educationSection.querySelectorAll('.timeline-right');
            timelineRights.forEach(right => {
                right.style.marginTop = '1rem';
            });

            // Text in education timeline
            const timelineTexts = educationSection.querySelectorAll('.timeline-text, .timeline-year');
            timelineTexts.forEach(text => {
                text.style.fontSize = '0.68rem';
                text.style.lineHeight = '1.25';
            });

            const timelineTitles = educationSection.querySelectorAll('.timeline-title');
            timelineTitles.forEach(title => {
                title.style.fontSize = '0.88rem';
                title.style.marginBottom = '0.12rem';
            });

            const timelineSubtitles = educationSection.querySelectorAll('.timeline-subtitle');
            timelineSubtitles.forEach(subtitle => {
                subtitle.style.fontSize = '0.72rem';
                subtitle.style.marginBottom = '0.25rem';
            });
        }
    }

    /**
     * Optimize certificates section for print
     * @param {HTMLElement} element - Cloned CV content element
     */
    optimizeCertificatesForPrint(element) {
        const certificatesSection = element.querySelector('.grid-section:has(.main-section-title.extramcert)');
        if (certificatesSection) {
            certificatesSection.style.marginTop = '2rem';
            certificatesSection.style.paddingBottom = '0.2rem';

            const certificateItems = certificatesSection.querySelectorAll('.certificate-item');
            certificateItems.forEach(item => {
                // Slightly larger certificates to fill space
                item.style.padding = '0.6rem 0.8rem';
                item.style.marginBottom = '0.4rem'; // Add bottom margin

                const title = item.querySelector('.certificate-title');
                if (title) {
                    title.style.fontSize = '0.68rem';
                    title.style.lineHeight = '1.2';
                }

                const link = item.querySelector('.certificate-link');
                if (link) {
                    link.style.fontSize = '0.62rem';
                    link.style.padding = '0.25rem 0.45rem';
                }
            });

            // Add more spacing between certificate rows
            const certificatesGrid = certificatesSection.querySelector('.certificates-grid');
            if (certificatesGrid) {
                certificatesGrid.style.gap = '0.6rem'; // Increased gap
                certificatesGrid.style.marginBottom = '2rem'; // Ensure bottom spacing
            }
        }
    }

    /**
     * Show error message to user
     * @param {string} message - Error message
     */
    showError(message) {
        alert(message);
    }
}

/**
 * Performance optimization utilities
 */
class PerformanceUtils {
    /**
     * Lazy load images when they come into viewport
     */
    static initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    /**
     * Preload critical resources
     */
    static preloadCriticalResources() {
        // Preload PDF generation library if needed
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'script';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        document.head.appendChild(link);
    }
}

/**
 * Accessibility enhancements
 */
class AccessibilityManager {
    /**
     * Initialize accessibility features
     */
    static init() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupScreenReaderSupport();
    }

    /**
     * Setup keyboard navigation
     */
    static setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const target = e.target;
                if (target.classList.contains('download-btn')) {
                    e.preventDefault();
                    target.click();
                }
            }
        });
    }

    /**
     * Setup focus management
     */
    static setupFocusManagement() {
        const downloadBtn = document.getElementById('downloadBtn');
        if (downloadBtn) {
            downloadBtn.setAttribute('tabindex', '0');
            downloadBtn.setAttribute('role', 'button');
            downloadBtn.setAttribute('aria-label', 'Download CV as PDF');
        }
    }

    /**
     * Setup screen reader support
     */
    static setupScreenReaderSupport() {
        // Add proper ARIA labels to timeline elements
        const timelineElements = document.querySelectorAll('.timeline-content');
        timelineElements.forEach((element, index) => {
            element.setAttribute('role', 'article');
            element.setAttribute('aria-label', `Career milestone ${index + 1}`);
        });
    }
}

/**
 * Initialize application when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main CV manager
    new CVManager();

    // Initialize performance optimizations
    PerformanceUtils.initLazyLoading();
    PerformanceUtils.preloadCriticalResources();

    // Initialize accessibility features
    AccessibilityManager.init();

    console.log('CV application initialized successfully');
});
