import CodeExample from "../components/CodeExample";
import noImg from './../assets/images/no-img.svg';

const getImageUrl = (imagePath) => {
  if (!imagePath) return noImg;
  if (imagePath.startsWith('http') || imagePath.startsWith('data:')) return imagePath;
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  return `${process.env.REACT_APP_API_URL}${cleanPath}`;
}

const RenderImage = ({ imageSource, alt, className }) => {
  const imageUrl = getImageUrl(imageSource);
  return (
    <div className="flex justify-center my-8">
      <img
        alt={alt || 'image'}
        src={imageUrl}
        loading="lazy"
        className={className || "w-full max-w-4xl h-auto rounded-xl shadow-md object-cover max-h-[600px]"}
        onError={(e) => { e.target.src = noImg; }}
      />
    </div>
  );
}

const createArticle = (content) => {
  if (!content || !Array.isArray(content)) return null;

  return content.map((item) => {
    const key = item.id || Math.random().toString(36).substring(7);

    switch (item.tag) {
      case 'h1':
        return <h1 key={key} className="text-3xl md:text-4xl font-extrabold mt-10 mb-6 text-slate-900 dark:text-white leading-tight">{item.text}</h1>;

      case 'h2':
        return <h2 key={key} className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-slate-800 dark:text-slate-100 border-b pb-2 border-slate-200 dark:border-slate-700">{item.text}</h2>;

      case 'h3':
        return <h3 key={key} className="text-xl md:text-2xl font-bold mt-6 mb-3 text-slate-800 dark:text-slate-200">{item.text}</h3>;

      case 'p':
        return (
          <p key={key}
            className="text-lg text-slate-700 dark:text-slate-300 mb-5 leading-relaxed text-justify"
            dangerouslySetInnerHTML={{ __html: item.text }}
          />
        );

      case 'ul': {
        const rawContent = item.list || item.text || '';

        const listItems = rawContent
          .split('\n')
          .map(s => s.trim())
          .filter(Boolean);

        if (listItems.length === 0) return null;

        return (
          <div key={key} className="my-6">
            {item.description && (
              <p className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">
                {item.description}
              </p>
            )}

            <ul className="pl-6 space-y-2">
              {listItems.map((li, i) => (
                <li key={i} className="list-disc text-lg text-slate-700 dark:text-slate-300 pl-2 marker:text-blue-500">
                  {li}
                </li>
              ))}
            </ul>
          </div>
        )
      }

      case 'blockquote':
        return (
          <figure key={key} className="my-8 border-l-4 border-blue-500 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-r-lg">
            <blockquote className="italic text-xl text-slate-800 dark:text-slate-200 leading-relaxed">
              "{item.text.replace(/"/g, '')}"
            </blockquote>
          </figure>
        );

      case 'alert':
        return (
          <div key={key} className="flex gap-4 p-2 my-3 items-center text-blue-900 bg-blue-50 rounded-xl border border-blue-100 dark:bg-blue-900/20 dark:text-blue-100 dark:border-blue-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 shrink-0 mt-0.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            <div>
              <p className="font-bold !m-2">Обратите внимание</p>
            </div>
          </div>
        );

      case 'img':
        return <RenderImage key={key} imageSource={item.image} alt={item.alt} className={item.className} />;

      case 'iframe':
        return (
          <div key={key} className="mx-auto my-8 w-full max-w-4xl">
            <div className="relative w-full pb-[56.25%] h-0 rounded-xl overflow-hidden shadow-lg bg-black">
              <div
                className="absolute top-0 left-0 w-full h-full [&>iframe]:w-full [&>iframe]:h-full border-0"
                dangerouslySetInnerHTML={{ __html: item.text }}
              />
            </div>
          </div>
        );

      case 'code':
        return (
          <div key={key} className="my-8 rounded-lg overflow-hidden shadow-sm">
            <CodeExample language={item.language || 'javascript'} code={item.text || item.code} />
          </div>
        );

      case 'hr':
        return <hr key={key} className="h-px my-10 bg-slate-200 border-0 dark:bg-slate-700" />;

      case 'btn':
        return (
          <div key={key} className="flex justify-center my-8">
            <a
              href={item.url || '#'}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg transition transform active:scale-95 no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.text || 'Нажать'}
            </a>
          </div>
        );

      default:
        return null;
    }
  });
}

const transliterate = (text) => {
  if (!text) return '';
  const transliterationMap = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z',
    и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r',
    с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sch',
    ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya', ' ': '-',
  };
  return text.toLowerCase().split('').map(char => transliterationMap[char] || char).join('').replace(/[^a-z0-9-]/g, '');
};

export { createArticle, RenderImage, transliterate, getImageUrl };