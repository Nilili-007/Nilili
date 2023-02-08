const LikeList = () => {
  return (
    <>
      {new Array(6).fill(null).map((_, idx) => (
        <div className="border w-5 h-5" key={idx}>
          안녕
        </div>
      ))}
    </>
  );
};

export default LikeList;
