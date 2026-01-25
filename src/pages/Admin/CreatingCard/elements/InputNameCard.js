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
      <div className="space-y-1">
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1" htmlFor="name">
          Придумайте название статьи.
        </label>
        <input
          className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-blue-500 transition-colors"
          type="text"
          id="name"
          name="name"
          onChange={handleInput}
        />
      </div>
      {errors.name === 'zero' ? <div className="text-rose-500">поле "имя" есть обязательным</div> : null}
      {errors.name === 'min' ? <div className="text-rose-500">минимальная длина поля — 4 символа</div> : null}
      {errors.name === 'max' ? <div className="text-rose-500">максимальная длина поля — 30 символов</div> : null}
      <br />
      <div className="space-y-1">
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
          Краткое описание статьи (максимум 180 символов).
        </label>
        <textarea
          className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-blue-500 transition-colors resize-none"
          id="description"
          rows={4}
          name="description"
          onChange={handleInput}
        />
      </div>
      {errors.description === 'zero' ? <div className="text-rose-500">поле "описание" есть обязательным</div> : null}
      {errors.description === 'min' ? <div className="text-rose-500">минимальная длина поля — 10 символа</div> : null}
      {errors.description === 'max' ? <div className="text-rose-500">максимальная длина поля — 180 символов</div> : null}
      {/* <br /> */}
    </div>
  )
};

export default InputNameCard;