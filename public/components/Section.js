export default class Section {
  constructor({ items, renderer }, selector) {
    this._container = document.querySelector(selector);
    this._items = items;
    this._renderer = renderer;
  }

  renderItems() {
    this._items.forEach(item => {
      const template = this._renderer(item);
      if (template) {
        this.addItem(template);
      }
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
