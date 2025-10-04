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
                            <h1>Welcome!</h1>
                            <p/>

                            <p>I am a final year PhD Candidate at <strong>Queen Mary University of London</strong></p>
                            
                            <p>My research interests lie in <strong>labour economics</strong>, <strong>gender</strong> and <strong>personnel economics</strong>.</p>
                        </div>
                        <div class="contact-info">
                            <h3>Contact Information</h3>
                            <p><strong>Address:</strong><br>
                            ${contact.institution}, ${contact.department}<br>
                            ${contact.address}</p>
                            
                            <p><strong>Email:</strong> <a href="mailto:${contact.email}">${contact.email}</a></p>
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
                    ${courses.map(([university, uni_courses]) => `
                        <div class="course-group">
                            <div class="university-header">
                                <div class="university-logo"></div>
                                <div class="university-info"><h3>${university}</h3></div>
                            </div>
                            <div class="courses-grid">
                                ${uni_courses.map(course => TEACHING_UTILS.generateCourseHTML(course)).join('')}
                            </div>
                        </div>
                        `).join('')}
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