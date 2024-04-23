import { getCardsAction, statusError } from "../clientReducer";

export const fetchCards = (pathname) => {
  return function (dispatch) {
    fetch(`http://localhost:4000/${pathname.slice(1, -1)}`)
      .then(res => res.json())
      .then(data => {
        if (data)
          dispatch(getCardsAction(data));
        else throw new Error();
      })
      .catch(err => dispatch(statusError()));
  }
}