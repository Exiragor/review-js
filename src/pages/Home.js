import Card from '../components/card/Card';
import FormValidator from '../utils/FormValidator';
import {
  defaultFormConfig,
  initialCards,
  cardSelector,
  placeListSelector,
  editFormPopupSelector,
  cardFormPopupSelector,
  imagePopupSelector,
  profileDescSelector,
  profileNameSelector,
  addBtnSelector,
  editBtnSelector
} from '../utils/constants';
import PopupWithImage from "../components/popup/PopupWithImage";
import Section from "../components/container/Section";
import Button from "../components/button/Button";
import PopupWithForm from "../components/popup/PopupWithForm";
import UserInfo from "../components/user/UserInfo";

const renderCard = ({link, name}) => {
  const card = new Card({
      link,
      name,
      handleCardClick: () => {
        imagePopup.open({
          src: link,
          alt: `Изображение ${link}`,
          caption: name
        });
      }
    },
    cardSelector
  );

  return card.getView();
}

const user = new UserInfo({
  nameSelector: profileNameSelector,
  infoSelector: profileDescSelector
});

const section = new Section({
  items: initialCards,
  renderer: renderCard,
}, placeListSelector);

section.renderItems();

const editFormSubmitHandler = (evt, {name, description}) => {
  evt.preventDefault();
  user.setUserInfo({name, description});
  editFormPopup.close();
};

const cardFormSubmitHandler = (evt, {link, ...inputValues}) => {
  evt.preventDefault();
  section.addItem(renderCard({name: inputValues['place-name'], link}));
  cardFormPopup.close();
};

const imagePopup = new PopupWithImage(imagePopupSelector);
const editFormPopup = new PopupWithForm(editFormPopupSelector, editFormSubmitHandler);
const cardFormPopup = new PopupWithForm(cardFormPopupSelector, cardFormSubmitHandler);

const editFormValidators = new FormValidator(defaultFormConfig, editFormPopup.getForm());
const cardFormValidators = new FormValidator(defaultFormConfig, cardFormPopup.getForm());
editFormValidators.enableValidation();
cardFormValidators.enableValidation();


const openEditFormButton = new Button(editBtnSelector);
const openCardFormButton = new Button(addBtnSelector);

openEditFormButton.setHandler('click', () => {
  const {name, description} = user.getUserInfo();
  editFormPopup.setInputValues([
    { key: 'name', value: name },
    { key: 'description', value: description },
  ]);
  editFormPopup.open();
});

openCardFormButton.setHandler('click', () => {
  cardFormPopup.open();
});
