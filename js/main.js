// Main application entry point

class App {
    constructor() {
        this.isInitialized = false;
        this.init();
    }
    
    /**
     * Initialize the application
     */
    async init() {
        try {
            CONFIG_UTILS.log('Initializing application...');
            
            // Wait for DOM to be ready
            await this.waitForDOM();
            
            // Setup global error handling
            this.setupErrorHandling();
            
            // Setup internal link handlers
            this.setupInternalLinks();
            
            // Setup external link handlers
            this.setupExternalLinks();
            
            // Setup accessibility features
            this.setupAccessibility();
            
            // Setup performance monitoring
            this.setupPerformanceMonitoring();
            
            this.isInitialized = true;
            CONFIG_UTILS.log('Application initialized successfully');
            
            // Dispatch custom event for other scripts
            document.dispatchEvent(new CustomEvent('appInitialized'));
            
        } catch (error) {
            CONFIG_UTILS.log(`Application initialization failed: ${error.message}`, 'error');
            this.handleInitializationError(error);
        }
    }
    
    /**
     * Wait for DOM to be ready
     */
    waitForDOM() {
        return new Promise((resolve) => {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', resolve);
            } else {
                resolve();
            }
        });
    }
    
    /**
     * Setup global error handling
     */
    setupErrorHandling() {
        // Handle JavaScript errors
        window.addEventListener('error', (event) => {
            CONFIG_UTILS.log(`JavaScript Error: ${event.message} at ${event.filename}:${event.lineno}`, 'error');
            this.handleError(event.error);
        });
        
        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            CONFIG_UTILS.log(`Unhandled Promise Rejection: ${event.reason}`, 'error');
            this.handleError(event.reason);
        });
    }
    
    /**
     * Setup internal link handlers for smooth navigation
     */
    setupInternalLinks() {
        // Delegate event handling for dynamically added internal links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('.internal-link, a[data-page]');
            if (link && link.dataset.page) {
                e.preventDefault();
                const targetLink = document.querySelector(`[data-page="${link.dataset.page}"]`);
                if (window.navigationManager) {
                    window.navigationManager.navigateToPage(link.dataset.page, targetLink);
                }
            }
        });
    }
    
    /**
     * Setup external link handlers
     */
    setupExternalLinks() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="http"], a[href^="mailto:"]');
            if (link && link.href) {
                // Add analytics tracking if needed
                this.trackExternalLink(link.href);
                
                // Ensure external links open in new tab
                if (link.href.startsWith('http') && !link.target) {
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                }
            }
        });
    }
    
    /**
     * Setup accessibility features
     */
    setupAccessibility() {
        // Add skip navigation link for screen readers
        this.addSkipNavigation();
        
        // Ensure proper focus management
        this.setupFocusManagement();
        
        // Add keyboard navigation support
        this.setupKeyboardNavigation();
        
        CONFIG_UTILS.log('Accessibility features enabled');
    }
    
    /**
     * Add skip navigation for accessibility
     */
    addSkipNavigation() {
        const skipLink = document.createElement('a');
        skipLink.href = '#home';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-nav';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #000;
            color: #fff;
            padding: 8px;
            text-decoration: none;
            z-index: 1000;
            transition: top 0.3s;
        `;
        
        // Show on focus
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
    
    /**
     * Setup focus management for navigation
     */
    setupFocusManagement() {
        // Ensure main content gets focus after navigation
        document.addEventListener('appNavigated', () => {
            const mainContent = document.getElementById('page-content');
            if (mainContent) {
                mainContent.focus();
            }
        });
    }
    
    /**
     * Setup keyboard navigation support
     */
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Alt + H for Home
            if (e.altKey && e.key.toLowerCase() === 'h') {
                e.preventDefault();
                const homeLink = document.querySelector('[data-page="home"]');
                if (homeLink) {
                    homeLink.click();
                }
            }
            
            // Alt + R for Research
            if (e.altKey && e.key.toLowerCase() === 'r') {
                e.preventDefault();
                const researchLink = document.querySelector('[data-page="research"]');
                if (researchLink) {
                    researchLink.click();
                }
            }

            // Alt + T for Teaching
            if (e.altKey && e.key.toLowerCase() === 't') {
                e.preventDefault();
                const teachingLink = document.querySelector('[data-page="teaching"]');
                if (teachingLink) {
                    teachingLink.click();
                }
            }
            
            // Alt + C for CV
            if (e.altKey && e.key.toLowerCase() === 'c') {
                e.preventDefault();
                const cvLink = document.querySelector('[data-page="cv"]');
                if (cvLink) {
                    cvLink.click();
                }
            }            
        });
    }
    
    /**
     * Setup performance monitoring
     */
    setupPerformanceMonitoring() {
        if (!window.performance) return;
        
        // Monitor page load performance
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.timing;
                const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                CONFIG_UTILS.log(`Page loaded in ${loadTime}ms`);
                
                // Track Core Web Vitals if available
                this.trackCoreWebVitals();
            }, 0);
        });
    }
    
    /**
     * Track Core Web Vitals for performance monitoring
     */
    trackCoreWebVitals() {
        // Track Largest Contentful Paint (LCP)
        if ('PerformanceObserver' in window) {
            try {
                const lcpObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    CONFIG_UTILS.log(`LCP: ${lastEntry.startTime.toFixed(2)}ms`);
                });
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            } catch (e) {
                // Observer not supported for this metric
            }
        }
    }
    
    /**
     * Track external link clicks for analytics
     */
    trackExternalLink(url) {
        if (APP_CONFIG.DEBUG) {
            CONFIG_UTILS.log(`External link clicked: ${url}`);
        }
        
        // Here you could add analytics tracking code like:
        // gtag('event', 'click', { event_category: 'external_link', event_label: url });
        // or similar analytics implementation
    }
    
    /**
     * Handle application errors gracefully
     */
    handleError(error) {
        // Log error for debugging
        CONFIG_UTILS.log(`Application error: ${error}`, 'error');
        
        // Could implement error reporting service here
        // this.reportError(error);
        
        // Show user-friendly error message if needed
        if (APP_CONFIG.DEBUG) {
            this.showErrorNotification('An error occurred. Please refresh the page.');
        }
    }
    
    /**
     * Handle initialization errors
     */
    handleInitializationError(error) {
        CONFIG_UTILS.log(`Initialization error: ${error.message}`, 'error');
        
        // Fallback: show basic content without JavaScript features
        const fallbackContent = `
            <div class="error-fallback">
                <h1>Chiara Bernardi</h1>
                <p>PhD candidate at the School of Economics and Finance, Queen Mary University of London,</p>
                <p>There was an issue loading the interactive features. Please refresh the page or enable JavaScript.</p>
                <p><strong>Email:</strong> <a href="mailto:c.bernardi@qmul.ac.uk">c.bernardi@qmul.ac.uk</a></p>
            </div>
        `;
        
        const mainContent = document.querySelector('main .container');
        if (mainContent) {
            mainContent.innerHTML = fallbackContent;
        }
    }
    
    /**
     * Show error notification to user
     */
    showErrorNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff4444;
            color: white;
            padding: 12px 20px;
            border-radius: 4px;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    }
    
    /**
     * Get application status
     */
    getStatus() {
        return {
            initialized: this.isInitialized,
            version: APP_CONFIG.VERSION,
            currentPage: window.navigationManager ? window.navigationManager.currentPage : null,
            performance: window.performance ? {
                timing: window.performance.timing,
                navigation: window.performance.navigation
            } : null
        };
    }
}

// Utility functions available globally
window.AppUtils = {
    /**
     * Smooth scroll to element
     */
    scrollToElement(selector, offset = 0) {
        const element = document.querySelector(selector);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
            });
        }
    },
    
    /**
     * Debounce function calls
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    /**
     * Throttle function calls
     */
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    /**
     * Format date for display
     */
    formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    }
};

// Initialize the application
const app = new App();

// Make app instance available globally for debugging
if (APP_CONFIG.DEBUG) {
    window.app = app;
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
}