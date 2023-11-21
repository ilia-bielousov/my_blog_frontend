const defaultState = {
  id: '',
  creatingCard: {
    status: false,
    content: {
      choose: '',
      name: '',
      description: ''
    }
  }
};

const INPUT_CHOOSE_CARD = 'INPUT_CHOOSE_CARD';
const STATUS_CREATING_CARD = 'STATUS_CREATING_CARD';
const INPUT_NAME_DESCRIPTION_CARD = 'INPUT_NAME_DESCRIPTION_CARD';
const SET_RESPONCE_ID = 'SET_RESPONCE_ID';

export const adminReducer = (state = defaultState, action) => {
  switch (action.type) {
    // для карточки
    case INPUT_CHOOSE_CARD:
      return { ...state, creatingCard: { ...state.creatingCard, content: { ...state.creatingCard.content, choose: action.payload } } };
    case INPUT_NAME_DESCRIPTION_CARD: 
      return { ...state, creatingCard: { ...state.creatingCard, content: { ...state.creatingCard.content, ...action.payload } } };
    case STATUS_CREATING_CARD: {
      return { ...state, creatingCard: { ...state.creatingCard, status: action.payload } }
    }
    case SET_RESPONCE_ID: 
      return { ...state, id: action.payload}
    //

    // для статьи

    //

    default:
      return state;
  }
}

export const inputChooseCard = (payload) => ({ type: INPUT_CHOOSE_CARD, payload });
export const inputNameDescriptionCard = (payload) => ({ type: INPUT_NAME_DESCRIPTION_CARD, payload });
export const statusCreatingCard = (payload) => ({ type: STATUS_CREATING_CARD, payload });
export const setResponceId = (payload) => ({ type: SET_RESPONCE_ID, payload})