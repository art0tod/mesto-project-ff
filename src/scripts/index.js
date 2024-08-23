import { createCard, deleteCard } from '../components/card'
import {
  closeModal,
  closeModalViaOverlay,
  openModal,
} from '../components/modal'
import '../pages/index.css'
import { initialCards } from './cards'

const profileAddButton = document.querySelector('.profile__add-button')
const profileEditButton = document.querySelector('.profile__edit-button')
const popupTypeNewCard = document.querySelector('.popup_type_new-card')
const popupTypeEdit = document.querySelector('.popup_type_edit')
const popupTypeImage = document.querySelector('.popup_type_image')
const popupImage = popupTypeImage.querySelector('.popup__image')
const popupCaption = popupTypeImage.querySelector('.popup__caption')
const popupCloseButtons = document.querySelectorAll('.popup__close')
const placesList = document.querySelector('.places__list')
const editProfileForm = document.forms['edit-profile']
const editProfileName = editProfileForm.name
const editProfileJob = editProfileForm.description
const profileName = document.querySelector('.profile__title')
const profileJob = document.querySelector('.profile__description')
const addCardForm = document.forms['new-place']
const addCardName = addCardForm['place-name']
const addCardURL = addCardForm['link']

profileAddButton.addEventListener('click', () => {
  openModal(popupTypeNewCard)
  addCardName.focus()
})

profileEditButton.addEventListener('click', () => {
  openModal(popupTypeEdit)
  editProfileName.focus()
  editProfileName.value = profileName.textContent
  editProfileJob.value = profileJob.textContent
})

popupCloseButtons.forEach(button => {
  const popup = button.closest('.popup')
  button.addEventListener('click', () => closeModal(popup))
  closeModalViaOverlay(popup)
})

const handleCardClick = evt => {
  const cardImage = evt.target

  popupImage.src = cardImage.src
  popupImage.alt = cardImage.alt
  popupCaption.textContent = cardImage.alt

  openModal(popupTypeImage)
}

const handleCardLike = evt => {
  evt.target.classList.toggle('card__like-button_is-active')
}

initialCards.forEach(card => {
  const cardElement = createCard(
    card,
    handleCardClick,
    handleCardLike,
    deleteCard
  )
  placesList.append(cardElement)
})

const handleEditProfileFormSubmit = evt => {
  evt.preventDefault()

  const name = editProfileName.value
  const job = editProfileJob.value

  profileName.textContent = name
  profileJob.textContent = job

  closeModal(popupTypeEdit)
}

const handleAddCardFormSubmit = evt => {
  evt.preventDefault()

  const name = addCardName.value
  const link = addCardURL.value

  const cardElement = createCard(
    { name, link },
    handleCardClick,
    handleCardLike,
    deleteCard
  )
  placesList.prepend(cardElement)

  closeModal(popupTypeNewCard)
  addCardForm.reset()
}

editProfileForm.addEventListener('submit', handleEditProfileFormSubmit)
addCardForm.addEventListener('submit', handleAddCardFormSubmit)
