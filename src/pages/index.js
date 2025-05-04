import { disableButton } from "../scripts/validation.js";
import { settings } from "../scripts/validation.js";
import { resetValidation } from "../scripts/validation.js";
import { enableValidation } from "../scripts/validation.js";
import "./index.css";

import headerLogoSrc from "../images/spots.svg";
import profileLogoSrc from "../images/pencil.svg";
import profileLogoPlusSrc from "../images/Plus.svg";
import closeIconSrc from "../images/BlackX.svg";
import closeIconPreviewSrc from "../images/Close-icon-white.svg";
import whitePencilSrc from "../images/whitePencil.svg";
import Api from "../scripts/API.js";

const profileAvatarBtnLogo = document.getElementById("profile__avatar-logo");
profileAvatarBtnLogo.src = whitePencilSrc;

const profileAvatarBtnClose = document.getElementById("close__icon-avatar");
profileAvatarBtnClose.src = closeIconSrc;

const profileAvatar = document.getElementById("profile__avatar");

const headerLogo = document.getElementById("header__logo");
headerLogo.src = headerLogoSrc;

const profileLogo = document.getElementById("profile__logo");
profileLogo.src = profileLogoSrc;

const profileLogoPlus = document.getElementById("profile__logo-plus");
profileLogoPlus.src = profileLogoPlusSrc;

const closeIcon = document.getElementById("close__icon");
closeIcon.src = closeIconSrc;

const closeIconcards = document.getElementById("close__icon-cards");
closeIconcards.src = closeIconSrc;

const closeIconPreview = document.getElementById("close__icon-preview");
closeIconPreview.src = closeIconPreviewSrc;

const closeIconDelete = document.getElementById("close__icon-delete");
closeIconDelete.src = closeIconPreviewSrc;

const initialCards = [
  {
    name: "Val thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

//GET

// Template
const cardsTemplate = document.querySelector("#media-template");

// Modal
const allModals = document.querySelectorAll(".modal");
const profileModal = document.querySelector("#modal-edit");
const descriptionText = document.querySelector(
  ".modal__input_type_description"
);
const modalDelete = document.querySelector("#modal-edit-delete");
const formDelete = document.getElementById("form-delete");

const nameText = document.querySelector(".modal__input_type_name");
const profileForm = document.forms["profile-form"];
const modalAddCards = document.querySelector("#modal-edit-card");
const modalCardsForm = document.querySelector("#form-card");
const modalPreview = document.querySelector("#modal__preview");
const modalCardCloseBtn = document.querySelector(
  ".modal__close-btn_type_preview"
);
const modalAvatarForm = document.querySelector("#form-avatar");
const modalImage = document.querySelector(".modal__image");
const modalCaption = document.querySelector(".modal__caption");

//profile
const profileOpenButton = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__username");
const profileDescription = document.querySelector(".profile__description");
const profileAvatarLogo = document.querySelector(".profile__avatar");
const profileAvatarLogoContainer = document.querySelector(
  ".profile__container-avatar"
);
const profileAvatarModal = document.querySelector("#modal-edit-avatar");
const profileAvatarBtn = document.querySelector(".profile__avatar-btn");
const profileAvatarInput = document.querySelector("#add-avatar-link-input");

// Cards

const cardSubmitBtn = document.querySelector(".modal__button");
const linkText = document.querySelector("#add-card-link-input");
const cardsList = document.querySelector(".media__cards");
const captionText = document.querySelector("#add-card-caption-input");
const cardModalOpenButton = document.querySelector(".profile__buttom");
let selectedCard = null;
let selectedCardId = null;
let currentUserId = null;

//button
const modalDeleteBtn = document.querySelector(".modal__button-delete");
const modalDeleteCancelBtn = document.querySelector(".modal__button-cancel");
const modalAvatarBtn = document.querySelector(".modal__button-avatar");

// Api
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c8225591-fba4-4b45-b151-2e1ffac6d30d",
    "Content-Type": "application/json",
  },
});

api
  .getAllData()
  .then(([cardsData, usersData]) => {
    currentUserId = usersData._id;
    profileName.textContent = usersData.name;
    profileDescription.textContent = usersData.about;
    profileAvatar.src = usersData.avatar;
    profileAvatar.alt = usersData.name;

    cardsData.forEach((item) => {
      const cardsElement = getCardsElement(item);
      cardsList.prepend(cardsElement);
    });
  })
  .catch((err) => {
    console.error(err);
  });

// Get Cards
function getCardsElement(data) {
  const cardsElement = cardsTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardsName = cardsElement.querySelector(".card__description");
  const cardLikeBtn = cardsElement.querySelector(".card__like-btn");
  const cardsImage = cardsElement.querySelector(".card__image");
  const cardDeleteBtn = cardsElement.querySelector(".card__delete-btn");

  cardsName.textContent = data.name;
  cardsImage.src = data.link;
  cardsImage.alt = data.name;

  if (data.isLiked) {
    cardLikeBtn.classList.add("card__like-btn_liked");
  }
  //card like
  cardLikeBtn.addEventListener("click", () => {
    const isLiked = cardLikeBtn.classList.contains("card__like-btn_liked");
    if (isLiked) {
      api
        .removeLikeCard(data._id)
        .then(() => {
          cardLikeBtn.classList.remove("card__like-btn_liked");
        })
        .catch((err) => {
          console.error("failed to remove like:", err);
        });
    } else {
      api
        .addLikedCard(data._id)
        .then(() => {
          cardLikeBtn.classList.add("card__like-btn_liked");
        })
        .catch((err) => {
          console.error("failed to add like:", err);
        });
    }
  });

  //card delete
  cardDeleteBtn.addEventListener("click", () => {
    selectedCard = cardsElement;
    selectedCardId = data._id;
    openModal(modalDelete);
  });

  //card preview
  cardsImage.addEventListener("click", () => {
    modalImage.src = data.link;
    modalImage.alt = data.name;
    modalCaption.textContent = data.name;
    openModal(modalPreview);
  });

  return cardsElement;
}

//Modal avatar
profileAvatarLogoContainer.addEventListener("mouseenter", () => {
  profileAvatarBtn.classList.add("profile_avatar-index");
});

profileAvatarLogoContainer.addEventListener("mouseleave", () => {
  profileAvatarBtn.classList.remove("profile_avatar-index");
});

profileAvatarBtn.addEventListener("click", () => {
  openModal(profileAvatarModal);
});

function handleAvatarSubmit(evt) {
  evt.preventDefault();

  const originalText = modalAvatarBtn.textContent;
  modalAvatarBtn.textContent = "Saving...";

  api
    .updateAvatar(profileAvatarInput.value)
    .then((updatedUser) => {
      disableButton(modalAvatarBtn, settings);
      profileAvatarLogo.src = updatedUser.avatar;
      profileAvatarLogo.alt = updatedUser.name;
      modalAvatarForm.reset();
      closePopup(profileAvatarModal);
    })
    .catch((err) => {
      console.error("Error updating avatar:", err);
      // Puedes mostrar un mensaje de error en la UI si lo deseas
    })
    .finally(() => {
      modalAvatarBtn.textContent = originalText;
    });
}
modalAvatarBtn.addEventListener("click", handleAvatarSubmit);

function handleDeleteSubmit(evt) {
  evt.preventDefault();

  if (!selectedCardId || !selectedCard) return;

  const originalText = modalDeleteBtn.textContent;
  modalDeleteBtn.textContent = "Deleting...";

  api
    .removeCard(selectedCardId)
    .then(() => {
      if (selectedCard) {
        modalDeleteBtn.textContent = originalText;

        closePopup(modalDelete);

        selectedCard.remove();
      }
      selectedCard = null;
      selectedCardId = null;
    })
    .catch((err) => {
      console.error("Failed to delete card:", err);
    });
}

// Open Modal
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", modalCloseOnEsc);
}

// Close Modal

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", modalCloseOnEsc);
}

const modalSubmitBtnProfile = document.querySelector(".modal__button-profile");

// Profile Form Submit
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const originalText = cardSubmitBtn.textContent;
  modalSubmitBtnProfile.textContent = "Saving...";
  const name = nameText.value;
  const about = descriptionText.value;

  api
    .updateUserInfo({ name, about })
    .then((updatedUser) => {
      profileName.textContent = updatedUser.name;
      profileDescription.textContent = updatedUser.about;
      modalSubmitBtnProfile.textContent = originalText;
      closePopup(profileModal);
    })
    .catch((err) => {
      console.error("Failed to update user info:", err);
    })
    .finally(() => {
      disableButton(modalSubmitBtnProfile, settings);
      resetValidation(
        profileForm,
        [nameText, descriptionText],
        cardSubmitBtn,
        settings
      );
    });
}

// Card Form Submit
function handlerCardFormSubmit(evt) {
  evt.preventDefault();
  const name = captionText.value;
  const link = linkText.value;
  const originalText = evt.submitter.textContent;
  evt.submitter.textContent = "Saving...";

  api
    .loadingCards({ name, link })
    .then((newCard) => {
      const cardsElement = getCardsElement(newCard);
      cardsList.prepend(cardsElement);

      disableButton(evt.submitter, settings);

      modalCardsForm.reset();
    })
    .catch((err) => {
      console.error("Failed to load card:", err);
    })
    .finally(() => {
      evt.submitter.textContent = originalText;
      closePopup(modalAddCards);
    });
}
function closePopupOutside(modals) {
  modals.forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closePopup(modal);
      }
    });
  });
}
closePopupOutside(allModals);

//For Each cards

// Close Modal

const closeButtons = document.querySelectorAll(".modal__close-btn");

closeButtons.forEach((button) => {
  // Find the closest popup only once
  const popup = button.closest(".modal");
  // Set the listener
  button.addEventListener("click", () => closePopup(popup));
});

//keyPress
function modalCloseOnEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    closePopup(openedPopup);
  }
}
// Open Modal
profileOpenButton.addEventListener("click", () => {
  nameText.value = profileName.textContent;
  descriptionText.value = profileDescription.textContent;
  resetValidation(
    profileForm,
    [nameText, descriptionText],
    cardSubmitBtn,
    settings
  );
  openModal(profileModal);
});
// Form delete
formDelete.addEventListener("submit", handleDeleteSubmit);
// Profile form Submit
profileForm.addEventListener("submit", handleProfileFormSubmit);

// Card Form submit
modalCardsForm.addEventListener("submit", handlerCardFormSubmit);

cardModalOpenButton.addEventListener("click", () => {
  openModal(modalAddCards);
});
modalDeleteCancelBtn.addEventListener("click", () => closePopup(modalDelete));

modalDelete.addEventListener("submit", handleDeleteSubmit);

enableValidation(settings);
