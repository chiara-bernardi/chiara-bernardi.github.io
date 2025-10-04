// Navigation functionality

class NavigationManager {
    constructor() {
        this.currentPage = '';
        this.pageContent = null;
        this.navLinks = [];
        this.loadingElement = null;

        this.init();
    }

    /**
     * Initialize navigation system
     */
    init() {
        this.pageContent = document.getElementById('page-content');
        this.loadingElement = document.getElementById('loading');
        this.navLinks = document.querySelectorAll('.nav-link');

        this.setupEventListeners();
        this.loadInitialPage();

        CONFIG_UTILS.log('Navigation manager initialized');
    }

    /**
     * Setup event listeners for navigation
     */
    setupEventListeners() {
        // Handle navigation clicks
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                this.navigateToPage(page, link);
            });
        });

        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                this.navigateToPage(e.state.page, null, false);
            }
        });

        // Handle hash changes in URL
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            if (hash && hash !== this.currentPage) {
                this.navigateToPage(hash);
            }
        });
    }

    /**
     * Load the initial page based on URL hash or default
     */
    loadInitialPage() {
        const hash = window.location.hash.slice(1);
        const initialPage = hash || APP_CONFIG.DEFAULT_PAGE;

        const targetLink = document.querySelector(`[data-page="${initialPage}"]`);
        this.navigateToPage(initialPage, targetLink, false);
    }

    /**
     * Navigate to a specific page
     */
    async navigateToPage(pageName, linkElement = null, updateHistory = true) {
        if (pageName === this.currentPage) return;

        CONFIG_UTILS.log(`Navigating to page: ${pageName}`);

        // Show loading state
        this.showLoading();

        try {
            // Update navigation state
            this.updateNavigation(linkElement || document.querySelector(`[data-page="${pageName}"]`));

            // Load page content
            await this.loadPageContent(pageName);

            // Update browser history and URL
            if (updateHistory) {
                this.updateBrowserHistory(pageName);
            }

            // Update page metadata
            this.updatePageMetadata(pageName);

            // Set current page
            this.currentPage = pageName;

            // Hide loading state
            this.hideLoading();

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });

            CONFIG_UTILS.log(`Successfully navigated to: ${pageName}`);

        } catch (error) {
            CONFIG_UTILS.log(`Error navigating to ${pageName}: ${error.message}`, 'error');
            this.showErrorPage();
        }
    }

    /**
     * Update navigation link states
     */
    updateNavigation(activeLink) {
        // Remove active class from all links
        this.navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current link
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    /**
     * Load page content dynamically
     */
    async loadPageContent(pageName) {
        let content = '';

        switch (pageName) {
            case 'home':
                content = this.generateHomePage();
                break;
            case 'research':
                content = this.generateResearchPage();
                break;
            case 'teaching':
                content = this.generateTeachingPage();
                break;
            case 'cv':
                content = this.generateCVPage();
                break;
            default:
                throw new Error(`Unknown page: ${pageName}`);
        }

        // Simulate loading delay for smooth transition
        await this.delay(APP_CONFIG.LOADING_DELAY);

        this.pageContent.innerHTML = content;
        this.pageContent.classList.add('active');
    }

    /**
     * Generate home page content
     */
    generateHomePage() {
        const contact = APP_CONFIG.CONTACT;

        return `
            <div id="home" class="page-content active">
                <div class="profile-container">
                    <div class="profile-image">
                        <img src="assets/images/chiara-profile-2024.jpeg" alt="Profile Picture of Chiara Bernardi">
                    </div>
                    <div class="profile-details">
                        <div>
                            <h2>Welcome!</h2>
                            <p/>

                            <p>I am a final year PhD Candidate at <strong>Queen Mary University of London</strong></p>
                            
                            <p>My interests lie in <strong>labour economics</strong>, <strong>productivity</strong> and <strong>technology</strong>.<br/>
                            In my research, I study how workplace technologies and human capital contribute to firms’ productivity and workers’ wage dynamics.</p>
                        </div>
                        <div class="contact-info">
                            <h3>Contact Information</h3>
                            <p>
                                ${contact.institution} <br/>
                                ${contact.office}, ${contact.department}
                            </p>
                            <p>
                                <a href="mailto:${contact.email}">${contact.email}</a>
                            </p>
                            <p class="socials">
                                <a href="${contact.linkedin}" target="_blank" rel="noopener" title="LinkedIn Profile">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
                                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                                    </svg>
                                </a>
                                <a href="${contact.bluesky}" target="_blank" rel="noopener" title="Bluesky Profile">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-bluesky" viewBox="0 0 16 16">
                                        <path d="M3.468 1.948C5.303 3.325 7.276 6.118 8 7.616c.725-1.498 2.698-4.29 4.532-5.668C13.855.955 16 .186 16 2.632c0 .489-.28 4.105-.444 4.692-.572 2.04-2.653 2.561-4.504 2.246 3.236.551 4.06 2.375 2.281 4.2-3.376 3.464-4.852-.87-5.23-1.98-.07-.204-.103-.3-.103-.218 0-.081-.033.014-.102.218-.379 1.11-1.855 5.444-5.231 1.98-1.778-1.825-.955-3.65 2.28-4.2-1.85.315-3.932-.205-4.503-2.246C.28 6.737 0 3.12 0 2.632 0 .186 2.145.955 3.468 1.948"/>
                                    </svg>
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        `;
    }

    /**
     * Generate research page content
     */
    generateResearchPage() {
        let content = `
            <div id="research" class="page-content active">
                <h1>Research</h1>
        `;

        // Working papers section
        if (RESEARCH_DATA.workingPapers.length > 0) {
            content += '<h2>Working papers</h2>';
            RESEARCH_DATA.workingPapers.forEach(paper => {
                content += RESEARCH_UTILS.generatePaperHTML(paper);
            });
        }

        // Work in progress section
        if (RESEARCH_DATA.workInProgress.length > 0) {
            content += '<h2>Work in progress</h2>';
            RESEARCH_DATA.workInProgress.forEach(paper => {
                content += RESEARCH_UTILS.generatePaperHTML(paper);
            });
        }

        // Pre-PhD work section
        if (RESEARCH_DATA.prePhdWork.length > 0) {
            content += '<h2>Pre-PhD work</h2>';
            RESEARCH_DATA.prePhdWork.forEach(paper => {
                content += RESEARCH_UTILS.generatePaperHTML(paper);
            });
        }

        content += '</div>';
        return content;
    }

    /**
     * Generate teaching page content
     */
    generateTeachingPage() {
        const courses = Object.entries(
            TEACHING_UTILS.getCourses().reduce(
                (acc, course) => {
                    if (!acc[course.university]) {
                        acc[course.university] = [];
                    }
                    acc[course.university].push(course);
                    return acc;
                }, {})
        ).sort(([uni1, uni_courses1], [uni2, uni_courses2]) => {
            const max_year1 = Math.max(...(uni_courses1.map(course => Math.max(...course.years))));
            const max_year2 = Math.max(...(uni_courses2.map(course => Math.max(...course.years))));

            return max_year1 < max_year2 ? 1 : max_year1 != max_year2 ? -1 : uni1.localeCompare(uni2);
        });

        let content = `
            <div id="teaching" class="page-content active">
                <h1>Teaching</h1>
                ${TEACHING_UTILS.getTeachingIntro() || ''}
                <div class="university-section">
                    ${courses.map(([university, uni_courses]) => {
                        const uni_info = UNI_UTILS.getUniversityByName(university);
                        return `
                            <div class="course-group">
                                <div class="university-header">
                                    <div class="university-logo"><img src="${uni_info?.logo}" /></div>
                                    <div class="university-info"><h3><a href="${uni_info?.website}">${university}</a></h3></div>
                                </div>
                                <div class="courses-grid">
                                    ${uni_courses.map(course => TEACHING_UTILS.generateCourseHTML(course)).join('')}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                ${TEACHING_UTILS.getTeachingOutro() || ''}
            </div>`;

        return content;
    }

    /**
     * Generate CV page content
     */
    generateCVPage() {
        const content = `
            <div id="cv" class="page-content active">
                <h1>Vitae</h1>
                <div class="cv-container">
                    <div class="cv-viewer" id="pdfViewer">
                        <iframe id="pdfIframe" src="assets/documents/cv.pdf"></iframe>
                    </div>
                </div>
            </div>
            `;

        return content;
    }

    /**
     * Update browser history and URL
     */
    updateBrowserHistory(pageName) {
        const url = pageName === APP_CONFIG.DEFAULT_PAGE ?
            window.location.pathname :
            `${window.location.pathname}#${pageName}`;

        window.history.pushState({ page: pageName }, '', url);
    }

    /**
     * Update page metadata (title, description)
     */
    updatePageMetadata(pageName) {
        const title = APP_CONFIG.META_TITLES[pageName] || APP_CONFIG.META_TITLES.home;
        const description = APP_CONFIG.META_DESCRIPTIONS[pageName] || APP_CONFIG.META_DESCRIPTIONS.home;

        document.title = title;

        // Update or create description meta tag
        let descriptionMeta = document.querySelector('meta[name="description"]');
        if (descriptionMeta) {
            descriptionMeta.content = description;
        } else {
            descriptionMeta = document.createElement('meta');
            descriptionMeta.name = 'description';
            descriptionMeta.content = description;
            document.head.appendChild(descriptionMeta);
        }
    }

    /**
     * Show loading state
     */
    showLoading() {
        if (this.loadingElement) {
            this.loadingElement.style.display = 'flex';
        }
        if (this.pageContent) {
            this.pageContent.classList.remove('active');
        }
    }

    /**
     * Hide loading state
     */
    hideLoading() {
        if (this.loadingElement) {
            this.loadingElement.style.display = 'none';
        }
    }

    /**
     * Show error page
     */
    showErrorPage() {
        this.pageContent.innerHTML = `
            <div class="error-page">
                <h1>Page Not Found</h1>
                <p>Sorry, the page you're looking for doesn't exist.</p>
                <p><a href="#home" data-page="home" class="btn btn-primary">Go Home</a></p>
            </div>
        `;
        this.pageContent.classList.add('active');
        this.hideLoading();
    }

    /**
     * Utility: Create delay promise
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize navigation when DOM is ready
let navigationManager;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        navigationManager = new NavigationManager();
    });
} else {
    navigationManager = new NavigationManager();
}

// Make navigation manager available globally
window.navigationManager = navigationManager;