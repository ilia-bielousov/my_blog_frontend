import { useState } from "react";
import { Link } from "react-router-dom";

import { request } from './../../../utilities/request';
import './AdminCreateCard.css';

const AdminCreateCard = () => {
  const [cardContent, setCardContent] = useState({});
  const [nextBtn, setNextBtn] = useState(false);
  const [response, setResponce] = useState('');

  const request = async () => {
    await fetch(`http://localhost:4000/admin/create-card`, {
      method: 'POST',
      body: JSON.stringify(cardContent),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(res => res.json())
    .then(data => setResponce(data))
    .catch((err) => {
      console.log(err);
    });
  }

  const sendData = (e) => {
    e.preventDefault();

    if (checkData()) {
      if (request()) {
        alert('карточка создана, можно переходить дальше');
        setNextBtn(true);
      }
    } else {
      alert('заполены не все поля');
    }
  }

  const checkData = () => Object.keys(cardContent).length < 3 ? false : true;

  const inputContent = (e) => {
    setCardContent(content => ({
      ...content,
      [e.target.name]: e.target.value
    }));
  }

  return (
    <main className="main">
      <div className="container__admin">
        <article className="main__admin-article">
          <div className="main__create-card">
            <h2 className="main__create-card-title">
              Создание карточки для статьи
            </h2>
            <form onSubmit={(e) => sendData(e)} className="main__create-card-form form-card">
              <p className="form-card__info">
                Сначала нужно выбрать, для какой секции будет написана статья.
              </p>
              <div className="form-card__inner">
                <input onChange={(e) => inputContent(e)} type="radio" id="programming" name="choose" value="programming" className="form-card__input-radio" disabled={nextBtn ? true : false}/>
                <label htmlFor="programming">Programming</label>
                <input onChange={(e) => inputContent(e)} type="radio" id="projects" name="choose" value="projects" className="form-card__input-radio" disabled={nextBtn ? true : false}/>
                <label htmlFor="projects">Arduino</label>
                <input onChange={(e) => inputContent(e)} type="radio" id="modeling" name="choose" value="modeling" className="form-card__input-radio" disabled={nextBtn ? true : false}/>
                <label htmlFor="modeling">Modeling</label>
              </div>
              <div className="form-card__inner" style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '10px' }} htmlFor="name">Придумайте название статьи:</label>
                <input onChange={(e) => inputContent(e)} style={{ width: '450px', marginBottom: '15px', padding: '5px', border: '1px solid #000', borderRadius: '5px', outline: 'none', }} type="text" id="name" name="name" readOnly={nextBtn ? true : false}/>
                <br />
                <label style={{ display: 'block', marginBottom: '10px' }} htmlFor="name">Короткое описание статьи:</label>
                <textarea onChange={(e) => inputContent(e)} style={{ width: '450px', height: '150px', padding: '10px', border: '1px solid #000', borderRadius: '5px', resize: 'none' }} id="description" name="description" readOnly={nextBtn ? true : false}/>
              </div>
              <div className="form-card__inner">
                <label style={{ display: 'block', marginBottom: '10px' }} htmlFor="image">Картина для карточки</label>
                <input type="file" name="image" id="image" />
              </div>
              <div className="form-card__inner">
                <input type="submit" value='отправить данные' className="form-card__submit" disabled={nextBtn ? true : false} />
                {nextBtn ?
                  <Link
                    to="../create-article"
                    relative="admin"
                    key={'create-article'}
                  >
                    перейти далее
                  </Link> :
                  null}
              </div>
            </form>
          </div>
        </article>
      </div>
    </main>
  );
};

export default AdminCreateCard;