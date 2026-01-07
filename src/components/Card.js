import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from './../utilities/utilities'; // Твоя утилита

// SVG-заглушка, если нет картинки
const PlaceholderIcon = () => (
  <svg className="w-12 h-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

export default function Card({ choose, name, description, image, pseudoName, date = "Сегодня" }) {
  const [imgSrc, setImgSrc] = useState(null);
  const [loading, setLoading] = useState(true);

  // Логика загрузки (можно упростить, если image уже полная ссылка)
  useEffect(() => {
    if (!image) {
      setLoading(false);
      return;
    }
    // Если используем утилиту getImageUrl, можно сразу ставить image
    setImgSrc(getImageUrl(image));
    setLoading(false);
  }, [image]);

  return (
    <div className="group relative flex flex-col w-full max-w-[380px] bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-300 dark:hover:border-blue-600">

      <Link to={`/${choose}/${pseudoName || ''}`} className="flex flex-col h-full">

        {/* 1. Блок изображения с Zoom-эффектом */}
        <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-900">
          {loading ? (
            <div className="w-full h-full flex items-center justify-center animate-pulse">
              <PlaceholderIcon />
            </div>
          ) : imgSrc ? (
            <img
              src={imgSrc}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <PlaceholderIcon />
            </div>
          )}

          {/* Бейдж категории (поверх картинки) */}
          {choose && (
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-black/50 backdrop-blur-md rounded-full shadow-sm border border-white/20">
                {choose}
              </span>
            </div>
          )}
        </div>

        {/* 2. Контент */}
        <div className="flex flex-col flex-1 p-5">

          {/* Заголовок */}
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
            {name || "Без названия"}
          </h2>

          {/* Описание (обрезается до 3 строк) */}
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 flex-1">
            {description}
          </p>

          {/* 3. Подвал карточки (Мета-инфо) */}
          <div className="pt-4 mt-auto border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs text-slate-400">
            <span className="font-medium text-blue-500 group-hover:underline">
              Читать &rarr;
            </span>
          </div>
        </div>

      </Link>
    </div>
  )
}