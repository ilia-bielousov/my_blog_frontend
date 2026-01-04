import { getCardsAction, statusErrorState, statusErrorCode } from "../clientReducer";

export const fetchCards = (pathname) => {
  return function (dispatch) {
    fetch(`${process.env.REACT_APP_API_URL}${pathname}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          dispatch(getCardsAction(data.data));
          dispatch(statusErrorState(false));
          dispatch(statusErrorCode(200));
        }
        else {
          throw new Error();
        }
      })
      .catch(err => {
        dispatch(statusErrorState(true));
        dispatch(statusErrorCode(500));
      });
  }
}