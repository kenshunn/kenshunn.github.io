// Certifications shown in the About section. featured: true gets its own row.
// logo = simpleicons CDN url for the issuer brand.
const G = 'https://cdn.simpleicons.org/googlecloud';
const certifications = [
  { name: 'CompTIA Tech+ Certification', issuer: 'CompTIA', url: 'https://www.credly.com/badges/891d798c-3449-41d1-9f12-9208667420aa/linked_in_profile', logo: 'https://cdn.simpleicons.org/comptia', featured: true },
  { name: 'CCNA: Introduction to Networks', issuer: 'Cisco', url: 'https://www.credly.com/badges/7f7eab5b-e3b7-4569-8ec6-ba4a3d344e8b/linked_in_profile', logo: 'https://cdn.simpleicons.org/cisco' },
  { name: 'Full Stack Web Development', issuer: 'Amazon · Coursera', url: 'https://www.coursera.org/account/accomplishments/records/423KN31W0PKL', logo: 'https://cdn.simpleicons.org/coursera' },
  { name: 'The Language of Design: Form and Meaning', issuer: 'CalArts · Coursera', url: 'https://coursera.org/share/ec9fddbde91a463a1459a6882b0f3bfa', logo: 'https://cdn.simpleicons.org/coursera' },
  { name: 'Set Up an App Dev Environment on Google Cloud', issuer: 'Google Cloud', url: 'https://www.skills.google/public_profiles/c6214554-2530-4cdb-a3da-8cb58d22236c/badges/14307830', logo: G },
  { name: 'Prepare Data for ML APIs on Google Cloud', issuer: 'Google Cloud', url: 'https://www.skills.google/public_profiles/c6214554-2530-4cdb-a3da-8cb58d22236c/badges/14217369', logo: G },
  { name: 'Build a Secure Google Cloud Network', issuer: 'Google Cloud', url: 'https://www.skills.google/public_profiles/c6214554-2530-4cdb-a3da-8cb58d22236c/badges/14208565', logo: G },
  { name: 'Implement Load Balancing on Compute Engine', issuer: 'Google Cloud', url: 'https://www.skills.google/public_profiles/c6214554-2530-4cdb-a3da-8cb58d22236c/badges/14164303', logo: G },
  { name: 'GCCF: Data, ML, and AI in Google Cloud', issuer: 'Google Cloud', url: 'https://www.skills.google/public_profiles/c6214554-2530-4cdb-a3da-8cb58d22236c/badges/14111129', logo: G },
  { name: 'GCCF: Networking & Security in Google Cloud', issuer: 'Google Cloud', url: 'https://www.skills.google/public_profiles/c6214554-2530-4cdb-a3da-8cb58d22236c/badges/14095493', logo: G },
  { name: 'GCCF: Infrastructure in Google Cloud', issuer: 'Google Cloud', url: 'https://www.skills.google/public_profiles/c6214554-2530-4cdb-a3da-8cb58d22236c/badges/14080333', logo: G },
  { name: 'GCCF: Cloud Computing Fundamentals', issuer: 'Google Cloud', url: 'https://www.skills.google/public_profiles/c6214554-2530-4cdb-a3da-8cb58d22236c/badges/14074993', logo: G },
];

export default certifications;
