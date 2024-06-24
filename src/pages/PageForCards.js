import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';

import Content from "../components/Content";
import Modal from "../components/Modal";
import { fetchCards } from "../store/asyncAction/cardsClient";

import { updateStatusError, removeStateCards } from "../store/clientReducer";

const PageForCards = () => {
  const dispatch = useDispatch();
  const cards = useSelector(state => state.client.cards);
  const error = useSelector(state => state.client.error);
  const { pathname } = useLocation();

  const [loading, setLoading] = useState(null);

  const path = pathname.replace(/\//g, '');

  useEffect(() => {
    dispatch(removeStateCards());
    dispatch(updateStatusError());
    dispatch(fetchCards(path));

    setLoading(true);
  }, []);

  return (
    <>
      {cards && !error ?
        <Content
          data={cards}
        />
        :
        <>
          <main className="flex-1" />
          <Modal>
            <p className="text-center">
              Coś poszło nie tak ... spróbuj ponownie.
            </p>
            <input
              type="submit"
              value="spróbuj ponownie"
              className="block mx-auto p-2 border rounded-md transition hover:bg-slate-100 active:bg-slate-200 cursor-pointer"
              onClick={() => window.location.reload()}
            />
          </Modal>
        </>
      }
    </>
  )
}

export default PageForCards;