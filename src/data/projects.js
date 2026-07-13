const projects = [
  {
    // Featured slot — set featured: true on whichever entry you want pinned on top.
    title: 'Financial Assistance Program (CEDO)',
    description:
      'A web-based voucher management system for an educational financial-assistance program for senior high school students. Admins and staff manage student records, generate PDF vouchers, run bulk imports, and keep audit logs. Built with CodeIgniter 4 (PHP 8.2+), MySQL, Bootstrap 5, and an async PDF worker.',
    tags: ['PHP', 'CodeIgniter 4', 'MySQL', 'Bootstrap'],
    repoUrl: 'https://github.com/jgtrea/FinancialAssistanceProgram_G2',
    liveUrl: '',
    image: '/images/cedo-seal.webp',
    featured: true,
    meta: { role: 'Full-stack Web Developer Intern', focus: 'Voucher management system', output: 'PDF vouchers, bulk import, audit logs' },
    gallery: [
      { src: '/images/cedo/1.webp', caption: 'Sign-in page — authorized-account login for the Grants & Scholarships Program.' },
      { src: '/images/cedo/2.webp', caption: 'Dashboard — student count, vouchers printed, and recent student records.' },
      { src: '/images/cedo/3.webp', caption: 'Students — manage records with search, filters, bulk import, and add.' },
      { src: '/images/cedo/4.webp', caption: 'Schools — manage junior and senior high school data (import/export).' },
      { src: '/images/cedo/5.webp', caption: 'Signatories — manage voucher signatories and their signatures.' },
      { src: '/images/cedo/6.webp', caption: 'Archive — archive and export student records by school year.' },
      { src: '/images/cedo/7.webp', caption: 'Vouchers — generate, print, and export student vouchers.' },
      { src: '/images/cedo/8.webp', caption: 'User Management — staff accounts, roles, and system access.' },
      { src: '/images/cedo/9.webp', caption: 'Other Options — custom dropdowns for suffix, prefix, and degree fields.' },
      { src: '/images/cedo/10.webp', caption: 'Audit Logs — track account activity and voucher changes.' },
    ],
  },
  {
    title: 'Clock In',
    description:
      'Proximity-aware attendance authentication using Bluetooth Low Energy beacons. Restricts app access to specific WiFi SSIDs, binds devices to accounts for a BYOD policy, and delivers real-time in-app notifications and user feedback.',
    tags: ['Kotlin', 'Jetpack Compose', 'BLE', 'MFA'],
    repoUrl: 'https://github.com/jgtrea/ClockIn-Application',
    liveUrl: '',
    image: '/images/clockin.svg',
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
    image: '/images/oasis-logo.webp',
  },
  {
    title: 'CareBy',
    description:
      'An ASP.NET WebForms mental-health platform connecting patients with therapists for online counseling. Patients browse therapist profiles, book appointments, and join video consultations; therapists manage profiles and an appointment dashboard. Built on a three-tier architecture with SQL Server.',
    tags: ['ASP.NET', 'C#', 'SQL Server', 'JavaScript'],
    repoUrl: 'https://github.com/IanSalandanan/IT114L-MP-CareBy',
    liveUrl: '',
    image: '/images/careby-logo.webp',
  },
  {
    title: 'Electric Billing',
    description:
      'An electricity billing web application built on CodeIgniter 4 (PHP 8.2+). Handles customer and consumption records and bill generation through a clean MVC structure.',
    tags: ['PHP', 'CodeIgniter 4', 'JavaScript'],
    repoUrl: 'https://github.com/kenshunn/electric_billing',
    liveUrl: '',
    image: '/images/electric.svg',
  },
];

export default projects;
