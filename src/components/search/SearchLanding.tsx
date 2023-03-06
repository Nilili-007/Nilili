import { CgChevronDown } from "react-icons/cg";

const SearchLanding = () => {
  const scrollToList = () => {
    window.scrollTo({ top: window.innerHeight * 0.8, behavior: "smooth" });
  };

  return (
    <div className="relative flex items-center flex-wrap sm:h-[70vh] w-full aspect-video  bg-no-repeat bg-cover bg-center sm:bg-fixed bg-[url('https://user-images.githubusercontent.com/117059420/223002576-1052c64a-8d13-4581-be68-069dab701d2b.jpg')] min-w-[370px] hidden md:block ">
      <div className="absolute bottom-[35%] left-[15%] ">
        <p className="display3   text-white  ">
          이제 NILILI에서
          <br />
          여행 코스를 찾아보세요.
        </p>
      </div>
      <button>
        <CgChevronDown
          className=" text-white text-7xl font-[1000]  hover:bg-amber-500 hover:bg-opacity-80  absolute bottom-[1%] left-[46%]"
          onClick={scrollToList}
        />
      </button>
    </div>
  );
};

export default SearchLanding;
