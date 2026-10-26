const SkeletonCards = () => {

  const RenderCard = () => {
    return (
      <div
        role="status"
        className="flex flex-col w-full sm:w-[380px] max-w-[380px] min-h-[416px] bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-pulse"
      >
        <div className="flex items-center justify-center h-56 bg-slate-200 dark:bg-slate-700">
          <svg className="w-12 h-12 text-slate-300 dark:text-slate-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
          </svg>
        </div>

        <div className="flex flex-col flex-1 p-5">
          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-md w-3/4 mb-4"></div>
          <div className="h-3.5 bg-slate-200 dark:bg-slate-700 rounded-full w-full mb-2.5"></div>
          <div className="h-3.5 bg-slate-200 dark:bg-slate-700 rounded-full w-11/12 mb-2.5"></div>
          <div className="h-3.5 bg-slate-200 dark:bg-slate-700 rounded-full w-4/5 mb-4 flex-1"></div>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-md w-28"></div>
          </div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  return (
    <>
      <RenderCard />
      <RenderCard />
      <RenderCard />
    </>
  );
};

export default SkeletonCards;