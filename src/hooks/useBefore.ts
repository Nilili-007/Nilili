const useBefore = (createdTime: number | undefined) => {
  const now = Date.now();
  const timeGap = (createTime: number | undefined) => {
    if (createTime) {
      const miliSeconds = now - createTime;
      const beforeSeconds = miliSeconds / 1000;
      if (beforeSeconds < 60) return `방금 전`;
      const beforeMinutes = beforeSeconds / 60;
      if (beforeMinutes < 60) return `${Math.floor(beforeMinutes)}분 전`;
      const beforeHours = beforeMinutes / 60;
      if (beforeHours < 24) return `${Math.floor(beforeHours)}시간 전`;
      const beforeDays = beforeHours / 24;
      if (beforeDays < 32) return `${Math.floor(beforeDays)}일 전`;
      const beforeWeeks = beforeDays / 7;
      if (beforeWeeks < 5) return `${Math.floor(beforeWeeks)}주 전`;
      const beforeMonths = beforeDays / 30;
      if (beforeMonths < 12) return `${Math.floor(beforeMonths)}개월 전`;
      const beforeYears = beforeDays / 365;
      return `${Math.floor(beforeYears)}년 전`;
    } else {
      return "error";
    }
  };
  const nowTime = timeGap(createdTime);
  return { nowTime };
};

export default useBefore;
