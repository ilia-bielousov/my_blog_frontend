import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Content from "../components/Content";
import { fetchCards } from "../store/asyncAction/cards";

const PageForCards = () => {
  const dispatch = useDispatch();
  const cards = useSelector(state => state.client.cards)

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  return (
    <>
      {cards ? <Content data={cards} /> : null}
    </>
  )
}

export default PageForCards;