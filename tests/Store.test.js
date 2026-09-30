import { describe, it, expect } from 'vitest';
import { Store, SortedStore } from '../src/Store.js';

describe('Part 2: Store Classes Unit Tests', () => {
  it('Store adds items and calculates total price', () => {
    const store = new Store();
    store.add({ name: 'Studio Hour', price: 50, qty: 2 });
    store.add({ name: 'Camera Rent', price: 30, qty: 1 });
    expect(store.total()).toBe(130);
  });

  it('Store rejects invalid item properties', () => {
    const store = new Store();
    expect(store.add({ name: 'Bad Item', price: -10, qty: 1 })).toBe(false);
    expect(store.add({ name: 'Bad Qty', price: 10, qty: -2 })).toBe(false);
    expect(store.total()).toBe(0);
  });

  it('Store removes existing items by name', () => {
    const store = new Store([{ name: 'Lens', price: 20, qty: 1 }]);
    expect(store.remove('Lens')).toBe(true);
    expect(store.total()).toBe(0);
  });

  it('Store returns false when removing non-existent item', () => {
    const store = new Store();
    expect(store.remove('Ghost')).toBe(false);
  });

  it('Store finds item by name and returns a copy', () => {
    const store = new Store([{ name: 'Flash', price: 15, qty: 2 }]);
    const found = store.find('Flash');
    expect(found).toEqual({ name: 'Flash', price: 15, qty: 2 });
  });

  it('Store find() returns null for missing items', () => {
    const store = new Store();
    expect(store.find('Nothing')).toBeNull();
  });

  it('SortedStore inherits from Store and sorts items alphabetically', () => {
    const store = new SortedStore();
    store.add({ name: 'Tripod', price: 40, qty: 1 });
    store.add({ name: 'Background', price: 100, qty: 1 });
    expect(store.sortedItems[0].name).toBe('Background');
    expect(store.sortedItems[1].name).toBe('Tripod');
  });

  it('SortedStore calculates total using super methods', () => {
    const store = new SortedStore();
    store.add({ name: 'Softbox', price: 25, qty: 2 });
    expect(store.total()).toBe(50);
  });
});