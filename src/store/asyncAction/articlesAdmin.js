import { getAllArticles } from "../adminActions";

export const fetchForAllArticle = () => {
  return function (dispatch) {
    fetch(`http://localhost:4000/admin/getAllArticles`)
      .then(res => res.json())
      .then(data => {
        dispatch(getAllArticles(data));
      });
  }
}

