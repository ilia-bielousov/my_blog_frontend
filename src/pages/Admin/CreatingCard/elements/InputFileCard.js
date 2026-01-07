const InputFileCard = ({ setData, errors }) => {

  const handleInput = (e) => {
    setData(prevState => {
      return {
        ...prevState,
        file: e.target.files[0]
      }
    });
  }

  return (
    <div className="p-3 border rounded-xl w-80 mb-2">
      <input onChange={handleInput}
        className="block mb-2"
        type="file"
        name="image"
        id="image"
      />
      {errors.file === 'no-image' ? <div className="text-rose-500">добавьте картинку на предпросмотр</div> : null}
    </div >
  )
};

export default InputFileCard;