import { useState, useEffect, Fragment } from "react";

import './style_component_form.css';

const AddTagForTitle = (props) => {
  const [text, setText] = useState('');
  const [send, setSend] = useState(false);

  const content = {
    tag: props.title,
    className: 'main__title',
    text,
    id: props.id
  }

  useEffect(() => {
    if (send) {
      props.setContentInElements(elements => {

        return [
          ...elements,
          content
        ];
      });
    }
  }, [send]);

  const changeText = (e) => {
    setText(e.target.value);
  }

  return (
    <Fragment>
      <label className="form__sign">
        Input your title
      </label>
      <input className="form__input-title" type="text" placeholder="input your text" onChange={(e) => changeText(e)} value={text} readOnly={send ? true : false} />
      <div className="form__buttons-inner">
        <button className="form__send" disabled={send ? true : false} onClick={(e) => { e.preventDefault(); setSend(true); }}>send title</button>
        <button className="form__update-state" onClick={(e) => { e.preventDefault(); setSend(false); }}>edit title</button>
      </div>
    </Fragment>
  )
}

export default AddTagForTitle;