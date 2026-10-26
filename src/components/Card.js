import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from './../utilities/utilities.js';

const PlaceholderIcon = () => (
  <svg className="w-12 h-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

export default function Card({ choose, name, description, image, pseudoName, date = "Сегодня" }) {
  const [imgSrc, setImgSrc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!image) {
      setLoading(false);
      return;
    }
    setImgSrc(getImageUrl(image));
    setLoading(false);
  }, [image]);

  return (
    <div className="group relative flex flex-col w-full sm:w-[380px] max-w-[380px] min-h-[416px] bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300 mouse:shadow-xl mouse:-translate-y-1 mouse:border-blue-300 dark:mouse:border-blue-600">

      <Link to={`/${choose}/${pseudoName || ''}`} className="flex flex-col h-full" state={{ title: name }}>
        <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-900">
          {loading ? (
            <div className="w-full h-full flex items-center justify-center animate-pulse">
              <PlaceholderIcon />
            </div>
          ) : imgSrc ? (
            <img
              src={imgSrc}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-700 group-mouse:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <PlaceholderIcon />
            </div>
          )}

          {choose && (
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-black/50 backdrop-blur-md rounded-full shadow-sm border border-white/20">
                {choose}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col flex-1 p-5">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 leading-tight group-mouse:text-blue-600 transition-colors">
            {name || "Без названия"}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 flex-1">
            {description}
          </p>
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
            <span className="text-blue-600 text-sm font-bold flex items-center gap-1 group-mouse:no-underline">
              Читать далее &rarr;
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}