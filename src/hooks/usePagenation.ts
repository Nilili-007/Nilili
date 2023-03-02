import { useState } from "react";

const usePagenation = (data: any[] | undefined, tatalPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(tatalPage);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const totalContents: any = data?.length;
  const pages = [];
  for (let i = 1; i <= Math.ceil(totalContents / postsPerPage); i++) {
    pages.push(i);
  }
  return {
    firstPostIndex,
    lastPostIndex,
    pages,
    currentPage,
    setCurrentPage,
  };
};

export default usePagenation;
