import { useState, useEffect, Fragment } from "react";
import request from "../../request.js";

import './style_component_form.css';
// const [id, setId] = useState(0); нужно подумать, каким образом можно редактировать статьи

const AddTagForTitle = () => {
  const [text, setText] = useState('');
  const [send, setSend] = useState(false);

  const content = {
    tag: 'h2',
    className: 'main__title',
    text
  }

  useEffect(() => {
    if (send) {
      request(content);
    }

    setText('');
  }, [send]);

  const changeText = (e) => {
    setText(e.target.value);
  }

  return (
    <Fragment>
      <label className="form__sign">
        Input your title
      </label>
      <input className="form__input-title" type="text" placeholder="input your text" onChange={(e) => changeText(e)} value={!send ? text : ''} />
      <div className="form__buttons-inner">
        <button className="form__send" disabled={send ? true : false} onClick={(e) => { e.preventDefault(); setSend(true); }}>send title</button>
        <button className="form__update-state" onClick={(e) => { e.preventDefault(); setSend(false); }}>update state</button>
      </div>
    </Fragment>
  )
}

export default AddTagForTitle;