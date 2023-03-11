interface PagenationProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  pages: number[];
  pageArr: number;
  setPageArr: React.Dispatch<React.SetStateAction<number>>;
  lastPage: number;
  firstPage: number;
  showPages: number[];
  currentPages: number[] | null;
  positionY: number;
}

const Pagenation = ({
  pages,
  currentPage,
  setCurrentPage,
  pageArr,
  setPageArr,
  lastPage,
  firstPage,
  showPages,
  currentPages,
  positionY,
}: PagenationProps) => {
  return (
    <div className="flex justify-center items-center gap-2 sm:gap-4 mt-10">
      {currentPages?.includes(1) ? null : (
        <>
          <button
            onClick={() => {
              setPageArr(pageArr - 1);
              setCurrentPage(firstPage - 4);
            }}
            className="w-auto p-1 text-[16px] sm:text-xl hover:font-semibold"
          >
            &lt;
          </button>
          <span>···</span>
        </>
      )}
      {currentPages?.map((page, index) => {
        return (
          <button
            key={index}
            style={page === currentPage ? { fontWeight: 600 } : undefined}
            onClick={() => {
              setCurrentPage(page);
              window.scrollTo({ top: positionY, behavior: "smooth" });
            }}
            className="w-auto p-1  text-[16px] sm:text-xl hover:font-semibold hover:tracking-tight"
          >
            {page}
          </button>
        );
      })}
      {currentPages?.includes(pages.length) ? null : (
        <>
          <span>···</span>
          <button
            onClick={() => {
              setPageArr(pageArr + 1);
              setCurrentPage(lastPage + 1);
            }}
            className="w-auto p-1  text-[16px] sm:text-xl hover:font-semibold hover:tracking-tight"
          >
            &gt;
          </button>
        </>
      )}
    </div>
  );
};

export default Pagenation;
