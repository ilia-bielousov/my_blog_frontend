import { getArticleAction, statusError } from "../clientReducer";

export const fetchArticle = (id, url) => {
  return function (dispatch) {
    fetch(`${process.env.REACT_APP_API_URL}${url}/${id}`)
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