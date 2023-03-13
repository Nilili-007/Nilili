import { useEffect, useState } from "react";
import { CgChevronUp } from "react-icons/cg";

const TopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  return (
    <>
      {showButton && (
        <>
          <button
            className="hidden md:block bg-black font-eng text-white fixed bottom-[50px] opacity-30 hover:opacity-100 right-[50px]  h-20 w-20 text-xl font-medium shadow-2xl shadow-outline"
            onClick={scrollToTop}
          >
            <CgChevronUp className="text-4xl mx-auto" />
            TOP
          </button>
          <button
            className="block md:hidden bg-black text-white fixed bottom-[100px] opacity-30 hover:opacity-100 right-[5px]  h-10 w-10 text-xl font-bold  shadow-2xl"
            onClick={scrollToTop}
          >
            <CgChevronUp className="text-4xl mx-auto" />
          </button>
        </>
      )}
    </>
  );
};

export default TopButton;
