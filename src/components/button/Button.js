export default class Button {
  constructor(selector) {
    this._element = document.querySelector(selector);
  }

  setHandler(type, handler) {
    this._element.addEventListener(type, handler);
  }
}
