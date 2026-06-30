import { test, expect } from 'vitest';
import skills from '../src/data/skills.js';
import projects from '../src/data/projects.js';

test('skills has expected groups with items', () => {
  const groups = skills.map((g) => g.group);
  expect(groups).toContain('Networking & Infrastructure');
  expect(groups).toContain('Languages');
  skills.forEach((g) => {
    expect(Array.isArray(g.items)).toBe(true);
    g.items.forEach((s) => {
      expect(typeof s.name).toBe('string');
      expect(typeof s.level).toBe('string');
    });
  });
});

test('projects are well-formed cards', () => {
  expect(projects.length).toBeGreaterThanOrEqual(3);
  projects.forEach((p) => {
    expect(typeof p.title).toBe('string');
    expect(typeof p.description).toBe('string');
    expect(Array.isArray(p.tags)).toBe(true);
    expect(typeof p.repoUrl).toBe('string');
  });
});
