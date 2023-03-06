const CourseLocationInfo = ({ lists, item }: any) => {
  return (
    <div className="w-full h-auto mt-3 text-gray-04 xs:mt-1">
      {lists.length > 0 ? (
        <>
          <p>{item.address}</p>
          <p>{item.road}</p>
          <p>{item.phone}</p>
        </>
      ) : (
        <h3 className="text-3xl font-bold">"여행지를 추가해주세요."</h3>
      )}
    </div>
  );
};

export default CourseLocationInfo;
