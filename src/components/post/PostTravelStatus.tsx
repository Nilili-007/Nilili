import styled from "styled-components";

const PostTravelStatus = ({ travelStatus, setTravelStatus }: any) => {
  const onClickStatus = (e: any) => {
    if (e.target.innerText === "여행 전") {
      setTravelStatus(false);
    }
    if (e.target.innerText === "여행 후") {
      setTravelStatus(true);
    }
  };

  // 여행전/후 선택 에러

  return (
    <div className="ml-auto">
      <div className="flex ">
        <Category
          onClick={(e) => onClickStatus(e)}
          className={!travelStatus && travelStatus === null ? "" : "clicked"}
        >
          여행 전
        </Category>
        <div className="border-r border-gray-600 h-8 mx-3" />
        <Category
          onClick={(e) => onClickStatus(e)}
          className={travelStatus ? "clicked" : ""}
        >
          여행 후
        </Category>
      </div>
    </div>
  );
};

export default PostTravelStatus;

const Category = styled.button`
  height: 32px;
  padding: 0 8px;
  border: 1px solid #4b5563;
  margin-bottom: 32px;
  cursor: pointer;

  &.clicked {
    background: black;
    color: white;
  }
`;
