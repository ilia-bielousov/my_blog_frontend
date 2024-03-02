import { getAllCards } from "../adminReducer";

export const fetchForAllCards = () => {
  return function (dispatch) {
    fetch(`http://localhost:4000/admin/getAllCards`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        dispatch(getAllCards(data));
      });
  }
}