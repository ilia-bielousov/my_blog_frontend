const defaultState = {
  cards: [],
  article: null
};

const GET_CARDS = 'GET_CARDS';
const GET_ARTICLE = 'GET_ARTICLE';
const REMOVE_STATE_ARTICLE = 'REMOVE_STATE_ARTICLE';

export const clientReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_CARDS:
      return { ...state, cards: [...action.payload] };
    case GET_ARTICLE: {
      return { ...state, article: action.payload };
    }
    case REMOVE_STATE_ARTICLE:
      return { ...state, article: null };

    default:
      return state;
  }
}

export const getCardsAction = (payload) => ({ type: GET_CARDS, payload })
export const getArticleAction = (payload) => ({ type: GET_ARTICLE, payload });
export const removeStateArticle = (payload) => ({ type: REMOVE_STATE_ARTICLE, payload });