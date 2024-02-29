import { getArticleAction } from "../clientReducer";

export const fetchArticle = (id, url) => {
  return function (dispatch) {
    fetch(`http://localhost:4000/${url}/${id}`)
      .then(res => res.json())
      .then(data => {
        dispatch(getArticleAction(data));
      })
      .catch(err => console.log(err))
  }
}