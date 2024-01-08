const AdminHome = () => {
  const getToken = localStorage.getItem('test'); // самая минимальная защита от входа в админ панель, ну а че делать

  console.log(getToken);

  const renderText = () => {
    return (
      <>
        <h2 className='text-3xl font-bold mb-3'>
          Здравствуйте!
        </h2>
        <p className="text-xl text-justify indent-8">
          Вы находитесь в админ-панели блога. Здесь вы можете управлять всеми аспектами блога, включая создание новых статей, редактирование существующих статей и просмотр количества просмотров статей.
        </p>
        <p className="text-xl indent-8 mb-5">
          Чтобы начать работу, выберите пункт меню из списка слева.
        </p>
        <p className="text-2xl font-bold">
          Желаем вам приятного использования админ-панели!
        </p>
      </>
    )
  }

  return (
    <main className="flex-1 pl-72">
      <article className="max-w-3xl p-5">
        {getToken ?
          (renderText())
          :
          <p>
            выаодвалвыоалвдаолдв
          </p>
        }
      </article>
    </main >
  );
};

export default AdminHome;