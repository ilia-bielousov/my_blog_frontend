import { useEffect, useState, Fragment } from "react";
import { createArticle } from "../../utilities/utilities";
import axios from "axios";

const Review = () => {
  const [previewContent, setPreviewContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}admin/preview`)
      .then(data => {
        setPreviewContent(data.data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  const renderPreview = () => {
    return createArticle(previewContent[0].content).map((item, i) => {
      return (
        <Fragment key={i}>
          {item}
        </Fragment>
      );
    })
  }

  return (
    <main className="flex flex-1">
      <div className="w-9/12 flex flex-col lg:flex-row flex-1 justify-between gap-5">
        <article className="w-full lg:w-9/12 flex-1 md:pl-24 px-3">
          {loading ? null : renderPreview()}
        </article>
        <aside className="lg:w-3/12 w-full md:pl-24 lg:pl-0 px-3">
          <h3 className="mb-3 text-xl text-center italic">
            podgląd
          </h3>
        </aside>
      </div>
    </main>
  );
};

export default Review;