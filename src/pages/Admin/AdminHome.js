import { useState } from 'react';
import { Navigate } from 'react-router-dom'

const AdminHome = () => {
  const [token,] = useState(localStorage.getItem('admin'));

  if (!token) {
    alert('У вас нет доступа, чтобы создавать/редактировать статьи.')
    return <Navigate to='/' />
  }

  return (
    <main className="flex-1 pl-72">
      <article className="max-w-3xl p-5 mx-auto">
        <h2 className='text-3xl font-bold mb-3'>
          Здравствуйте!
        </h2>
        <p className="text-xl text-justify indent-10">
          Вы находитесь в админ-панели блога. Здесь вы можете управлять всеми аспектами блога, включая создание новых статей, редактирование существующих статей и анализ количества просмотра статей.
        </p>
        <p className="text-xl mb-5">
          Чтобы начать работу, выберите пункт меню из списка слева.
        </p>
        <p className="text-2xl font-bold">
          Желаем вам приятного использования админ-панели!
        </p>
      </article>
    </main >
  );
};

export default AdminHome;