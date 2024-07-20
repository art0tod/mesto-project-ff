// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content

// DOM узлы
const placesList = document.querySelector('.places__list')

// Функция создания карточки
const createCard = (card, deleteCard) => {
  const cardNode = cardTemplate.querySelector('.card').cloneNode(true)
  const deleteCardButton = cardNode.querySelector('.card__delete-button')
  const cardImage = cardNode.querySelector('.card__image')
  const cardTitle = cardNode.querySelector('.card__title')

  cardImage.src = card.link
  cardImage.alt = card.name
  cardTitle.textContent = card.name

  deleteCardButton.addEventListener('click', deleteCard)

  return cardNode
}

// Функция удаления карточки
const deleteCard = evt => {
  const cardElement = evt.target.closest('.card')
  if (cardElement) cardElement.remove()
}

// Вывод всех карточек на страницу
initialCards.forEach(element => {
  const cardElement = createCard(element, deleteCard)
  placesList.append(cardElement)
})
