import { describe, it, expect, vi } from 'vitest';
import { unique, groupBy, chunk, deepClone, memoize, counter } from '../src/functions.js';

describe('Part 1: Functions Unit Tests', () => {
  // unique
  it('unique() removes primitive duplicates', () => {
    expect(unique([1, 2, 2, 3, 4, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it('unique() returns empty array for non-array inputs', () => {
    expect(unique([])).toEqual([]);
    expect(unique(null)).toEqual([]);
    expect(unique(undefined)).toEqual([]);
  });

  // groupBy
  it('groupBy() groups objects by string key', () => {
    const data = [
      { id: 1, role: 'admin' },
      { id: 2, role: 'user' },
      { id: 3, role: 'admin' }
    ];
    expect(groupBy(data, (item) => item.role)).toEqual({
      admin: [{ id: 1, role: 'admin' }, { id: 3, role: 'admin' }],
      user: [{ id: 2, role: 'user' }]
    });
  });

  it('groupBy() returns empty object on invalid inputs', () => {
    expect(groupBy(null, () => {})).toEqual({});
    expect(groupBy([1, 2], null)).toEqual({});
  });

  // chunk
  it('chunk() splits array into even parts', () => {
    expect(chunk([1, 2, 3, 4, 5, 6], 2)).toEqual([[1, 2], [3, 4], [5, 6]]);
  });

  it('chunk() handles remainder chunks correctly', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('chunk() returns empty array for zero or negative size', () => {
    expect(chunk([1, 2, 3], 0)).toEqual([]);
    expect(chunk([1, 2, 3], -1)).toEqual([]);
  });

  // deepClone
  it('deepClone() clones nested objects and arrays without maintaining reference', () => {
    const orig = { a: 1, b: [10, 20], c: { d: 'test' } };
    const clone = deepClone(orig);
    expect(clone).toEqual(orig);
    expect(clone).not.toBe(orig);
    expect(clone.b).not.toBe(orig.b);
  });

  it('deepClone() clones Date objects correctly', () => {
    const date = new Date('2026-09-30');
    const orig = { created: date };
    const clone = deepClone(orig);
    expect(clone.created).toEqual(date);
    expect(clone.created).not.toBe(date);
  });

  it('deepClone() handles primitive values', () => {
    expect(deepClone(100)).toBe(100);
    expect(deepClone('hello')).toBe('hello');
    expect(deepClone(null)).toBeNull();
  });

  // memoize
  it('memoize() caches results and avoids redundant function calls', () => {
    const fn = vi.fn((x, y) => x * y);
    const memo = memoize(fn);
    expect(memo(3, 4)).toBe(12);
    expect(memo(3, 4)).toBe(12);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  // counter
  it('counter() closure maintains count state correctly', () => {
    const c = counter(10);
    expect(c.value()).toBe(10);
    expect(c.inc()).toBe(11);
    expect(c.dec()).toBe(10);
    expect(c.dec()).toBe(9);
  });
});