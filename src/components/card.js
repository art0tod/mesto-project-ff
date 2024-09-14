export const createCard = (
  card,
  handleImageClick,
  handleCardLike,
  handleCardUnLike,
  handleCardDelete,
  currentUserId
) => {
  const cardTemplate = document.querySelector('#card-template').content
  const cardNode = cardTemplate.querySelector('.card').cloneNode(true)
  const deleteCardButton = cardNode.querySelector('.card__delete-button')
  const cardImage = cardNode.querySelector('.card__image')
  const cardTitle = cardNode.querySelector('.card__title')
  const cardLikeButton = cardNode.querySelector('.card__like-button')
  const cardLikesCount = cardNode.querySelector('.card__like-count')

  const updateLikes = newLikes => {
    card.likes = newLikes
    cardLikesCount.textContent = newLikes.length

    const newHasMyLike = newLikes.some(user => user._id === currentUserId)

    newHasMyLike
      ? cardLikeButton.classList.add('card__like-button_is-active')
      : cardLikeButton.classList.remove('card__like-button_is-active')
  }

  cardImage.src = card.link
  cardImage.alt = card.name
  cardTitle.textContent = card.name
  cardLikesCount.textContent = card.likes.length

  updateLikes(card.likes)

  cardImage.addEventListener('click', handleImageClick)

  cardLikeButton.addEventListener('click', evt => {
    cardLikeButton.classList.contains('card__like-button_is-active')
      ? handleCardUnLike(card._id, evt, updateLikes)
      : handleCardLike(card._id, evt, updateLikes)
    cardLikesCount.textContent = card.likes.length
  })

  currentUserId === card.owner._id
    ? deleteCardButton.addEventListener('click', evt =>
        handleCardDelete(card._id, evt)
      )
    : deleteCardButton.remove()

  return cardNode
}
