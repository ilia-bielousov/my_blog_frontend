import { Link } from "react-router-dom";

const Client404 = () => {
  return (
    <main className="flex flex-col justify-center flex-1">
      <div className="flex flex-col items-center justify-center gap-2 px-24">
        <span className="text-8xl font-medium mb-2">404</span>
        <span className="text-xl font-bold">
          Такой страницы не существует!
        </span>
        <Link
          className="border m-3 p-3 hover:bg-slate-100 active:bg-slate-200 transition"
          to='/'>
          Перейти на главную страницу.
        </Link>
        {/* <div className="w-16">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 17C9.85038 16.3697 10.8846 16 12 16C13.1154 16 14.1496 16.3697 15 17" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
            <ellipse cx="15" cy="10.5" rx="1" ry="1.5" fill="#1C274C" />
            <ellipse cx="9" cy="10.5" rx="1" ry="1.5" fill="#1C274C" />
            <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="#000" strokeWidth="1.5" />
          </svg>
        </div> */}
      </div>
    </main>
  );
};

export default Client404;