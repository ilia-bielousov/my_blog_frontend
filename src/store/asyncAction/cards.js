import { getCardsAction } from "../clientReducer";

export const fetchCards = () => {
  return function (dispatch) {
    fetch(`http://localhost:4000/data`)
      .then(res => res.json())
      .then(data => {
        dispatch(getCardsAction(data));
      });
  }
}