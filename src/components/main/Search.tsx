const Search = () => {
  return (
    <div className=" mx-auto border lg:w-[500px] w-[300px] min-w-[300px] bg-slate-300">
      <div className="flex justify-evenly">
        <button>장소별</button>
        <button>해시태그별</button>
        <button>검색</button>
      </div>
      <div className="flex justify-center">
        <input className="border" />
        <button>선택</button>
      </div>
    </div>
  );
};

export default Search;