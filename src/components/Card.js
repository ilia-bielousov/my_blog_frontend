import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import noImg from './../assets/images/no-img.svg';

export default function Card({ choose, name, description, image, pseudoName }) {
  const [imageUrl, setImage] = useState('');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}upload/${image}`)
      .then(res => setImage(`data:image/format;base64,${res.data.data[0].imageSource}`))
      .catch(() => {
        setImage(noImg);
      })
  }, []);

  return (
    <div className="w-[364px] max-[459px]:max-w-80 border rounded-2xl shadow-md lg:hover:shadow-xl transition cursor-pointer lg:hover:-translate-y-1">
      <Link to={`/${choose}/${pseudoName ? pseudoName : ''}`} className="flex flex-col gap-4 p-5">
        <img
          src={imageUrl}
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