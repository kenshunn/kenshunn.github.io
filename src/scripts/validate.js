export default function validateContact({ name, email, message }) {
  const n = (name || '').trim();
  const e = (email || '').trim();
  const m = (message || '').trim();
  if (!n || !e || !m) {
    return { valid: false, error: 'Please fill in all fields.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
    return { valid: false, error: 'Please enter a valid email.' };
  }
  return { valid: true, error: '' };
}
