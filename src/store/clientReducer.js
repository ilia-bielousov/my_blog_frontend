const defaultState = {
  cards: [],
  article: null
};

const GET_CARDS = 'GET_CARDS';
const GET_ARTICLE = 'GET_ARTICLE';

export const clientReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_CARDS:
      return { ...state, cards: [...action.payload] }
    case GET_ARTICLE: {
      return { ...state, article: action.payload }
    }
    default: 
      return state;
  }
}

export const getCardsAction = (payload) => ({  type: GET_CARDS, payload })
export const getArticleAction = (payload) => ({ type: GET_ARTICLE, payload });