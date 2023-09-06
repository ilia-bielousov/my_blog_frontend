import { useState } from "react";
import AddTagForTitle from "./components/AddTagForTitle";
import AddTagForText from "./components/AddTagForText";
import './Admin.css';

const Admin = () => {
  const [elements, setElements] = useState([])

  const addElements = (component) => {
    const element = component;

    setElements(elements => {
      return [
        ...elements,
        element
      ]
    });
  }

  return (
    <div>
      <header className="header">
        <div className="container">
          <h1>
            admin
          </h1>
        </div>
      </header>
      <main className="main">
        <div className="container">
          <div className="main__inner">
            <form className="elements">
              {elements.map((item, i) => {
                return (
                  <div key={i}>
                    {item}
                  </div>
                )
              })}
            </form>
            <div className="buttons">
              <button onClick={() => addElements(<AddTagForTitle />)}>added title</button>
              <button onClick={() => addElements(<AddTagForText />)}>added text</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Admin;