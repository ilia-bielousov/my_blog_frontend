import * as types from './adminActionTypes.js';
import { creatingArticle } from './adminCreatingArticle.js';
import { creatingCard } from './adminCreatingCard.js';
import { raportsArticle } from './adminRaportsArticles.js';

const defaultState = {
  id: '',
  diff: false,
  statusCreatingArticle: false,
  statusCreatingCard: false,
  creatingCard: creatingCard,
  creatingArticle: creatingArticle,
  raportsArticles: raportsArticle,
};

// для изменений
const OBSERVE_CHANGES = 'OBSERVE_CHANGES';

export const adminReducer = (state = defaultState, action) => {
  switch (action.type) {
    // для карточки
    case types.INPUT_CHOOSE_CARD:
      return { ...state, creatingCard: { ...state.creatingCard, choose: action.payload } };
    case types.INPUT_NAME_DESCRIPTION_CARD:
      return { ...state, creatingCard: { ...state.creatingCard, ...action.payload } };
    case types.STATUS_CREATING_CARD: {
      return { ...state, statusCreatingCard: action.payload };
    }
    case types.SET_RESPONCE_ID:
      return { ...state, id: action.payload };
    //

    // для статьи
    case types.ADD_COMPONENT_TO_ARTICLE:
      return { ...state, creatingArticle: { ...state.creatingArticle, elements: [...state.creatingArticle.elements, action.payload] } };
    case types.ADD_PREVIEW_CONTENT_AN_ARTICLE:
      return { ...state, creatingArticle: { ...state.creatingArticle, previewElements: [...state.creatingArticle.previewElements, action.payload] } };
    case types.DELETE_PREVIEW_CONTENT_FROM_ARTICLE: {
      const t = state.creatingArticle.previewElements;
      const updateT = t.filter((item, key) => action.payload !== key);

      return { ...state, creatingArticle: { ...state.creatingArticle, previewElements: [...updateT] } };
    }
    case types.CHANGE_ID_ALL_PREVIEW_ELEMENTS: {
      const t = state.creatingArticle.previewElements;

      const updateT = t.map(item => {
        if (item.id > action.payload) {
          return { ...item, id: item.id - 1 }
        } else {
          return item;
        }
      });

      return { ...state, creatingArticle: { ...state.creatingArticle, previewElements: [...updateT] } };
    }
    case types.UPDATE_PREVIEW_CONTENT_AN_ARTICLE: {
      return { ...state, creatingArticle: { ...state.creatingArticle, previewElements: action.payload } };
    }
    case types.FILTER_PREVIEW_CONTENT_AN_ARTICLE: {
      const t = state.creatingArticle.previewElements;

      const indexT = t.findIndex((block) => block.id === parseInt(action.payload[0]));
      const itemT = t[indexT];

      const t1 = t.filter((block) => block.id !== parseInt(action.payload[0]));

      t1.splice(action.payload[1], 0, itemT);
      return { ...state, creatingArticle: { ...state.creatingArticle, previewElements: t1 } };
    }



    case types.CURRENT_TAG_BUTTON:
      return { ...state, creatingArticle: { ...state.creatingArticle, currentTagButton: action.payload } };
    case types.ADD_PREVIEW_CONTENT_AN_ARTICLE_AFTER_EDIT:
      return { ...state, creatingArticle: { ...state.creatingArticle, previewElements: [...action.payload] } };
    case types.ADD_ID_FOR_NEW_ELEMENT:
      return { ...state, creatingArticle: { ...state.creatingArticle, IdElement: state.creatingArticle.IdElement + 1 } };
    case types.MINUS_ID_FOR_NEW_ELEMENT:
      return { ...state, creatingArticle: { ...state.creatingArticle, IdElement: state.creatingArticle.IdElement - 1 } };
    case types.CHANGE_BAN_ADD_ELEMENT:
      return { ...state, creatingArticle: { ...state.creatingArticle, banAddElement: action.payload } };
    case types.CHANGE_STATUS_CREATING_ARTICLE:
      return { ...state, statusCreatingArticle: action.payload };

    // обнуляем все от прошлой статьи. //
    case types.RESET_COMPONENT_TO_ARTICLE:
      return { ...state, creatingArticle: { ...state.creatingArticle, elements: [], IdElement: 0 } };
    case types.RESET_PREVIEW_CONTENT_AN_ARTICLE:
      return { ...state, creatingArticle: { ...state.creatingArticle, previewElements: [] } }

    // для просмотра всех карт и статьи
    case types.GET_ALL_CARDS:
      return { ...state, raportsArticles: { ...state.raportsArticles, cards: [...action.payload] } };
    case types.GET_ALL_ARTICLES:
      return { ...state, raportsArticles: { ...state.raportsArticles, articles: [...action.payload] } };

    // разное
    case OBSERVE_CHANGES:
      return { ...state, diff: action.payload };

    default:
      return state;
  }
}