import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { inputChooseCard, inputNameDescriptionCard, statusCreatingCard, setResponceId } from "../../../store/adminReducer";

import './AdminCreateCard.css';

const formCardInnerCategory = (inputChoose, nextBtn) => {

  return (
    <div className="form-card__inner">
      <label className="form-card__info">
        Сначала нужно выбрать, для какой секции будет написана статья.
      </label>
      <input
        onClick={(e) => inputChoose(e)}
        className="form-card__input-radio"
        type="radio"
        id="programming"
        name="choose"
        value="programming"
        disabled={nextBtn ? true : false}
      />
      <label htmlFor="programming">
        Programming
      </label>
      <input
        onClick={(e) => inputChoose(e)}
        className="form-card__input-radio"
        type="radio"
        id="projects"
        name="choose"
        value="projects"
        disabled={nextBtn ? true : false}
      />
      <label htmlFor="projects">
        Arduino
      </label>
      <input
        onClick={(e) => inputChoose(e)}
        type="radio" id="modeling"
        name="choose"
        value="modeling"
        className="form-card__input-radio"
        disabled={nextBtn ? true : false}
      />
      <label htmlFor="modeling">
        Modeling
      </label>
    </div>
  )
}

const formCardInnerNameArticle = (register, errors, nextBtn) => {
  // styles
  const elementStyleLabel = {
    display: 'block',
    marginBottom: '10px'
  };
  const elementStyleInput = {
    display: 'block',
    width: '450px',
    marginBottom: '15px',
    padding: '5px',
    border: '1px solid #000',
    borderRadius: '5px',
    outline: 'none',
  };
  const elementStyleTextArea = {
    width: '450px',
    height: '150px',
    padding: '10px',
    border: '1px solid #000',
    borderRadius: '5px',
    resize: 'none'
  };
  //

  return (
    <div className="form-card__inner">
      <label
        style={elementStyleLabel}
        htmlFor="name"
      >
        Придумайте название статьи:
      </label>
      <input
        {...register('name', { required: true })}
        style={elementStyleInput}
        type="text"
        id="name"
        name="name"
        readOnly={nextBtn ? true : false}
      />
      {errors.name ? <div style={{marginBottom: '10px', color: 'red'}}>поле название обязательное </div> : null}
      <label
        style={elementStyleLabel}
        htmlFor="name"
      >
        Короткое описание статьи:
      </label>
      <textarea
        {...register('description', { required: true })}
        style={elementStyleTextArea}
        id="description"
        name="description"
        readOnly={nextBtn ? true : false}
      />
      {errors.description ? <div style={{marginBottom: '10px', color: 'red'}}>поле описание обязательное </div> : null}
    </div>
  )
}

const formCardInnerImage = () => {
  const elementStyleLabel = {
    display: 'block',
    marginBottom: '10px'
  }

  return (
    <div className="form-card__inner">
      <label
        style={elementStyleLabel}
      >
        Картина для карточки
      </label>
      <input type="file" name="image" id="image" />
    </div>
  )
}

const formCardInnerSubmit = (nextBtn) => {
  return (
    <div className="form-card__inner">
      <input
        type="submit"
        value='отправить данные'
        className="form-card__submit"
        disabled={nextBtn ? true : false} />
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
  )
}

const AdminCreateCard = () => {
  const dispatch = useDispatch();
  const choose = useSelector(state => state.admin.creatingCard.content.choose);
  const nextBtn = useSelector(state => state.admin.creatingCard.status);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async function (data) {
    dispatch(inputNameDescriptionCard(data));

    if (window.confirm('вы уверены, что хотите продолжить?') && choose.length != 0) {
      dispatch(statusCreatingCard(true));
      await fetch(`http://localhost:4000/admin/create-card`, {
        method: 'POST',
        body: JSON.stringify({ choose, ...data }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
        .then(res => res.json())
        .then(data => dispatch(setResponceId(data)))
        .catch((err) => {
          console.log(err);
        });

    } else {
      alert('проверьте свои данные еще раз');
    }
  };

  const inputChoose = (e) => {
    dispatch(inputChooseCard(e.target.value));
  }

  window.addEventListener('beforeunload', function (event) {
    event.preventDefault();
  });

  return (
    <main className="main">
      <div className="container__admin">
        <article className="main__admin-article">
          <div className="main__create-card">
            <h2 className="main__create-card-title">
              Создание карточки для статьи
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="main__create-card-form form-card">
              {formCardInnerCategory(inputChoose, nextBtn)}
              {formCardInnerNameArticle(register, errors, nextBtn)}
              {formCardInnerImage()}
              {formCardInnerSubmit(nextBtn)}
            </form>
          </div>
        </article>
      </div>
    </main>
  );
};

export default AdminCreateCard;