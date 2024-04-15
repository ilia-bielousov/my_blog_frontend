import { Link } from "react-router-dom";

const Admin404 = () => {
  return (
    <main className="flex flex-col justify-center flex-1">
      <div className="flex flex-col items-center justify-center gap-2 px-24">
        <span className="text-8xl font-medium mb-4">404</span>
        <span className="text-xl font-bold">
          такой страницы в панели не существует!
        </span>
        <Link
          className="border p-3 hover:bg-slate-100 active:bg-slate-200 transition"
          to='/admin'>
          кликните сюда, чтобы перейти на главную панель админа.
        </Link>
      </div>
    </main>
  );
};

export default Admin404;