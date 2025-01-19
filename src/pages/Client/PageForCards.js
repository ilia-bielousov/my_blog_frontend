import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';

import Content from "../../components/Content";
import Modal from "../../components/Modal";
import { fetchCards } from "../../store/asyncAction/cardsClient";

import { updateStatusError, removeStateCards, removeStateArticle } from "../../store/clientReducer";

const PageForCards = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cards = useSelector(state => state.client.cards);
  const error = useSelector(state => state.client.error);
  const code = useSelector(state => state.client.code);
  const { pathname } = useLocation();

  const [loading, setLoading] = useState(true);

  const path = pathname.replace(/\//g, '');

  useEffect(() => {
    dispatch(removeStateCards());
    dispatch(removeStateArticle());
    dispatch(updateStatusError());
    dispatch(fetchCards(path));
    setLoading(true);

    if (cards || error) {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {cards && !error && !loading ?
        <Content
          data={cards}
        />
        :
        null
      }
      {error && !loading && code === 500 ?
        <>
          <main className="flex-1" />
          <Modal>
            <p className="text-center p-3">
              Что-то пошло не так ...
            </p>
            {/* svg */}
            <div className="flex flex-col gap-3">
              <input
                type="submit"
                value="вернуться назад"
                className="w-[165px] block mx-auto p-2 border rounded-md transition hover:bg-slate-100 active:bg-slate-200 cursor-pointer"
                onClick={() => path === '' ? window.location.reload() : navigate(-1)}
              />
              <input
                type="submit"
                value="обновить страницу"
                className="w-[165px] block mx-auto p-2 border rounded-md transition hover:bg-slate-100 active:bg-slate-200 cursor-pointer"
                onClick={() => window.location.reload()}
              />
            </div>
          </Modal>
        </>
        :
        null
      }
    </>
  )
}

export default PageForCards;