const projects = [
  {
    // Featured slot — set featured: true on whichever entry you want pinned on top.
    title: 'Financial Assistance Program (CEDO)',
    description:
      'A web-based voucher management system for an educational financial-assistance program for senior high school students. Admins and staff manage student records, generate PDF vouchers, run bulk imports, and keep audit logs. Built with CodeIgniter 4 (PHP 8.2+), MySQL, Bootstrap 5, and an async PDF worker.',
    tags: ['PHP', 'CodeIgniter 4', 'MySQL', 'Bootstrap'],
    repoUrl: 'https://github.com/jgtrea/FinancialAssistanceProgram_G2',
    liveUrl: '',
    image: 'https://raw.githubusercontent.com/jgtrea/FinancialAssistanceProgram_G2/main/public/assets/img/city_education_office_seal.png',
    featured: true,
  },
  {
    title: 'Clock In',
    description:
      'Proximity-aware attendance authentication using Bluetooth Low Energy beacons. Restricts app access to specific WiFi SSIDs, binds devices to accounts for a BYOD policy, and delivers real-time in-app notifications and user feedback.',
    tags: ['Kotlin', 'Jetpack Compose', 'BLE', 'MFA'],
    repoUrl: 'https://github.com/jgtrea/ClockIn-Application',
    liveUrl: '',
    image: 'https://raw.githubusercontent.com/jgtrea/ClockIn-Application/web/assets/img/clockin-logo.svg',
  },
  {
    title: "Rubik's Cube Cipher",
    description:
      "A 256-bit key, multi-block permutation cipher built on the Rubik's Cube state space. Focused on the ciphering and deciphering logic.",
    tags: ['Python', 'Cryptography'],
    repoUrl: 'https://github.com/JannersLSR/Rubik-s-Cube-Cipher',
    liveUrl: '',
    image: '/images/rubik.svg',
  },
  {
    title: 'Oasis (Twitter Clone)',
    description:
      'A Twitter-like social media platform. Built the login/sign-up authentication flow and managed API-based, real-time data flow between clients and servers.',
    tags: ['JavaScript', 'REST API', 'Auth'],
    repoUrl: 'https://github.com/IanSalandanan/TwitterClone',
    liveUrl: '',
    image: 'https://raw.githubusercontent.com/IanSalandanan/TwitterClone/main/TwitterCloneUi/assets/oasislogo.jpg',
  },
  {
    title: 'CareBy',
    description:
      'An ASP.NET WebForms mental-health platform connecting patients with therapists for online counseling. Patients browse therapist profiles, book appointments, and join video consultations; therapists manage profiles and an appointment dashboard. Built on a three-tier architecture with SQL Server.',
    tags: ['ASP.NET', 'C#', 'SQL Server', 'JavaScript'],
    repoUrl: 'https://github.com/IanSalandanan/IT114L-MP-CareBy',
    liveUrl: '',
    image: 'https://raw.githubusercontent.com/IanSalandanan/IT114L-MP-CareBy/master/carebylogo.png',
  },
];

export default projects;
