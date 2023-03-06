import { useState } from "react";

const usePagenation = (
  data: any[] | undefined,
  tatalPage: number,
  showPage: number
) => {
  //post
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(tatalPage);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const totalContents: any = data?.length;
  const pages = [];
  for (let i = 1; i <= Math.ceil(totalContents / postsPerPage); i++) {
    pages.push(i);
  }

  //page
  //배열 묶음 번호
  const [pageArr, setPageArr] = useState(1);
  //한번에 보여질 페이지 갯수
  const [pageNumber] = useState(showPage);

  //보여지는 마지막 페이지
  const lastPage = pageArr * pageNumber;
  //보여지는 첫번째 페이지
  const firstPage = lastPage - pageNumber;
  const currentPages = pages ? pages.slice(firstPage, lastPage) : null;

  const totalPages = pages.length;
  const showPages = [];
  for (let i = 1; i <= Math.ceil(totalPages / pageNumber); i++) {
    showPages.push(i);
  }
  return {
    firstPostIndex,
    lastPostIndex,
    pages,
    currentPage,
    setCurrentPage,
    pageArr,
    setPageArr,
    lastPage,
    firstPage,
    showPages,
    currentPages,
  };
};

export default usePagenation;
