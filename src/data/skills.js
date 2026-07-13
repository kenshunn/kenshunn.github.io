// Each skill renders as a plain bordered text tag, grouped by category.
// name = label shown on the tag; detail = shown in the skill modal.
const skills = [
  {
    group: 'Languages',
    items: [
      { name: 'Kotlin', detail: 'My main language for Android. Built the Clock In attendance app — BLE proximity auth, Jetpack Compose UI, and a Supabase backend.' },
      { name: 'Python', detail: 'Used for scripting and the Rubik’s Cube Cipher project, implementing the 256-bit permutation cipher and decipher logic.' },
      { name: 'JavaScript', detail: 'Frontend interactivity and API data flow. Built the auth flow and real-time client–server communication for the Oasis (Twitter clone).' },
      { name: 'C#', detail: 'Server-side logic for CareBy, the ASP.NET WebForms mental-health counseling platform.' },
      { name: 'PHP', detail: 'Backend for the CEDO Financial Assistance voucher system, built on CodeIgniter 4.' },
      { name: 'C++', detail: 'Core programming fundamentals and data-structures coursework.' },
    ],
  },
  {
    group: 'Frameworks & Libraries',
    items: [
      { name: 'Astro', detail: 'Static-site framework — built this portfolio with Astro: component islands, zero-JS by default, and a GitHub Pages deploy.' },
      { name: 'Jetpack Compose', detail: 'Declarative Android UI for Clock In — screens, navigation, profile management, and real-time in-app notifications.' },
      { name: 'CodeIgniter', detail: 'MVC PHP framework powering the Financial Assistance Program: student records, voucher generation, bulk imports, and audit logs.' },
      { name: 'ASP.NET', detail: 'WebForms with a three-tier architecture for the CareBy platform.' },
      { name: 'Node.js', detail: 'Server-side JavaScript and tooling; building and consuming REST endpoints.' },
      { name: 'Bootstrap', detail: 'Responsive UI layouts and components across web projects.' },
    ],
  },
  {
    group: 'Databases',
    items: [
      { name: 'MySQL', detail: 'Relational schema design and queries for the Financial Assistance voucher system.' },
      { name: 'SQL Server', detail: 'Data layer for CareBy — CRUD across patients, therapists, and appointment scheduling.' },
      { name: 'Supabase', detail: 'Auth and real-time backend for the Clock In Android app.' },
      { name: 'Oracle', detail: 'Oracle SQL coursework and querying.' },
    ],
  },
  {
    group: 'Tools & Platforms',
    items: [
      { name: 'Git', detail: 'Version control and collaboration across all of my projects.' },
      { name: 'Android', detail: 'Native app development — BYOD device-to-account binding and BLE beacon integration.' },
      { name: 'REST APIs', detail: 'Designing and consuming REST endpoints for client–server data flow.' },
      { name: 'ktlint', detail: 'Kotlin linting and formatting to keep the Clock In codebase consistent.' },
    ],
  },
  {
    group: 'Design & Productivity',
    items: [
      { name: 'Canva', detail: 'Graphics, posters, and quick UI mockups.' },
      { name: 'Microsoft Office', detail: 'Word, Excel, and PowerPoint for docs, data, and presentations.' },
      { name: 'Adobe', detail: 'Photoshop / Adobe tools for image editing and assets.' },
    ],
  },
  {
    group: 'Networking & Security',
    items: [
      { name: 'CCNA', detail: 'Cisco Certified — routing & switching and network fundamentals.' },
      { name: 'RHEL', detail: 'Red Hat Enterprise Linux administration through the CLI.' },
      { name: 'TCP/IP', detail: 'Networking fundamentals; applied WiFi SSID restriction for network-level access control in Clock In.' },
      { name: 'JWT', detail: 'Token-based authentication for secure, stateless sessions.' },
      { name: 'MFA', detail: 'Multi-factor authentication to harden app access.' },
    ],
  },
];

export default skills;
