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

export const adminReducer = (state = defaultState, action) => {
  switch (action.type) {
    // для карточки
    case types.STATUS_CREATING_CARD: {
      return { ...state, statusCreatingCard: action.payload };
    }
    case types.SET_RESPONCE_ID:
      return { ...state, id: action.payload };
    //

    // для статьи
    case types.ADD_PREVIEW_CONTENT_AN_ARTICLE:
      return { ...state, creatingArticle: { ...state.creatingArticle, previewElements: [...state.creatingArticle.previewElements, action.payload] } };
    case types.DELETE_PREVIEW_CONTENT_FROM_ARTICLE: {
      const t = state.creatingArticle.previewElements;
      const updateT = t.filter((item, key) => action.payload !== key);

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

      if (!itemT) {
        return { ...state };
      } else {
        t1.splice(action.payload[1], 0, itemT);
        return { ...state, creatingArticle: { ...state.creatingArticle, previewElements: t1 } };
      }
    }
    case types.DELETED_COMPONENT_ID: {
      return { ...state, creatingArticle: { ...state.creatingArticle, deletedCompontentId: action.payload } };
    }
    case types.AFTER_ADDED_TO_REVIEW_CONTENT_ARTICLE: {
      const index = action.payload[0];
      const block = action.payload[1];
      const t = state.creatingArticle.previewElements;

      t.splice(index, 0, block);

      return { ...state, creatingArticle: { ...state.creatingArticle, previewElements: t } };
    }

    case types.CURRENT_TAG_BUTTON:
      return { ...state, creatingArticle: { ...state.creatingArticle, currentTagButton: action.payload } };
    case types.ADD_PREVIEW_CONTENT_AN_ARTICLE_AFTER_EDIT:
      return { ...state, creatingArticle: { ...state.creatingArticle, previewElements: [...action.payload] } };
    case types.ADD_ID_FOR_NEW_ELEMENT:
      return { ...state, creatingArticle: { ...state.creatingArticle, IdElement: state.creatingArticle.IdElement + 1 } };
    case types.CHANGE_STATUS_CREATING_ARTICLE:
      return { ...state, statusCreatingArticle: action.payload };
    case types.HOVER_INDEX_ELEMENT: {
      return { ...state, creatingArticle: { ...state.creatingArticle, hoverIndexElement: action.payload } };
    }
    case types.STATUS_CLICK_PANEL_TAGS: {
      return { ...state, creatingArticle: { ...state.creatingArticle, statusClickPanelTags: action.payload } };
    }

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

    default:
      return state;
  }
}