// Teaching experience and courses data

const TEACHING_DATA = {
    // Introduction text for teaching page
    intro: {
        title: "Teaching Philosophy",
        content: `I am a trained Graduate Teaching Assistant (Economics Network) and I received monetary teaching bonuses from LSE for the outstanding results in students teaching evaluations. My teaching approach emphasizes clear communication of complex economic concepts, interactive learning, and the practical application of theoretical frameworks to real-world problems.`
    },
    
    // Outro/conclusion text
    outro: {
        title: "Student Feedback & Recognition",
        content: `My commitment to teaching excellence has been recognized through various awards and consistently high student evaluations. I believe in creating an inclusive learning environment where all students can engage with economic theory and develop critical analytical skills. I regularly incorporate my research findings into teaching materials to provide students with cutting-edge insights into gender economics and labor market dynamics.`
    },
    
    // Teaching statistics
    stats: [
        { number: "500+", label: "Students Taught" },
        { number: "8", label: "Different Courses" },
        { number: "4.8/5", label: "Average Rating" },
        { number: "3", label: "Universities" }
    ],
    
    // Universities and courses
    universities: [
        {
            id: 'lse',
            name: 'London School of Economics and Political Science',
            shortName: 'LSE',
            period: '2020-2024',
            logo: 'LSE',
            courses: [
                {
                    id: 'ec220',
                    title: 'Introduction to Econometrics',
                    code: 'EC220',
                    level: 'undergraduate',
                    description: 'Fundamental concepts in econometric analysis, including regression analysis, hypothesis testing, and model specification. Focus on practical applications using statistical software.',
                    years: ['2020/21', '2021/22', '2022/23', '2023/24'],
                    role: 'Graduate Teaching Assistant'
                },
                {
                    id: 'ec321',
                    title: 'Applied Econometrics',
                    code: 'EC321',
                    level: 'undergraduate',
                    description: 'Advanced econometric methods including panel data analysis, instrumental variables, and limited dependent variable models. Emphasis on empirical research design.',
                    years: ['2021/22', '2022/23', '2023/24'],
                    role: 'Graduate Teaching Assistant'
                },
                {
                    id: 'ec442',
                    title: 'Labour Economics',
                    code: 'EC442',
                    level: 'undergraduate',
                    description: 'Economic analysis of labor markets, including wage determination, employment, human capital theory, and labor market discrimination.',
                    years: ['2022/23', '2023/24'],
                    role: 'Graduate Teaching Assistant'
                },
                {
                    id: 'ec503',
                    title: 'Microeconometrics',
                    code: 'EC503',
                    level: 'graduate',
                    description: 'Advanced microeconometric methods for policy evaluation, including experimental and quasi-experimental designs, difference-in-differences, and regression discontinuity.',
                    years: ['2023/24'],
                    role: 'Graduate Teaching Assistant'
                }
            ]
        },
        {
            id: 'qmul',
            name: 'Queen Mary University of London',
            shortName: 'QMUL',
            period: '2019-2020',
            logo: 'QM',
            courses: [
                {
                    id: 'econ101',
                    title: 'Principles of Economics',
                    code: 'ECON101',
                    level: 'undergraduate',
                    description: 'Introduction to microeconomic and macroeconomic principles, market mechanisms, and basic economic policy analysis.',
                    years: ['2019/20'],
                    role: 'Teaching Assistant'
                },
                {
                    id: 'econ201',
                    title: 'Intermediate Microeconomics',
                    code: 'ECON201',
                    level: 'undergraduate',
                    description: 'Consumer and producer theory, market structures, game theory basics, and welfare economics.',
                    years: ['2019/20'],
                    role: 'Teaching Assistant'
                }
            ]
        },
        {
            id: 'bocconi',
            name: 'Bocconi University',
            shortName: 'Bocconi',
            period: '2025-Present',
            logo: 'BOC',
            courses: [
                {
                    id: 'econ30001',
                    title: 'Gender Economics',
                    code: 'ECON30001',
                    level: 'graduate',
                    description: 'Advanced topics in gender economics including labor market discrimination, entrepreneurship gaps, and policy interventions. Incorporates latest research findings.',
                    years: ['2024/25'],
                    role: 'Lecturer'
                },
                {
                    id: 'econ50001',
                    title: 'Applied Microeconomics Seminar',
                    code: 'ECON50001',
                    level: 'phd',
                    description: 'PhD-level seminar covering recent developments in applied microeconomics, research methods, and dissertation guidance.',
                    years: ['2024/25'],
                    role: 'Co-instructor'
                }
            ]
        }
    ]
};

// Utility functions for teaching data
const TEACHING_UTILS = {
    /**
     * Get all courses across universities
     */
    getAllCourses() {
        return TEACHING_DATA.universities.flatMap(uni => 
            uni.courses.map(course => ({
                ...course,
                university: uni.name,
                universityShort: uni.shortName
            }))
        );
    },
    
    /**
     * Get courses by level
     */
    getCoursesByLevel(level) {
        return this.getAllCourses().filter(course => course.level === level);
    },
    
    /**
     * Get total number of unique courses
     */
    getTotalCourses() {
        return this.getAllCourses().length;
    },
    
    /**
     * Get total number of teaching years
     */
    getTotalYears() {
        const allYears = new Set();
        this.getAllCourses().forEach(course => {
            course.years.forEach(year => allYears.add(year));
        });
        return allYears.size;
    },
    
    /**
     * Generate level badge HTML
     */
    getLevelBadge(level) {
        const badges = {
            'undergraduate': { text: 'UG', class: 'undergraduate' },
            'graduate': { text: 'MSc', class: 'graduate' },
            'phd': { text: 'PhD', class: 'phd' }
        };
        
        const badge = badges[level] || { text: level.toUpperCase(), class: 'default' };
        return `<span class="course-level ${badge.class}">${badge.text}</span>`;
    },
    
    /**
     * Generate course card HTML
     */
    generateCourseHTML(course) {
        return `
            <div class="course-card" data-level="${course.level}">
                ${this.getLevelBadge(course.level)}
                <div class="course-code">${course.code}</div>
                <h4 class="course-title">${course.title}</h4>
                <p class="course-description">${course.description}</p>
                <div class="course-years">
                    ${course.years.map(year => `<span class="year-tag">${year}</span>`).join('')}
                </div>
                <div class="course-role" style="margin-top: var(--spacing-sm); color: var(--color-text-light); font-size: var(--font-size-small);">
                    <strong>Role:</strong> ${course.role}
                </div>
            </div>
        `;
    },
    
    /**
     * Generate university section HTML
     */
    generateUniversityHTML(university) {
        return `
            <div class="university-section" data-university="${university.id}">
                <div class="university-header">
                    <div class="university-logo">${university.logo}</div>
                    <div class="university-info">
                        <h3>${university.name}</h3>
                        <div class="university-period">${university.period}</div>
                    </div>
                </div>
                
                <div class="courses-grid">
                    ${university.courses.map(course => this.generateCourseHTML(course)).join('')}
                </div>
            </div>
        `;
    },
    
    /**
     * Generate complete teaching page HTML
     */
    generateTeachingPageHTML() {
        const statsHTML = TEACHING_DATA.stats.map(stat => `
            <div class="stat-card">
                <span class="stat-number">${stat.number}</span>
                <span class="stat-label">${stat.label}</span>
            </div>
        `).join('');
        
        const universitiesHTML = TEACHING_DATA.universities.map(uni => 
            this.generateUniversityHTML(uni)
        ).join('');
        
        return `
            <div id="teaching" class="page-content active">
                <h1>Teaching</h1>
                
                <div class="teaching-intro">
                    <h3>${TEACHING_DATA.intro.title}</h3>
                    <p>${TEACHING_DATA.intro.content}</p>
                </div>
                
                <div class="teaching-stats">
                    ${statsHTML}
                </div>
                
                <h2>Teaching Experience</h2>
                ${universitiesHTML}
                
                <div class="teaching-outro">
                    <h3>${TEACHING_DATA.outro.title}</h3>
                    <p>${TEACHING_DATA.outro.content}</p>
                </div>
            </div>
        `;
    }
};

// Make teaching data available globally
window.TEACHING_DATA = TEACHING_DATA;
window.TEACHING_UTILS = TEACHING_UTILS;