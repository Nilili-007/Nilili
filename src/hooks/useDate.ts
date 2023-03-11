import React from "react";

const useDate = (time: string) => {
  //분
  const minute = JSON.parse(time).substr(14, 2);

  //시간 ( + 9:00 )
  const hourNum = Number(JSON.parse(time).substr(11, 2)) + 9;
  let hour = hourNum - 24;

  //일 ( 24시 이상 숫자 처리 )
  const dateNum = Number(JSON.parse(time).substr(8, 2));
  let date;

  //월 ( 28,30,31일 이상 숫자처리 )
  const monthNum = Number(JSON.parse(time).substr(5, 2));
  let month;
  if (monthNum === 2) {
    month = dateNum > 28 ? monthNum + 1 : monthNum;
    date = dateNum > 28 ? 1 : dateNum + 1;
  } else if (monthNum === 4 || 6 || 9 || 11) {
    month = dateNum > 30 ? monthNum + 1 : monthNum;
    date = dateNum > 30 ? 1 : dateNum + 1;
  } else {
    month = dateNum > 31 ? monthNum + 1 : monthNum;
    date = dateNum > 31 ? 1 : dateNum + 1;
  }

  //연 ( 12월 이상 숫자처리 )
  const yearNum = Number(JSON.parse(time).substr(0, 4));
  let year;
  if (month > 12) {
    year = yearNum + 1;
    month = 1;
  } else {
    year = yearNum;
  }

  if (hourNum < 24) {
    year = yearNum;
    month = monthNum;
    date = dateNum;
    hour = hourNum;
  }

  return { year, month, date, hour, minute };
};

export default useDate;
