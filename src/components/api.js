const fetchConfig = {
  urlBase: `https://nomoreparties.co/v1/wff-cohort-22`,
  headers: {
    authorization: process.env.API_TOKEN,
    'content-type': 'application/json; charset=UTF-8',
  },
}

const apiRequest = async (endpoint, method = 'GET', body = null) => {
  const options = {
    method,
    headers: fetchConfig.headers,
  }

  if (body) options.body = JSON.stringify(body)

  const resp = await fetch(`${fetchConfig.urlBase}${endpoint}`, options)
  if (!resp.ok) throw new Error(`Error: ${resp.status}`)
  return await resp.json()
}

const getProfile = () => apiRequest('/users/me')

const getCards = () => apiRequest('/cards')

const editProfile = (profileName, profileAbout) => {
  const body = {
    name: profileName,
    about: profileAbout,
  }

  return apiRequest('/users/me', 'PATCH', body)
}

const addCard = (cardName, cardLink) => {
  const body = {
    name: cardName,
    link: cardLink,
  }

  return apiRequest('/cards', 'POST', body)
}

const deleteCard = cardId => apiRequest(`/cards/${cardId}`, 'DELETE')

const likeCard = cardId => apiRequest(`/cards/likes/${cardId}`, 'PUT')

const unlikeCard = cardId => apiRequest(`/cards/likes/${cardId}`, 'DELETE')

const editAvatar = imageUrl => {
  const body = {
    avatar: imageUrl,
  }

  return apiRequest(`/users/me/avatar`, 'PATCH', body)
}

export {
  addCard,
  deleteCard,
  editAvatar,
  editProfile,
  getCards,
  getProfile,
  likeCard,
  unlikeCard,
}
