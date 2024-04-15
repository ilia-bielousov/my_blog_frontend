const defaultState = {
  cards: [],
  article: null,
  error: null
};

const GET_CARDS = 'GET_CARDS';
const GET_ARTICLE = 'GET_ARTICLE';
const REMOVE_STATE_ARTICLE = 'REMOVE_STATE_ARTICLE';
const STATUS_ERROR = 'STATUS_ERROR';
const UPDATE_STATUS_ERROR = 'UPDATE_STATUS_ERROR';

export const clientReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_CARDS:
      return { ...state, cards: [...action.payload] };
    case GET_ARTICLE: {
      return { ...state, article: action.payload };
    }
    case REMOVE_STATE_ARTICLE:
      return { ...state, article: null };

    case STATUS_ERROR:
      return { ...state, error: true }

    case UPDATE_STATUS_ERROR:
      return { ...state, error: false }

    default:
      return state;
  }
}

export const getCardsAction = (payload) => ({ type: GET_CARDS, payload })
export const getArticleAction = (payload) => ({ type: GET_ARTICLE, payload });
export const removeStateArticle = (payload) => ({ type: REMOVE_STATE_ARTICLE, payload });
export const statusError = (payload) => ({ type: STATUS_ERROR });
export const updateStatusError = (payload) => ({ type: UPDATE_STATUS_ERROR });