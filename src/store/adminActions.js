import * as types from './adminActionTypes.js';

// для создания карточки
// export const inputChooseCard = (payload) => ({ type: types.INPUT_CHOOSE_CARD, payload });
// export const inputNameDescriptionCard = (payload) => ({ type: types.INPUT_NAME_DESCRIPTION_CARD, payload });
export const statusCreatingCard = (payload) => ({ type: types.STATUS_CREATING_CARD, payload });
export const setResponceId = (payload) => ({ type: types.SET_RESPONCE_ID, payload });
// ////////////////////////////////////////////

// для самой статьи
export const deletePreviewContentFromArticle = (payload) => ({ type: types.DELETE_PREVIEW_CONTENT_FROM_ARTICLE, payload }); // +
export const addPreviewContentAnArticle = (payload) => ({ type: types.ADD_PREVIEW_CONTENT_AN_ARTICLE, payload }); // +
export const addCurrentTagButton = (payload) => ({ type: types.CURRENT_TAG_BUTTON, payload });
export const addPreviewContentAnArticleAfterEdit = (payload) => ({ type: types.ADD_PREVIEW_CONTENT_AN_ARTICLE_AFTER_EDIT, payload });
export const addIdForNewElement = (payload) => ({ type: types.ADD_ID_FOR_NEW_ELEMENT, payload }); // +
export const changeStatusCreatingArticle = (payload) => ({ type: types.CHANGE_STATUS_CREATING_ARTICLE, payload });
export const updateReviewContentAnArticle = (payload) => ({ type: types.UPDATE_PREVIEW_CONTENT_AN_ARTICLE, payload }); //+
export const filterPreviewContentAnArticle = (payload) => ({ type: types.FILTER_PREVIEW_CONTENT_AN_ARTICLE, payload });
export const deletedComponentId = (payload) => ({ type: types.DELETED_COMPONENT_ID, payload });
export const setHoverIndexElement = (payload) => ({ type: types.HOVER_INDEX_ELEMENT, payload });
export const setStatusClickPanelTags = (payload) => ({ type: types.STATUS_CLICK_PANEL_TAGS, payload });
export const afterAddedToReviewContentArticle = (payload) => ({ type: types.AFTER_ADDED_TO_REVIEW_CONTENT_ARTICLE, payload });
export const setContent = (payload) => ({ type: types.SET_CONTENT, payload });
// ////////////////////////////////////////////

//для обновления от прошлой статьи
export const resetComponentToArticle = () => ({ type: types.RESET_COMPONENT_TO_ARTICLE }); // +
export const resetPreviewContentAnArticle = () => ({ type: types.RESET_PREVIEW_CONTENT_AN_ARTICLE }); // +
// ////////////////////////////////////////////

// для всех статьи
export const getAllCards = (payload) => ({ type: types.GET_ALL_CARDS, payload });
export const getAllArticles = (payload) => ({ type: types.GET_ALL_ARTICLES, payload });
// ////////////////////////////////////////////