// Teaching data

const TEACHING_DATA = {
  courses: [
    {
      name: 'Labour Economics',
      university: 'Queen Mary University of London',
      year: 2025,
      level: 'Undergraduate',
    },
    {
      name: 'Cost–Benefit Analysis',
      university: 'Queen Mary University of London',
      year: 2025,
      level: 'Master',
    },
    {
      name: 'Labour Economics',
      university: 'Queen Mary University of London',
      year: 2024,
      level: 'Undergraduate',
    },
    {
      name: 'Excel for Economics',
      university: 'Queen Mary University of London',
      year: 2025,
      level: 'Undergraduate',
    },
    {
      name: 'Excel for Economics',
      university: 'Queen Mary University of London',
      year: 2024,
      level: 'Undergraduate',
    },
    {
      name: 'Macroeconomics I',
      university: 'London School of Economics',
      year: 2024,
      level: 'Undergraduate',
    },
    {
      name: 'Macroeconomics',
      university: 'London School of Economics',
      year: 2024,
      level: 'Summer School',
    },
    {
      name: 'Labour Economics',
      university: 'Queen Mary University of London',
      year: 2023,
      level: 'Undergraduate',
    },
    {
      name: 'Macroeconomics I',
      university: 'London School of Economics',
      year: 2023,
      level: 'Undergraduate',
    },
    {
      name: 'Statistics',
      university: 'Queen Mary University of London',
      year: 2022,
      level: 'Undergraduate',
    },
    {
      name: 'Principles of Economics',
      university: 'Queen Mary University of London',
      year: 2022,
      level: 'Undergraduate',
    },
    {
      name: 'Managerial Economics',
      university: 'Imperial College Business School',
      year: 2022,
      level: 'Master',
    },
    {
      name: 'Macroeconomics I',
      university: 'Queen Mary University of London',
      year: 2021,
      level: 'Undergraduate',
    },
    {
      name: 'Principles of Economics',
      university: 'Queen Mary University of London',
      year: 2021,
      level: 'Undergraduate',
    },
    {
      name: 'Principles of Economics',
      university: 'Queen Mary University of London',
      year: 2020,
      level: 'Undergraduate',
    },
    {
      name: 'Econometrics III',
      university: 'University of Bologna',
      year: 2019,
      level: 'Master',
    },
    {
      name: 'Public Economics',
      university: 'University of Bologna',
      year: 2019,
      level: 'Undergraduate',
    },
    {
      name: 'Public Economics',
      university: 'University of Pavia',
      year: 2016,
      level: 'Undergraduate',
    },
    {
      name: 'Public Economics',
      university: 'University of Pavia',
      year: 2015,
      level: 'Undergraduate',
    }
  ],
  intro: null,
  outro: `
      I am a trained <strong><a target="_blank" href="assets/documents/teaching_training_certificate.pdf">Graduate Teaching Assistant (Economics Network)</a></strong> and I received 
      teaching bonuses from LSE for the outstanding results in <strong><a target="_blank" href="assets/documents/teaching_evaluations.pdf">students teaching evaluations</a></strong>.
    `
};

const TEACHING_UTILS = {
  getCourseID(course) {
    return [course.name, course.university, course.level].join('-');
  },

  getCourses() {
    const courses = TEACHING_DATA.courses.reduce(
      (acc, instance) => {
        key = this.getCourseID(instance);
        if (!acc[key]) {
          const { year, ...course } = instance;
          course.years = [year];
          acc[key] = course;
        } else {
          acc[key].years.push(instance.year);
        }

        return acc;
      },
      {},
    );

    return Object.values(courses);
  },

  getStyleClassLevel(course) {
    switch (course.level.toLowerCase()) {
      case 'undergraduate':
        return 'undergraduate';
      case 'master':
        return 'master';
      case 'phd':
        return 'phd';
      case 'summer school':
        return 'summer-school';
      default:
        return 'other';
    }
  },

  getTeachingIntro() {
    if (!TEACHING_DATA.intro) return null;

    return `
      <div class="teaching-intro">
        ${TEACHING_DATA.intro}
      </div>`;
  },

  getTeachingOutro() {
    if (!TEACHING_DATA.outro) return null;

    return ` 
      <div class="teaching-outro">
        ${TEACHING_DATA.outro}
      </div>`;
  },

  generateCourseHTML(course) {
    id = this.getCourseID(course);
    return `
      <div class="course-card" id="course-${id}">
        <div class="course-level ${this.getStyleClassLevel(course)}">${course.level}</div>
        <h4 class="course-title">${course.name}</h4>
        <div class="course-years">${course.years.sort((a, b) => a < b ? 1 : a == b ? 0 : -1).map(year => `<div class="year-tag">${year}</div>`).join('')}</div>
      </div>
      `;
  }
}

window.TEACHING_DATA = TEACHING_DATA;
window.TEACHING_UTILS = TEACHING_UTILS;