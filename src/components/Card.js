import { Link } from 'react-router-dom';

export default function Card({ choose, name, description, image, pseudoName }) {
  return (
    <div className="w-96 max-[459px]:max-w-80 border rounded-2xl shadow-md lg:hover:shadow-xl transition cursor-pointer lg:hover:-translate-y-1">
      <Link to={`/${choose}/${pseudoName ? pseudoName : ''}`} className="flex flex-col gap-4 p-5">
        <img
          src={image}
          alt={choose}
          className="object-cover h-64"
        />
        <h2 className="text-3xl max-md:text-2xl font-bold first-letter:uppercase">
          {name ? name : choose}
        </h2>
        <p className="max-md:text-sm">
          {description}
        </p>
      </Link>
    </div>
  )
}