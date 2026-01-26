const Modal = ({ children }) => {
  return (
    <div
      className="fixed top-0 left-0 flex z-50 items-center justify-center w-screen h-screen bg-black/40 backdrop-blur-sm transition-opacity"
    >
      <div
        className="
          flex flex-col gap-3 justify-center w-96 p-5 rounded-xl shadow-2xl
          bg-white dark:bg-slate-800 
          border border-transparent dark:border-slate-700
          transition-colors duration-300
        "
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;