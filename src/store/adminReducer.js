const defaultState = {
  id: '',
  diff: false,
  statusSendArticle: false,
  creatingCard: {
    statusCreatingCard: false,
    content: {
      choose: '',
      name: '',
      description: '',
    }
  },
  creatingArticle: {
    elements: [],
    previewElements: [],
    IdElement: 0,
    banAddElement: false,
    currentTagButton: '',
  },
  raportsArticles: {
    cards: [],
    articles: []
  }
};

const INPUT_CHOOSE_CARD = 'INPUT_CHOOSE_CARD';
const STATUS_CREATING_CARD = 'STATUS_CREATING_CARD';
const INPUT_NAME_DESCRIPTION_CARD = 'INPUT_NAME_DESCRIPTION_CARD';
const SET_RESPONCE_ID = 'SET_RESPONCE_ID';
const ADD_COMPONENT_TO_ARTICLE = 'ADD_COMPONENT_TO_ARTICLE';
const ADD_PREVIEW_CONTENT_AN_ARTICLE = 'ADD_PREVIEW_CONTENT_AN_ARTICLE';
const CURRENT_TAG_BUTTON = 'CURRENT_TAG_BUTTON';
const ADD_PREVIEW_CONTENT_AN_ARTICLE_AFTER_EDIT = 'ADD_PREVIEW_CONTENT_AN_ARTICLE_AFTER_EDIT';
const ADD_ID_FOR_NEW_ELEMENT = 'ADD_ID_FOR_NEW_ELEMENT';
const RESET_COMPONENT_TO_ARTICLE = 'RESET_COMPONENT_TO_ARTICLE';
const RESET_PREVIEW_CONTENT_AN_ARTICLE = 'RESET_PREVIEW_CONTENT_AN_ARTICLE';
const CHANGE_BAN_ADD_ELEMENT = 'CHANGE_BAN_ADD_ELEMENT';
const CHANGE_STATUS_CREATING_ARTICLE = 'CHANGE_STATUS_CREATING_ARTICLE';

//для просмотра всех карт и статьи
const GET_ALL_CARDS = 'GET_ALL_CARDS';
const GET_ALL_ARTICLES = 'GET_ALL_ARTICLES';

// для изменений
const OBSERVE_CHANGES = 'OBSERVE_CHANGES';

export const adminReducer = (state = defaultState, action) => {
  switch (action.type) {
    // для карточки
    case INPUT_CHOOSE_CARD:
      return { ...state, creatingCard: { ...state.creatingCard, content: { ...state.creatingCard.content, choose: action.payload } } };
    case INPUT_NAME_DESCRIPTION_CARD:
      return { ...state, creatingCard: { ...state.creatingCard, content: { ...state.creatingCard.content, ...action.payload } } };
    case STATUS_CREATING_CARD: {
      return { ...state, creatingCard: { ...state.creatingCard, statusCreatingCard: action.payload } };
    }
    case SET_RESPONCE_ID:
      return { ...state, id: action.payload };
    //

    // для статьи
    case ADD_COMPONENT_TO_ARTICLE:
      return { ...state, creatingArticle: { ...state.creatingArticle, elements: [...state.creatingArticle.elements, action.payload] } };
    case ADD_PREVIEW_CONTENT_AN_ARTICLE:
      return { ...state, creatingArticle: { ...state.creatingArticle, previewElements: [...state.creatingArticle.previewElements, action.payload] } };
    case CURRENT_TAG_BUTTON:
      return { ...state, creatingArticle: { ...state.creatingArticle, currentTagButton: action.payload } };
    case ADD_PREVIEW_CONTENT_AN_ARTICLE_AFTER_EDIT:
      return { ...state, creatingArticle: { ...state.creatingArticle, previewElements: [...action.payload] } };
    case ADD_ID_FOR_NEW_ELEMENT:
      return { ...state, creatingArticle: { ...state.creatingArticle, IdElement: state.creatingArticle.IdElement + 1 } };
    case CHANGE_BAN_ADD_ELEMENT:
      return { ...state, creatingArticle: { ...state.creatingArticle, banAddElement: action.payload } };
    case CHANGE_STATUS_CREATING_ARTICLE:
      return { ...state, statusSendArticle: action.payload };
    // обнуляем все от прошлой статьи. //
    case RESET_COMPONENT_TO_ARTICLE:
      return { ...state, creatingArticle: { ...state.creatingArticle, elements: [], IdElement: 0 } };
    case RESET_PREVIEW_CONTENT_AN_ARTICLE:
      return { ...state, creatingArticle: { ...state.creatingArticle, previewElements: [] } }

    // для просмотра всех карт и статьи
    case GET_ALL_CARDS:
      return { ...state, raportsArticles: { ...state.raportsArticles, cards: [...action.payload] } };
    case GET_ALL_ARTICLES:
      return { ...state, raportsArticles: { ...state.raportsArticles, articles: [...action.payload] } };

    // разное
    case OBSERVE_CHANGES:
      return { ...state, diff: action.payload };

    default:
      return state;
  }
}

export const inputChooseCard = (payload) => ({ type: INPUT_CHOOSE_CARD, payload });
export const inputNameDescriptionCard = (payload) => ({ type: INPUT_NAME_DESCRIPTION_CARD, payload });
export const statusCreatingCard = (payload) => ({ type: STATUS_CREATING_CARD, payload });
export const setResponceId = (payload) => ({ type: SET_RESPONCE_ID, payload });
export const addComponentToArticle = (payload) => ({ type: ADD_COMPONENT_TO_ARTICLE, payload });
export const addPreviewContentAnArticle = (payload) => ({ type: ADD_PREVIEW_CONTENT_AN_ARTICLE, payload });
export const addCurrentTagButton = (payload) => ({ type: CURRENT_TAG_BUTTON, payload });
export const addPreviewContentAnArticleAfterEdit = (payload) => ({ type: ADD_PREVIEW_CONTENT_AN_ARTICLE_AFTER_EDIT, payload });
export const observeChanges = (payload) => ({ type: OBSERVE_CHANGES, payload });
export const addIdForNewElement = (payload) => ({ type: ADD_ID_FOR_NEW_ELEMENT, payload });
export const changeBanAddElement = (payload) => ({ type: CHANGE_BAN_ADD_ELEMENT, payload });
export const changeStatusCreatingArticle = (payload) => ({ type: CHANGE_STATUS_CREATING_ARTICLE, payload });
//для обновления от прошлой статьи
export const resetComponentToArticle = () => ({ type: RESET_COMPONENT_TO_ARTICLE });
export const resetPreviewContentAnArticle = () => ({ type: RESET_PREVIEW_CONTENT_AN_ARTICLE });

// для всех статьи
export const getAllCards = (payload) => ({ type: GET_ALL_CARDS, payload });
export const getAllArticles = (payload) => ({ type: GET_ALL_ARTICLES, payload });
