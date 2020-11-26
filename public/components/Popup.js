export default class Popup {
  constructor(selector) {
    this._element = document.querySelector(selector);
    this._setHandlers();
  }

  _handleEscClose(method) {
    document[method]('keyup', this._keyUpHandler);
  }

  _handleClickClose(method) {
    this._element[method]('click', this._clickHandler);
  }

  _setHandlers() {
    this._keyUpHandler = ({key}) => {
      if (key === 'Escape') {
        this.close();
      }
    }
    this._clickHandler = ({target}) => {
      if (target.classList.contains('popup') || target.classList.contains('popup__close')) {
        this.close();
      }
    }
  }

  open() {
    this._element.classList.add('popup_is-opened');
    this.setEventListeners();
  }

  close() {
    this._element.classList.remove('popup_is-opened');
    this.removeEventListeners();
  }

  setEventListeners() {
    const method = 'addEventListener';
    this._handleEscClose(method);
    this._handleClickClose(method);
  }

  removeEventListeners() {
    const method = 'removeEventListener';
    this._handleEscClose(method);
    this._handleClickClose(method);
  }
}
