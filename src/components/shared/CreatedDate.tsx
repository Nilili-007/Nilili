import React from "react";
import { useDate } from "../../hooks";

const CreatedDate = ({ createdAt }: any) => {
  const { year, month, date, hour, minute } = useDate(createdAt);
  return (
    <div className="flex gap-1 md:gap-1.5">
      <p>
        {year}.{month && month > 9 ? null : "0"}
        {month}.{date && date > 9 ? null : "0"}
        {date}
      </p>
      <p className="tracking-wide">
        {hour && hour > 9 ? null : "0"}
        {hour}:{minute}
      </p>
    </div>
  );
};

export default CreatedDate;
