export class Store {
  #items = [];

  constructor(initialItems = []) {
    if (Array.isArray(initialItems)) {
      this.#items = initialItems.filter(item => Store.isValidItem(item));
    }
  }

  static isValidItem(item) {
    return (
      item &&
      typeof item.name === 'string' &&
      typeof item.price === 'number' &&
      typeof item.qty === 'number' &&
      item.price >= 0 &&
      item.qty >= 0
    );
  }

  add(item) {
    if (Store.isValidItem(item)) {
      this.#items.push({ ...item });
      return true;
    }
    return false;
  }

  remove(name) {
    const initialLength = this.#items.length;
    this.#items = this.#items.filter((item) => item.name !== name);
    return this.#items.length !== initialLength;
  }

  find(name) {
    const found = this.#items.find((item) => item.name === name);
    return found ? { ...found } : null;
  }

  total() {
    return this.#items.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  get items() {
    return this.#items.map((item) => ({ ...item }));
  }
}

export class SortedStore extends Store {
  constructor(initialItems = []) {
    super(initialItems);
  }

  add(item) {
    const added = super.add(item);
    if (added) {
      this.items.sort((a, b) => a.name.localeCompare(b.name));
    }
    return added;
  }

  get sortedItems() {
    return [...this.items].sort((a, b) => a.name.localeCompare(b.name));
  }
}