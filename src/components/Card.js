import { Link } from 'react-router-dom';

export default function Card({ choose, name, description, id, img }) {

  return (
    <div className="w-96 border rounded-2xl p-5 shadow-md hover:shadow-xl transition cursor-pointer hover:-translate-y-1">
      <Link to={`/${choose}/${id ? id : ''}`} className="flex flex-col gap-4">
        <img src={img ? img : "https://images.pexels.com/photos/442559/pexels-photo-442559.jpeg?auto=compress&cs=tinysrgb"} alt={choose}
          className="" />
        <h2 className="text-3xl font-bold first-letter:uppercase">
          {name ? name : choose}
        </h2>
        <p className="">
          {description}
        </p>
      </Link>
    </div>
  )
}