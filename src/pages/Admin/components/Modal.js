
const Modal = ({ children }) => {
  return (
    <div
      className="modal flex items-center justify-center w-screen h-screen fixed bg-black/40 ">
      <div
        className="modal__content p-5 rounded-xl bg-white">
        {children}
      </div>
    </div>
  );
};

export default Modal;