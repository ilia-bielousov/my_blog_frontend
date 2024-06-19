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
          Witam!
        </h2>
        <p className="text-xl text-justify indent-10">
          Jesteś w panelu administracyjnym bloga. Tutaj możesz zarządzać wszystkimi aspektami bloga, w tym tworzyć nowe artykuły, edytować istniejące artykuły i analizować liczbę wyświetleń artykułów.
        </p>
        <p className="text-xl mb-5">
          Aby rozpocząć, wybierz pozycję menu z listy po lewej stronie.
        </p>
        <p className="text-2xl font-bold">
          Życzę miłego korzystania z panelu administracyjnego!
        </p>
      </article>
    </main >
  );
};

export default AdminHome;