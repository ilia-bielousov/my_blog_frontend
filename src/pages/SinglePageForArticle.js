import { useEffect, Fragment, useState } from "react";
import { useLocation, useParams, useNavigate, Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";

import Modal from "../components/Modal";

import { removeStateArticle, removeStateCards } from "../store/clientReducer";
import { fetchArticle } from "../store/asyncAction/article";
import { fetchCards } from "../store/asyncAction/cardsClient";
import createArticle from "../utilities/utilities";
import Client404 from "./Client404";

const SinglePageForArticle = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cards = useSelector(state => state.client.cards);
  const article = useSelector(state => state.client.article);
  const error = useSelector(state => state.client.error);
  const code = useSelector(state => state.client.code);

  const [randomNumbers, setRandomNumbers] = useState(null);
  const [nextArticle, setNextArticle] = useState([]);

  useEffect(() => {
    dispatch(removeStateCards());
    dispatch(removeStateArticle());
    dispatch(fetchCards(`${pathname.split('/')[1]}`));
    dispatch(fetchArticle(id, pathname.split('/')[1]));

    axios.patch(`${process.env.REACT_APP_API_URL}/${pathname}`, { id })
      .then(() => { })
      .catch(() => { });
  }, []);

  useEffect(() => {
    setRandomNumbers(null);
    setNextArticle(cards);
    setRandomNumbers(() => {
      let quantity = null;
      let excludedNumber = null;

      function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      function generateUniqueNumbersInRange(min, max, count, excludedNumber) {
        let numbers = [];
        while (numbers.length < count) {
          let randomNumber = getRandomNumber(min, max);
          if (randomNumber !== excludedNumber && !numbers.includes(randomNumber)) {
            numbers.push(randomNumber);
          }
        }

        return numbers;
      }
      if (cards.length === 0 || cards.length === 1) {

        return null;

      } else if (cards.length === 2) {

        return cards[0].pseudoName === id ? [1] : [0];

      } else if (cards.length >= 2) {
        quantity = 2;

        cards.forEach((item, key) => {
          if (item.pseudoName === id) {
            excludedNumber = key;
          }
        });

        return generateUniqueNumbersInRange(0, cards.length - 1, quantity, excludedNumber);
      }
    })
  }, [cards]);

  const renderArticle = () => {
    if (article.status === 404) {
      return (
        <div className="flex h-full flex-col justify-center items-center">
          <span className="text-8xl font-medium mb-4">404</span>
          <p className="text-2xl">
            Такой статьи не существует.
          </p>
        </div>
      )
    } else {
      return (
        <>
          {createArticle(article.content).map((item, i) => {
            return (
              <Fragment key={i}>
                {item}
              </Fragment>
            );
          })
          }
        </>
      )
    }
  }

  const renderSpinner = () => {
    if (!error)
      return (
        // спиннер 
        <div role="status" className="flex justify-center p-5">
          <svg aria-hidden="true" className="w-24 h-24 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
        </div>
      )
    else
      return null;
  };

  const renderNextArticle = () => {

    if (randomNumbers && randomNumbers.length === 1) {
      return (
        <Link to={`../${nextArticle[randomNumbers[0]].choose}/${nextArticle[randomNumbers[0]].pseudoName}`} className="block cursor-pointer border-2 p-3 flex-1 flex-wrap lg:hover:bg-slate-50 transition">
          <h4 className="text-xl">
            {nextArticle[randomNumbers[0]].name}
          </h4>
          <img
            className="p-2 lg:max-h-48 w-full object-cover lg:block max-md:max-h-[80%]"
            src={nextArticle[randomNumbers[0]].image} alt="kartinka" />
          <p className="">
            {nextArticle[randomNumbers[0]].description}
          </p>
        </Link>
      )
    } else if (randomNumbers && randomNumbers.length === 2) {
      return (
        <div className="flex flex-col p-2 max-lg:flex-row max-md:flex-col flex-wrap gap-2">
          <Link to={`../${nextArticle[randomNumbers[0]].choose}/${nextArticle[randomNumbers[0]].pseudoName}`} className="cursor-pointer border-2 p-3 flex-1 flex-wrap">
            <h4 className="text-xl">
              {nextArticle[randomNumbers[0]].name}
            </h4>
            <img
              className="p-2 lg:max-h-48 w-full object-cover lg:block max-md:max-h-[80%]"
              src={nextArticle[randomNumbers[0]].image} alt="kartinka" />
            <p className="">
              {nextArticle[randomNumbers[0]].description}
            </p>
          </Link>
          <Link to={`../${nextArticle[randomNumbers[1]].choose}/${nextArticle[randomNumbers[1]].pseudoName}`} className="cursor-pointer border-2 p-3 flex-1 flex-wrap">
            <h4 className="text-xl">
              {nextArticle[randomNumbers[1]].name}
            </h4>
            <img
              className="p-2 lg:max-h-48 w-full object-cover lg:block max-md:max-h-[80%]"
              src={nextArticle[randomNumbers[1]].image} alt="kartinka" />
            <p className="">
              {nextArticle[randomNumbers[1]].description}
            </p>
          </Link>
        </div>
      )
    }
  }

  return (
    <>
      <main className="flex flex-1">
        <div className="w-9/12 flex flex-col lg:flex-row flex-1 justify-between gap-5">
          <article className="w-full lg:w-9/12 flex-1 md:pl-24 px-3">
            {article ?
              renderArticle()
              :
              renderSpinner()
            }
          </article>
          {article && article.status !== 404 ?
            <aside className="lg:w-3/12 w-full md:pl-24 lg:pl-0 px-3">
              {/* если нет, то не выводить заголовка или изменить его. */}
              <h3 className="mb-3 text-xl text-center italic">{nextArticle.length < 2 ? 'Пока нет статей' : ' Посмотрите еще с этого раздела'} </h3>
              {nextArticle ? renderNextArticle() : <div> spinner </div>}
            </aside>
            :
            null
          }
        </div>
      </main>
      {error && code === 404 ? <Navigate to={`../${pathname.split('/')[1]}/error404`} replace={true} /> :
        error ?
          <Modal>
            <p className="text-center">
              Что-то пошло не так ... попробуйте еще раз.
            </p>
            <input
              type="submit"
              value="вернуться назад"
              className="block mx-auto p-2 border rounded-md transition hover:bg-slate-100 active:bg-slate-200 cursor-pointer"
              onClick={() => navigate(-1)}
            />
          </Modal>
          : null
      }
    </>
  )
}

export default SinglePageForArticle;