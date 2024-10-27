const Modal = ({ children }) => {
  return (
    <div
      className="modal flex z-30 items-center justify-center w-screen h-screen fixed bg-black/40 ">
      <div
        className="flex flex-col gap-3 justify-center w-96 p-5 rounded-xl bg-white">
        {children}
      </div>
    </div>
  );
};

export default Modal;