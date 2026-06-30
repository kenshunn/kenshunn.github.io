import { test, expect } from 'vitest';
import validateContact from '../src/scripts/validate.js';

test('valid input passes', () => {
  expect(validateContact({ name: 'Ken', email: 'a@b.com', message: 'hi' }))
    .toEqual({ valid: true, error: '' });
});

test('empty field fails', () => {
  const r = validateContact({ name: '', email: 'a@b.com', message: 'hi' });
  expect(r.valid).toBe(false);
  expect(r.error).toMatch(/fill/i);
});

test('bad email fails', () => {
  const r = validateContact({ name: 'Ken', email: 'nope', message: 'hi' });
  expect(r.valid).toBe(false);
  expect(r.error).toMatch(/email/i);
});
