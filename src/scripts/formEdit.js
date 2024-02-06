import { closePopup } from "./popup";

const currentName = document.querySelector('.profile__title').textContent;
const nameStroke = document.forms.editProfile.elements.name;
nameStroke.value = currentName

const currentDescription = document.querySelector('.profile__description').textContent;
const descriptionStroke = document.forms.editProfile.elements.description;
descriptionStroke.value = currentDescription

const formElement = document.querySelector('.popup__form')
const nameInput = formElement.querySelector('.popup__input.popup__input_type_name')
const jobInput = formElement.querySelector('.popup__input.popup__input_type_description')

function handleFormSubmit(evt) {
    evt.preventDefault();
    const nameNew = nameInput.value;
    const descriptionNew = jobInput.value;
    const profile = document.querySelector('.profile__title');
    const description = document.querySelector('.profile__description');
    profile.textContent = nameNew;
    description.textContent = descriptionNew;
    const popup = document.querySelector('.popup_is-opened')
    closePopup(popup);
}

formElement.addEventListener('submit', handleFormSubmit); 