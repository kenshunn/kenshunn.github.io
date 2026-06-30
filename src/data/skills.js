// Each skill renders as a two-tone shields.io "for-the-badge":
// left = brand color + logo + name, right = proficiency level.
// logo = simple-icons slug (optional), color = brand hex (no #).
const skills = [
  {
    group: 'Languages',
    items: [
      { name: 'Kotlin', level: 'Proficient', logo: 'kotlin', color: '7F52FF' },
      { name: 'Python', level: 'Proficient', logo: 'python', color: '3776AB' },
      { name: 'JavaScript', level: 'Proficient', logo: 'javascript', color: 'F7DF1E', logoColor: 'black' },
      { name: 'C#', level: 'Proficient', logo: 'csharp', color: '239120' },
      { name: 'PHP', level: 'Familiar', logo: 'php', color: '777BB4' },
      { name: 'C++', level: 'Familiar', logo: 'cplusplus', color: '00599C' },
    ],
  },
  {
    group: 'Frameworks & Libraries',
    items: [
      { name: 'Jetpack Compose', level: 'Proficient', logo: 'jetpackcompose', color: '4285F4' },
      { name: 'CodeIgniter', level: 'Proficient', logo: 'codeigniter', color: 'EF4223' },
      { name: 'ASP.NET', level: 'Familiar', logo: 'dotnet', color: '512BD4' },
      { name: 'Node.js', level: 'Familiar', logo: 'nodedotjs', color: '339933' },
      { name: 'Bootstrap', level: 'Proficient', logo: 'bootstrap', color: '7952B3' },
    ],
  },
  {
    group: 'Databases',
    items: [
      { name: 'MySQL', level: 'Proficient', logo: 'mysql', color: '4479A1' },
      { name: 'SQL Server', level: 'Proficient', logo: 'microsoftsqlserver', color: 'CC2927' },
      { name: 'Supabase', level: 'Familiar', logo: 'supabase', color: '3FCF8E' },
      { name: 'Oracle', level: 'Familiar', logo: 'oracle', color: 'F80000' },
    ],
  },
  {
    group: 'Tools & Platforms',
    items: [
      { name: 'Git', level: 'Proficient', logo: 'git', color: 'F05032' },
      { name: 'Android', level: 'Proficient', logo: 'android', color: '34A853' },
      { name: 'REST APIs', level: 'Proficient', color: '005571' },
      { name: 'ktlint', level: 'Familiar', color: 'F88909' },
    ],
  },
  {
    group: 'Networking & Security',
    items: [
      { name: 'CCNA', level: 'Certified', logo: 'cisco', color: '1BA0D7' },
      { name: 'RHEL', level: 'Proficient', logo: 'redhat', color: 'EE0000' },
      { name: 'TCP/IP', level: 'Proficient', color: '0098FF' },
      { name: 'JWT', level: 'Proficient', logo: 'jsonwebtokens', color: '000000' },
      { name: 'MFA', level: 'Proficient', color: '4B5563' },
    ],
  },
];

export default skills;
