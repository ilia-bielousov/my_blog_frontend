import { Link } from "react-router-dom";

const AdminCreateCard = () => {
  return (
    <main className="main">
      <div className="container__admin">
        <article className="main__admin-article">
          <div className="main__create-article">
            <h2 className="">
              create card а только потом статью саму
            </h2>
          </div>
        </article>
        {/* тут добавить форму */}
        <Link
          to="../create-article"
          relative="admin"
          key={'create-article'}
        >
          click
        </Link>
        {/* тут добавить полсе того, как ввели название и короткое описание статьи */}
      </div>
    </main>
  );
};

export default AdminCreateCard;