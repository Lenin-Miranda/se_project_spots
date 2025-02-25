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
const modal = document.querySelector("#modal-edit");
const modalOpen = document.querySelector(".profile__edit-btn");
const modalClose = modal.querySelector(".modal__icon");
let nameText = document.querySelector(".modal__input_type_name");
let descriptionText = document.querySelector(".modal__input_type_description");
let profileName = document.querySelector(".profile__username");
let profileDescription = document.querySelector(".profile__description");
const profileForm = document.querySelector(".modal__form");

const cardsTemplate = document.querySelector("#media-template");
const cardsList = document.querySelector(".media__cards");

function getCardsElement(data) {
  const cardsElement = cardsTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardsName = cardsElement.querySelector(".card__description");

  cardsName.textContent = data.name;

  const cardsImage = cardsElement.querySelector(".card__image");
  cardsImage.src = data.link;
  cardsImage.alt = data.name;

  return cardsElement;
}

function openModal() {
  nameText.value = document.querySelector(".profile__username").textContent;
  descriptionText.value = document.querySelector(
    ".profile__description"
  ).textContent;
  modal.classList.add("modal_opened");
}
function closeModal() {
  modal.classList.remove("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameText.value;
  profileDescription.textContent = descriptionText.value;

  closeModal();
}

modalClose.addEventListener("click", closeModal);
modalOpen.addEventListener("click", openModal);
profileForm.addEventListener("submit", handleProfileFormSubmit);

for (let i = 0; i < initialCards.length; i++) {
  const cardsElement = getCardsElement(initialCards[i]);
  cardsList.prepend(cardsElement);
}
