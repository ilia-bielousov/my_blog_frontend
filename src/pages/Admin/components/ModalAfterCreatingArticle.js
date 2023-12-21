import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const ModalAfterCreatingArticle = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeTheModal = () => {
    setIsModalOpen(true);
  }

  if (isModalOpen) {
    return <Navigate to='/admin' />
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full z-10 mx-auto bg-slate-200/50 ">
      <div className='flex justify-center items-center h-full'>
        <div className="flex flex-col items-center w-96 h-36 rounded-xl bg-slate-300 p-4">
          <p className='mb-5 text-xl'>Статья успешно создана. </p>
          <button
            className='w-18 p-3 transition bg-slate-600 hover:bg-slate-800 rounded-xl text-white'
            onClick={() => closeTheModal()}>
            Нажмите сюда
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAfterCreatingArticle;