import { useEffect, useState, useRef } from "react";

const NewTagForEdit = (props) => {
  const [textContent, setTextContent] = useState('');
  const tagRef = useRef();
  const { tag, text, id, className, list, language, article } = props;

  const changeText = (e) => {
    setTextContent(() => {
      if (tag === 'ul') {
        return {
          ...textContent,
          list: e.target.value
        }
      } else if (tag === 'code' && e.target.name) {
        return {
          ...textContent,
          language: e.target.value
        }
      } else {
        return {
          ...textContent,
          text: e.target.value
        }
      }
    });
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && tag !== 'ul' && tag !== 'code') {
      tagRef.current.blur();
    } else if (tag === 'ul' && e.key === 'Control') {
      tagRef.current.blur();
    } else if (e.key === 'Enter' && tag === 'code') {
      tagRef.current.children[0].blur();
      tagRef.current.children[1].blur();
    }

    article.content = article.content.map(tag => {
      if (tag.id === id) {
        return textContent
      } else {
        return tag
      }
    })
  }

  useEffect(() => {
    setTextContent({ tag, text, id, className, list, language });
  }, [props]);


  const determine = () => {
    if (textContent) {
      switch (textContent.tag) {
        case 'h1': {
          return (
            <input
              onKeyDown={onKeyDown}
              onChange={changeText}
              ref={tagRef}
              className="w-full p-2 outline-blue-700 mb-2 border-2 rounded-xl"
              type="text"
              placeholder='Введите свой текст'
              value={textContent.text}
            />
          )
        }
        case 'h2': {
          return (
            <input
              onChange={changeText}
              onKeyDown={onKeyDown}
              ref={tagRef}
              className="w-full p-2 outline-blue-700 mb-2 border-2 rounded-xl"
              type="text"
              placeholder='Введите свой текст'
              value={textContent.text}
            />
          )
        }
        case 'h3': {
          return (
            <input
              onChange={changeText}
              onKeyDown={onKeyDown}
              ref={tagRef}
              className="w-full p-2 outline-blue-700 mb-2 border-2 rounded-xl"
              type="text"
              placeholder='Введите свой текст'
              value={textContent.text}
            />
          )
        }
        case 'ul': {
          return (
            <textarea
              onChange={changeText}
              onKeyDown={onKeyDown}
              ref={tagRef}
              className="w-full p-2 outline-blue-700 resize-none mb-2 h-60 border-2 rounded-xl"
              type="text"
              placeholder='Введите свой текст'
              value={textContent.list}
            />
          )
        }
        case 'p': {
          return (
            <textarea
              onChange={changeText}
              onKeyDown={onKeyDown}
              ref={tagRef}
              className="w-full p-2 outline-blue-700 resize-none mb-2 h-60 border-2 rounded-xl"
              type="text"
              placeholder='Введите свой текст'
              value={textContent.text}
            />
          )
        }
        // {
        // // case 'img': { // добавить подпись для картинки
        // //   const sendImage = async (e) => {
        // //     e.preventDefault();

        // //     const formData = new FormData();
        // //     formData.append('file', file);

        // //     await axios.post('http://localhost:4000/admin/upload', formData)
        // //       .then(res => {
        // //         content[IDforElementOfArticle] = { ...content[IDforElementOfArticle], alt: res.data.name, image: `http://localhost:4000${res.data.path}`, id: IDforElementOfArticle, className: 'mx-auto p-3' }
        // //         setSourceImg(`http://localhost:4000${res.data.path}`);
        // //       })
        // //       .catch(err => console.log(err));
        // //   }

        // //   return (
        // //     <>
        // //       {(!sourceImg ?
        // //         <div className="flex flex-col items-center p-2 max-w-xs mx-auto">
        // //           <div className="relative flex flex-col justify-center items-center w-48 mx-auto h-24 p-3 mb-2 bg-blue-100 hover:bg-blue-300 rounded-xl transition">
        // //             <input
        // //               type="file"
        // //               name="image"
        // //               id="image"
        // //               className="w-full h-full absolute inset-0 opacity-0 cursor-pointer"
        // //               onChange={e => setFile(e.target.files[0])}
        // //             />
        // //             <img src={picture} alt="capt" className="w-8" />
        // //           </div>
        // //           <button
        // //             className="inline-block p-2 rounded-md transition bg-blue-500 hover:bg-blue-600 active:bg-blue-800 text-white"
        // //             onClick={(e) => sendImage(e)}
        // //           >
        // //             confirm
        // //           </button>
        // //         </div> :
        // //         <div className="mx-auto">
        // //           <img className="mx-auto p-3 mb-1.5" src={sourceImg} alt="test" />
        // //         </div>)}
        // //     </>
        // //   )
        // // }
        // }
        case 'iframe': {
          return (
            <input
              onChange={changeText}
              onKeyDown={onKeyDown}
              ref={tagRef}
              className="w-full p-2 outline-blue-700 mb-2 border-2 rounded-xl"
              type="text"
              placeholder='Введите свой текст'
              value={textContent.text}
            />
          )
        }
        case 'code': {
          return (
            <div className="">
              <textarea
                onChange={changeText}
                onKeyDown={onKeyDown}
                ref={tagRef}
                className="w-full p-2 outline-blue-700 resize-none mb-2 h-60 border-2 rounded-xl"
                type="text"
                placeholder='скопируйте свой код и вставьте сюда'
                value={textContent.text}
              />
              <input
                onChange={changeText}
                onKeyDown={onKeyDown}
                ref={tagRef}
                name="language"
                type="text"
                className="w-full p-2 outline-blue-700 mb-2 border-2 rounded-xl"
                placeholder="напишите язык на каком написан код (javascript, c/c++, python etc.)"
                value={textContent.language || ''}
              />
            </div>
          )
        }
        default: {
          return undefined;
        }
      }
    }  // возможно добавить что-то, чтобы не было такого дергания
  }

  return (
    <>
      {determine()}
    </>
  )
};

export default NewTagForEdit;