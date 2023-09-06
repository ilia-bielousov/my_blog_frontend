import { useState, useEffect, Fragment } from "react";
import request from "../request.js";

const AddTagForTitle = () => {
  const [title, setText] = useState('');
  const [send, setSend] = useState(false);

  const updateStates = (e, bool) => {
    e.preventDefault(); 
  
    setSend(bool);
  }

  const content = {
    title
  }

  useEffect(() => {
    request(content);
  }, [send]);

  const changeText = (e) => {
    setText(e.target.value);
  }

  return (
    <Fragment>
      <label>
        Input your title
      </label>
      <input type="text" placeholder="input your text" onChange={(e) => changeText(e)} />
      <button onClick={(e) => {updateStates(e, true)}}>send title</button>
      <button onClick={(e) => {updateStates(e, false)}}>update state</button>
    </Fragment>
  )
}

export default AddTagForTitle;