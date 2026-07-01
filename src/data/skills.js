// Each skill renders as a clickable shields.io "for-the-badge" badge.
// logo = simple-icons slug (optional), color = brand hex (no #),
// level drives the proficiency bar, detail is shown in the modal.
const skills = [
  {
    group: 'Languages',
    items: [
      { name: 'Kotlin', level: 'Proficient', logo: 'kotlin', color: '7F52FF', detail: 'My main language for Android. Built the Clock In attendance app — BLE proximity auth, Jetpack Compose UI, and a Supabase backend.' },
      { name: 'Python', level: 'Proficient', logo: 'python', color: '3776AB', detail: 'Used for scripting and the Rubik’s Cube Cipher project, implementing the 256-bit permutation cipher and decipher logic.' },
      { name: 'JavaScript', level: 'Proficient', logo: 'javascript', color: 'F7DF1E', logoColor: 'black', detail: 'Frontend interactivity and API data flow. Built the auth flow and real-time client–server communication for the Oasis (Twitter clone).' },
      { name: 'C#', level: 'Proficient', logo: 'csharp', color: '239120', detail: 'Server-side logic for CareBy, the ASP.NET WebForms mental-health counseling platform.' },
      { name: 'PHP', level: 'Familiar', logo: 'php', color: '777BB4', detail: 'Backend for the CEDO Financial Assistance voucher system, built on CodeIgniter 4.' },
      { name: 'C++', level: 'Familiar', logo: 'cplusplus', color: '00599C', detail: 'Core programming fundamentals and data-structures coursework.' },
    ],
  },
  {
    group: 'Frameworks & Libraries',
    items: [
      { name: 'Astro', level: 'Proficient', logo: 'astro', color: 'FF5D01', detail: 'Static-site framework — built this portfolio with Astro: component islands, zero-JS by default, and a GitHub Pages deploy.' },
      { name: 'Jetpack Compose', level: 'Proficient', logo: 'jetpackcompose', color: '4285F4', detail: 'Declarative Android UI for Clock In — screens, navigation, profile management, and real-time in-app notifications.' },
      { name: 'CodeIgniter', level: 'Proficient', logo: 'codeigniter', color: 'EF4223', detail: 'MVC PHP framework powering the Financial Assistance Program: student records, voucher generation, bulk imports, and audit logs.' },
      { name: 'ASP.NET', level: 'Familiar', logo: 'dotnet', color: '512BD4', detail: 'WebForms with a three-tier architecture for the CareBy platform.' },
      { name: 'Node.js', level: 'Familiar', logo: 'nodedotjs', color: '339933', detail: 'Server-side JavaScript and tooling; building and consuming REST endpoints.' },
      { name: 'Bootstrap', level: 'Proficient', logo: 'bootstrap', color: '7952B3', detail: 'Responsive UI layouts and components across web projects.' },
    ],
  },
  {
    group: 'Databases',
    items: [
      { name: 'MySQL', level: 'Proficient', logo: 'mysql', color: '4479A1', detail: 'Relational schema design and queries for the Financial Assistance voucher system.' },
      { name: 'SQL Server', level: 'Proficient', logo: 'microsoftsqlserver', color: 'CC2927', detail: 'Data layer for CareBy — CRUD across patients, therapists, and appointment scheduling.' },
      { name: 'Supabase', level: 'Familiar', logo: 'supabase', color: '3FCF8E', detail: 'Auth and real-time backend for the Clock In Android app.' },
      { name: 'Oracle', level: 'Familiar', logo: 'oracle', color: 'F80000', detail: 'Oracle SQL coursework and querying.' },
    ],
  },
  {
    group: 'Tools & Platforms',
    items: [
      { name: 'Git', level: 'Proficient', logo: 'git', color: 'F05032', detail: 'Version control and collaboration across all of my projects.' },
      { name: 'Android', level: 'Proficient', logo: 'android', color: '34A853', detail: 'Native app development — BYOD device-to-account binding and BLE beacon integration.' },
      { name: 'REST APIs', level: 'Proficient', color: '005571', detail: 'Designing and consuming REST endpoints for client–server data flow.' },
      { name: 'ktlint', level: 'Familiar', color: 'F88909', detail: 'Kotlin linting and formatting to keep the Clock In codebase consistent.' },
    ],
  },
  {
    group: 'Design & Productivity',
    items: [
      { name: 'Canva', level: 'Proficient', color: '00C4CC', detail: 'Graphics, posters, and quick UI mockups.' },
      { name: 'Microsoft Office', level: 'Proficient', color: 'D83B01', detail: 'Word, Excel, and PowerPoint for docs, data, and presentations.' },
      { name: 'Adobe', level: 'Familiar', color: 'FF0000', detail: 'Photoshop / Adobe tools for image editing and assets.' },
    ],
  },
  {
    group: 'Networking & Security',
    items: [
      { name: 'CCNA', level: 'Certified', logo: 'cisco', color: '1BA0D7', detail: 'Cisco Certified — routing & switching and network fundamentals.' },
      { name: 'RHEL', level: 'Proficient', logo: 'redhat', color: 'EE0000', detail: 'Red Hat Enterprise Linux administration through the CLI.' },
      { name: 'TCP/IP', level: 'Proficient', color: '0098FF', detail: 'Networking fundamentals; applied WiFi SSID restriction for network-level access control in Clock In.' },
      { name: 'JWT', level: 'Proficient', logo: 'jsonwebtokens', color: '000000', detail: 'Token-based authentication for secure, stateless sessions.' },
      { name: 'MFA', level: 'Proficient', color: '4B5563', detail: 'Multi-factor authentication to harden app access.' },
    ],
  },
];

export default skills;
