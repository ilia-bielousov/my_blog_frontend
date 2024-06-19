import { Link } from "react-router-dom";

const Admin404 = () => {
  return (
    <main className="flex flex-col justify-center flex-1">
      <div className="flex flex-col items-center justify-center gap-2 px-24">
        <span className="text-8xl font-medium mb-4">404</span>
        <span className="text-xl font-bold">
          taka strona nie istnieje
        </span>
        <Link
          className="border p-3 hover:bg-slate-100 active:bg-slate-200 transition"
          to='/admin'>
          kliknij tutaj, aby przejść do głównego panelu administracyjnego.
        </Link>
      </div>
    </main>
  );
};

export default Admin404;