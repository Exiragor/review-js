import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._imageElement = this._element.querySelector('.popup__image');
    this._imageCaption = this._element.querySelector('.popup__caption');
  }

  _setImageInfo({src, alt, caption}) {
    if (this._imageElement && src) {
      this._imageElement.src = src;
      this._imageElement.alt = alt;
    }
    if (this._imageCaption && caption) {
      this._imageCaption.textContent = caption;
    }
  }

  open(image) {
    super.open();
    this._setImageInfo(image);
  }
}
