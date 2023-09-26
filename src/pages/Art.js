import { useState, useEffect } from "react";

import Content from "../components/Content/Content";

const Art = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/data')
      .then(res => res.json())
      .then(data => {
        setData(data.dataForArt.data);
        setName(data.dataForArt.name);
      });
  }, []);


  return (
    <>
      {data ? <Content data={data} name={name} /> : null}
    </>
  );
};

export default Art;