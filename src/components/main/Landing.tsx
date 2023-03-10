import { useNavigate } from "react-router-dom";
import { logEvent } from "../../utils/amplitude";
import { CgChevronDown } from "react-icons/cg";
import { AiOutlineSwapRight } from "react-icons/ai";
import { Link } from "react-router-dom";

const Landing = () => {
  const scrollToList = () => {
    window.scrollTo({ top: window.innerHeight * 0.8, behavior: "smooth" });
  };

  const navigate = useNavigate();

  return (
    <div className="relative items-center justify-center overflow-hidden sm:h-[70vh] w-full aspect-video  bg-no-repeat bg-cover bg-center sm:bg-fixed bg-[url('https://images.unsplash.com/photo-1618237600880-fb9d72e98393?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')] min-h-[500px] min-w-[370px] hidden md:flex ">
      <div className="w-[85%] md:resp1  ">
        <p className=" mb-10 lg:display2 display4   text-white bg-black bg-opacity-40   ">
          나만의 코스로 여행하고
          <br />
          늴리리에서 공유해보세요.
        </p>
        <div className="flex">
          <div
            className="flex border-white border text-white font-eng eng-title4 hover:bg-amber-500 bg-opacity-70 bg-black hover:bg-opacity-70 p-[12px] hover:cursor-pointer"
            onClick={() => {
              navigate("/search");
              logEvent("button click : 코스보기", {
                from: "메인페이지 Landing",
              });
            }}
          >
            FIND MORE
            <AiOutlineSwapRight className="ml-2 font-eng eng-title1 " />
          </div>
        </div>
      </div>
      <button>
        <CgChevronDown
          className=" text-white text-7xl font-[1000]  hover:bg-amber-500 hover:bg-opacity-70  absolute bottom-[1%] left-[46%]"
          onClick={scrollToList}
        />
      </button>
    </div>
  );
};

export default Landing;
