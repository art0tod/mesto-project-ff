// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content

// @todo: DOM узлы
const placesList = document.querySelector('.places__list')

// @todo: Функция создания карточки
const createCard = (card, deleteCard) => {
  const cardNode = cardTemplate.querySelector('.card').cloneNode(true)
  const deleteCardButton = cardNode.querySelector('.card__delete-button')

  cardNode.querySelector('.card__image').src = card.link
  cardNode.querySelector('.card__title').textContent = card.name

  deleteCardButton.addEventListener('click', deleteCard)

  placesList.append(cardNode)
}

// @todo: Функция удаления карточки
const deleteCard = item => {
  item.target.parentElement.remove()
}

// @todo: Вывести карточки на страницу

initialCards.forEach(item => {
  createCard(item, deleteCard)
})
