const useDate = (time: string) => {
  //분
  const minute = JSON.parse(time).substr(14, 2);

  //시간 ( + 9:00 )
  const hourNum = Number(JSON.parse(time).substr(11, 2)) + 9;
  let hour = hourNum - 24;

  //일 ( 24시 이상 숫자 처리 )
  const dateNum = Number(JSON.parse(time).substr(8, 2));
  let date = dateNum + 1;

  //월 ( 28,30,31일 이상 숫자처리 )
  const monthNum = Number(JSON.parse(time).substr(5, 2));
  let month;
  if (monthNum === 2) {
    month = date > 28 ? monthNum + 1 : monthNum;
    date = date > 28 ? 1 : date;
  } else if (monthNum === 4 || 6 || 9 || 11) {
    month = date > 30 ? monthNum + 1 : monthNum;
    date = date > 30 ? 1 : date;
  } else {
    month = date > 31 ? monthNum + 1 : monthNum;
    date = date > 31 ? 1 : date;
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
