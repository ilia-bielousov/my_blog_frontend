const InputCategoryCard = ({ setData, errors }) => {
  const handleInput = (e) => {
    setData(prevState => {
      return {
        ...prevState,
        choose: e.target.value
      }
    });
  }

  return (
    <>
      <label className="block mb-2 text-xl">
        Вам необходимо выбрать секцию, для какого раздела будет написана статья.
      </label>
      <input
        className="mr-1"
        type="radio"
        id="programming"
        name="choose"
        value="programming"
        onChange={(e) => handleInput(e)}
      />
      <label
        className="mr-3 text-lg"
        htmlFor="programming">
        Программирование
      </label>
      <input
        className="mr-1"
        type="radio"
        id="projects"
        name="choose"
        value="projects"
        onChange={(e) => handleInput(e)}
      />
      <label
        className="mr-3 text-lg"
        htmlFor="projects">
        Проекты
      </label>
      <input
        className="mr-1"
        type="radio" id="modeling"
        name="choose"
        value="modeling"
        onChange={(e) => handleInput(e)}
      />
      <label
        className="mb-3 text-lg"
        htmlFor="modeling">
        Моделирование
      </label>
      <br />
      {errors.choose === 'no-choose' ? <div className="text-rose-500">выберите раздел</div> : null}
    </>
  )
}

export default InputCategoryCard;