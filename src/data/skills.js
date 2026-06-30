// Each skill renders as a shields.io "for-the-badge" badge.
// logo = simple-icons slug (optional), color = brand hex (no #).
const skills = [
  {
    group: 'Languages',
    items: [
      { name: 'Kotlin', logo: 'kotlin', color: '7F52FF' },
      { name: 'Python', logo: 'python', color: '3776AB' },
      { name: 'JavaScript', logo: 'javascript', color: 'F7DF1E', logoColor: 'black' },
      { name: 'C#', logo: 'csharp', color: '239120' },
      { name: 'PHP', logo: 'php', color: '777BB4' },
      { name: 'C++', logo: 'cplusplus', color: '00599C' },
    ],
  },
  {
    group: 'Frameworks & Libraries',
    items: [
      { name: 'Jetpack Compose', logo: 'jetpackcompose', color: '4285F4' },
      { name: 'CodeIgniter', logo: 'codeigniter', color: 'EF4223' },
      { name: 'ASP.NET', logo: 'dotnet', color: '512BD4' },
      { name: 'Node.js', logo: 'nodedotjs', color: '339933' },
      { name: 'Bootstrap', logo: 'bootstrap', color: '7952B3' },
    ],
  },
  {
    group: 'Databases',
    items: [
      { name: 'MySQL', logo: 'mysql', color: '4479A1' },
      { name: 'SQL Server', logo: 'microsoftsqlserver', color: 'CC2927' },
      { name: 'Supabase', logo: 'supabase', color: '3FCF8E' },
      { name: 'Oracle', logo: 'oracle', color: 'F80000' },
    ],
  },
  {
    group: 'Tools & Platforms',
    items: [
      { name: 'Git', logo: 'git', color: 'F05032' },
      { name: 'Android', logo: 'android', color: '34A853' },
      { name: 'REST APIs', color: '005571' },
      { name: 'ktlint', color: 'F88909' },
    ],
  },
  {
    group: 'Networking & Security',
    items: [
      { name: 'CCNA', logo: 'cisco', color: '1BA0D7' },
      { name: 'RHEL', logo: 'redhat', color: 'EE0000' },
      { name: 'TCP/IP', color: '0098FF' },
      { name: 'JWT', logo: 'jsonwebtokens', color: '000000' },
      { name: 'MFA', color: '4B5563' },
    ],
  },
];

export default skills;
