import { getArticleAction, statusError } from "../clientReducer";

export const fetchArticle = (id, url) => {
  return function (dispatch) {
    fetch(`http://localhost:4000/${url}/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.status !== 404)
          dispatch(getArticleAction(data));
        else {
          throw new Error();
        }
      })
      .catch(err => dispatch(statusError(404)));
  }
}