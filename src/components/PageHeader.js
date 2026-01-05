const PageHeader = ({ title, description, children }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-200 dark:border-slate-700 pb-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-lg text-slate-500 dark:text-slate-400">
            {description}
          </p>
        )}
      </div>

      {/* Сюда будем передавать кнопки действий (например, "Сохранить", "Опубликовать") */}
      <div className="flex items-center gap-3">
        {children}
      </div>
    </div>
  );
};

export default PageHeader;