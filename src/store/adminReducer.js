const defaultState = {
  id: '',
  diff: false,
  creatingCard: {
    status: false,
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
    banAddElement: false
  }
};

const INPUT_CHOOSE_CARD = 'INPUT_CHOOSE_CARD';
const STATUS_CREATING_CARD = 'STATUS_CREATING_CARD';
const INPUT_NAME_DESCRIPTION_CARD = 'INPUT_NAME_DESCRIPTION_CARD';
const SET_RESPONCE_ID = 'SET_RESPONCE_ID';
const ADD_COMPONENT_TO_ARTICLE = 'ADD_COMPONENT_TO_ARTICLE';
const ADD_PREVIEW_CONTENT_AN_ARTICLE = 'ADD_PREVIEW_CONTENT_AN_ARTICLE';
const ADD_ID_FOR_NEW_ELEMENT = 'ADD_ID_FOR_NEW_ELEMENT';
const CHANGE_BAN_ADD_ELEMENT = 'CHANGE_BAN_ADD_ELEMENT';

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
      return { ...state, creatingCard: { ...state.creatingCard, status: action.payload } };
    }
    case SET_RESPONCE_ID: 
      return { ...state, id: action.payload };
    //

    // для статьи
    case ADD_COMPONENT_TO_ARTICLE: 
      return { ...state, creatingArticle: { ...state.creatingArticle, elements: [...state.creatingArticle.elements, action.payload] } };
    case ADD_PREVIEW_CONTENT_AN_ARTICLE:
      return { ...state, creatingArticle: { ...state.creatingArticle, previewElements: [...state.creatingArticle.previewElements, action.payload] } };
    case ADD_ID_FOR_NEW_ELEMENT:
      return { ...state, creatingArticle: { ...state.creatingArticle, IdElement: state.creatingArticle.IdElement + 1 } };
    case CHANGE_BAN_ADD_ELEMENT:
      return { ...state, creatingArticle: { ...state.creatingArticle, banAddElement: action.payload } };
    //

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
export const setResponceId = (payload) => ({ type: SET_RESPONCE_ID, payload});
export const addComponentToArticle = (payload) => ({ type: ADD_COMPONENT_TO_ARTICLE, payload });
export const addPreviewContentAnArticle = (payload) => ({ type: ADD_PREVIEW_CONTENT_AN_ARTICLE, payload });
export const observeChanges = (payload) => ({ type: OBSERVE_CHANGES, payload });
export const addIdForNewElement = (payload) => ({ type: ADD_ID_FOR_NEW_ELEMENT, payload });
export const changeBanAddElement = (payload) => ({ type: CHANGE_BAN_ADD_ELEMENT, payload });