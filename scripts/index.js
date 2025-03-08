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
const modal = document.querySelector("#modal-edit");
let descriptionText = document.querySelector(".modal__input_type_description");
const modalClose = document.querySelector(".modal__close-btn");
const modalCloseBtn = document.querySelector(".modal__close-btn_type_cards");
let nameText = document.querySelector(".modal__input_type_name");
const profileForm = document.querySelector(".modal__form");
let modalForm = document.querySelector(".modal__form");
let modalDescription = document.querySelector(".modal__description");
const modalAddCards = document.querySelector("#modal-edit-card");
const modalButton = document.querySelector(".modal__button-cards");
const modalCards = document.querySelector("#form-card");

//profile
const modalOpen = document.querySelector(".profile__edit-btn");
let profileName = document.querySelector(".profile__username");
let profileDescription = document.querySelector(".profile__description");
const profileButton = document.querySelector(".profile__buttom");

// Cards
let linkText = document.querySelector("#add-card-link-input");
const cardsList = document.querySelector(".media__cards");
let captionText = document.querySelector("#add-card-caption-input");

// Get Cards
function getCardsElement(data) {
  const cardsElement = cardsTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardsName = cardsElement.querySelector(".card__description");

  const cardsImage = cardsElement.querySelector(".card__image");

  cardsName.textContent = data.name;
  cardsImage.src = data.link;
  cardsImage.alt = data.name;

  return cardsElement;
}

// Open Modal
function openModal(open) {
  nameText.value = document.querySelector(".profile__username").textContent;
  descriptionText.value = document.querySelector(
    ".profile__description"
  ).textContent;

  open.classList.add("modal_opened");
}

// Close Modal
function closeModal() {
  modal.classList.remove("modal_opened");
  modalAddCards.classList.remove("modal_opened");
}

// Profile Form Submit
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameText.value;
  profileDescription.textContent = descriptionText.value;

  closeModal();
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
  closeModal();
}

profileButton.addEventListener("click", () => {
  openModal(modalAddCards);
});

//For Each cards
initialCards.forEach((item) => {
  const cardsElement = getCardsElement(item);
  cardsList.prepend(cardsElement);
});

// Close Modal
modalClose.addEventListener("click", closeModal);
modalCloseBtn.addEventListener("click", closeModal);

// Open Modal
modalOpen.addEventListener("click", () => {
  openModal(modal);
});

// Profile form Submit
profileForm.addEventListener("submit", handleProfileFormSubmit);

// Card Form submit
modalCards.addEventListener("submit", handlerCardFormSubmit);
