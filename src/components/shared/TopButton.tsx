import { useEffect, useState } from "react";

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
            className="hidden sm:block bg-black text-white fixed bottom-[50px] opacity-30 hover:opacity-100 right-[50px] rounded-full h-20 w-20 text-xl font-bold"
            onClick={scrollToTop}
          >
            TOP
          </button>
          <button
            className="block sm:hidden bg-black text-white fixed bottom-[100px] opacity-30 hover:opacity-100 right-[5px] rounded-full h-10 w-10 text-xl font-bold"
            onClick={scrollToTop}
          >
            ↑
          </button>
        </>
      )}
    </>
  );
};

export default TopButton;
