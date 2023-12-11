import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { inputChooseCard, inputNameDescriptionCard, statusCreatingCard, changeStatusCreatingArticle, setResponceId } from "../../store/adminReducer";

const formCardInnerCategory = (inputChoose, nextBtn) => {
  return (
    <>
      <label className="block mb-2 text-xl">
        Сначала нужно выбрать, для какой секции будет написана статья.
      </label>
      <input
        onClick={(e) => inputChoose(e)}
        className="mr-1"
        type="radio"
        id="programming"
        name="choose"
        value="programming"
        disabled={nextBtn}
      />
      <label
        className="mr-3 text-lg"
        htmlFor="programming">
        Программирование
      </label>
      <input
        onClick={(e) => inputChoose(e)}
        className="mr-1"
        type="radio"
        id="projects"
        name="choose"
        value="projects"
        disabled={nextBtn}
      />
      <label
        className="mr-3 text-lg"
        htmlFor="projects">
        Ардуино
      </label>
      <input
        className="mr-1"
        onClick={(e) => inputChoose(e)}
        type="radio" id="modeling"
        name="choose"
        value="modeling"
        disabled={nextBtn}
      />
      <label
        className="mb-3 text-lg"
        htmlFor="modeling">
        Моделирование
      </label>
      <br />
    </>
  )
}

const formCardInnerNameArticle = (register, errors, nextBtn) => {
  return (
    <>
      <label
        className="block my-2 text-lg"
        htmlFor="name"
      >
        Придумайте название статьи:
      </label>
      <input
        className="w-80 p-1 px-3 border-2 rounded-xl outline-none"
        {...register('name', { required: true })}
        type="text"
        id="name"
        name="name"
        readOnly={nextBtn}
      />
      <br />
      {errors.name ? <div className="text-rose-500">поле название обязательное. </div> : null}
      <label
        className="block mt-2 text-lg"
        htmlFor="description"
      >
        Короткое описание статьи:
      </label>
      <textarea
        className="p-2 border-2 rounded-xl w-80 h-36 outline-none resize-none"
        {...register('description', { required: true })}
        id="description"
        name="description"
        readOnly={nextBtn}
      />
      <br />
      {errors.description ? <div className="text-rose-500">поле описание обязательное.</div> : null}
    </>
  )
}

const formCardInnerImage = (setCardImage) => {
  return (
    <>
      <label className="block text-lg">
        Картина для карточки
      </label>
      <input onChange={e => setCardImage(e.target.files[0])}
        className="block mb-2"
        type="file"
        name="image"
        id="image"
      />
    </>
  )
}

const formCardInnerSubmit = (nextBtn) => {
  return (
    <>
      <button
        className="w-48 p-3 mb-3 rounded-xl transition bg-sky-300 hover:bg-sky-500 active:bg-sky-600 text-blue cursor-pointer disabled:cursor-auto disabled:bg-sky-800"
        type="submit"
        disabled={nextBtn}>отправить данные</button>
      {nextBtn ?
        <Link
          className="block w-48 p-3 rounded-xl text-center bg-lime-300 hover:bg-lime-400 active:bg-lime-500 text-lime-950"
          to="../create-article"
          relative="admin"
          key={'create-article'}
        >
          перейти далее
        </Link> :
        null}
    </>
  )
}

const AdminCreateCard = () => {
  const dispatch = useDispatch();
  const choose = useSelector(state => state.admin.creatingCard.content.choose);
  const nextBtn = useSelector(state => state.admin.creatingCard.status);
  const [cardImage, setCardImage] = useState(null);

  useEffect(() => {
    dispatch(changeStatusCreatingArticle(false));
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    dispatch(inputNameDescriptionCard(data));
    const formData = new FormData();
    formData.append("name", "value"); // я не понимаю проблемы. почему formData пустая

    if (window.confirm('вы уверены, что хотите продолжить?') && choose.length != 0) {
      dispatch(statusCreatingCard(true));
      console.log(formData);
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
    <main className="flex-1 pl-72">
      <article className="p-5">
        <h2 className="text-2xl mb-2">
          Создание карточки для статьи
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=""
        >
          {formCardInnerCategory(inputChoose, nextBtn)}
          {formCardInnerNameArticle(register, errors, nextBtn)}
          {formCardInnerImage(setCardImage)}
          {formCardInnerSubmit(nextBtn)}
        </form>
      </article>
    </main>
  );
};

export default AdminCreateCard;