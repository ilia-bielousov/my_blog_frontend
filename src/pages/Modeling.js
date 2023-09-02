import { useState, useEffect } from "react";

import Content from "../components/Content/Content";

const Modeling = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/data')
      .then(res => res.json())
      .then(data => {
        setData(data.dataForModeling.data);
        setName(data.dataForModeling.name);
      });
  }, []);

  return (
    <>
      {data ? <Content data={data} name={name} /> : null}
    </>
  )
}

export default Modeling;