/**
 * CV Content Loader
 * Loads CV data from JSON and populates the HTML elements
 */

class CVContentLoader {
    constructor () {
        this.data = null;
        this.init();
    }

    /**
     * Initialize the content loader
     */
    async init() {
        try {
            await this.loadData();
            this.populateContent();
            console.log('CV content loaded successfully');
        } catch (error) {
            console.error('Error loading CV content:', error);
            // Fallback to existing static content if JSON fails to load
        }
    }

    /**
     * Load CV data from JSON file
     */
    async loadData() {
        try {
            const response = await fetch('/data/cv-data.json');
            if (!response.ok) {
                throw new Error(`Failed to load CV data: ${response.status}`);
            }
            this.data = await response.json();
        } catch (error) {
            console.warn('Could not load JSON data, using static content:', error);
            throw error;
        }
    }

    /**
     * Populate all content sections
     */
    populateContent() {
        if (!this.data) return;

        this.populatePersonalInfo();
        this.populateSkills();
        this.populateLanguages();
        this.populateInterests();
        this.populateExperience();
        this.populateProjects();
        this.populateEducation();
        this.populateCertificates();
    }

    /**
     * Populate personal information
     */
    populatePersonalInfo() {
        const { personal, social } = this.data;

        // Update personal info if elements exist
        this.updateElement('cv-name', personal.name);
        this.updateElement('cv-title', personal.title);
        this.updateElement('cv-phone', personal.phone);

        // Update email link
        const emailElement = document.getElementById('cv-email');
        if (emailElement) {
            emailElement.textContent = personal.email;
            emailElement.href = `mailto:${personal.email}`;
        }

        // Update profile image
        const profileImg = document.querySelector('.profile-img');
        if (profileImg && personal.profileImage) {
            profileImg.src = personal.profileImage;
            profileImg.alt = `${personal.name} - Professional Profile Photo`;
        }

        // Update social links
        const socialContainer = document.getElementById('cv-social');
        if (socialContainer && social.github) {
            socialContainer.innerHTML = `
                <a href="${social.github}"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="social-icon"
                   aria-label="Visit GitHub Profile">
                    <i class="fab fa-github" aria-hidden="true"></i>
                </a>
            `;
        }
    }

    /**
     * Populate skills section
     */
    populateSkills() {
        const skillsContainer = document.getElementById('cv-skills');
        if (!skillsContainer || !this.data.skills) return;

        skillsContainer.innerHTML = this.data.skills
            .map(skill => `<span class="skill-tag">${skill}</span>`)
            .join('');
    }

    /**
     * Populate languages section
     */
    populateLanguages() {
        const languagesContainer = document.getElementById('cv-languages');
        if (!languagesContainer || !this.data.languages) return;

        languagesContainer.innerHTML = this.data.languages
            .map(lang => `
                <div class="language-item">
                    <span class="language-name">${lang.name}</span>
                    <div class="language-level">
                        <div class="language-progress" style="width: ${lang.level}%;"></div>
                    </div>
                </div>
            `).join('');
    }

    /**
     * Populate interests section
     */
    populateInterests() {
        const interestsContainer = document.getElementById('cv-interests');
        if (!interestsContainer || !this.data.interests) return;

        interestsContainer.innerHTML = this.data.interests
            .map(interest => `
                <div class="interest-item">
                    <i class="${interest.icon} interest-icon" aria-hidden="true"></i>
                    <span>${interest.name}</span>
                </div>
            `).join('');
    }

    /**
     * Populate experience section
     */
    populateExperience() {
        const experienceContainer = document.getElementById('cv-experience');
        if (!experienceContainer || !this.data.experience) return;

        const experienceHTML = this.data.experience.reduce((html, exp, index) => {
            const isEvenPair = Math.floor(index / 2) % 2 === 0;
            const isFirstInPair = index % 2 === 0;

            if (isFirstInPair) {
                html += '<div class="timeline-row">';
            }

            const positionClass = exp.position === 'left' ? 'timeline-left' : 'timeline-right';

            html += `
                <div class="${positionClass}">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <h3 class="timeline-title">${exp.title}</h3>
                        <h4 class="timeline-subtitle">${exp.company}</h4>
                        <div class="timeline-text">${this.formatDescription(exp.description)}</div>
                    </div>
                </div>
            `;

            if (!isFirstInPair || index === this.data.experience.length - 1) {
                html += '</div>';
            }

            return html;
        }, '');

        experienceContainer.innerHTML = experienceHTML;
    }

    /**
     * Format description text with HTML support
     * @param {string} description - Raw description text
     * @returns {string} - Formatted HTML
     */
    formatDescription(description) {
        if (!description) return '';

        return description
            .replace(/\n\n/g, '<br><br>') // Double line breaks
            .replace(/\n/g, '<br>') // Single line breaks
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text
            .replace(/\*(.*?)\*/g, '<em>$1</em>'); // Italic text
    }

    /**
     * Populate projects section
     */
    populateProjects() {
        const projectsContainer = document.getElementById('cv-projects');
        if (!projectsContainer || !this.data.projects) return;

        projectsContainer.innerHTML = this.data.projects
            .map(project => `
                <div class="project-card">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-subtitle">${project.subtitle}</p>
                    <div class="project-tech">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link">
                        <i class="fab fa-github" aria-hidden="true"></i> View
                    </a>
                </div>
            `).join('');
    }

    /**
     * Populate education section
     */
    populateEducation() {
        const educationContainer = document.getElementById('cv-education');
        if (!educationContainer || !this.data.education) return;

        const educationHTML = this.data.education.reduce((html, edu, index) => {
            const isFirstInPair = index % 2 === 0;

            if (isFirstInPair) {
                html += '<div class="timeline-row">';
            }

            const positionClass = edu.position === 'left' ? 'timeline-left' : 'timeline-right';

            html += `
                <div class="${positionClass}">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <h3 class="timeline-title">${edu.title}</h3>
                        <h4 class="timeline-subtitle">${edu.institution}</h4>
                        <span class="timeline-year">${edu.year}</span>
                    </div>
                </div>
            `;

            if (!isFirstInPair || index === this.data.education.length - 1) {
                html += '</div>';
            }

            return html;
        }, '');

        educationContainer.innerHTML = educationHTML;
    }

    /**
     * Populate certificates section
     */
    populateCertificates() {
        const certificatesContainer = document.getElementById('cv-certificates');
        if (!certificatesContainer || !this.data.certificates) return;

        certificatesContainer.innerHTML = this.data.certificates
            .map(cert => `
                <div class="certificate-item">
                    <h3 class="certificate-title">${cert.title}</h3>
                    <a href="${cert.url}"
                       target="_blank"
                       rel="noopener noreferrer"
                       class="certificate-link"
                       ${cert.url === '#' ? 'aria-disabled="true"' : ''}>
                        <i class="fas fa-certificate" aria-hidden="true"></i> View
                    </a>
                </div>
            `).join('');
    }

    /**
     * Helper method to update element content safely
     * @param {string} elementId - Element ID
     * @param {string} content - Content to set
     */
    updateElement(elementId, content) {
        const element = document.getElementById(elementId);
        if (element && content) {
            element.textContent = content;
        }
    }
}

/**
 * SEO and Meta Data Manager
 */
class SEOManager {
    /**
     * Update page meta data with CV information
     * @param {Object} data - CV data object
     */
    static updateMetaData(data) {
        if (!data || !data.personal) return;

        const { personal } = data;

        // Update page title
        document.title = `${personal.name} - ${personal.title} | CV`;

        // Update meta description
        this.updateMetaTag('description',
            `${personal.name} - ${personal.title}. Expert in .NET, React, and enterprise applications.`);

        // Update Open Graph tags
        this.updateMetaTag('og:title', `${personal.name} - ${personal.title}`);
        this.updateMetaTag('og:description',
            `${personal.title} specializing in enterprise-grade applications and modern web technologies.`);

        if (personal.profileImage) {
            this.updateMetaTag('og:image', `${personal.domain}${personal.profileImage}`);
        }

        // Update structured data
        this.updateStructuredData(data);
    }

    /**
     * Update meta tag content
     * @param {string} name - Meta tag name/property
     * @param {string} content - Content to set
     */
    static updateMetaTag(name, content) {
        let selector = `meta[name="${name}"]`;
        if (name.startsWith('og:')) {
            selector = `meta[property="${name}"]`;
        }

        const metaTag = document.querySelector(selector);
        if (metaTag) {
            metaTag.setAttribute('content', content);
        }
    }

    /**
     * Update structured data for SEO
     * @param {Object} data - CV data object
     */
    static updateStructuredData(data) {
        const { personal, skills } = data;

        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": personal.name,
            "jobTitle": personal.title,
            "description": `${personal.title} specializing in enterprise-grade applications`,
            "url": personal.domain,
            "email": personal.email,
            "telephone": personal.phone,
            "image": `${personal.domain}${personal.profileImage}`,
            "sameAs": [
                data.social?.github
            ].filter(Boolean),
            "knowsAbout": skills || [],
            "worksFor": {
                "@type": "Organization",
                "name": "Accedia AD"
            }
        };

        // Update existing structured data script
        const existingScript = document.querySelector('script[type="application/ld+json"]');
        if (existingScript) {
            existingScript.textContent = JSON.stringify(structuredData, null, 2);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    const loader = new CVContentLoader();

    // Update SEO meta data after content is loaded
    if (loader.data) {
        SEOManager.updateMetaData(loader.data);
    }
});
