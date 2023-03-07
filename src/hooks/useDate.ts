import React from "react";

const useDate = (time: any) => {
  //분
  const minute = JSON.parse(time).substr(14, 2);

  //시간 ( + 9:00 )
  const hourNum = Number(JSON.parse(time).substr(11, 2)) + 9;
  const hour = hourNum > 23 ? hourNum - 24 : hourNum;

  //일 ( 24시 이상 숫자 처리 )
  const dateNum = Number(JSON.parse(time).substr(8, 2));
  let date = hourNum + 9 > 23 ? dateNum + 1 : dateNum;

  //월 ( 28,30,31일 이상 숫자처리 )
  const monthNum = Number(JSON.parse(time).substr(5, 2));
  let month;
  if (monthNum === 2) {
    month = date > 28 ? monthNum + 1 : monthNum;
    date = 1;
  } else if (monthNum === 4 || 6 || 9 || 11) {
    month = date > 30 ? monthNum + 1 : monthNum;
    date = 1;
  } else {
    month = date > 31 ? monthNum + 1 : monthNum;
    date = 1;
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

  return { year, month, date, hour, minute };
};

export default useDate;
