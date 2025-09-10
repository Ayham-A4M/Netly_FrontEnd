const Skeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-gradient-to-br bg-background border-0 shadow-lg rounded-lg overflow-hidden">
          <div className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse ring-2 "></div>
                <div className="space-y-2">
                  <div className="h-8 w-40 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                  
                </div>
              </div>
              <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <div className="px-4 pb-4 space-y-4">
            <div className="space-y-2">
              <div className="h-16 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
              
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-200/50">
              <div className="flex items-center md:justify-start justify-between gap-2 md:gap-4 w-full">
                <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"></div>
                <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"></div>
                <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;