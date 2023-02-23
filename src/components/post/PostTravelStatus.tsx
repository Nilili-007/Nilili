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

  return (
    <div className="ml-auto">
      <div className="flex ">
        <Category
          onClick={(e) => onClickStatus(e)}
          className={travelStatus || travelStatus === null ? "" : "clicked"}
        >
          여행 전
        </Category>
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
  height: 40px;
  padding: 6px 12px;
  border: 1px solid #4b5563;
  margin-bottom: 32px;
  cursor: pointer;
  color: #4b5563;
  font-size: 18px;

  &.clicked {
    background: black;
    color: white;
  }
`;
