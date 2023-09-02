import { useParams } from "react-router-dom";

const SingleProject = () => {
  const { id }= useParams();

  return (
    <main className="main__content">
      <div className="container">
        <h1>
          article project #{id}
        </h1>
      </div>
    </main>
  )
}

export default SingleProject;