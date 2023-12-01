import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './ModalAfterCreatingArticle.css'; 

const ModalAfterCreatingArticle = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeTheModal = () => {
    setIsModalOpen(true);
  }

  if (isModalOpen) {
    return <Navigate to='/admin' />
  }
  // нужно обновить весь редакс, чтобы можно было снова писать статью
  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => closeTheModal()} >
            &times;
          </span>
          <p>статья успешно создана, нажмите на крестик и вас перенаправит на главную страницу панели</p>
        </div>
      </div>
    </div>
  );
};

export default ModalAfterCreatingArticle;