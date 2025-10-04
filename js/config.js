// Configuration constants and settings

const APP_CONFIG = {
    // Application settings
    APP_NAME: 'Chiara Bernardi Website',
    VERSION: '1.0.0',
    
    // Default page settings
    DEFAULT_PAGE: 'home',
    
    // Animation settings
    TRANSITION_DURATION: 300,
    
    // Page load settings
    LOADING_DELAY: 100,
    
    // SEO settings
    META_TITLES: {
        home: 'Chiara Bernardi - PhD Candidate at the School of Economics and Finance, Queen Mary University of London',
        research: 'Research - Chiara Bernardi',
        teaching: 'Teaching - Chiara Bernardi',
        cv: 'Vitae - Chiara Bernardi'
    },
    
    META_DESCRIPTIONS: {
        home: 'Chiara Bernardi is a PhD candidate at the School of Economics and Finance, Queen Mary University of London, specializing in labor economics with focus on personnel and gender economics.',
        research: 'Research papers and publications by Chiara Bernardi in gender economics, personnel economics, and labor economics.',
        teaching: 'Teaching portfolio of Chiara Bernardi, including courses and materials related to economics.',
        cv: 'Curriculum Vitae of Chiara Bernardi, detailing academic background, research interests, and professional experience.'
    },
    
    // Contact information
    CONTACT: {
        email: 'c.bernardi@qmul.ac.uk',
        twitter: '@none',
        institution: 'Queen Mary University',
        department: 'School of Economics and Finance',
        address: 'Mile End Road, London E1 4NS'
    },
    
    // External links
    EXTERNAL_LINKS: {
        cepr: 'https://cepr.org/',
        bocconi: 'https://www.unibocconi.it',
        qmul: 'https://www.qmul.ac.uk'
    },
    
    // Debug settings
    DEBUG: false,
    LOG_LEVEL: 'info' // 'debug', 'info', 'warn', 'error'
};

// Utility functions for configuration
const CONFIG_UTILS = {
    /**
     * Get a configuration value by path
     * @param {string} path - Dot notation path to config value
     * @param {any} defaultValue - Default value if path not found
     */
    get(path, defaultValue = null) {
        return path.split('.').reduce((obj, key) => 
            obj && obj[key] !== undefined ? obj[key] : defaultValue, APP_CONFIG
        );
    },
    
    /**
     * Check if debug mode is enabled
     */
    isDebug() {
        return APP_CONFIG.DEBUG;
    },
    
    /**
     * Log message if debug enabled
     */
    log(message, level = 'info') {
        if (this.isDebug() || level === 'error') {
            console[level](`[${APP_CONFIG.APP_NAME}] ${message}`);
        }
    }
};

// Make config available globally
window.APP_CONFIG = APP_CONFIG;
window.CONFIG_UTILS = CONFIG_UTILS;