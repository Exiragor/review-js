export default class UserInfo {
  constructor({nameSelector, infoSelector}) {
    this._name = document.querySelector(nameSelector);
    this._desc = document.querySelector(infoSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._desc.textContent
    };
  }

  setUserInfo({name, description}) {
    this._name.textContent = name;
    this._desc.textContent = description;
  }
}
