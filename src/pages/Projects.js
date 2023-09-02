import { useState, useEffect } from "react";

import Content from "../components/Content/Content";

const Projects = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/data')
      .then(res => res.json())
      .then(data => {
        setData(data.dataForProjects.data);
        setName(data.dataForProjects.name);
      });
  }, []);

  return (
    <>
      {data ? <Content data={data} name={name} /> : null}
    </>
  )
}

export default Projects;