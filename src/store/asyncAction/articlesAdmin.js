import { getAllArticles } from "../adminActions";

export const fetchForAllArticle = () => {
  return function (dispatch) {
    fetch(`http://process.env.REACT_APP_API_URL/admin/getAllArticles`)
      .then(res => res.json())
      .then(data => {
        dispatch(getAllArticles(data));
      });
  }
}

