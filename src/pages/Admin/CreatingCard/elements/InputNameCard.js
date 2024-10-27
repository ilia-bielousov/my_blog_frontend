const InputNameCard = ({ setData, errors }) => {
  const handleInput = (e) => {
    const { name, value } = e.target;

    setData(prevState => {
      return {
        ...prevState,
        [name]: value
      }
    });
  }

  return (
    <div>
      <label className="block my-2 text-lg" htmlFor="name">
        Придумайте название статьи.
      </label>
      <input
        className="w-80 p-1 px-3 border-2 rounded-xl outline-none focus:border-blue-700"
        type="text"
        id="name"
        name="name"
        onChange={handleInput}
      />
      {errors.name === 'zero' ? <div className="text-rose-500">поле "имя" есть обязательным</div> : null}
      {errors.name === 'min' ? <div className="text-rose-500">минимальная длина поля — 4 символа</div> : null}
      {errors.name === 'max' ? <div className="text-rose-500">максимальная длина поля — 30 символов</div> : null}
      <br />
      <label className="block mt-2 text-lg" htmlFor="description">
        Краткое описание статьи (максимум 180 символов).
      </label>
      <textarea
        className="p-2 border-2 rounded-xl w-80 h-36 outline-none focus:border-blue-700 resize-none"
        id="description"
        name="description"
        onChange={handleInput}
      />
      {errors.description === 'zero' ? <div className="text-rose-500">поле "описание" есть обязательным</div> : null}
      {errors.description === 'min' ? <div className="text-rose-500">минимальная длина поля — 10 символа</div> : null}
      {errors.description === 'max' ? <div className="text-rose-500">максимальная длина поля — 180 символов</div> : null}
      <br />
    </div>
  )
};

export default InputNameCard;