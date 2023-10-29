import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Content from "../../components/Content/Content";
import { fetchCards } from "../../store/asyncAction/cards";

const Projects = () => {
  const dispatch = useDispatch();
  const cards = useSelector(state => state.client.cards)

  useEffect(() => {
    dispatch(fetchCards());
  }, []);

  return (
    <>
      {cards ? <Content data={cards} /> : null}
    </>
  )
}

export default Projects;