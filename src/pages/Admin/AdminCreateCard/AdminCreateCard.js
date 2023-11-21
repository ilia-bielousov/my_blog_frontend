import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { inputChooseCard, inputNameDescriptionCard, statusCreatingCard, setResponceId } from "../../../store/adminReducer";
import './AdminCreateCard.css';

const AdminCreateCard = () => {
  // доделать форму валидация и тд
  const dispatch = useDispatch();
  const cardContent = useSelector(state => state.admin.creatingCard.content);
  const nextBtn = useSelector(state => state.admin.creatingCard.status);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async function (data) {
    dispatch(inputNameDescriptionCard(data));
    dispatch(statusCreatingCard(true));

    await fetch(`http://localhost:4000/admin/create-card`, {
      method: 'POST',
      body: JSON.stringify({...cardContent, ...data}),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(res => res.json())
      .then(data => dispatch(setResponceId(data)))
      .catch((err) => {
        console.log(err);
      });
  };

  const inputChoose = (e) => {
    dispatch(inputChooseCard(e.target.value));
  }

  return (
    <main className="main">
      <div className="container__admin">
        <article className="main__admin-article">
          <div className="main__create-card">
            <h2 className="main__create-card-title">
              Создание карточки для статьи
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="main__create-card-form form-card">
              <p className="form-card__info">
                Сначала нужно выбрать, для какой секции будет написана статья.
              </p>
              <div className="form-card__inner">
                <input onClick={(e) => inputChoose(e)} type="radio" id="programming" name="choose" value="programming" className="form-card__input-radio" disabled={nextBtn ? true : false} />
                <label htmlFor="programming">Programming</label>
                <input onClick={(e) => inputChoose(e)} type="radio" id="projects" name="choose" value="projects" className="form-card__input-radio" disabled={nextBtn ? true : false} />
                <label htmlFor="projects">Arduino</label>
                <input onClick={(e) => inputChoose(e)} type="radio" id="modeling" name="choose" value="modeling" className="form-card__input-radio" disabled={nextBtn ? true : false} />
                <label htmlFor="modeling">Modeling</label>
              </div>
              <div className="form-card__inner" style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '10px' }} htmlFor="name">Придумайте название статьи:</label>
                <input {...register('name')} style={{ width: '450px', marginBottom: '15px', padding: '5px', border: '1px solid #000', borderRadius: '5px', outline: 'none', }} type="text" id="name" name="name" readOnly={nextBtn ? true : false} />
                <br />
                <label style={{ display: 'block', marginBottom: '10px' }} htmlFor="name">Короткое описание статьи:</label>
                <textarea {...register('description')} style={{ width: '450px', height: '150px', padding: '10px', border: '1px solid #000', borderRadius: '5px', resize: 'none' }} id="description" name="description" readOnly={nextBtn ? true : false} />
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