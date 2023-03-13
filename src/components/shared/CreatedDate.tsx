import React from "react";
import { useDate } from "../../hooks";

const CreatedDate = ({ createdAt }: any) => {
  const { year, month, date, hour, minute } = useDate(createdAt && createdAt);
  return (
    <>
      <span className="mr-1.5">
        {year}.{month && month > 9 ? null : "0"}
        {month}.{date && date > 9 ? null : "0"}
        {date}
      </span>
      <span className="tracking-wide">
        {hour && hour > 9 ? null : "0"}
        {hour}:{minute}
      </span>
    </>
  );
};

export default CreatedDate;
