// Research papers and publications data

const RESEARCH_DATA = {
    /**
     * TYPE:
     * [{
     *   id: string,
     *   title: string,
     *   authors: [{ name: string, url: ?string, isMe: ?boolean }],
     *   links: [{ text: string, url: string }],
     *   awards: [{ title: string, url: ?string }],
     *   funding: [{ title: string, url: ?string }],
     *   mediaCoverage: [{ outlet: string, url: string }],
     *   abstract: string, 
     * }]
     */
    workingPapers: [
        {
            id: 'wfh_sorting',
            title: 'Working from Home and Sorting of Female and Male Workers',
            authors: [
                { name: 'Chiara Bernardi', url: null, isMe: true },
            ],
            links: [
                { text: 'Remote Work Conference (Stanford)', url: 'https://www.remoteworkconference.org' },
                { text: 'Women in Central Banking Workshop (Bank of Italy)', url: 'https://www.bancaditalia.it/media/notizia/workshop-women-in-central-banking-6-7-november-2025/'}
            ],
            abstract: 'Remote work has dominated labour market debates in recent years: some high-profile employers have recalled staff to the office, citing productivity concerns and provoking backlash from employees, who see working from home (WFH) as a prime non-wage benefit. Although the pandemic accelerated a trend already under way, we still lack a complete picture of why firms adopt or reject remote work and of how worker demand, job feasibility, and managerial discretion translate into actual take-up. Even less is known about whether remote work, via recruitment and retention, alters how firms and workers match in the labour market. In this paper I shed some light on these questions  by combining German matched employer-employee administrative records with unique survey data on remote work prevalence and stated motives from both workers and firms (2012-2020). Early adopting firms are larger, more productive, and employ more women, but this selection declines as remote work spreads. Within the same firm and job, high-productivity workers, especially high-productivity women, are more likely to work remotely. Cross-sectional evidence suggests that remote work weakens productivity-based assortative matching and even reverses it for women. This pattern is confirmed by my event study: results show that, after WFH adoption, firms improve hiring and retention of very productive female job-to-job movers, while the average quality of other inflows and outflows stays unchanged. These women in turn trade off firm quality to get the amenity offered by treated firms. Finally, their productivity exceeds that of the workers the treated firms would get under perfect positive assortative matching. This further widens the firm’s distance from that benchmark. '
        },
        {
            id: 'fshc_returns',
            title: 'The Role of Firms\' Occupational Structure for Returns to Firm-specific Human Capital',
            authors: [
                { name: 'Chiara Bernardi', url: null, isMe: true },
            ],
            links: [],
            abstract: "This paper investigates how returns to firm-specific human capital vary across workers with different roles in the production process. While all workers in a firm might hold firm-specific human capital, I argue that such knowledge is more productive and yields higher returns in the occupations central to the firm's production process. To test this hypothesis, I develop a conceptual framework in which workers in a firm belong to either the core group, i.e., the occupation carrying out the central steps of production, or to the non-core group. The model predicts that workers who move from non-core to core occupations within the firm receive a larger wage premium than those moving in the opposite direction, reflecting the higher returns to firm-specific human capital in core roles (core premium).  The effect is stronger for workers with lower level of general human capital because of substitutability between general and firm-specific human capital. I test the model implications using matched employer-employee panel data representative of the German economy. I empirically identify the core group as the occupation with the largest employment share within the firm, and I track wage changes of workers moving to or away from this group. Results confirm that firm-specific human capital yields greater wage returns in the core occupation, with no differential effect on wages when workers leave the firm for a new one. The observed effect is entirely driven by workers without university education, my proxy of general human capital."
        }
    ],
    
    workInProgress: [],
    
    prePhdWork: []
};

// Utility functions for research data
const RESEARCH_UTILS = {
    /**
     * Get all papers by category
     */
    getWorkingPapers() {
        return RESEARCH_DATA.workingPapers;
    },
    
    getWorkInProgress() {
        return RESEARCH_DATA.workInProgress;
    },
    
    getPrePhdWork() {
        return RESEARCH_DATA.prePhdWork;
    },
    
    /**
     * Get all papers combined
     */
    getAllPapers() {
        return [
            ...RESEARCH_DATA.workingPapers,
            ...RESEARCH_DATA.workInProgress,
            ...RESEARCH_DATA.prePhdWork
        ];
    },
    
    /**
     * Find paper by ID
     */
    findPaperById(id) {
        return this.getAllPapers().find(paper => paper.id === id);
    },
    
    /**
     * Format authors list for display
     */
    formatAuthors(authors) {
        return authors.map(author => {
            if (author.url && !author.isMe) {
                return `<a href="${author.url}" target="_blank">${author.name}</a>`;
            }
            return author.name;
        }).join(', ');
    },
    
    /**
     * Generate paper HTML
     */
    generatePaperHTML(paper) {
        let html = `<div class="paper-item" id="paper-${paper.id}">`;
        
        // Title
        if (paper.links && paper.links.length > 0 && !paper.links[0].url.includes('mailto:')) {
            html += `<div class="paper-title"><a href="${paper.links[0].url}" target="_blank">${paper.title}</a></div>`;
        } else {
            html += `<div class="paper-title">${paper.title}</div>`;
        }
        
        // Authors
        const other_authors = paper.authors.filter(a => !a.isMe);
        if (other_authors.length > 0) {
            html += `<div class="authors">with ${this.formatAuthors(other_authors)}</div>`;
        }

        // Journal info for published papers
        if (paper.journal) {
            html += `<p class="publication-info"><em>${paper.journal}</em>, ${paper.volume}</p>`;
        }
        
        // Links
        if (paper.links) {
            html += '<div class="paper-links">';
            paper.links.forEach(link => {
                html += `<a href="${link.url}" target="_blank">${link.text}</a>`;
            });
            html += '</div>';
        }
        
        // Awards
        if (paper.awards) {
            html += '<div class="awards"><strong>Awards:</strong>';
            paper.awards.forEach(award => {
                if (award.url) {
                    html += `<p>🏆 <a href="${award.url}" target="_blank">${award.title}</a></p>`;
                } else {
                    html += `<p>🏆 ${award.title}</p>`;
                }
            });
            html += '</div>';
        }
        
        // Funding
        if (paper.funding) {
            html += '<div class="funding-info"><strong>Funding:</strong>';
            paper.funding.forEach(fund => {
                if (fund.url) {
                    html += `<p>💰 <a href="${fund.url}" target="_blank">${fund.title}</a></p>`;
                } else {
                    html += `<p>💰 ${fund.title}</p>`;
                }
            });
            html += '</div>';
        }
        
        // Media coverage
        if (paper.mediaCoverage) {
            html += '<div class="media-coverage"><strong>Media coverage:</strong><div class="media-links">';
            paper.mediaCoverage.forEach(media => {
                html += `<a href="${media.url}" target="_blank">${media.outlet}</a>`;
            });
            html += '</div></div>';
        }
        
        // Abstract
        if (paper.abstract) {
            html += `<div class="abstract">${paper.abstract}</div>`;
        }
        
        html += '</div>';
        return html;
    }
};

// Make research data available globally
window.RESEARCH_DATA = RESEARCH_DATA;
window.RESEARCH_UTILS = RESEARCH_UTILS;