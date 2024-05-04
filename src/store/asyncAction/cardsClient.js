import { getCardsAction, statusError } from "../clientReducer";

export const fetchCards = (pathname) => {
  return function (dispatch) {
    fetch(`${process.env.REACT_APP_API_URL}${pathname}`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          dispatch(getCardsAction(data));
        }
        else {
          throw new Error();
        }
      })
      .catch(err => { dispatch(statusError(500)) });
  }
}