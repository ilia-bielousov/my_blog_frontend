import { useParams } from "react-router-dom";

const SingleModeling = () => {
  const { id }= useParams();
  
  return (
    <main className="main__content">
      <div className="container">
        <h1>
          article Modeling #{id}
        </h1>
      </div>
    </main>
  )
}

export default SingleModeling;