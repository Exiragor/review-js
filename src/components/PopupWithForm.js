import Popup from './Popup.js';
import {defaultFormConfig} from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmitForm) {
    super(selector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._element.querySelector(defaultFormConfig.formSelector);
    this._inputList = Array.from(this._form.querySelectorAll(defaultFormConfig.inputSelector)).map(input => ({
      name: input.name,
      element: input
    }));
  }

  _getInputValues() {
    return Object.fromEntries(this._inputList.map(input => [input.name, input.element.value]));
  }

  _setHandlers() {
    super._setHandlers();
    this._submitHandler = (evt) => {
      this._handleSubmitForm(evt, this._getInputValues());
    };
  }

  _clearForm() {
    this._inputList.forEach(({element}) => {
      element.value = '';
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitHandler);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._form.removeEventListener('submit', this._submitHandler);
  }

  close() {
    super.close();
    this._clearForm();
  }

  setInputValues(values) {
    values.forEach(({key, value}) => {
      const input = this._inputList.find(i => i.name === key);
      if (input) {
        input.element.value = value;
      }
    });
  }

  getForm() {
    return this._form;
  }
}
