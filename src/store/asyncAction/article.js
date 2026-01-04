import { getArticleAction, statusErrorState, statusErrorCode } from "../clientReducer";

export const fetchArticle = (id, url) => {
  return function (dispatch) {
    fetch(`${process.env.REACT_APP_API_URL}${url}/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.status !== 404) {
          dispatch(getArticleAction(data));
          dispatch(statusErrorState(false));
          dispatch(statusErrorCode(200));
        }
        else {
          throw new Error();
        }
      })
      .catch(err => {
        dispatch(statusErrorState(true));
        dispatch(statusErrorCode(404));
      });
  }
}