import { Link } from "react-router-dom";

const ErrorClient = () => {
  return (
    <main className="flex flex-col justify-center flex-1">
      <div className="flex flex-col items-center justify-center gap-2 px-24">
        <span className="text-8xl font-medium mb-4">404</span>
        <span className="text-xl font-bold">
          такой страницы не существует!
        </span>
        <Link
          className="border p-3 hover:bg-slate-100 active:bg-slate-200 transition"
          to='/'>
          кликните сюда, чтобы перейти на главную страницу.
        </Link>
      </div>
    </main>
  );
};

export default ErrorClient;