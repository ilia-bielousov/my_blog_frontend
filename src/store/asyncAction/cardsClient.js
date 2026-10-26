import { getCardsAction, setCardsLoading, statusErrorState, statusErrorCode } from "../clientReducer";

export const fetchCards = (pathname) => {
  return function (dispatch) {
    dispatch(setCardsLoading(true));

    fetch(`${process.env.REACT_APP_API_URL}${pathname}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          dispatch(getCardsAction(data.data, pathname));
          dispatch(statusErrorState(false));
          dispatch(statusErrorCode(200));
        }
        else {
          throw new Error();
        }
      })
      .catch(err => {
        dispatch(setCardsLoading(false));
        dispatch(statusErrorState(true));
        dispatch(statusErrorCode(500));
      });
  }
}