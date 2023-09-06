import { useState, useEffect, Fragment } from "react";

const AddTagForText = () => {
  const [text, setText] = useState('');

  const changeText = (e) => {
    setText(e.target.value);
  }

  return (
    <Fragment>
      <label>
        Input your paragraph
      </label>
      <textarea type="text" placeholder="input your text" onChange={(e) => changeText(e)} />
    </Fragment>
  )
}

export default AddTagForText;