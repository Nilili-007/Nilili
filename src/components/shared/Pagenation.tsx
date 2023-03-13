interface PagenationProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  pages: number[];
  pageArr: number;
  setPageArr: React.Dispatch<React.SetStateAction<number>>;
  lastPage: number;
  firstPage: number;
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
  currentPages,
  positionY,
}: PagenationProps) => {
  return (
    <div className="flex justify-center items-center gap-2 sm:gap-4 mt-10">
      {/* 이전 페이지배열 버튼*/}
      {/* 1번 페이지가 배열에 포함되어 있으면 안보임 */}
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
      {/* 해당페이지로 이동하는 버튼 */}
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
      {/* 다음페이지배열로 이동하는 버튼 */}
      {/* 마지막페이지가 배열에 포함되어 있으면 안보임 */}
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
