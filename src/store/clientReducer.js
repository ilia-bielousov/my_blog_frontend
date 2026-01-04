const defaultState = {
  cards: [],
  article: null,
  error: null,
  code: null,
  nextArticle: {}
};

const GET_CARDS = 'GET_CARDS';
const GET_ARTICLE = 'GET_ARTICLE';
const REMOVE_STATE_ARTICLE = 'REMOVE_STATE_ARTICLE';
const REMOVE_STATE_CARDS = 'REMOVE_STATE_CARDS';
const STATUS_ERROR_STATE = 'STATUS_ERROR_STATE';
const STATUS_ERROR_CODE = 'STATUS_ERROR_CODE';
const UPDATE_STATUS_ERROR = 'UPDATE_STATUS_ERROR';
const NEXT_ARTICLE = 'NEXT_ARTICLE';

export const clientReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_CARDS:
      return { ...state, cards: [...action.payload] };
    case GET_ARTICLE: {
      return { ...state, article: action.payload };
    }
    case REMOVE_STATE_ARTICLE:
      return { ...state, article: null };

    case REMOVE_STATE_CARDS:
      return { ...state, cards: [] };

    case STATUS_ERROR_STATE:
      return { ...state, error: action.payload }

    case STATUS_ERROR_CODE:
      return { ...state, code: action.payload }

    case UPDATE_STATUS_ERROR:
      return { ...state, error: false, code: null }

    case NEXT_ARTICLE:
      return { ...state, nextArticle: { ...action.payload } };

    default:
      return state;
  }
}

export const getCardsAction = (payload) => ({ type: GET_CARDS, payload })
export const getArticleAction = (payload) => ({ type: GET_ARTICLE, payload });
export const removeStateArticle = () => ({ type: REMOVE_STATE_ARTICLE });
export const removeStateCards = () => ({ type: REMOVE_STATE_CARDS });
export const statusErrorState = (payload) => ({ type: STATUS_ERROR_STATE, payload });
export const statusErrorCode = (payload) => ({ type: STATUS_ERROR_CODE, payload });
export const updateStatusError = () => ({ type: UPDATE_STATUS_ERROR });
export const setNextArticle = (payload) => ({ type: NEXT_ARTICLE, payload });