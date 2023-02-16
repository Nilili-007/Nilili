import React from "react";

interface PagenationProps {
  setCurrentPage: any;
  currentPage: number;
  pages: number[];
}

const Pagenation = ({
  setCurrentPage,
  currentPage,
  pages,
}: PagenationProps) => {
  return (
    <div className="flex justify-center gap-5">
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            style={page === currentPage ? { fontWeight: 600 } : undefined}
            onClick={() => setCurrentPage(page)}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
};

export default Pagenation;
