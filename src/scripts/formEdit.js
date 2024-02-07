import { closePopup } from "./modal.js";

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupEdit = document.querySelector('.popup_type_edit');
const formEditProfile = document.forms.editProfile;
const nameInput = formEditProfile.name;
const jobInput = formEditProfile.description;


nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;


function submitForm(evt) {
    evt.preventDefault();

    const nameNew = nameInput.value;
    const descriptionNew = jobInput.value;

    profileTitle.textContent = nameNew;
    profileDescription.textContent = descriptionNew;

    closePopup(popupEdit);
}

formEditProfile.addEventListener('submit', submitForm); 