// University Data

const UNI_DATA = {
  universities: [
    {
      name: 'Queen Mary University of London',
      shortName: 'QMUL',
      country: 'UK',
      city: 'London',
      logo: 'assets/images/qmul-logo.jpg',
      website: 'https://www.qmul.ac.uk/'
    },
    {
      name: 'London School of Economics',
      shortName: 'LSE',
      country: 'UK',
      city: 'London',
      logo: 'assets/images/lse-logo.png',
      website: 'https://www.lse.ac.uk/'
    },
    {
      name: 'Imperial College Business School',
      shortName: 'ICBS',
      country: 'UK',
      city: 'London',
      logo: 'assets/images/icbs-logo.png',
      website: 'https://www.imperial.ac.uk/business-school/'
    },
    {
      name: 'University of Bologna',
      shortName: 'UNIBO',
      country: 'IT',
      city: 'Bologna',
      logo: 'assets/images/unibo-logo.png',
      website: 'https://www.unibo.it/en'
    },
    {
      name: 'University of Pavia',
      shortName: 'UNIPV',
      country: 'IT',
      city: 'Pavia',
      logo: 'assets/images/unipv-logo.jpg',
      website: 'https://www.unipv.eu/site/en/home.html'
    }
  ]
};

const UNI_UTILS = {
  getUniversityByName(name) {
    return UNI_DATA.universities.find(uni => uni.name === name || uni.shortName === name.toUpperCase());
  }
}

window.UNI_DATA = UNI_DATA;
window.UNI_UTILS = UNI_UTILS;