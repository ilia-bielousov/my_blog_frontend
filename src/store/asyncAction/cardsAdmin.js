import { getAllCards } from "../adminActions";

export const fetchForAllCards = () => {
  return function (dispatch) {
    fetch(`https://${process.env.REACT_APP_API_URL}/admin/getAllCards`)
      .then(res => res.json())
      .then(data => {
        dispatch(getAllCards(data));
      });
  }
}