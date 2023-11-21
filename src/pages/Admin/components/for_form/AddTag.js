import { useState, useEffect, Fragment } from "react";

import './style_component_form.css';

const AddTag = (props) => {
  const [text, setText] = useState('');
  const [send, setSend] = useState(false);

  const content = {
    tag: props.tag,
    className: props.classN,
    text,
    id: props.id
  }

  useEffect(() => {
    if (send) {
      props.setContentInElements(elements => {

        return [
          ...elements,
          content
        ]
      })
    }
  }, [send]);

  const changeText = (e) => {
    setText(e.target.value);
  }

  const renderTextArea = () => {
    return (
      <textarea className="form__input-text" type="text" placeholder="input your text" onChange={(e) => changeText(e)} value={text} readOnly={send ? true : false} />
    )
  }

  const renderInput = () => {
    return (
      <input className="form__input-title" type="text" placeholder="input your text" onChange={(e) => changeText(e)} value={text} readOnly={send ? true : false} />
    )
  }

  const determine = () => {
    switch(props.tag) {
      case 'p':
        return renderTextArea();
      
      case 'h3': 
        return renderInput();

      // потом можно будет добавлять новые теги

      default:
        return null;
    }
  }

  return (
    <Fragment>
      <label className="form__sign">
        {props.signLabel}
      </label>
      {determine()}
      <div className="form__buttons-inner">
        <button className="form__send" disabled={send ? true : false} onClick={(e) => { e.preventDefault(); setSend(true); }}>send {props.signButton}</button>
        <button className="form__update-state" onClick={(e) => { e.preventDefault(); setSend(false); }}>edit {props.signButton}</button>
      </div>
    </Fragment>
  )
}

export default AddTag;