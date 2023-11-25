import { getArticleAction } from "../clientReducer";

export const fetchArticle = (id, url) => {
  console.log(id);
  
  return function (dispatch) {
    fetch(`http://localhost:4000/${url}/${id}`)
      .then(res => res.json())
      .then(data => {
        dispatch(getArticleAction(data));
      });
  }
}