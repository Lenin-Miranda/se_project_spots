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

// Template
const cardsTemplate = document.querySelector("#media-template");

// Modal
const modalOutside = document.querySelector(".modal");
const profileModal = document.querySelector("#modal-edit");
const descriptionText = document.querySelector(
  ".modal__input_type_description"
);
const profileCloseButton = document.querySelector(".modal__close-btn");
const cardModalCloseButton = document.querySelector(
  ".modal__close-btn_type_cards"
);
const nameText = document.querySelector(".modal__input_type_name");
const profileForm = document.querySelector("#profile-form");
const modalAddCards = document.querySelector("#modal-edit-card");
const modalCardsForm = document.querySelector("#form-card");
const modalPreview = document.querySelector("#modal__preview");
const modalCardCloseBtn = document.querySelector(
  ".modal__close-btn_type_preview"
);
const modalImage = document.querySelector(".modal__image");
const modalCaption = document.querySelector(".modal__caption");

//profile
const profileOpenButton = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__username");
const profileDescription = document.querySelector(".profile__description");

// Cards

const cardSubmitBtn = document.querySelector(".modal__button");
const linkText = document.querySelector("#add-card-link-input");
const cardsList = document.querySelector(".media__cards");
const captionText = document.querySelector("#add-card-caption-input");
const cardModalOpenButton = document.querySelector(".profile__buttom");

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

  //card like
  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-btn_liked");
  });

  //card delete
  cardDeleteBtn.addEventListener("click", () => {
    cardsElement.remove();
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

// Open Modal
function openModal(modal) {
  modal.classList.add("modal_opened");
}

// Close Modal

function closePopup(popup) {
  popup.classList.remove("modal_opened");
}

// Profile Form Submit
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameText.value;
  profileDescription.textContent = descriptionText.value;

  closePopup(profileModal);
}

// Card Form Submit
function handlerCardFormSubmit(evt) {
  evt.preventDefault();

  const inputValues = {
    name: captionText.value,
    link: linkText.value,
  };

  const cardsElement = getCardsElement(inputValues);
  cardsList.prepend(cardsElement);
  evt.target.reset();
  closePopup(modalAddCards);
}

//keyPress

//For Each cards
initialCards.forEach((item) => {
  const cardsElement = getCardsElement(item);
  cardsList.prepend(cardsElement);
});

// Close Modal
profileCloseButton.addEventListener("click", () => {
  closePopup(profileModal);
});
cardModalCloseButton.addEventListener("click", () => {
  closePopup(modalAddCards);
});
modalCardCloseBtn.addEventListener("click", () => {
  closePopup(modalPreview);
});

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closePopup(profileModal) ||
      closePopup(modalAddCards) ||
      closePopup(modalPreview);
  }
});

// Open Modal
profileOpenButton.addEventListener("click", () => {
  nameText.value = profileName.textContent;
  descriptionText.value = profileDescription.textContent;
  openModal(profileModal);
});

// Profile form Submit
profileForm.addEventListener("submit", handleProfileFormSubmit);

// Card Form submit
modalCardsForm.addEventListener("submit", handlerCardFormSubmit);

cardModalOpenButton.addEventListener("click", () => {
  openModal(modalAddCards);
});
