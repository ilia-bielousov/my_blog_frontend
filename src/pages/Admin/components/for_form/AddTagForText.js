import { useState, useEffect, Fragment } from "react";
import request from "../../request.js";

import './style_component_form.css';

const AddTagForText = () => {
  const [text, setText] = useState('');
  const [send, setSend] = useState(false);

  const content = {
    tag: 'p',
    className: 'main__text',
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
        Input your paragraph
      </label>
      <textarea className="form__input-text" type="text" placeholder="input your text" onChange={(e) => changeText(e)} value={!send ? text : ''} />
      <div className="form__buttons-inner">
        <button className="form__send" disabled={send ? true : false} onClick={(e) => { e.preventDefault(); setSend(true); }}>send title</button>
        <button className="form__update-state" onClick={(e) => { e.preventDefault(); setSend(false); }}>update state</button>
      </div>
    </Fragment>
  )
}

export default AddTagForText;